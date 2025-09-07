import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "SimpleWood Chair Collection",
      subtitle:
        "Find hand-curated collections that fit your style, space, and budget.",
      buttonText: "SHOP NOW",
      images: ["/hero1.svg", "/hero2.svg", "/hero3.svg"],
    },
    {
      id: 2,
      title: "SimpleWood Chair Collection",
      subtitle:
        "Find hand-curated collections that fit your style, space, and budget.",
      buttonText: "SHOP NOW",
      images: ["/hero1.svg", "/hero2.svg", "/hero3.svg"],
    },
    {
      id: 3,
      title: "SimpleWood Chair Collection",
      subtitle:
        "Find hand-curated collections that fit your style, space, and budget.",
      buttonText: "SHOP NOW",
      images: ["/hero1.svg", "/hero2.svg", "/hero3.svg"],
    },
  ];

  return (
    <div
      className="relative min-h-[75vh] md:min-h-[80vh] lg:h-screen"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(/herobg.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 h-full flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center w-full pt-20 md:pt-24">
                {/* Left content */}
                <div className="text-white space-y-5 md:space-y-6">
                  <h1 className="font-bold leading-tight text-[clamp(1.75rem,6vw,3.375rem)]">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 w-full md:w-4/5 max-w-[52ch]">
                    {slide.subtitle}
                  </p>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 rounded font-semibold transition-colors duration-300">
                    {slide.buttonText}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Right images grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md md:max-w-lg md:ml-auto p-4 md:p-8">
                  {slide.images.map((image, index) => {
                    const base =
                      "rounded-lg overflow-hidden shadow-lg group will-change-transform";
                    const mobileShape =
                      index === 0
                        ? "col-span-2 aspect-[16/9]"
                        : "aspect-square";
                    const desktopShape =
                      index === 0
                        ? "md:col-span-1 md:row-span-2 md:aspect-[3/4]"
                        : "md:aspect-[3/4]";
                    return (
                      <div
                        key={index}
                        className={`${base} ${mobileShape} ${desktopShape}`}
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
