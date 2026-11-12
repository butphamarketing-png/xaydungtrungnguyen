import { Link } from "react-router-dom";
import { useCms } from "../lib/cms.js";
import SmartImg from "./SmartImg.jsx";

export default function PriceBoard() {
  const { pricePacks } = useCms();
  return (
    <section className="pad price-board" id="bao-gia">
      <div className="price-head">
        <p className="price-kicker">Báo giá xây dựng</p>
        <h2>
          Bảng báo giá – Xây dựng Trung Nguyễn
        </h2>
        <p className="price-lead">Chi phí minh bạch – Giải pháp phù hợp cho mọi công trình</p>
      </div>

      <div className="price-cards">
        {pricePacks.map((p) => (
          <article key={p.title} className={`price-card${p.featured ? " featured" : ""}`}>
            {p.badge ? <span className="price-badge">{p.badge}</span> : null}
            <div className="price-photo">
              <SmartImg src={p.image} alt={p.featured ? p.title : p.tag} />
              <div className="price-caption">
                <strong>{p.featured ? p.title : p.tag}</strong>
                <span>{p.featured ? p.lead : p.title}</span>
              </div>
            </div>
            <p className="price-num">{p.price}</p>
            <ul>
              {p.points.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="btn pill with-arrow price-cta" to="/lien-he">
              Đăng ký tư vấn ngay
            </Link>
          </article>
        ))}
      </div>

      <p className="price-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 11v6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="8" r="0.9" fill="currentColor" />
        </svg>
        <span>
          <strong>Lưu ý:</strong> Đơn giá mang tính tham khảo. Chi phí thực tế phụ thuộc diện tích, hiện trạng và vật tư.
        </span>
      </p>
    </section>
  );
}
