import React from "react";
import { Facebook, Instagram, X, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#050806] via-[#0b1410] to-[#051009] text-gray-300 py-10 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-40 h-40 md:w-64 md:h-64 bg-emerald-600/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-16 -right-16 w-52 h-52 md:w-80 md:h-80 bg-green-500/10 blur-3xl rounded-full"></div>

      <div className="relative w-11/12 mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-semibold text-white">
              © 2025 EcoTrack
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Track your environmental impact easily
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">About</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                EcoTrack is a platform to monitor and join environmental
                challenges.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Contact</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Email: support@ecotrack.com
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                Phone: +123 456 7890
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex gap-4 text-white mt-4 md:mt-0">
            <a href="#" className="hover:text-green-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <X size={20} />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400 text-center md:text-left">
          <p>
            This website is designed with accessibility in mind. Read our{" "}
            <a href="/privacy" className="text-green-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
