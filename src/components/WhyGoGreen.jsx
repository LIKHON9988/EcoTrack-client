import React from "react";
import { Leaf, Recycle, Droplets, Sun } from "lucide-react";

const bullets = [
  {
    icon: Leaf,
    title: "Cleaner Air",
    text: "Reduce emissions and improve the air we breathe.",
  },
  {
    icon: Recycle,
    title: "Less Waste",
    text: "Promote reuse and recycling to minimize waste.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    text: "Protect water resources and preserve ecosystems.",
  },
  {
    icon: Sun,
    title: "Energy Efficiency",
    text: "Save energy and lower your environmental footprint.",
  },
];

const WhyGoGreen = () => {
  return (
    <section className="py-12 px-4 md:px-12 text-center bg-[#020d08] text-white">
      <div className="max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-emerald-400">
          Why Go Green?
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Embracing green practices isn’t just good for the planet—it’s good for
          our communities, health, and future. From cleaner air to energy
          savings, small actions can create a big impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {bullets.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center gap-3 group"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-emerald-400 group-hover:bg-emerald-400/20 transition-colors duration-300">
              <item.icon
                size={26}
                className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-10 text-gray-400 text-base md:text-lg leading-relaxed">
        <p>
          Going green is more than a choice—it’s a commitment to future
          generations. Every step we take today contributes to a healthier,
          sustainable, and thriving world.
        </p>
      </div>
    </section>
  );
};

export default WhyGoGreen;
