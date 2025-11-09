import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

// Lightweight toast component
const Toast = ({ message, type = "info", onClose }) => {
  if (!message) return null;
  const bg =
    type === "error"
      ? "bg-red-500/90"
      : type === "success"
      ? "bg-emerald-500/90"
      : "bg-blue-500/90";
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`text-white px-4 py-2 rounded-xl shadow-xl ${bg} backdrop-blur-sm flex items-center gap-2`}
      >
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });

  const showToast = (message, type = "info") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email.", "error");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showToast("Reset link sent to your email.", "success");
    } catch (error) {
      showToast(error?.message || "Failed to send reset email.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-emerald-600 flex items-center justify-center overflow-hidden p-4">
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute -top-8 -left-8 w-40 h-40 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-11/12 max-w-md md:max-w-lg">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-8 shadow-2xl">
          <div className="mb-4 md:mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Forgot Password</h1>
            <p className="text-white/80 text-sm md:text-base mt-1">Enter your email to receive reset instructions (demo).</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-300/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 md:mt-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/signIn")}
                className="text-white/90 hover:text-white underline underline-offset-2 text-sm md:text-base"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </section>
  );
};

export default ForgotPassword;