import { useEffect, useRef, type ReactNode } from "react";
import florals from "@/assets/florals.png";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Petals({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDuration: `${9 + (i % 5) * 2}s`,
            animationDelay: `${(i * 1.3) % 9}s`,
            ["--drift" as string]: `${(i % 2 ? -1 : 1) * (30 + (i % 4) * 20)}px`,
            transform: `scale(${0.7 + (i % 3) * 0.25})`,
          }}
        />
      ))}
    </div>
  );
}

export function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 -scale-x-100",
    bl: "left-0 bottom-0 -scale-y-100",
    br: "right-0 bottom-0 -scale-100",
  } as const;
  return (
    <img
      src={florals}
      alt=""
      aria-hidden
      loading="lazy"
      width={1024}
      height={1024}
      className={`pointer-events-none absolute w-36 opacity-90 sm:w-52 md:w-64 ${map[pos]}`}
    />
  );
}

export function Ornament() {
  return (
    <div aria-hidden className="mx-auto my-3 flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-16 bg-gold/70" />
      <span className="text-lg">❦</span>
      <span className="h-px w-16 bg-gold/70" />
    </div>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-center font-script text-5xl leading-tight text-primary sm:text-6xl">{children}</h2>;
}
