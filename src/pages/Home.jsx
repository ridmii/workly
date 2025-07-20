import { useState, useContext } from "react";
import { WorkshopContext } from "../context/WorkshopContext.jsx";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";

function HomeContent() {
  const { workshops, loading, error } = useContext(WorkshopContext) || {};
  const { theme } = useContext(ThemeContext) || {};
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("date-asc");

  console.log("Workshops in HomeContent:", workshops); // Debug log

  const availableTags = [
    "React",
    "JavaScript",
    "UI/UX",
    "Leadership",
    "Communication",
    "Data Science",
    "Career",
    "Productivity",
    "Mobile",
    "Web Development",
    "Design",
    "AI",
    "Python",
    "Art",
    "SEO",
    "Marketing",
    "Photography",
    "Creativity",
    "Git",
    "Collaboration",
    "Innovation",
    "Diversity",
    "Cybersecurity",
    "Tech",
    "Cloud",
    "DevOps",
    "Finance",
    "Freelance",
    "HTML",
    "CSS",
    "Web Design",
    "Blockchain",
    "Crypto",
    "Mental Health",
    "Wellness",
  ];

  const handleTagClick = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setTags([]);
    setSortBy("date-asc");
  };

  const filteredWorkshops = workshops
    ?.filter(
      (w) =>
        w?.title?.toLowerCase().includes(search.toLowerCase()) &&
        (category ? w?.category === category : true) &&
        (tags.length ? tags.every((tag) => w?.tags?.includes(tag)) : true)
    )
    ?.sort((a, b) =>
      sortBy === "date-asc"
        ? new Date(a?.date) - new Date(b?.date)
        : new Date(b?.date) - new Date(a?.date)
    ) || [];

  console.log("Filtered Workshops:", filteredWorkshops); // Debug filtered results

  if (loading) {
    return <div className="container mx-auto p-6 mt-24 text-center">Loading workshops...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 mt-24 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="mt-20 mb-6">
      <div className={`bg-[#2A3439] p-4 rounded-lg container mx-auto ${theme === "light" ? "bg-white" : ""}`}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-2"
        >
          Discover Workshops
        </motion.h2>
        <p className={theme === "light" ? "text-gray-600 mb-4" : "text-gray-400 mb-4"}>
          Find and join the best workshops to enhance your skills
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search workshops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full p-2 pl-10 rounded-lg ${theme === "light" ? "bg-white text-gray-900 border-gray-300 light" : "bg-[#3A4449] text-white border-gray-700"} placeholder-gray-400 focus:outline-none`}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`p-2 rounded-lg ${theme === "light" ? "bg-white text-gray-900 border-gray-300 light" : "bg-[#3A4449] text-white border-gray-700"} focus:outline-none`}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Art">Art</option>
            <option value="Creative">Creative</option>
            <option value="Career">Career</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`p-2 rounded-lg ${theme === "light" ? "bg-white text-gray-900 border-gray-300 light" : "bg-[#3A4449] text-white border-gray-700"} focus:outline-none`}
          >
            <option value="date-asc">Earliest First</option>
            <option value="date-desc">Latest First</option>
          </select>
        </div>
        <div className="mt-4">
          <h3 className={theme === "light" ? "text-gray-900 mb-2" : "text-white mb-2"}>Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`${
                  theme === "light" ? "light" : ""
                } ${tags.includes(tag) ? "bg-[#00C4B4] text-white" : "bg-[#424b50] text-gray-300 hover:bg-[#647473]/80"} px-3 py-1 rounded-full text-sm`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={clearFilters}
          className={theme === "light" ? "mt-4 text-teal-800 hover:underline text-sm" : "mt-4 text-[#00C4B4] hover:underline text-sm"}
        >
          Clear all filters
        </button>
      </div>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredWorkshops.length > 0 ? (
            filteredWorkshops.map((workshop) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, backgroundColor: theme === "light" ? "#E6F0FA" : "#3A4449" }}
                className={`card ${theme === "light" ? "light" : ""} p-4 rounded-lg shadow-lg`}
              >
                <img
                  src={`/assets/${workshop.image.split("/").pop()}`}
                  alt={workshop.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                  onError={(e) => {
                    console.error(`Image failed to load for ${workshop.title}: ${workshop.image}`);
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    e.target.onerror = null;
                  }}
                />
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded text-sm ${
                    theme === "light" ? "bg-teal-100 text-teal-800" : "bg-teal-800 text-white"
                  }`}
                >
                  {workshop.category}
                </span>
                <h3 className={theme === "light" ? "text-xl font-semibold text-gray-900 mt-2" : "text-xl font-semibold text-white mt-2"}>{workshop.title}</h3>
                <p className={theme === "light" ? "text-gray-600 text-sm mt-2" : "text-gray-400 text-sm mt-2"}>{workshop.description}</p>
                <div className="flex items-center mt-2">
                  <svg
                    className={`w-5 h-5 mr-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className={theme === "light" ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>
                    {new Date(workshop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <svg
                    className={`w-5 h-5 mr-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className={theme === "light" ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>{workshop.location}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {workshop.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${theme === "light" ? "light" : ""} inline-block px-2 py-1 rounded-full text-sm`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/workshop/${workshop.id}`}
                  className={`btn ${theme === "light" ? "light bg-[#00C4B4] hover:bg-[#00C4B4]/90" : "bg-[#00C4B4] hover:bg-[#00C4B4]/80"} mt-4 w-full text-center block text-white`}
                >
                  View Details
                </Link>
              </motion.div>
            ))
          ) : (
            <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>No workshops match your filters</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}

export default Home;