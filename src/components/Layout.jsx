import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import FloatDock from "./FloatDock.jsx";
import BookingPopup from "./BookingPopup.jsx";
import { findPost, kindOf, useCms } from "../lib/cms.js";
import { applySeo, pageSeoFromCms } from "../lib/seo.js";
import { useScrollReveal } from "../lib/useScrollReveal.js";
import { trackPageView } from "../lib/track.js";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Trang chủ" },
  { to: "/gioi-thieu", label: "Giới thiệu" },
  { to: "/dich-vu", label: "Dịch vụ", menu: true },
  { to: "/mau-nha", label: "Mẫu nhà" },
  { to: "/bao-gia", label: "Báo giá" },
  { to: "/tin-tuc", label: "Tin tức" },
  { to: "/thuoc-lo-ban", label: "Thước lỗ ban" },
  { to: "/lien-he", label: "Liên hệ" },
];

export default function Layout() {
  const cms = useCms();
  const { site, home: cmsHome, coreServices } = cms;
  const tel = String(site.phone || "").replace(/\D/g, "");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const home = location.pathname === "/";
  useScrollReveal(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
        return;
      }
    }
    window.scrollTo(0, 0);
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", open);
    return () => document.body.classList.remove("is-menu-open");
  }, [open]);

  useEffect(() => {
    applySeo({
      ...pageSeoFromCms(location.pathname, {
        home: cmsHome,
        reviews: cms.reviews,
        findPost: (slug) => findPost(slug, cms),
        kindOf: (slug) => kindOf(slug, cms),
      }),
      site,
    });
    const timer = window.setTimeout(() => trackPageView(location.pathname), 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, cms, cmsHome, site]);

  return (
    <>
      <a className="skip-link" href="#noi-dung">
        Bỏ qua điều hướng
      </a>
      <div className={`site-head${scrolled ? " is-scrolled" : ""}${home ? " on-home" : ""}${home && !scrolled ? " on-hero" : ""}`}>
        <div className="topbar">
          <span>{site.name}</span>
          <span className="topbar-address">{site.address}</span>
          <span>Thứ 2 – Thứ 7: 08:00 – 16:30</span>
        </div>
        <header className="header">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/logo-menu.png" alt="" />
            <span className="brand-name">
              <small>Xây dựng</small>
              <strong>Trung Nguyễn</strong>
            </span>
          </Link>
          <button className={`menu-btn${open ? " is-open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
          <nav className={open ? "open" : ""}>
            {links.map((item) =>
              item.menu ? (
                <div className="nav-drop" key={item.to}>
                  <NavLink to={item.to} onClick={() => setOpen(false)}>
                    {item.label}
                    <em aria-hidden="true">▾</em>
                  </NavLink>
                  <div className="nav-drop-menu">
                    {coreServices.map((service) => (
                      <Link key={service.slug || service.title} to={service.href} onClick={() => setOpen(false)}>
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <a className="header-cta" href={`tel:${tel}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z"
              />
            </svg>
            {site.phone || "Hotline"}
          </a>
        </header>
      </div>
      {open ? <button className="nav-mask" aria-label="Đóng menu" onClick={() => setOpen(false)} /> : null}
      <main id="noi-dung">
        <Outlet />
      </main>
      <footer className="footer">
        <img className="footer-house" src="/home/y-tuong-hoan-thien.jpg" alt="" loading="lazy" />
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg viewBox="0 0 64 48" aria-hidden="true">
                <path d="M4 26 32 5l28 21" fill="none" stroke="#0c2348" strokeWidth="5" strokeLinejoin="round" />
                <path d="M14 20v10" stroke="#0c2348" strokeWidth="5" />
                <path d="M26 22h12v10H26z" fill="#0c2348" />
                <path d="M30.5 22v10M26 27h12" stroke="#fff" strokeWidth="1.4" />
                <path d="M2 44c18-10 40-10 60-4" fill="none" stroke="#2f6fd0" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <span>
                Xây Dựng
                <br />
                Trung Nguyễn
              </span>
            </Link>
            <span className="footer-rule" aria-hidden="true" />
            <p>Xây nhà trọn gói, sửa chữa và cải tạo nhà tại TP.HCM. Uy tín – Chất lượng – Tận tâm.</p>
          </div>
          <div className="footer-col">
            <p className="footer-title">Liên hệ</p>
            <ul className="footer-contact">
              <li>
                <span className="footer-ico">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                </span>
                {site.address}
              </li>
              <li>
                <span className="footer-ico">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.3 0 .7-.3 1l-2.2 2.2z" /></svg>
                </span>
                <strong>
                  <a href={`tel:${tel}`}>{site.phone}</a>
                  {" – "}
                  <a href="tel:0977359439">0977 359 439</a>
                </strong>
              </li>
              <li>
                <span className="footer-ico">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z" /></svg>
                </span>
                {site.facebook ? (
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                    Xây Dựng Trung Nguyễn – Xây Dựng &amp; Cải Tạo Nhà Trọn Gói
                  </a>
                ) : (
                  "Xây Dựng Trung Nguyễn – Xây Dựng & Cải Tạo Nhà Trọn Gói"
                )}
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <p className="footer-title">Menu</p>
            <div className="footer-links">
              {links.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <p className="footer-title">Kết nối nhanh</p>
            <a className="footer-zalo" href={site.zalo || `https://zalo.me/${tel}`} target="_blank" rel="noreferrer">
              <span>Zalo</span>
              Chat Zalo ngay
            </a>
            <div className="footer-qr">
              <img src="/zalo-qr.png" alt="Mã QR Zalo Xây Dựng Trung Nguyễn" loading="lazy" />
              <p>Quét mã QR để liên hệ qua Zalo</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}.</p>
          <p>
            Thiết kế bởi{" "}
            <a href="https://butphamarketing.com" target="_blank" rel="noopener noreferrer">
              Bứt Phá Marketing
            </a>
          </p>
        </div>
      </footer>
      <FloatDock />
      <BookingPopup />
    </>
  );
}
