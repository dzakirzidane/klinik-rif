import Image from "next/image";
import Reveal from "./components/Reveal";
import TextReveal from "./components/TextReveal";
import HeroScroll from "./components/HeroScroll";
import HeroFrames from "./components/HeroFrames";
import ScrollWords from "./components/ScrollWords";
import ScrollProgress from "./components/ScrollProgress";
import ServiceSlider from "./components/ServiceSlider";
import { ThemeToggle } from "./components/theme-toggle";

const WA_LINK = "https://wa.me/6281288683282";
const IG_LINK = "https://www.instagram.com/klinikrif_official";
const ALAMAT =
  "Jl. Borobudur Raya No. 78, Perumnas 2, Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Klinik RIF " + ALAMAT
)}`;

const KUTIPAN =
  "“Merawat dengan ilmu, melayani dengan hati, dan menghargai setiap kehidupan.”";

const LAYANAN = [
  // Klinik Gigi (foto: layanan-1 sampai layanan-5)
  {
    kategori: "gigi" as const,
    foto: "layanan-1.jpg",
    nama: "Perawatan Preventif",
    desc: "Scaling dan pemeriksaan rutin untuk menjaga gigi dan gusi tetap sehat.",
  },
  {
    kategori: "gigi" as const,
    foto: "layanan-2.jpg",
    nama: "Estetika Gigi",
    desc: "Pemutihan dan perawatan estetik supaya senyum tampak lebih cerah.",
  },
  {
    kategori: "gigi" as const,
    foto: "layanan-3.jpg",
    nama: "Tambal & Restorasi",
    desc: "Perbaikan gigi berlubang atau rusak dengan hasil yang natural.",
  },
  {
    kategori: "gigi" as const,
    foto: "layanan-4.jpg",
    nama: "Perapian Gigi",
    desc: "Perawatan untuk merapikan susunan gigi secara bertahap.",
  },
  {
    kategori: "gigi" as const,
    foto: "layanan-5.jpg",
    nama: "Tindakan Bedah Minor",
    desc: "Pencabutan gigi dengan penanganan yang aman dan lembut.",
  },
  // Klinik Umum (foto: layanan-6 sampai layanan-9)
  {
    kategori: "umum" as const,
    foto: "layanan-6.jpg",
    nama: "Pemeriksaan Umum",
    desc: "Pemeriksaan kesehatan menyeluruh oleh dokter umum untuk keluhan sehari-hari.",
  },
  {
    kategori: "umum" as const,
    foto: "layanan-7.jpg",
    nama: "Konsultasi & Pengobatan",
    desc: "Konsultasi langsung dengan dokter dan pengobatan yang sesuai kebutuhanmu.",
  },
  {
    kategori: "umum" as const,
    foto: "layanan-8.jpg",
    nama: "Cek Kesehatan",
    desc: "Pengecekan rutin seperti tekanan darah dan pemantauan kondisi tubuh.",
  },
  {
    kategori: "umum" as const,
    foto: "layanan-9.jpg",
    nama: "Penanganan Luka & Tindakan Ringan",
    desc: "Perawatan luka dan tindakan medis ringan dengan peralatan yang steril.",
  },
];

export default function Home() {
  return (
    <main className="bg-cream text-ink">
      <ScrollProgress />

      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 bg-cream/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="#" className="font-serif text-2xl">
            Klinik RIF<span className="text-ink/40">.</span>
          </a>

          <ul className="hidden gap-10 text-[11px] uppercase tracking-[0.2em] md:flex">
            <li><a href="#filosofi" className="hover:opacity-60">Filosofi</a></li>
            <li><a href="#layanan" className="hover:opacity-60">Layanan</a></li>
            <li><a href="#klinik" className="hover:opacity-60">Klinik</a></li>
            <li><a href="#kontak" className="hover:opacity-60">Kontak</a></li>
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] hover:opacity-60"
            >
              Book Visit
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* HERO */}
      <HeroScroll className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Tulisan raksasa: geser ke kiri saat scroll */}
        <p
          style={{ transform: "translateX(calc(var(--p, 0) * -18vw))" }}
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-serif text-[26vw] uppercase leading-none text-ink/[0.06]"
        >
          Klinik RIF
        </p>

        {/* Dua bingkai video: mengecil dan turun saat scroll */}
        <div
          style={{
            transform:
              "translateY(calc(var(--p, 0) * 90px)) scale(calc(1 - var(--p, 0) * 0.2))",
          }}
          className="relative z-10 w-full pt-16"
        >
          <HeroFrames />
        </div>

        {/* Kartu: naik dan memudar saat scroll */}
        <div
          style={{
            transform: "translateY(calc(var(--p, 0) * -70px))",
            opacity: "calc(1 - var(--p, 0) * 1.6)",
          }}
          className="absolute bottom-24 right-6 z-20 hidden w-64 sm:block md:right-10"
        >
          <div className="animate-rise-delay rounded-xl bg-surface p-5 shadow-xl">
            <p className="font-serif text-lg leading-snug">
              Perawatan Terbaik untuk Kesehatanmu
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/60">
              Sehat Anda, bahagia kami.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-md bg-accent py-2.5 text-center text-[10px] uppercase tracking-[0.2em] text-accent-fg transition hover:opacity-80"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </HeroScroll>

      {/* FILOSOFI */}
      <section id="filosofi" className="bg-surface px-6 py-40 text-center">
        <Reveal variant="fade">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40">
            Filosofi Kami
          </p>
        </Reveal>
        <ScrollWords
          text={KUTIPAN}
          className="mx-auto mt-8 max-w-3xl font-serif text-3xl leading-snug md:text-5xl"
        />
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="bg-deep py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal variant="fade">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Layanan
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            text={"Perawatan\nPilihan"}
            delay={150}
            className="mt-4 font-serif text-4xl md:text-6xl"
          />
        </div>

        <ServiceSlider items={LAYANAN} />
      </section>

      {/* KLINIK */}
      <section id="klinik" className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Bingkai portrait 9:16, sesuai gambar ruang-klinik.jpg */}
          <Reveal
            variant="scale"
            className="mx-auto w-full max-w-[340px] md:ml-auto md:mr-0 md:max-w-[400px]"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-surface shadow-2xl">
              <Image
                src="/ruang-klinik.jpg"
                alt="Ruang praktik Klinik RIF yang bersih dan nyaman"
                fill
                sizes="(min-width: 768px) 400px, 340px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="text-center md:text-left">
            <Reveal variant="fade">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40">
                Fasilitas
              </p>
            </Reveal>
            <TextReveal
              as="h2"
              text="Ruang Klinik"
              delay={200}
              className="mt-4 font-serif text-5xl md:text-7xl"
            />
            <Reveal delay={600}>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/70 md:mx-0 md:text-base">
                Dirancang untuk memenuhi perhatian anda sepanjang waktu. Dengan
                kebersihan yang menyeluruh, peralatan yang steril, dan suasana yang
                nyaman di tiap kunjungan.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak">
        <div className="bg-surface px-6 py-32 text-center">
          <TextReveal
            as="h2"
            text="Siap Tersenyum?"
            className="font-serif text-5xl md:text-7xl"
          />
          <Reveal delay={500}>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-accent px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-accent-fg transition hover:opacity-80"
            >
              Book Your Visit
            </a>
          </Reveal>
        </div>

        <footer className="bg-deep px-6 py-16 text-white md:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
            <Reveal>
              <p className="font-serif text-2xl">
                Klinik RIF<span className="text-white/40">.</span>
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Klinik nyaman, serta menjunjung tinggi etika dan profesionalisme.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Kunjungi
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
                {ALAMAT}
              </p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-60"
              >
                Buka di Google Maps
              </a>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Hubungi
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60"
                  >
                    WhatsApp: 0812-8868-3282
                  </a>
                </li>
                <li>
                  <a
                    href={IG_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60"
                  >
                    Instagram: @klinikrif_official
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <p className="mx-auto mt-16 max-w-7xl text-xs text-white/30">
            © 2026 Klinik RIF. Semua hak dilindungi.
          </p>
        </footer>
      </section>

      {/* Tombol chat bulat */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg text-accent-fg shadow-lg transition hover:scale-110"
      >
        💬
      </a>
    </main>
  );
}