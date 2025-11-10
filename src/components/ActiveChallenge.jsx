import React, { use } from "react";
import { Link } from "react-router";

const ActiveChallenge = ({ activeChallengePrm }) => {
  const challenges = use(activeChallengePrm);

  return (
    <section className="py-16 px-4 md:px-10 w-full md:w-11/12 mx-auto  text-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-emerald-300 text-center drop-shadow-md">
        Active Challenges
      </h2>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {challenges.slice(0, 6).map((challenge, idx) => (
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
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Blurry info section */}
            <div className="absolute bottom-0 w-full p-4 sm:p-5 bg-white/15 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 group-hover:translate-y-[-8px]">
              <h3 className="text-base sm:text-lg font-semibold text-emerald-300 truncate">
                {challenge.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
                {challenge.category}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-200 mt-2 truncate">
                {challenge.impactMetric}:{" "}
                <span className="text-emerald-400">
                  {challenge.target || "N/A"}
                </span>
              </p>

              {/* Details Button */}
              <Link to={`/challengesDetail/${challenge._id}`}>
                <button className="mt-3 px-4 sm:px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold rounded-full text-white hover:bg-white/20 hover:scale-105 transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Challenges Button */}
      <div className="flex justify-center mt-10 md:mt-14">
        <Link to="/challenges">
          <button className="px-6 md:px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-transform duration-300">
            View All Challenges
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ActiveChallenge;
