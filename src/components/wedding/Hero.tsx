import { useEffect, useRef } from "react";
import video from "@/assets/hero.mp4.asset.json";
import poster from "@/assets/poster.jpg.asset.json";
import { Petals } from "./shared";

export function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!active) return;
    v.muted = true;
    v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [active]);
  return (
    <section className="relative isolate flex h-[88svh] min-h-[560px] items-center justify-center overflow-hidden md:h-screen">
      <video
        ref={ref}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src={video.url}
        poster={poster.url}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/60" />
      <Petals count={10} />
      <div className="px-6 text-center text-ivory">
        <p className="text-glow mx-auto max-w-md font-serif text-base italic leading-relaxed sm:text-lg">
          Under aligned stars and with hearts united, two families become one as a beautiful new journey begins.
        </p>
        <p className="text-glow mt-6 font-display text-xs tracking-[0.35em] text-gold-light sm:text-sm">AWAITING YOUR GRACIOUS PRESENCE</p>
        <h1 className="mt-4 font-script leading-none">
          <span className="text-glow block text-7xl text-gold-light sm:text-8xl md:text-9xl">Dhyaani</span>
          <span className="text-glow my-2 block font-display text-sm tracking-[0.5em] text-ivory">WEDS</span>
          <span className="text-glow block text-7xl text-gold-light sm:text-8xl md:text-9xl">Vinotha</span>
        </h1>
      </div>
    </section>
  );
}
