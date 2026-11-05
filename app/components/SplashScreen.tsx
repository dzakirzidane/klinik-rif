"use client";

import { useEffect, useState } from "react";

const LAMA_TAMPIL = 2600; // ms sebelum tirai naik
const LAMA_TIRAI = 1100; // ms durasi tirai naik

export default function SplashScreen() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.splash = "on";
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => {
      setPhase("out");
      html.dataset.splash = "done";
      document.body.style.overflow = "";
    }, LAMA_TAMPIL);
    const t2 = setTimeout(() => setPhase("gone"), LAMA_TAMPIL + LAMA_TIRAI);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      html.dataset.splash = "done";
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: phase === "out" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${LAMA_TIRAI}ms cubic-bezier(0.76,0,0.24,1)`,
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep text-white"
    >
      <div
        style={{
          opacity: phase === "out" ? 0 : 1,
          transition: "opacity 400ms ease",
        }}
        className="text-center"
      >
        <p className="splash-logo font-serif text-5xl md:text-7xl">
          Klinik RIF<span className="text-white/40">.</span>
        </p>
        <p className="splash-tag mt-4 text-[10px] uppercase tracking-[0.35em] text-white/50 md:text-xs">
          Klinik Gigi &amp; Umum
        </p>
      </div>

      <div className="absolute bottom-16 h-px w-40 bg-white/15 md:w-56">
        <div className="splash-bar h-px w-full bg-white" />
      </div>
    </div>
  );
}