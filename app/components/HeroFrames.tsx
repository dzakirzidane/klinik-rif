"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FrameData = {
  no: string;
  label: string;
  title: [string, string];
  tag: string;
  video: string;
};

const FRAMES: FrameData[] = [
  {
    no: "01",
    label: "Klinik Gigi",
    title: ["Modern", "Dentistry"],
    tag: "Estetika \u2022 Preventif \u2022 Restoratif",
    video: "/hero.mp4",
  },
  {
    no: "02",
    label: "Klinik Umum",
    title: ["Family", "Care"],
    tag: "Pemeriksaan \u2022 Konsultasi \u2022 Pengobatan",
    video: "/hero-umum.mp4",
  },
];

function Frame({ frame }: { frame: FrameData }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (ref.current?.error) setMissing(true);
  }, []);

  return (
    <div className="relative h-[460px] w-[300px] shrink-0 snap-center overflow-hidden rounded-[28px] bg-neutral-400 shadow-2xl md:h-[540px] md:w-[350px]">
      {!missing && (
        <video
          ref={ref}
          src={frame.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setMissing(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {missing && (
        <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full border border-dashed border-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/80">
          Video &middot; {frame.video.replace("/", "")}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
          {frame.no} &mdash; {frame.label}
        </p>
        <p className="mt-3 font-serif text-3xl leading-tight">
          {frame.title[0]}
          <br />
          {frame.title[1]}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/70">
          {frame.tag}
        </p>
      </div>
    </div>
  );
}

export default function HeroFrames() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const langkah = () => {
    const el = ref.current;
    const frame = el?.firstElementChild as HTMLElement | null;
    return frame ? frame.offsetWidth + 20 : 370;
  };

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const frame = el.firstElementChild as HTMLElement | null;
    const step = frame ? frame.offsetWidth + 20 : 370;
    setActive(
      Math.min(FRAMES.length - 1, Math.max(0, Math.round(el.scrollLeft / step)))
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const target = Math.min(FRAMES.length - 1, Math.max(0, i));
    el.scrollTo({ left: target * langkah(), behavior: "smooth" });
  };

  const panah =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-sm transition hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-25";

  return (
    <div className="animate-rise w-full">
      {/* Desktop (lg+): dua bingkai sejajar dan di tengah. HP/tablet: swipe kiri-kanan */}
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-[calc(50%-150px)] py-6 md:px-[calc(50%-175px)] lg:justify-center lg:overflow-visible lg:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FRAMES.map((f) => (
          <Frame key={f.no} frame={f} />
        ))}
      </div>

      {/* Kontrol: hanya untuk HP/tablet */}
      <div className="mt-1 flex items-center justify-center gap-4 md:gap-6 lg:hidden">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Bingkai sebelumnya"
          className={panah}
        >
          &larr;
        </button>

        {FRAMES.map((f, i) => (
          <button
            key={f.no}
            type="button"
            onClick={() => go(i)}
            className={`text-[10px] uppercase tracking-[0.2em] transition ${
              active === i ? "text-ink" : "text-ink/35 hover:text-ink/70"
            }`}
          >
            {f.no} {f.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === FRAMES.length - 1}
          aria-label="Bingkai berikutnya"
          className={panah}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}