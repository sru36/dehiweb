import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  pauseOnHover?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  repeat?: number;
  duration?: number;
  gap?: number;
}

export function Carousel({
  children,
  pauseOnHover = false,
  vertical = false,
  reverse = false,
  repeat = 4,
  duration = 30,
  gap = 16,
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const style = container.style as any;
    style.setProperty("--duration", `${duration}s`);
    style.setProperty("--gap", `${gap}px`);
  }, [duration, gap]);

  return (
    <div
      ref={containerRef}
      className={`group flex overflow-hidden p-2 [--duration:${duration}s] [--gap:${gap}px] [gap:var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      }`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee"
          } ${isPaused ? "[animation-play-state:paused]" : ""} ${
            reverse ? "![animation-direction:reverse]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
