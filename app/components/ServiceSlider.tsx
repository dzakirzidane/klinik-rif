"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Kategori = "gigi" | "umum";
type Filter = "semua" | Kategori;

type Item = {
  nama: string;
  desc: string;
  kategori: Kategori;
  foto: string;
};

const TABS: { id: Filter; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "gigi", label: "Klinik Gigi" },
  { id: "umum", label: "Klinik Umum" },
];

/* Foto kartu: kalau file belum ada, tampilkan label placeholder berisi nama file */
function CardPhoto({ src, label }: { src: string; label: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "missing">("loading");
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete) {
      setStatus(img.naturalWidth > 0 ? "ok" : "missing");
    }
  }, []);

  if (status === "missing") {
    return (
      <span className="absolute left-1/2 top-1/3 -translate-x-1/2 whitespace-nowrap rounded-full border border-dashed border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white/60">
        Foto &middot; {label}
      </span>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt=""
        loading="lazy"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("missing")}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
    </>
  );
}

export default function ServiceSlider({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("semua");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);

  const shown =
    filter === "semua" ? items : items.filter((i) => i.kategori === filter);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const kartu = el.firstElementChild as HTMLElement | null;
    const step = kartu ? kartu.offsetWidth + 20 : 400;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;

    setCanPrev(el.scrollLeft > 8);
    setCanNext(!atEnd);
    setActive(
      atEnd
        ? Math.max(0, shown.length - 1)
        : Math.min(shown.length - 1, Math.round(el.scrollLeft / step))
    );
  }, [shown.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollLeft = 0;
    const raf = requestAnimationFrame(check);
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check, filter]);

  const geser = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const kartu = el.firstElementChild as HTMLElement | null;
    const jarak = kartu ? kartu.offsetWidth + 20 : 400;
    el.scrollBy({ left: dir * jarak, behavior: "smooth" });
  };

  const tombol =
    "absolute top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-lg backdrop-blur transition hover:scale-105 disabled:pointer-events-none disabled:opacity-0 md:flex";

  const nomor = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-10">
      {/* Tab filter */}
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap gap-3 px-6 md:px-10">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition ${
              filter === t.id
                ? "border-white bg-white text-black"
                : "border-white/25 text-white/70 hover:border-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        {/* Tombol kiri: di ujung kiri */}
        <button
          type="button"
          onClick={() => geser(-1)}
          disabled={!canPrev}
          aria-label="Layanan sebelumnya"
          className={`${tombol} left-4 lg:left-6`}
        >
          &larr;
        </button>

        {/* Tombol kanan: di ujung kanan */}
        <button
          type="button"
          onClick={() => geser(1)}
          disabled={!canNext}
          aria-label="Layanan berikutnya"
          className={`${tombol} right-4 lg:right-6`}
        >
          &rarr;
        </button>

        <div
          key={filter}
          ref={ref}
          className="flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 md:scroll-pl-10 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((item, i) => (
            <Reveal
              key={`${filter}-${item.foto}`}
              delay={i * 120}
              className="shrink-0 snap-start"
            >
              <article className="relative flex h-[380px] min-w-[85vw] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 p-7 sm:min-w-[420px] md:h-[420px] md:min-w-[460px] md:p-8">
                <CardPhoto src={`/layanan/${item.foto}`} label={item.foto} />

                <div className="relative">
                  <h3 className="font-serif text-3xl leading-tight md:text-5xl">
                    {item.nama}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Counter dan progress */}
      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-5 px-6 md:px-10">
        <span className="font-serif text-sm tabular-nums text-white/70">
          {nomor(Math.min(active + 1, shown.length))} / {nomor(shown.length)}
        </span>
        <div className="h-px flex-1 bg-white/15">
          <div
            className="h-px bg-white transition-all duration-500"
            style={{
              width: `${((active + 1) / Math.max(shown.length, 1)) * 100}%`,
            }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 md:hidden">
          Geser &rarr;
        </span>
      </div>
    </div>
  );
}