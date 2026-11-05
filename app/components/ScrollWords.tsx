"use client";

import { useEffect, useRef } from "react";

export default function ScrollWords({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(
        Math.max((vh * 0.85 - rect.top) / (rect.height + vh * 0.3), 0),
        1
      );
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = i < lit ? "1" : "0.18";
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          data-w
          style={{ opacity: 0.18 }}
          className="transition-opacity duration-500"
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}