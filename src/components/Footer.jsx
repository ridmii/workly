import { motion as Motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        theme === "light" ? "bg-gray-100" : "bg-[#2A3439]"
      } text-gray-400 p-6`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-left mb-4 md:mb-0">
          <h4
            className={`font-semibold ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className={`text-2xl hover: ${
                theme === "light" ? "hover:text-gray-900" : "hover:text-gray-200"
              }`}
            >
              Workly
            </a>
          </h4>
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Find your next skill
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-right">
          <div>
            <h4
              className={`font-semibold ${
                theme === "light" ? "text-gray-900" : "text-white"
              } mb-2`}
            >
              Explore
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className={`hover:${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  All Workshops
                </a>
              </li>
              <li>
                <a
                  href="dashboard"
                  className={`hover:${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Dashboard
                </a>
              </li>

            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold ${
                theme === "light" ? "text-gray-900" : "text-white"
              } mb-2`}
            >
              Legal
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className={`hover:${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`hover:${
                    theme === "light" ? "text-gray-900" : "text-gray-200"
                  }`}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Line just above the copyright */}
      <hr className="border-t border-gray-700 my-6 w-full" />

      {/* Centered copyright */}
      <p
        className={`text-sm text-center ${
          theme === "light" ? "text-gray-600" : "text-gray-400"
        }`}
      >
        © {new Date().getFullYear()} Workly. All rights reserved.
      </p>
    </Motion.footer>
  );
}

export default Footer;