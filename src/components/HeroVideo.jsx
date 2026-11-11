import { useEffect, useRef, useState } from "react";

const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll", "wheel"];

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const unlock = () => {
      video.muted = false;
      setMuted(false);
      video.play().catch(() => {});
      UNLOCK_EVENTS.forEach((evt) => window.removeEventListener(evt, unlock));
    };

    video.muted = false;
    video.play().catch(() => {
      // Browsers block autoplay with sound until the visitor interacts with the page.
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
      UNLOCK_EVENTS.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));
    });

    return () => UNLOCK_EVENTS.forEach((evt) => window.removeEventListener(evt, unlock));
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) video.play().catch(() => {});
  };

  return (
    <section className="hero hero--video" aria-label="Video giới thiệu Xây Dựng Trung Nguyễn">
      <h1 className="sr-only">Xây nhà trọn gói, sửa chữa và cải tạo</h1>
      <video
        ref={videoRef}
        className="hero-video"
        src="/hero/gioi-thieu.mp4"
        poster="/hero/cong-trinh-01.jpg"
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <button
        className="hero-sound"
        type="button"
        aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
        onClick={toggleSound}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" /><path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
        )}
      </button>
    </section>
  );
}
