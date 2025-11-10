import React, { use } from "react";
import { Link } from "react-router";

const ActiveChallenge = ({ activeChallengePrm }) => {
  const challenges = use(activeChallengePrm);

  return (
    <section className="py-10 px-4 md:px-10 w-full md:w-11/12 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
        Active Challenges
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {challenges.slice(0, 6).map((challenge, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105"
          >
            {/* Image with hover zoom and gradient overlay */}
            <div className="relative overflow-hidden">
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Overlay with blur and lift */}
            <div className="absolute bottom-0 w-full p-5 bg-white/20 backdrop-blur-md text-gray-800 transition-all duration-500 hover:translate-y-[-10px]">
              <h3 className="text-lg font-semibold">{challenge.title}</h3>
              <p className="text-sm mt-1">{challenge.category}</p>
              <p className="text-sm font-medium mt-2">
                {challenge.impactMetric}: {challenge.target || "N/A"}
              </p>

              {/* Join Button inside card */}
              <button className="mt-4 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full text-sm font-semibold text-gray-800 hover:bg-white/50 transition duration-300 hover:cursor-pointer">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Challenges Button */}
      <div className="flex justify-center mt-10">
        <Link to={"/challenges"}>
          {" "}
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            View All Challenges
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ActiveChallenge;
