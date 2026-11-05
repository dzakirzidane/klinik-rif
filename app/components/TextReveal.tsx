"use client";

import { createElement, useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

export default function TextReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setShown(true);
        } else if (!entry.isIntersecting) {
          // keluar layar: reset supaya bisa diputar lagi
          setShown(false);
        }
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let idx = 0;
  const lines = text.split("\n").map((line, li) =>
    createElement(
      "span",
      { key: li, className: "block" },
      line.split(" ").map((word, wi) => {
        const i = idx++;
        const wait = delay + i * 90;
        return createElement(
          "span",
          {
            key: wi,
            "aria-hidden": true,
            className:
              "mr-[0.25em] inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom",
          },
          createElement(
            "span",
            {
              className: "inline-block origin-bottom will-change-transform",
              style: {
                transform: shown
                  ? "translateY(0) rotateX(0deg)"
                  : "translateY(115%) rotateX(-75deg)",
                opacity: shown ? 1 : 0,
                transition: shown
                  ? `transform 1200ms cubic-bezier(0.22,1,0.36,1) ${wait}ms, opacity 900ms ease ${wait}ms`
                  : "transform 400ms ease 0ms, opacity 300ms ease 0ms",
              },
            },
            word
          )
        );
      })
    )
  );

  return createElement(
    as,
    {
      ref,
      className,
      "aria-label": text.replace("\n", " "),
      style: { perspective: "900px" },
    },
    lines
  );
}