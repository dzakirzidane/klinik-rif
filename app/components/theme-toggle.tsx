"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const OPSI = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // placeholder biar layout navbar nggak geser pas loading
  if (!mounted) {
    return <div className="h-4 w-[92px]" aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-label="Pilih tema tampilan"
      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
    >
      {OPSI.map((o, i) => {
        const aktif = resolvedTheme === o.id;
        return (
          <div key={o.id} className="flex items-center gap-2">
            {i === 1 && <span className="h-3 w-px bg-ink/25" aria-hidden="true" />}
            <button
              type="button"
              onClick={() => setTheme(o.id)}
              aria-pressed={aktif}
              className={`relative pb-1 transition-opacity duration-300 ${
                aktif ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              {o.label}
              <span
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  aktif ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}