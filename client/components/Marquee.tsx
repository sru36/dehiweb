import React from "react";
import "@/components/Marquee.css";

export interface MarqueeItem {
  link: string;
  text: string;
}

export interface MarqueeProps {
  items: MarqueeItem[];
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 5,
}) => {
  return (
    <div
      className={`group flex overflow-hidden p-2 ${
        vertical ? "flex-col" : "flex-row"
      }`}
      style={
        {
          "--duration": "10s",
          "--gap": "1rem",
          gap: "var(--gap)",
        } as React.CSSProperties
      }
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around gap-[var(--gap)] ${
            vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee"
          } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${
            reverse ? "![animation-direction:reverse]" : ""
          }`}
        >
          {items.map((item, index) => (
            <a key={index} href={item.link} className="text-sm font-medium">
              {item.text}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
