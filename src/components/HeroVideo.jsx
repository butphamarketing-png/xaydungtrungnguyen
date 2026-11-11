import { useEffect, useRef, useState } from "react";

const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll", "wheel"];

export default function HeroVideo() {
  const videoRef = useRef(null);
  const bgRef = useRef(null);
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

    const start = () => {
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(() => {
        // Browsers block autoplay with sound until the visitor interacts with the page.
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
        UNLOCK_EVENTS.forEach((evt) => window.addEventListener(evt, unlock, { passive: true }));
      });
    };

    const bg = bgRef.current;
    const syncBg = () => {
      if (!bg) return;
      if (Math.abs(bg.currentTime - video.currentTime) > 0.3) bg.currentTime = video.currentTime;
      if (video.paused) bg.pause();
      else bg.play().catch(() => {});
    };
    video.addEventListener("play", syncBg);
    video.addEventListener("pause", syncBg);
    video.addEventListener("seeked", syncBg);
    video.addEventListener("timeupdate", syncBg);

    if (window.__loaderDone || !document.getElementById("page-loader")) start();
    else window.addEventListener("page-loader-done", start, { once: true });

    return () => {
      video.removeEventListener("play", syncBg);
      video.removeEventListener("pause", syncBg);
      video.removeEventListener("seeked", syncBg);
      video.removeEventListener("timeupdate", syncBg);
      window.removeEventListener("page-loader-done", start);
      UNLOCK_EVENTS.forEach((evt) => window.removeEventListener(evt, unlock));
    };
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
        ref={bgRef}
        className="hero-video-bg"
        src="/hero/gioi-thieu.mp4"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <video
        ref={videoRef}
        className="hero-video"
        src="/hero/gioi-thieu.mp4"
        poster="/cong-trinh/tn-10.jpg"
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
