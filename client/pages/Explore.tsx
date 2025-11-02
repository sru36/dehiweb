import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, recordDonationIntent } from "@/utils/auth";
import { useDonationModal } from "@/components/DonationModal";

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const navigate = useNavigate();
  const { open } = useDonationModal();

  // Start auto-play after ensuring first image loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotation for banners
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [banners.length, autoPlayInterval, isAutoPlaying]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % banners.length);

  const handleDonateClick = (banner: Banner) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const cause =
      banner.link && banner.link.includes("cause=")
        ? decodeURIComponent(banner.link.split("cause=")[1])
        : undefined;

    recordDonationIntent({
      id: banner.id,
      title: banner.title,
      amount: undefined,
      cause,
      source: "banner",
    });

    open({
      id: banner.id,
      title: banner.title,
      amount: undefined,
      source: "banner",
    });
  };

  return (
    <section className="relative w-full h-[520px] overflow-hidden bg-black">
      {/* Banner Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0 w-full h-full relative flex items-center justify-center bg-black"
          >
            {/* Banner Image */}
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover md:object-contain lg:object-cover transition-transform duration-700"
              loading="eager"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/800x600?text=Image+Unavailable")
              }
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20 z-10">
              <div className="max-w-2xl text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 whitespace-pre-line">
                  {banner.title}
                </h2>

                {banner.description && (
                  <p className="text-lg text-white/90 mb-6">
                    {banner.description}
                  </p>
                )}

                <button
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  onClick={() => handleDonateClick(banner)}
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preload Images */}
      {banners.map((banner) => (
        <link key={banner.id} rel="preload" as="image" href={banner.imageUrl} />
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
        aria-label="Next banner"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-500 w-8"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
