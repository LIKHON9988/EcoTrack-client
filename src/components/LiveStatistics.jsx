import React, { useEffect, useState } from "react";

const LiveStatistics = () => {
  const [totalChallenges, setTotalChallenges] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch(
          "https://eco-track-server-nine.vercel.app/challenges"
        );
        const data = await res.json();
        setTotalChallenges(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
        setTotalChallenges(0);
      }
    };

    fetchChallenges();
    const interval = setInterval(fetchChallenges, 10000);
    const onFocus = () => fetchChallenges();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const cards = [
    {
      label: "Green Commute Week",
      value: 4089,
      desc: "Carpool, transit, or on foot—choose the greener route.",
    },
    {
      label: "Bike-to-Work Month",
      value: 3670,
      desc: "Pedal-powered commutes that cut carbon and boost health.",
    },
    {
      label: "Water-Wise Week",
      value: 7895,
      desc: "Every drop counts—join mindful use for seven days.",
    },
    {
      label: "Active Challenges",
      value: totalChallenges,
      desc: "Explore every challenge—live and archived—in our catalog.",
    },
  ];

  return (
    <section className="py-10 md:py-12 px-4 md:px-10 text-gray-100">
      <div className="w-full md:max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-center mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          Live Community Statistics
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Together we’re building a cleaner, greener future
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="relative bg-white/5 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-[0_8px_30px_-10px_rgba(16,185,129,0.35)] p-6 text-center"
            >
              <p className="text-sm text-gray-300">{c.label}</p>

              <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-center">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {c.value == null ? "—" : c.value.toLocaleString()}
                </span>
              </h3>

              <div className="mt-3 h-px w-full bg-gradient-to-r from-emerald-500/30 via-emerald-300/20 to-teal-400/30" />
              <p className="mt-2 text-xs text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStatistics;
