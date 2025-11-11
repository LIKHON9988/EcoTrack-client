import React, { useRef, useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Tree Planting Challenge",
    desc: "Reimagining innovation with sustainability at its heart.",
    image:
      "https://preview.redd.it/fall-in-the-smokies-3840x2160-v0-4smj0apwejhb1.png?width=1080&crop=smart&auto=webp&s=5435141c3dcb36fca8362de0471c9d80c166168d",
    btn: "Discover More",
  },
  {
    id: 2,
    title: "Technology for a Better Planet",
    desc: "Smart solutions designed to reduce impact and inspire change.",
    image:
      "https://i.pinimg.com/originals/e5/c8/03/e5c803a1f390a8bfb5f45abd8a055ba5.jpg",
    btn: "Learn More",
  },
  {
    id: 3,
    title: "Empower Your Green Vision",
    desc: "Together, we shape a sustainable, connected future.",
    image: "https://wallpaperaccess.com/full/270973.jpg",
    btn: "Join the Movement",
  },
];

const HeroPart = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5500
    );
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gray-900">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-[900ms] ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full flex-shrink-0 h-[50vh] md:h-[70vh]"
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out"
            />

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center  px-4 sm:px-6 md:px-16 lg:px-24">
              <div className="max-w-sm sm:max-w-md md:max-w-xl backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white animate-fadeIn">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-4 sm:mb-6">
                  {slide.desc}
                </p>
                <button className="btn btn-success rounded-full font-semibold px-4 sm:px-6 md:px-8 text-white hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
                  {slide.btn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Soft ambient gradient orbs */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-400/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />
    </section>
  );
};

export default HeroPart;
