import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDonateRedirect } from "@/utils/auth";

interface Banner {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoPlayInterval?: number;
}

export function BannerCarousel({
  banners,
  autoPlayInterval = 5000,
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [banners.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full h-[520px] overflow-hidden">
      {/* Banner Container with sliding animation */}
      <div className="relative w-full h-full">
        <div
          className="flex h-full transition-transform duration-2000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${banners.length * 100}%`,
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="flex-shrink-0 h-full w-full"
            >
            <div className="relative w-full h-full flex">
              {/* Left Section - Text Content with Dark Overlay */}
              <div className="relative w-full md:w-1/2 h-full bg-gradient-to-r from-black/80 via-black/70 to-black/60 flex items-center px-4 md:px-8 lg:px-12">
                <div className="max-w-lg z-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                    {banner.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < banner.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  {banner.description && (
                    <p className="text-lg text-white/90 mb-6">
                      {banner.description}
                    </p>
                  )}
                  <Link to={getDonateRedirect()}>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-lg"
                    >
                      Donate now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        aria-label="Next banner"
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

