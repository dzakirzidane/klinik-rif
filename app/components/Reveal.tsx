"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          setShown(true);
        } else if (!entry.isIntersecting) {
          // keluar layar: reset supaya bisa diputar lagi
          setShown(false);
        }
      },
      { threshold: [0, 0.15] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    variant === "scale"
      ? "opacity-0 scale-95 blur-sm"
      : variant === "fade"
      ? "opacity-0 blur-sm"
      : "opacity-0 translate-y-12 blur-sm";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown
          ? "translate-y-0 scale-100 opacity-100 blur-none duration-[1200ms]"
          : `${hidden} duration-500`
      } ${className}`}
    >
      {children}
    </div>
  );
}