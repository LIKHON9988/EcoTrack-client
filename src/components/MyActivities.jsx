import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://eco-track-server-nine.vercel.app/activities?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleCancel = async (activity) => {
    const id = activity._id;
    await fetch(`https://eco-track-server-nine.vercel.app/activities/${id}`, {
      method: "DELETE",
    });
    setActivities((prev) => prev.filter((a) => a._id !== id));

    try {
      const title = activity?.challenge?.title;
      if (title) {
        window.dispatchEvent(
          new CustomEvent("eco:challenge-canceled", { detail: { title } })
        );
      }
    } catch (e) {
      console.warn("Event dispatch failed:", e);
    }
  };

  const renderEmptyState = () => (
    <div className="flex justify-center items-center col-span-full mt-10">
      <div className="bg-[#0b1a12]/50 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-emerald-500/20 text-center max-w-md">
        <h2 className="text-2xl font-bold text-emerald-300 mb-4">
          {user ? "No Activities Yet" : "Welcome!"}
        </h2>
        <p className="text-gray-300 mb-6">
          {user
            ? "You haven’t joined any eco challenges yet. Start participating to make a positive impact on the planet!"
            : "Please sign in to see your eco activities and track your progress."}
        </p>
        <a
          href={user ? "/challenges" : "/signIn"}
          className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/40 hover:scale-105 transition-transform duration-300"
        >
          {user ? "Explore Challenges" : "Sign In"}
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] pt-28 pb-16 px-4 text-gray-100 flex flex-col">
      <div className="w-11/12 mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          My Eco Activities
        </h1>
        <p className="text-gray-300 text-lg">
          Track your progress and celebrate your positive impact!
        </p>
      </div>

      <div className="w-full md:max-w-6xl  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {!user || activities.length === 0
          ? renderEmptyState()
          : activities.map((activity) => {
              const challenge = activity.challenge;
              const joinDate = new Date(
                activity.joinedAt || activity.createdAt
              );

              return (
                <div
                  key={challenge._id}
                  className="relative bg-[#0b1a12]/70 rounded-3xl shadow-lg backdrop-blur-md border border-emerald-500/20 hover:shadow-emerald-400/40 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] flex flex-col"
                >
                  {challenge.image && (
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-44 sm:h-48 md:h-52 object-cover rounded-t-3xl"
                    />
                  )}

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <h2 className="text-xl font-semibold text-emerald-300 line-clamp-1">
                      {challenge.title}
                    </h2>
                    <p className="text-sm text-gray-300">
                      {challenge.category}
                    </p>
                    <p className="text-sm text-gray-400">
                      Impact:{" "}
                      <span className="text-emerald-400">
                        {challenge.target}
                      </span>
                    </p>
                    <p className="text-sm text-gray-200 italic">
                      Joined by:{" "}
                      <span className="text-emerald-300 font-medium">
                        {user.name || user.email}
                      </span>
                    </p>

                    {joinDate && (
                      <p className="text-xs text-gray-400 mt-1">
                        Joined on:{" "}
                        <span className="text-emerald-400">
                          {joinDate.toLocaleDateString()}{" "}
                          {joinDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-400">
                        {challenge.duration
                          ? `${challenge.duration} days`
                          : "Ongoing"}
                      </p>
                      <button
                        onClick={() => handleCancel(activity)}
                        className="px-4 py-1 rounded-full text-sm font-medium bg-red-500/30 hover:bg-red-500/60 text-red-200 hover:text-white transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full blur-md animate-pulse"></div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default MyActivities;
