import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmartImg from "./SmartImg.jsx";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "caitao", label: "Cải tạo – sửa chữa" },
  { id: "dansu", label: "Công trình dân dụng" },
];

const WORKS = [
  { cat: "dansu", title: "Xây tường bao công trình", place: "TP.HCM", src: "/cong-trinh/tn-09.jpg" },
  { cat: "caitao", title: "Cải tạo – xây mới tường gạch", place: "TP.HCM", src: "/cong-trinh/tn-08.jpg" },
  { cat: "caitao", title: "Tô trát hoàn thiện tường", place: "TP.HCM", src: "/cong-trinh/tn-01.jpg" },
  { cat: "dansu", title: "Thi công phần thô", place: "TP.HCM", src: "/cong-trinh/tn-03.jpg" },
  { cat: "caitao", title: "Sửa chữa nhà ở", place: "TP.HCM", src: "/cong-trinh/tn-04.jpg" },
  { cat: "dansu", title: "Xây dựng nhà dân dụng", place: "TP.HCM", src: "/cong-trinh/tn-05.jpg" },
  { cat: "caitao", title: "Cải tạo lối đi – hành lang", place: "TP.HCM", src: "/cong-trinh/tn-06.jpg" },
  { cat: "caitao", title: "Tô trát tường hoàn thiện", place: "TP.HCM", src: "/cong-trinh/tn-02.jpg" },
  { cat: "dansu", title: "Xây tường gạch công trình", place: "TP.HCM", src: "/cong-trinh/tn-07.jpg" },
  { cat: "dansu", title: "Đội ngũ thi công Trung Nguyễn", place: "TP.HCM", src: "/cong-trinh/tn-10.jpg" },
];

function perViewFor(width) {
  if (width <= 720) return 2;
  if (width <= 1100) return 2;
  return 4;
}

export default function ProjectShowcase() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(4);
  const items = filter === "all" ? WORKS : WORKS.filter((item) => item.cat === filter);
  const maxIndex = Math.max(0, items.length - perView);
  const starts = [];
  for (let cursor = 0; cursor < items.length; cursor += perView) starts.push(Math.min(cursor, maxIndex));
  const pages = [...new Set(starts)];
  const page = Math.max(0, pages.indexOf(pages.find((start) => start >= index) ?? pages[pages.length - 1]));
  const current = pages[page] ?? 0;

  useEffect(() => {
    const apply = () => setPerView(perViewFor(window.innerWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const go = (step) => setIndex(pages[Math.min(pages.length - 1, Math.max(0, page + step))] ?? 0);

  return (
    <section className="pad works-board" id="cong-trinh">
      <div className="works-head">
        <p className="works-kicker">Công trình tiêu biểu</p>
        <h2>Các công trình đã thi công</h2>
        <p className="works-lead">Những dự án thực tế khẳng định năng lực và uy tín của Trung Nguyễn</p>
      </div>

      <div className="works-filters" role="tablist" aria-label="Nhóm công trình">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={filter === item.id ? "is-on" : ""}
            onClick={() => {
              setFilter(item.id);
              setIndex(0);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="works-rail">
        <button className="works-arrow prev" type="button" aria-label="Công trình trước" onClick={() => go(-1)} disabled={current === 0}>
          ‹
        </button>
        <div className="works-window">
          <div
            className="works-track"
            style={{ transform: `translateX(calc(${current} * -1 * (100% + 18px) / ${perView}))` }}
          >
            {items.map((item) => (
              <Link key={item.src + item.title} className="work-card" to="/mau-nha" style={{ flex: `0 0 calc((100% - ${(perView - 1) * 18}px) / ${perView})` }}>
                <SmartImg src={item.src} alt={item.title} />
                <span className="work-caption">
                  <strong>{item.title}</strong>
                  <em>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
                      <circle cx="12" cy="11" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    {item.place}
                  </em>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <button className="works-arrow next" type="button" aria-label="Công trình sau" onClick={() => go(1)} disabled={current >= maxIndex}>
          ›
        </button>
      </div>

      <div className="works-dots">
        {pages.map((start, dot) => (
          <button key={start} type="button" className={dot === page ? "is-on" : ""} aria-label={`Nhóm ${dot + 1}`} onClick={() => setIndex(start)} />
        ))}
      </div>

      <Link className="btn pill with-arrow works-more" to="/mau-nha">
        Xem thêm công trình
      </Link>
    </section>
  );
}
