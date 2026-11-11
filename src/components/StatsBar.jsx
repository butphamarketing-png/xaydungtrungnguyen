import { useEffect, useRef, useState } from "react";
import { useCms } from "../lib/cms.js";

function parseStat(value) {
  const raw = String(value || "").trim();
  const match = raw.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { text: raw };
  return { target: Number(match[1].replace(",", ".")), suffix: match[2] };
}

function formatShown(n, target) {
  if (!Number.isFinite(n)) return "0";
  const decimals = String(target).includes(".") ? 1 : 0;
  return decimals ? n.toFixed(1) : String(Math.round(n));
}

function StatValue({ value, active }) {
  const parsed = parseStat(value);
  const target = parsed.target ?? 0;
  const suffix = parsed.suffix || "";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (parsed.text || !active) {
      setShown(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const duration = Math.min(2200, 900 + target * 1.1);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setShown(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, parsed.text]);

  if (parsed.text) return parsed.text;

  return (
    <>
      {formatShown(shown, target)}
      {suffix}
    </>
  );
}

const ICONS = [
  <svg key="shield" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M12 3.2 19 6v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6l7-2.8Z" /></svg>,
  <svg key="layers" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="m12 4 8 4-8 4-8-4 8-4Zm-8 8 8 4 8-4M4 16l8 4 8-4" /></svg>,
  <svg key="people" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 0a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM4.5 19v-1.2A3.3 3.3 0 0 1 7.8 14.5h1.4A3.3 3.3 0 0 1 12.5 17.8V19M13 19v-.8a3 3 0 0 1 2.2-2.9l.6-.1a2.8 2.8 0 0 1 3.2 2.8V19" /></svg>,
  <svg key="hands" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M8 13.5 5.5 11a1.6 1.6 0 0 1 2.2-2.3L10 11V6.8a1.3 1.3 0 0 1 2.6 0V12l1.2-1.1a1.4 1.4 0 0 1 2 .1l.2.2M14 12.2l1.1-.8a1.3 1.3 0 0 1 1.8 1.8L14.2 17a4 4 0 0 1-2.5.9H9" /></svg>,
];

export default function StatsBar() {
  const { stats } = useCms();
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      {stats.map((item, index) => (
        <div key={item.label}>
          <span className="trust-ico">{ICONS[index] || null}</span>
          <p>
            <strong>
              <StatValue value={item.value} active={active} />
            </strong>
            <span>{item.label}</span>
          </p>
        </div>
      ))}
    </section>
  );
}
