import React from "react";
import { useLoaderData, Link } from "react-router";

const Details = () => {
  const challenge = useLoaderData();

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  const {
    title,
    category,
    description,
    duration,
    target,
    participants,
    impactMetric,
    createdBy,
    startDate,
    endDate,
    imageUrl,
  } = challenge;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] flex flex-col items-center py-12 px-4 md:px-6 overflow-hidden text-gray-100">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-[-8rem] left-[-8rem] w-[24rem] h-[24rem] bg-emerald-600/20 blur-[160px]  rounded-full" />
      <div className="absolute bottom-[-6rem] right-[-8rem] w-[26rem] h-[26rem] bg-green-500/10 blur-[180px] rounded-full" />

      {/* Main Card */}
      <div className="relative max-w-5xl w-full bg-white/5 backdrop-blur-2xl mt-13 shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)] rounded-[1.5rem] overflow-hidden border border-emerald-800/40">
        {/* Top Image */}
        <div className="relative h-52 sm:h-64 md:h-[45vh] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:left-6 text-white">
            <span className="inline-block mb-1 px-2 py-0.5 text-xs sm:text-sm rounded-full bg-white/20 backdrop-blur-md border border-white/20">
              {category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight drop-shadow-lg">
              {title}
            </h1>
          </div>
        </div>

        {/* Body with blurred background image */}
        <div
          className="relative grid md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {/* Deep blur + dark overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl brightness-75"></div>

          {/* Left Column */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6 relative z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-400">
              Challenge Overview 🌱
            </h2>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              {description}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {[
                { label: "Duration", value: `${duration} days` },
                { label: "Impact Metric", value: impactMetric },
                { label: "Target", value: target },
                { label: "Participants", value: participants },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-emerald-800/40 rounded-xl p-3 sm:p-4 hover:bg-white/15 transition backdrop-blur-md"
                >
                  <p className="text-xs sm:text-sm text-gray-400">
                    {item.label}
                  </p>
                  <h4 className="text-sm sm:text-lg font-semibold text-emerald-300">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Blurry Info Card) */}
          <div className="relative z-10 flex flex-col justify-between bg-white/10 backdrop-blur-2xl text-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden border border-white/10">
            {/* Soft glow background effect */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full"></div>

            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-emerald-300">
                Challenge Info
              </h3>
              <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">
                <span className="font-medium text-gray-300">Created by:</span>{" "}
                {createdBy}
              </p>
              <p className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">
                <span className="font-medium text-gray-300">Start:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-4">
                <span className="font-medium text-gray-300">End:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
            </div>

            <button className="mt-4 sm:mt-6 py-2 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md font-semibold text-white border border-white/30 hover:scale-105 shadow-md text-sm sm:text-base">
              Join Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-8 sm:mt-10">
        <Link
          to="/challenges"
          className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-transform text-sm sm:text-base"
        >
          ← Back to All Challenges
        </Link>
      </div>
    </section>
  );
};

export default Details;
