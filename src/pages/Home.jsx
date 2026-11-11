import { Link } from "react-router-dom";
import { useCms } from "../lib/cms.js";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import { homeNewsCards } from "../lib/news-media.js";
import PriceBoard from "../components/PriceBoard.jsx";
import BuildCalc from "../components/BuildCalc.jsx";
import ConsultBlock from "../components/ConsultBlock.jsx";
import StatsBar from "../components/StatsBar.jsx";
import SmartImg from "../components/SmartImg.jsx";
import HeroVideo from "../components/HeroVideo.jsx";

export default function Home() {
  const cms = useCms();
  const { news } = cms;
  const shareNews = homeNewsCards(news);
  return (
    <>
      <HeroVideo />
      <StatsBar />

      <section className="pad about-block" id="ve-chung-toi">
        <div className="about-copy">
          <p className="about-kicker">Về chúng tôi</p>
          <h2>Xây Dựng Trung Nguyễn</h2>
          <span className="about-rule" aria-hidden="true" />
          <p>
            Trung Nguyễn là đơn vị chuyên thiết kế, thi công xây dựng và sửa chữa nhà ở dân dụng tại TP.HCM và khu vực lân cận.
            Với đội ngũ kỹ sư, kiến trúc sư giàu kinh nghiệm, chúng tôi mang đến những công trình bền vững, thẩm mỹ và tối ưu chi phí cho khách hàng.
          </p>
          <ul className="about-points">
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M4 18V10l8-5 8 5v8H4Z" /><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M9 18v-4h6v4" /></svg>
              Thi công đúng tiến độ, đúng cam kết
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="m12 4 8 4-8 4-8-4 8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4" /></svg>
              Vật liệu chất lượng, nguồn gốc rõ ràng
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M12 3.2 19 6v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6l7-2.8Z" /></svg>
              Bảo hành công trình, đồng hành lâu dài
            </li>
          </ul>
          <Link className="btn pill with-arrow" to="/gioi-thieu">
            Xem chi tiết
          </Link>
        </div>
        <div className="about-photos">
          <SmartImg className="wide" src="/villas/neo-02.jpg" alt="Nhà phố hoàn thiện" />
          <div className="pair">
            <SmartImg src="/hero/cong-trinh-01.jpg" alt="Công trình đang thi công" />
            <SmartImg src="/cai-tao.jpg" alt="Đội ngũ khảo sát công trình" />
          </div>
        </div>
      </section>

      <section className="pad services-block">
        <div className="services-head">
          <p className="services-kicker">Dịch vụ của chúng tôi</p>
          <h2>Giải pháp xây dựng toàn diện</h2>
          <p className="services-lead">
            Cung cấp các dịch vụ thiết kế, thi công và sửa chữa nhà ở với chất lượng, tiến độ và chi phí tối ưu.
          </p>
        </div>
        <div className="service-cards">
          {[
            {
              title: "Thiết kế kiến trúc",
              desc: "Tư vấn, thiết kế kiến trúc và công năng phù hợp với nhu cầu và ngân sách.",
              image: "/thiet-ke.jpg",
              href: "/dich-vu",
            },
            {
              title: "Thi công xây dựng",
              desc: "Thi công xây nhà phần thô, hoàn thiện và trọn gói, đảm bảo chất lượng và tiến độ.",
              image: "/hero/cong-trinh-01.jpg",
              href: "/xay-dung-nha-tron-goi-tai-ho-chi-minh",
            },
            {
              title: "Sửa chữa – Cải tạo nhà",
              desc: "Nâng cấp, sửa chữa và cải tạo không gian sống tiện nghi, thẩm mỹ và bền vững.",
              image: "/cai-tao.jpg",
              href: "/bao-gia-sua-chu-nha-tron-goi-2025",
            },
          ].map((s) => (
            <article key={s.title} className="service-card home-service">
              <SmartImg src={s.image} alt={s.title} />
              <div className="service-card-body">
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
                <Link className="service-more" to={s.href}>
                  Xem chi tiết
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <PriceBoard />
      <BuildCalc />

      <ProjectShowcase />

      <ConsultBlock />

      <section className="pad journal">
        <div className="journal-head">
          <p className="journal-kicker">Tin tức</p>
          <h2>
            Góc <span>chia sẻ</span>
          </h2>
          <p>Cập nhật kinh nghiệm xây nhà, thiết kế, thi công và các giải pháp cải tạo không gian sống.</p>
        </div>
        <div className="journal-cards">
          {shareNews.map((p) => (
            <Link key={p.slug} to={`/${p.slug}`} className="journal-card">
              <div className="journal-media">
                <SmartImg src={p.image} alt={p.title} />
                {p.date ? (
                  <time>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 6h14v14H5zM5 10h14M9 4v4M15 4v4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    {p.date}
                  </time>
                ) : null}
              </div>
              <div className="journal-body">
                <h3>{p.title}</h3>
                <span className="journal-more">Xem chi tiết</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="journal-all">
          <Link className="btn pill with-arrow" to="/tin-tuc">
            Tất cả bài viết
          </Link>
        </div>
      </section>
    </>
  );
}
