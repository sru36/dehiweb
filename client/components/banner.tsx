import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoPlayInterval?: number;
}

export default function BannerCarousel({
  banners,
  autoPlayInterval = 10000,
}: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [banners.length, autoPlayInterval]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  const banner = banners[current];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background image */}
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Content */}
      <div className="relative z-10 text-white p-10 md:p-20 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 whitespace-pre-line">
          {banner.title}
        </h1>
        <p className="text-lg mb-6">{banner.description}</p>
        <Button
          onClick={() => navigate(banner.link)}
          className="bg-red-500 hover:bg-red-600 text-lg px-6 py-3 rounded-lg"
        >
          Donate now
        </Button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === current ? "bg-red-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}