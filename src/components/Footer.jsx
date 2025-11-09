import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 ">
      <div className="w-11/12 mx-auto px-6 text-center md:text-left">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo / Brand */}
          <h2 className="text-xl font-semibold text-white">© 2025 EcoTrack</h2>

          {/* Quick Links */}
          <ul className="flex gap-6 text-sm">
            <li>
              <a href="/about" className="hover:text-green-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-400 transition">
                Contact
              </a>
            </li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-5 text-lg">
            <a href="#" className="hover:text-green-400 transition">
              f
            </a>
            <a href="#" className="hover:text-green-400 transition">
              t
            </a>
            <a href="#" className="hover:text-green-400 transition">
              i
            </a>
            <a href="#" className="hover:text-green-400 transition">
              l
            </a>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-4 text-sm text-gray-500 text-center md:text-left">
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
