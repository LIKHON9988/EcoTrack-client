import React, { useEffect, useState } from "react";
import { MapPin, CalendarDays, Info, AlertCircle } from "lucide-react";

const bgGlow = [
  "from-emerald-400/20 to-teal-400/20",
  "from-teal-400/20 to-green-400/20",
  "from-green-400/20 to-emerald-400/20",
  "from-emerald-400/20 to-lime-400/20",
];

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/upcoming-events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load upcoming events. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-emerald-300">
        <p className="animate-pulse text-lg font-medium">
          Loading upcoming events...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 flex flex-col items-center text-center text-red-400">
        <AlertCircle size={32} className="mb-2" />
        <p className="text-sm">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-14 md:py-16 px-4 md:px-10 text-gray-100">
      <div className="w-full md:w-11/12 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-emerald-300 text-center drop-shadow-md">
          🌿 Upcoming Eco Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-400">No upcoming events yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((ev, idx) => (
              <article
                key={ev._id || idx}
                className="group relative rounded-2xl overflow-hidden border border-emerald-400/20 shadow-[0_8px_25px_-8px_rgba(16,185,129,0.35)] hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.55)] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      ev.imageUrl || "/default-event.jpg"
                    })`,
                  }}
                />

                {/* Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

                {/* Glow Decoration */}
                <div
                  className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl bg-gradient-to-tr ${
                    bgGlow[idx % bgGlow.length]
                  }`}
                />

                {/* Content Section (Right Side) */}
                <div className="relative z-10 flex flex-col justify-between h-full backdrop-blur-md bg-black/30 p-6 md:p-8 md:w-[55%] ml-auto rounded-l-3xl transition-all duration-500 group-hover:bg-black/40">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-emerald-300 line-clamp-2 drop-shadow-sm">
                      {ev.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs md:text-sm">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                        <CalendarDays size={15} />
                        {new Date(ev.date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300">
                        <MapPin size={15} />
                        {ev.location}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-200 line-clamp-3 flex items-start gap-2">
                      <Info
                        size={15}
                        className="text-emerald-400 mt-0.5 shrink-0"
                      />
                      <span>{ev.description}</span>
                    </p>
                  </div>

                  <div className="mt-4 border-t border-emerald-400/20 pt-3 flex items-center justify-between">
                    <span className="text-[11px] md:text-xs text-gray-400">
                      Hosted by {ev.organizer || "EcoTrack Community"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] md:text-xs text-emerald-300">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle border on hover */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl ring-0 group-hover:ring-1 ring-emerald-400/30 transition-all duration-500" />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
