import { useEffect, useRef, useState } from "react";
import { Corner, Heading, Ornament, Reveal } from "./shared";

function ScratchCard({ title, day, time }: { title: string; day: string; time: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#a8813a");
    g.addColorStop(0.45, "#f1d996");
    g.addColorStop(0.7, "#b38a3f");
    g.addColorStop(1, "#e8c97a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1.5, 1.5);
    }
    ctx.fillStyle = "#5a1a22";
    ctx.font = "600 15px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", rect.width / 2, rect.height / 2 + 5);
  }, []);

  const scratch = (x: number, y: number) => {
    const c = canvasRef.current;
    if (!c || done) return;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - r.left, y - r.top, 22, 0, Math.PI * 2);
    ctx.fill();
  };
  const check = () => {
    const c = canvasRef.current;
    if (!c || done) return;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    if (clear / (data.length / 64) > 0.5) setDone(true);
  };

  return (
    <div className="relative rounded-lg border border-gold/60 bg-card/80 p-1 shadow-paper">
      <div className="rounded-md border border-gold/40 px-6 py-8 text-center">
        <h3 className="font-script text-4xl text-primary">{title}</h3>
        <Ornament />
        <p className="font-serif text-xl text-foreground">{day}</p>
        <p className="mt-1 font-display text-sm tracking-widest text-muted-foreground">{time}</p>
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] cursor-grab touch-none rounded-md"
        style={{ opacity: done ? 0 : 1, transition: "opacity .8s ease", pointerEvents: done ? "none" : "auto" }}
        onPointerDown={(e) => {
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratch(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
        onPointerUp={() => {
          drawing.current = false;
          check();
        }}
        onPointerCancel={() => (drawing.current = false)}
      />
      {!done && (
        <button type="button" onClick={() => setDone(true)} className="sr-only focus:not-sr-only focus:absolute focus:bottom-2 focus:left-1/2 focus:-translate-x-1/2 focus:rounded focus:bg-primary focus:px-3 focus:py-1 focus:text-primary-foreground">
          Reveal {title} date
        </button>
      )}
    </div>
  );
}

export function Dates() {
  const [key, setKey] = useState(0);
  const [all, setAll] = useState(false);
  return (
    <section className="parchment relative overflow-hidden px-5 py-20">
      <Corner pos="tl" />
      <Corner pos="br" />
      <Reveal>
        <Heading>Our Special Dates</Heading>
        <Ornament />
        <p className="text-center font-serif italic text-muted-foreground">Scratch the golden cards to uncover our celebrations</p>
      </Reveal>
      <Reveal className="relative mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2" delay={150}>
        {all ? (
          <>
            <RevealedCard title="Reception" day="Saturday, 21 November 2026" time="6:00 PM onwards" />
            <RevealedCard title="Muhurtham" day="Sunday, 22 November 2026" time="10:00 AM – 11:50 AM" />
          </>
        ) : (
          <>
            <ScratchCard key={`r${key}`} title="Reception" day="Saturday, 21 November 2026" time="6:00 PM onwards" />
            <ScratchCard key={`m${key}`} title="Muhurtham" day="Sunday, 22 November 2026" time="10:00 AM – 11:50 AM" />
          </>
        )}
      </Reveal>
      {!all && (
        <div className="relative mt-8 text-center">
          <button type="button" onClick={() => { setAll(true); setKey(key + 1); }} className="rounded-full bg-primary px-6 py-2.5 font-display text-sm tracking-widest text-primary-foreground shadow-paper transition hover:opacity-90">
            Reveal Dates
          </button>
        </div>
      )}
    </section>
  );
}

function RevealedCard({ title, day, time }: { title: string; day: string; time: string }) {
  return (
    <div className="rounded-lg border border-gold/60 bg-card/80 p-1 shadow-paper">
      <div className="rounded-md border border-gold/40 px-6 py-8 text-center">
        <h3 className="font-script text-4xl text-primary">{title}</h3>
        <Ornament />
        <p className="font-serif text-xl">{day}</p>
        <p className="mt-1 font-display text-sm tracking-widest text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
