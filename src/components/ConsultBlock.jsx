import { useState } from "react";
import { addBooking, useCms } from "../lib/cms.js";

const needs = ["Thiết kế", "Xây dựng", "Cải tạo", "Báo giá", "Khác"];
const slots = ["08:00", "09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:30"];

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ConsultBlock() {
  const { site } = useCms();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  return (
    <section className="pad consult-block" id="tu-van">
      <div className="consult-visual">
        <img src="/home/y-tuong-hoan-thien.jpg" alt="Nhà phố từ bản vẽ đến công trình hoàn thiện" loading="lazy" />
      </div>
      <div className="consult-main">
        <div className="consult-head">
          <p className="consult-kicker">Giải pháp trọn gói</p>
          <h2>
            Từ ý tưởng đến ngôi nhà <span>hoàn thiện</span>
          </h2>
          <p>
            Đồng hành cùng bạn trên hành trình kiến tạo không gian sống đúng nhu cầu, đúng ngân sách và bền vững theo thời gian.
          </p>
        </div>
        <form
          className="consult-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (sending) return;
            const form = e.currentTarget;
            const data = new FormData(form);
            setSending(true);
            try {
              await addBooking({
                name: String(data.get("name") || "").trim(),
                phone: String(data.get("phone") || "").trim(),
                need: String(data.get("need") || "").trim(),
                slot: String(data.get("slot") || "").trim(),
              });
              setSent(true);
              form.reset();
            } catch (err) {
              alert(err.message || "Không gửi được yêu cầu. Vui lòng gọi hotline.");
            } finally {
              setSending(false);
            }
          }}
        >
          <div className="consult-form-head">
            <svg viewBox="0 0 48 40" aria-hidden="true">
              <path d="M4 20 24 4l20 16" fill="none" stroke="var(--navy)" strokeWidth="4" strokeLinejoin="round" />
              <path d="M12 16v4" stroke="var(--navy)" strokeWidth="4" />
              <path d="M4 36c12-6 26-6 40-2" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div>
              <h3>Để lại thông tin tư vấn</h3>
              <p>Nhận giải pháp phù hợp và báo giá chi tiết cho công trình của bạn.</p>
            </div>
          </div>
          <label>
            <Icon d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM4 20a8 8 0 0 1 16 0" />
            <input name="name" placeholder="Họ và tên *" required aria-label="Họ và tên" />
          </label>
          <label>
            <Icon d="M7 3.8h3.2l1 3.2-2 1.2a11 11 0 0 0 5.6 5.6l1.2-2 3.2 1V17A13 13 0 0 1 7 3.8z" />
            <input name="phone" type="tel" placeholder="Số điện thoại *" required aria-label="Số điện thoại" />
          </label>
          <label>
            <Icon d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
            <select name="need" required defaultValue="" aria-label="Nhu cầu tư vấn">
              <option value="" disabled>
                Nhu cầu tư vấn *
              </option>
              {needs.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <label>
            <Icon d="M5 6h14v14H5zM5 10h14M9 6V4M15 6V4" />
            <select name="slot" required defaultValue="" aria-label="Khung giờ tư vấn">
              <option value="" disabled>
                Chọn khung giờ tư vấn *
              </option>
              {slots.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <button className="consult-submit" type="submit" disabled={sending}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3ZM10 13l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            {sending ? "Đang gửi…" : "Gửi yêu cầu tư vấn"}
          </button>
          {sent ? (
            <p className="consult-ok">
              Cảm ơn quý khách. Chúng tôi sẽ gọi lại sớm, hoặc liên hệ ngay{" "}
              <a href={`tel:${String(site.phone || "").replace(/\D/g, "")}`}>{site.phone}</a>.
            </p>
          ) : null}
          <small>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích tư vấn.
          </small>
        </form>
      </div>
    </section>
  );
}
