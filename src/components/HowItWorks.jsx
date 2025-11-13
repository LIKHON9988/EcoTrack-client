import React from "react";
import { Flag, BarChart3, Megaphone } from "lucide-react";

const steps = [
  {
    icon: Flag,
    title: "Join a challenge",
    desc: "Pick a mission that fits your lifestyle and start today.",
  },
  {
    icon: BarChart3,
    title: "Track progress",
    desc: "Monitor your impact and stay motivated with milestones.",
  },
  {
    icon: Megaphone,
    title: "Share tips",
    desc: "Post your learnings and inspire others in the community.",
  },
];

const bgImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a26db0f5c2bb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
];

const HowItWorks = () => {
  return (
    <section className="py-14 md:py-16 px-4 md:px-10 text-gray-100">
      <div className="w-full md:w-11/12 mx-auto">
        <h2 className="text-2xl md:text-3xl text-center mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.35)] p-6 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-center bg-cover opacity-35 ${
                  idx % 3 === 0 ? "blur-sm" : idx % 3 === 1 ? "blur" : "blur-md"
                }`}
                style={{
                  backgroundImage: `url(${bgImages[idx % bgImages.length]})`,
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <s.icon size={28} className="text-emerald-400" />
                  <h3 className="text-lg font-semibold text-emerald-300">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm md:text-base text-gray-200">
                  {s.desc}
                </p>
                <div className="absolute inset-0 pointer-events-none rounded-2xl border border-emerald-400/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
