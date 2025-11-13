import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Challenges = () => {
  const challengesData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState(challengesData || []);
  const [joinedIds, setJoinedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://eco-track-server-nine.vercel.app/activities?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          const ids = data.map((a) => a.challenge._id);
          setJoinedIds(ids);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load your activities.");
        });
    }
  }, [user]);

  const handleJoin = async (challenge) => {
    if (!user) {
      navigate("/signIn");
      toast.info("Please sign in to join this challenge.");
      return;
    }

    try {
      const res = await fetch(
        "https://eco-track-server-nine.vercel.app/activities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email, challenge }),
        }
      );

      if (res.ok) {
        setJoinedIds([...joinedIds, challenge._id]);
        toast.success(`🎉 You joined "${challenge.title}" successfully!`);

        try {
          window.dispatchEvent(
            new CustomEvent("eco:challenge-joined", {
              detail: { title: challenge.title },
            })
          );
        } catch (e) {
          console.warn("Event dispatch failed:", e);
        }
      } else {
        const msg = await res.json();
        toast.error(msg.message || "Failed to join the challenge.");
      }
    } catch (err) {
      console.error("Error joining challenge:", err);
      toast.error("Error joining the challenge.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://eco-track-server-nine.vercel.app/challenges/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setChallenges((prev) => prev.filter((ch) => ch._id !== id));
        setJoinedIds((prev) => prev.filter((jid) => jid !== id));
        toast.success("Challenge deleted successfully.");
      } else {
        const msg = await res.json().catch(() => ({}));
        toast.error(msg.message || "Failed to delete challenge.");
      }
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toast.error("Error deleting challenge.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] text-white py-8 pb-20 px-4 sm:px-5">
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />

      <div className="w-11/12 mx-auto text-center mb-12 mt-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
          🌿 Eco Challenges
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          Take part in impactful missions and help build a greener planet.
        </p>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge) => {
          const joined = joinedIds.includes(challenge._id);

          return (
            <div
              key={challenge._id}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_15px_1px_rgba(16,185,129,0.35)] transition-transform duration-500 hover:scale-105 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-56 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <button
                  onClick={() => handleDelete(challenge._id)}
                  className="absolute top-3 right-3 z-20 text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-red-400/20 transition duration-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>

              <div className="absolute bottom-0 w-full p-4 sm:p-5 bg-white/15 backdrop-blur-2xl border-t border-white/10">
                <h3 className="text-base sm:text-lg font-semibold text-emerald-300 truncate">
                  {challenge.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
                  {challenge.category}
                </p>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                  <Link
                    to={`/challengesDetail/${challenge._id}`}
                    className="flex-1 sm:flex-none min-w-[120px]"
                  >
                    <button className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold rounded-full text-white hover:bg-white/20 hover:scale-105 transition duration-300">
                      View Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleJoin(challenge)}
                    disabled={joined}
                    className={`flex-1 sm:flex-none min-w-[120px] px-4 py-2 text-sm font-semibold rounded-full transition duration-300 ${
                      joined
                        ? "bg-gray-800 text-emerald-300 border border-emerald-300/20 cursor-default"
                        : " bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-md border border-emerald-300/20 text-emerald-300 hover:from-emerald-400/40 hover:to-teal-400/40 hover:text-white hover:scale-105"
                    }`}
                  >
                    {joined ? "Joined" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Challenges;
