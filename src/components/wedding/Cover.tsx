import { useState } from "react";
import cover from "@/assets/cover.jpg.asset.json";
import { Petals } from "./shared";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };
  const half = (side: "left" | "right") => ({
    backgroundImage: `url(${cover.url})`,
    backgroundSize: "200% 100%",
    backgroundPosition: side === "left" ? "0% 50%" : "100% 50%",
    transformOrigin: side === "left" ? "left center" : "right center",
    transform: opening ? `perspective(1400px) rotateY(${side === "left" ? 105 : -105}deg)` : "none",
    transition: "transform 1.8s cubic-bezier(.7,0,.2,1), opacity 1.8s ease",
    opacity: opening ? 0 : 1,
  });
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
      style={{ opacity: opening ? 0 : 1, transition: "opacity 0.9s ease 1.6s", pointerEvents: opening ? "none" : "auto" }}
    >
      <div className="absolute inset-0 scale-110 bg-cover bg-center opacity-40 blur-2xl" style={{ backgroundImage: `url(${cover.url})` }} />
      <button
        type="button"
        onClick={open}
        aria-label="Tap to open the wedding invitation"
        className="relative flex h-[min(100svh,calc(100vw*1.415))] w-[min(100vw,calc(100svh/1.415))] focus:outline-none"
      >
        <span className="h-full w-1/2" style={half("left")} />
        <span className="h-full w-1/2" style={half("right")} />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto h-1/2 w-1/2 rounded-full bg-gold-light blur-3xl"
          style={{ opacity: opening ? 0.9 : 0, transition: "opacity 1s ease" }}
        />
        {!opening && <span className="glow-pulse absolute bottom-[14%] left-1/2 h-10 w-40 -translate-x-1/2 rounded-full bg-gold-light/30 blur-xl" />}
      </button>
      <Petals count={opening ? 26 : 10} />
    </div>
  );
}
