import React, { useEffect, useState } from "react";
import { ThumbsUp, User, CalendarDays } from "lucide-react";

const bgImages = [
  "https://cdn.mos.cms.futurecdn.net/f4XvzFpDRjFpwetZNcY6gD.jpg",
  "https://www.bloomingbackyard.com/wp-content/uploads/2021/08/cordyline.jpg",
  "https://www.epicgardening.com/wp-content/uploads/2024/02/Coleus.-different-varieties.jpg",
  "https://www.bloomingbackyard.com/wp-content/uploads/2021/08/amaranthus-tricolor-1024x683.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRcy7NUPKL_lCTXswV6ay-ZwpSEWKpopaNw&s",
];

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch(
          "https://eco-track-server-nine.vercel.app/tips"
        );
        if (!res.ok) throw new Error("Failed to fetch tips");
        const data = await res.json();
        setTips(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load tips right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  return (
    <section className="py-14 md:py-16 px-4 md:px-10 text-gray-100">
      <div className="w-full md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-center mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          Recent Community Tips
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading tips...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : tips.length === 0 ? (
          <p className="text-center text-gray-400">No tips available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {tips.slice(0, 5).map((tip, idx) => (
              <article
                key={tip._id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.35)] overflow-hidden hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.55)] transition-transform hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-center bg-cover opacity-40 ${
                    idx % 3 === 0
                      ? "blur-sm"
                      : idx % 3 === 1
                      ? "blur"
                      : "blur-md"
                  }`}
                  style={{
                    backgroundImage: `url(${bgImages[idx % bgImages.length]})`,
                  }}
                />

                <div className="relative z-10 p-4 sm:p-5">
                  <h3 className="text-base md:text-lg font-semibold text-emerald-300 line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                    {tip.content?.slice(0, 100) || "No description available."}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-emerald-400" />{" "}
                      {tip.authorName || "Anonymous"}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={14} className="text-emerald-400" />{" "}
                      {tip.upvotes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} className="text-emerald-400" />
                      {new Date(tip.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10" />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTips;
