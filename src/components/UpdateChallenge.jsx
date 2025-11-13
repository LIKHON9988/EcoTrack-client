import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    impactMetric: "",
    imageUrl: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`http://localhost:3000/challenges/${id}`);
        if (!res.ok) throw new Error("Failed to fetch challenge");

        const data = await res.json();
        setFormData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          duration: data.duration || "",
          target: data.target || "",
          impactMetric: data.impactMetric || "",
          imageUrl: data.imageUrl || "",
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
        });
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load challenge data!", {
          position: "top-right",
          theme: "colored",
        });
      }
    };
    fetchChallenge();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedChallenge = {
      ...formData,
      createdBy: user?.email || "Guest",
    };

    try {
      const res = await fetch(`http://localhost:3000/challenges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedChallenge),
      });

      if (!res.ok) throw new Error("Failed to update challenge");

      toast.success("✅ Challenge updated successfully!", {
        position: "top-right",
        theme: "colored",
        style: { backgroundColor: "#10b981", color: "#fff" },
      });

      setTimeout(() => navigate("/challenges"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Something went wrong. Try again.", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] flex flex-col items-center py-24 px-4 text-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent mb-15 bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg">
        🌿 Update Challenge
      </h1>

      <form
        onSubmit={handleUpdate}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-emerald-500/60 rounded-2xl shadow-[0_0_20px_#10b98140] p-6 sm:p-8 flex flex-col gap-4 transition-all duration-300"
      >
        <label className="flex flex-col text-gray-200 text-sm">
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </label>

        <label className="flex flex-col text-gray-200 text-sm">
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
        </label>

        <label className="flex flex-col text-gray-200 text-sm">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            rows={3}
            required
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col text-gray-200 text-sm">
            Duration (days)
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>

          <label className="flex flex-col text-gray-200 text-sm">
            Target / Goal
            <input
              type="text"
              name="target"
              value={formData.target}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col text-gray-200 text-sm">
            Impact Metric
            <input
              type="text"
              name="impactMetric"
              value={formData.impactMetric}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>

          <label className="flex flex-col text-gray-200 text-sm">
            Image URL
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col text-gray-200 text-sm">
            Start Date
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>

          <label className="flex flex-col text-gray-200 text-sm">
            End Date
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-2 p-2.5 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-[0_0_15px_#10b98180] hover:scale-105 transition-transform duration-300"
        >
          Update Challenge
        </button>
      </form>
    </section>
  );
};

export default UpdateChallenge;
