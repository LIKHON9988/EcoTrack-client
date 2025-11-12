import React, { useEffect, useState } from "react";

const LiveStatistics = () => {
  // Dynamic stats from the challenges catalog
  const [stats, setStats] = useState({
    waterWise: null,
    bikeToWork: null,
    greenCommute: null,
    totalChallenges: null,
    loading: true,
  });

  useEffect(() => {
    const DEFAULTS = { green: 4000, bike: 3000, water: 7000, total: 12 };

    const deriveCount = (item) => {
      // Try common numeric fields
      const numericFields = [
        "joinCount",
        "participantsCount",
        "participantCount",
        "membersCount",
        "count",
      ];
      for (const f of numericFields) {
        const v = item?.[f];
        if (typeof v === "number" && v > 0) return v;
      }
      // Try array fields
      const arrayFields = ["participants", "joinedUsers", "members", "users"];
      for (const f of arrayFields) {
        const arr = item?.[f];
        if (Array.isArray(arr) && arr.length > 0) return arr.length;
      }
      return null; // unknown
    };

    const loadAll = async () => {
      try {
        const res = await fetch("http://localhost:3000/challenges");
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        const getTitle = (item) => String(item?.title || item?.name || "").toLowerCase();

        const waterList = list.filter((it) => {
          const t = getTitle(it);
          return t.includes("water") && t.includes("wise");
        });
        const waterCounts = waterList.map(deriveCount).filter((v) => typeof v === "number");
        const water = waterCounts.length ? waterCounts.reduce((a, b) => a + b, 0) : null;

        const bikeList = list.filter((it) => {
          const t = getTitle(it);
          return t.includes("bike") && (t.includes("work") || t.includes("month"));
        });
        const bikeCounts = bikeList.map(deriveCount).filter((v) => typeof v === "number");
        const bike = bikeCounts.length ? bikeCounts.reduce((a, b) => a + b, 0) : null;

        const greenList = list.filter((it) => {
          const t = getTitle(it);
          return t.includes("green commute") || t.includes("commute week");
        });
        const greenCounts = greenList.map(deriveCount).filter((v) => typeof v === "number");
        const green = greenCounts.length ? greenCounts.reduce((a, b) => a + b, 0) : null;

        const total = list.length;

        // Fallbacks for the three featured cards ONLY (requested values)
        const fallback = { water: DEFAULTS.water, bike: DEFAULTS.bike, green: DEFAULTS.green, total: DEFAULTS.total };

        setStats({
          // Order: Green Commute Week, Bike-to-Work Month, Water-Wise Week
          waterWise: water ?? fallback.water,
          bikeToWork: bike ?? fallback.bike,
          greenCommute: green ?? fallback.green,
          totalChallenges: total > 0 ? total : fallback.total,
          loading: false,
        });
      } catch (err) {
        console.log("Failed to load challenges for live stats", err);
        // Provide fallbacks on error (requested values for the first three, normal for active)
        setStats({
          waterWise: DEFAULTS.water,
          bikeToWork: DEFAULTS.bike,
          greenCommute: DEFAULTS.green,
          totalChallenges: 18,
          loading: false,
        });
      }
    };
    loadAll();
    const interval = setInterval(loadAll, 10000); // refresh every 10s to reflect joins/cancels
    const onFocus = () => loadAll();
    window.addEventListener("focus", onFocus);
    const normalize = (t) => String(t || "").toLowerCase();
    const mapToKey = (title) => {
      const t = normalize(title);
      if (t.includes("green commute") || (t.includes("commute") && t.includes("week"))) return "greenCommute";
      if (t.includes("bike") && (t.includes("work") || t.includes("month"))) return "bikeToWork";
      if (t.includes("water") && t.includes("wise")) return "waterWise";
      return null;
    };
    const onJoined = (e) => {
      const key = mapToKey(e?.detail?.title);
      if (!key) return;
      setStats((prev) => ({
        ...prev,
        [key]: typeof prev[key] === "number" ? prev[key] + 1 : 1,
      }));
    };
    const onCanceled = (e) => {
      const key = mapToKey(e?.detail?.title);
      if (!key) return;
      setStats((prev) => ({
        ...prev,
        [key]: typeof prev[key] === "number" && prev[key] > 0 ? prev[key] - 1 : 0,
      }));
    };
    window.addEventListener("eco:challenge-joined", onJoined);
    window.addEventListener("eco:challenge-canceled", onCanceled);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("eco:challenge-joined", onJoined);
      window.removeEventListener("eco:challenge-canceled", onCanceled);
    };
  }, []);

  const cards = [
    {
      label: "Green Commute Week",
      value: stats.loading ? null : stats.greenCommute,
      suffix: "",
      desc: "Carpool, transit, or on foot—choose the greener route.",
    },
    {
      label: "Bike-to-Work Month",
      value: stats.loading ? null : stats.bikeToWork,
      suffix: "",
      desc: "Pedal-powered commutes that cut carbon and boost health.",
    },
    {
      label: "Water-Wise Week",
      value: stats.loading ? null : stats.waterWise,
      suffix: "",
      desc: "Every drop counts—join mindful use for seven days.",
    },
    {
      label: "Active Challenges",
      value: stats.loading ? null : stats.totalChallenges,
      suffix: "",
      desc: "Explore every challenge—live and archived—in our catalog.",
    },
  ];

  return (
    <section className="py-10 md:py-12 px-4 md:px-10 text-gray-100">
      <div className="w-full md:w-11/12 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-emerald-300 text-center drop-shadow-md">
          Live Community Statistics
        </h2>
        <p className="text-center text-gray-300 mb-6">Together we’re building a cleaner, greener future</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <div
              key={idx}
              className="relative bg-white/5 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-[0_8px_30px_-10px_rgba(16,185,129,0.35)] p-6 text-center"
            >
              <p className="text-sm text-gray-300">{c.label}</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-center">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {c.value == null ? "—" : Math.round(c.value).toLocaleString()}
                </span>
                <span className="text-base md:text-lg text-emerald-200">{c.suffix}</span>
              </h3>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-emerald-500/30 via-emerald-300/20 to-teal-400/30" />
              <p className="mt-2 text-xs text-gray-400 text-center">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStatistics;