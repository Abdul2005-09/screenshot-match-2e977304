import { useEffect, useRef, useState } from "react";
import venue from "@/assets/venue.jpg";
import { photos } from "./photos";
import { Corner, Heading, Ornament, Petals, Reveal } from "./shared";

const watercolor = "sepia(0.25) saturate(1.1) contrast(0.95) brightness(1.03)";

export function Story() {
  const rot = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];
  return (
    <section className="parchment relative overflow-hidden px-5 py-20">
      <Corner pos="tr" />
      <Reveal>
        <Heading>Our Story in Frames</Heading>
        <Ornament />
        <p className="text-center font-script text-3xl text-gold">Two Hearts, One Journey</p>
        <p className="mx-auto mt-3 max-w-md text-center font-serif text-lg italic text-muted-foreground">
          From shared dreams to a lifetime together, our story continues with your blessings.
        </p>
      </Reveal>
      <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={i * 150} className={i % 2 ? "mt-10" : ""}>
            <figure className={`${rot[i]} bg-ivory p-2 pb-8 shadow-paper transition duration-500 hover:rotate-0 hover:scale-105`}>
              <img src={p.src} alt={`Dhyaani and Vinotha — ${p.caption}`} loading="lazy" className="aspect-[3/4] w-full object-cover" style={{ filter: watercolor }} />
              <figcaption className="mt-2 text-center font-script text-xl text-primary">{p.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Venue() {
  return (
    <section className="parchment relative overflow-hidden px-5 py-20">
      <Reveal>
        <p className="text-center font-display text-sm tracking-[0.4em] text-gold">THE</p>
        <Heading>Royal Mahal</Heading>
        <p className="mt-1 text-center font-serif text-lg text-muted-foreground">Vayalur, Trichy, Tamil Nadu, India</p>
        <Ornament />
      </Reveal>
      <Reveal delay={150} className="relative mx-auto mt-6 max-w-5xl">
        <div className="rounded-xl border border-gold/60 bg-ivory p-2 shadow-paper">
          <img src={venue} alt="Watercolor illustration of The Royal Mahal" loading="lazy" width={1536} height={864} className="w-full rounded-lg" />
        </div>
        <Corner pos="bl" />
      </Reveal>
      <Reveal delay={250} className="relative mx-auto mt-8 max-w-xl text-center">
        <p className="font-serif text-lg italic">
          A grand setting for a beautiful beginning. Join us as we celebrate love, family and new beginnings at The Royal Mahal.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=The%20Royal%20Mahal%2C%20Vayalur%2C%20Trichy%2C%20Tamil%20Nadu%2C%20India"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm tracking-widest text-primary-foreground shadow-paper transition hover:opacity-90"
        >
          📍 Get Directions
        </a>
      </Reveal>
    </section>
  );
}

const TARGET = Date.parse("2026-11-22T10:00:00+05:30");
export function getRemaining(now: number) {
  const d = Math.max(0, TARGET - now);
  return {
    done: d === 0,
    days: Math.floor(d / 86400000),
    hours: Math.floor(d / 3600000) % 24,
    minutes: Math.floor(d / 60000) % 60,
    seconds: Math.floor(d / 1000) % 60,
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const r = getRemaining(now ?? TARGET - 1);
  return (
    <section className="parchment relative overflow-hidden px-5 py-20">
      <Corner pos="tl" />
      <Corner pos="br" />
      <Reveal>
        <Heading>Countdown to Our Muhurtham</Heading>
        <Ornament />
      </Reveal>
      {r.done && now ? (
        <p className="relative text-center font-script text-4xl text-primary">The auspicious moment has arrived — thank you for celebrating with us!</p>
      ) : (
        <Reveal className="relative mx-auto mt-6 grid max-w-2xl grid-cols-4 gap-3 sm:gap-6">
          {(["days", "hours", "minutes", "seconds"] as const).map((k) => (
            <div key={k} className="bg-gold-shine rounded-full p-[2px] shadow-paper">
              <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-ivory">
                <span className="font-display text-2xl text-primary tabular-nums sm:text-4xl">{now ? String(r[k]).padStart(2, "0") : "--"}</span>
                <span className="font-serif text-xs capitalize text-muted-foreground sm:text-sm">{k}</span>
              </div>
            </div>
          ))}
        </Reveal>
      )}
    </section>
  );
}

export function Gallery() {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const n = photos.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  return (
    <section className="parchment relative overflow-hidden px-5 py-20">
      <Reveal>
        <Heading>Photo Gallery</Heading>
        <Ornament />
      </Reveal>
      <div
        className="relative mx-auto mt-6 flex h-[440px] max-w-3xl items-center justify-center sm:h-[520px]"
        onTouchStart={(e) => (startX.current = e.touches[0]!.clientX)}
        onTouchEnd={(e) => {
          if (startX.current == null) return;
          const dx = e.changedTouches[0]!.clientX - startX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        {photos.map((p, idx) => {
          const off = ((idx - i + n + 1) % n) - 1;
          const visible = Math.abs(off) <= 1;
          return (
            <button
              key={p.src}
              type="button"
              aria-label={`Enlarge photo: ${p.caption}`}
              tabIndex={off === 0 ? 0 : -1}
              onClick={() => (off === 0 ? setZoom(idx) : go(off))}
              className="absolute w-60 bg-ivory p-3 pb-10 shadow-paper transition-all duration-700 sm:w-72"
              style={{
                transform: `translateX(${off * 62}%) rotate(${off * 6}deg) scale(${off === 0 ? 1 : 0.82})`,
                zIndex: off === 0 ? 3 : 1,
                opacity: visible ? (off === 0 ? 1 : 0.7) : 0,
              }}
            >
              <img src={p.src} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" style={{ filter: watercolor }} />
              <span className="mt-2 block font-script text-2xl text-primary">{p.caption}</span>
            </button>
          );
        })}
        <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-primary-foreground shadow-paper">‹</button>
        <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full bg-primary text-xl text-primary-foreground shadow-paper">›</button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {photos.map((_, idx) => (
          <span key={idx} className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-gold/60"}`} />
        ))}
      </div>
      {zoom !== null && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4" onClick={() => setZoom(null)}>
          <figure className="max-h-full bg-ivory p-3 pb-6 shadow-paper">
            <img src={photos[zoom]!.src} alt={photos[zoom]!.caption} className="max-h-[78svh] w-auto object-contain" />
            <figcaption className="mt-2 text-center font-script text-2xl text-primary">{photos[zoom]!.caption}</figcaption>
          </figure>
          <button type="button" aria-label="Close" className="absolute right-4 top-4 text-3xl text-ivory">×</button>
        </div>
      )}
    </section>
  );
}

export function Closing() {
  return (
    <section className="parchment relative overflow-hidden px-5 pb-28 pt-20">
      <Petals count={12} />
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Reveal className="relative mx-auto max-w-md">
        <div className="float-soft mx-auto w-56 rounded-t-full border-4 border-gold/70 bg-ivory p-2 shadow-paper sm:w-64">
          <img src={photos[3]!.src} alt="Dhyaani and Vinotha" loading="lazy" className="aspect-[3/4] w-full rounded-t-full object-cover" style={{ filter: watercolor }} />
        </div>
      </Reveal>
      <Reveal delay={200} className="relative mt-10 text-center">
        <h2 className="font-script text-5xl leading-tight text-primary sm:text-6xl">Your Presence,<br />Our Greatest Blessing</h2>
        <Ornament />
        <p className="font-serif text-lg italic text-muted-foreground">With the blessings of our families, we begin forever.</p>
        <p className="mt-8 font-script text-4xl text-gold">Dhyaani &amp; Vinotha</p>
      </Reveal>
    </section>
  );
}

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause music" : "Play music"}
      aria-pressed={playing}
      className="fixed bottom-4 left-4 z-40 grid h-12 w-12 place-items-center rounded-full border-2 border-gold bg-primary text-xl text-primary-foreground shadow-paper"
    >
      <span className={playing ? "glow-pulse" : "opacity-60"}>{playing ? "♫" : "🔇"}</span>
    </button>
  );
}
