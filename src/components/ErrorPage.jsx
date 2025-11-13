import React from "react";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-float1"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 bg-teal-500/10 rounded-full blur-3xl animate-float2"></div>
      <div className="absolute top-1/3 right-[-80px] w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-float3"></div>

      <div className="relative z-10 max-w-lg w-full transform rotate-[-2deg]">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] p-10 text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-20 h-20 text-red-500 animate-bounce" />
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-pink-500 mb-3 animate-text-flicker">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-200 font-semibold mb-2">
            Page Not Found
          </h2>

          <p className="text-gray-400 mb-6">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            Go Back Home
          </Link>

          <p className="mt-6 text-gray-500 text-xs">
            Need help? Contact support.
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-20px) translateX(15px) rotate(15deg); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(25px) translateX(-15px) rotate(-15deg); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-15px) translateX(10px); }
          }
          @keyframes text-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 22%, 24%, 55% { opacity: 0.4; }
          }
          .animate-float1 { animation: float1 6s ease-in-out infinite; }
          .animate-float2 { animation: float2 8s ease-in-out infinite; }
          .animate-float3 { animation: float3 7s ease-in-out infinite; }
          .animate-text-flicker { animation: text-flicker 2s linear infinite; }
        `}
      </style>
    </section>
  );
};

export default ErrorPage;
