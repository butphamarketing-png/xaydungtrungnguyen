import { useCms } from "../lib/cms.js";
import PageHero from "../components/PageHero.jsx";
import BookingCta from "../components/BookingCta.jsx";

export default function Contact() {
  const { site, pages } = useCms();
  const page = pages.contact;
  const tel = String(site.phone || "").replace(/\D/g, "");
  const tel2 = "0977359439";
  return (
    <article className="page contact-page">
      <PageHero kicker={page.kicker} title={page.title}>
        <p>{page.lead}</p>
      </PageHero>
      <BookingCta />
      <div className="page-body">
        <div className="contact-grid">
          <div className="contact-card">
            <p className="kicker">Văn phòng</p>
            <h2>Địa chỉ</h2>
            <p>{site.address}</p>
            {site.fanpage ? <p>{site.fanpage}</p> : null}
            {site.showroom ? (
              <p>
                <strong>Showroom:</strong> {site.showroom}
              </p>
            ) : null}
            {site.workshop ? (
              <p>
                <strong>Xưởng:</strong> {site.workshop}
              </p>
            ) : null}
          </div>
          <div className="contact-card">
            <p className="kicker">Hotline</p>
            <h2>Liên hệ nhanh</h2>
            <p>
              <a href={`tel:${tel}`}>{site.phone}</a>
              {" – "}
              <a href={`tel:${tel2}`}>0977 359 439</a>
            </p>
            {site.email ? (
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            ) : null}
          </div>
          <div className="contact-card">
            <p className="kicker">Bản đồ</p>
            <h2>Tìm chúng tôi</h2>
            <iframe
              title="Bản đồ Xây Dựng Trung Nguyễn"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address || "27/5 An Bình, phường Dĩ An, TP.HCM")}&z=16&output=embed`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
