import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/hero/cong-trinh-01.jpg", alt: "Công trình nhà phố đang thi công của Xây Dựng Trung Nguyễn" },
  { src: "/villas/villa-cong-lon.jpg", alt: "Biệt thự mặt tiền rộng" },
  { src: "/villas/neo-02.jpg", alt: "Nhà phố sau hoàn thiện" },
];

export default function HeroVideo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const go = (step) => setIndex((current) => (current + step + SLIDES.length) % SLIDES.length);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Công trình Xây Dựng Trung Nguyễn">
      <h1 className="sr-only">Xây nhà trọn gói, sửa chữa và cải tạo</h1>
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          className={`hero-slide${i === index ? " is-on" : ""}`}
          src={slide.src}
          alt={i === index ? slide.alt : ""}
          aria-hidden={i === index ? undefined : true}
        />
      ))}
      <button className="hero-arrow prev" type="button" aria-label="Ảnh trước" onClick={() => go(-1)}>
        ‹
      </button>
      <button className="hero-arrow next" type="button" aria-label="Ảnh sau" onClick={() => go(1)}>
        ›
      </button>
      <div className="hero-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={i === index ? "is-on" : ""}
            aria-label={`Ảnh ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
