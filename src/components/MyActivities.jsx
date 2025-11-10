import React from "react";
import { Leaf, Clock, Award } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Plastic-Free Week",
    description: "Avoid single-use plastics for 7 days.",
    progress: 70,
    daysLeft: 2,
  },
];

const MyActivities = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] pt-30 pb-10 px-4 text-gray-100">
      <div className="absolute -top-16 -left-16 w-40 h-40 md:w-64 md:h-64 bg-emerald-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-16 -right-16 w-52 h-52 md:w-80 md:h-80 bg-green-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
          🌱 My Eco Activities
        </h1>
        <p className="text-gray-300 text-lg">
          Track your progress and celebrate your positive impact on the planet!
        </p>
      </div>

      {/* Activity Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] transition transform hover:-translate-y-1 duration-300 p-6"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-emerald-400">
                {activity.title}
              </h2>
              <Leaf className="text-emerald-500" />
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4">{activity.description}</p>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    activity.progress === 100
                      ? "bg-green-500"
                      : "bg-emerald-400"
                  }`}
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Progress: {activity.progress}%
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={16} />
                {activity.daysLeft > 0 ? (
                  <span>{activity.daysLeft} days left</span>
                ) : (
                  <span className="text-green-400 flex items-center gap-1">
                    <Award size={16} /> Completed
                  </span>
                )}
              </div>

              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activity.progress === 100
                    ? "bg-green-900/40 text-green-400 cursor-default"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {activity.progress === 100 ? "Done" : "Continue"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyActivities;
