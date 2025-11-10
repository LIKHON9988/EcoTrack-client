import React from "react";
import { Link } from "react-router";

const challenges = [
  {
    _id: 1,
    title: "Zero Waste Week",
    category: "Sustainability",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    impactMetric: "Waste Reduced",
    target: "5 kg",
  },
];

const Challenges = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] text-white py-16 px-5">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          🌿 Eco Challenges
        </h1>
        <p className="text-gray-300 text-lg mt-3">
          Take part in impactful missions and help build a greener planet.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_15px_1px_rgba(16,185,129,0.35)] transition-transform duration-500 hover:scale-105 group"
          >
            {/* Top Image with hover zoom */}
            <div className="relative overflow-hidden">
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Blurry info section */}
            <div className="absolute bottom-0 w-full p-5 bg-white/15 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 group-hover:translate-y-[-6px]">
              <h3 className="text-lg font-semibold text-emerald-300 truncate">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1 truncate">
                {challenge.category}
              </p>
              <p className="text-sm font-medium text-gray-200 mt-2 truncate">
                {challenge.impactMetric}:{" "}
                <span className="text-emerald-400">
                  {challenge.target || "N/A"}
                </span>
              </p>

              {/* View Details Button */}
              <Link to={`/challengesDetail/${challenge._id}`}>
                <button className="mt-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold rounded-full text-white hover:bg-white/20 hover:scale-105 transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative floating lights */}
      <div className="absolute top-10 left-10 w-36 h-36 bg-emerald-400/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-400/20 blur-3xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default Challenges;
