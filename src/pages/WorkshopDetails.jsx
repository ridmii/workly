import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { WorkshopContext } from "../context/WorkshopContext";
import { ThemeContext } from "../context/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";

function WorkshopDetails() {
  const { id } = useParams();
  const { workshops, user, registerWorkshop, unregisterWorkshop, addFeedback, deleteFeedback } = useContext(WorkshopContext) || {};
  const { theme } = useContext(ThemeContext) || {};
  const navigate = useNavigate();
  const workshop = workshops.find((w) => w.id === parseInt(id));
  const [isRegistered, setIsRegistered] = useState(user?.registeredWorkshops.includes(parseInt(id)) || false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setIsRegistered(user?.registeredWorkshops.includes(parseInt(id)) || false);
  }, [user?.registeredWorkshops, id]);

  const handleRegister = () => {
    if (!isRegistered) {
      registerWorkshop(parseInt(id));
      setIsRegistered(true);
    } else {
      unregisterWorkshop(parseInt(id));
      setIsRegistered(false);
    }
  };

  const handleLeaveFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleCancelFeedback = () => {
    setShowFeedbackForm(false);
    setFeedbackText("");
    setRating(0);
  };

  const handleSubmitFeedback = () => {
    if (feedbackText && rating > 0 && workshop) {
      const newFeedback = {
        id: Date.now(),
        workshopId: parseInt(id),
        text: feedbackText,
        rating,
        user: "CurrentUser",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      };
      addFeedback(newFeedback);
      setShowFeedbackForm(false);
      setFeedbackText("");
      setRating(0);
    }
  };

  const handleDeleteFeedback = (feedbackId) => {
    deleteFeedback(feedbackId);
  };

  const workshopFeedback = user?.feedback.filter((f) => f.workshopId === parseInt(id)) || [];

  if (!workshop) return <div className="container mx-auto p-4 text-center">Workshop not found</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 mt-16 sm:mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${
          theme === "light" ? "bg-white text-gray-900" : "bg-[#2A3439] text-white"
        } p-4 sm:p-6 rounded-lg shadow-lg`}
      >
        <button
          onClick={() => navigate("/")}
          className={`flex items-center mb-2 sm:mb-4 ${
            theme === "light" ? "text-gray-600 hover:text-gray-800" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <svg
            className="w-5 h-5 mr-1 sm:mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Workshops
        </button>
        <motion.img
          src={`/assets/${workshop.image.split("/").pop()}`}
          alt={workshop.title}
          className="w-full h-48 sm:h-[400px] object-cover rounded-lg mb-2 sm:mb-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <h1 className="text-2xl sm:text-3xl font-semibold mb-1 sm:mb-2">{workshop.title}</h1>
        <span
          className={`inline-block px-2 py-1 rounded text-sm ${
            theme === "light" ? "bg-teal-100 text-teal-800" : "bg-teal-800 text-white"
          }`}
        >
          {workshop.category}
        </span>
        {/* Adjusted Date and Location Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-4 mb-2 sm:mb-4 space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
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
            <span className={theme === "light" ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>Date: {new Date(workshop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
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
            <span className={theme === "light" ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>Location: {workshop.location}</span>
          </div>
        </div>
        <p className={theme === "light" ? "text-gray-600 mt-2" : "text-gray-400 mt-2"}>{workshop.description}</p>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className={theme === "light" ? "text-lg font-semibold text-gray-900" : "text-lg font-semibold text-white"}>Organizers</h3>
            <div className="mt-2 space-y-1">
              {workshop.organizers?.map((organizer, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className={theme === "light" ? "text-gray-600 text-sm" : "text-gray-400 text-sm"}>{organizer}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className={theme === "light" ? "text-lg font-semibold text-gray-900" : "text-lg font-semibold text-white"}>Tags</h3>
            <div className="mt-2 space-y-1">
              {workshop.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className={`inline-block px-2 py-1 rounded-full text-sm ${
                    theme === "light" ? "bg-teal-100 text-teal-800" : "bg-teal-800 text-white"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        {isRegistered ? (
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <motion.button
              onClick={handleRegister}
              className={`w-full sm:w-auto btn ${
                theme === "light" ? "bg-red-600 hover:bg-red-700" : "bg-red-700 hover:bg-red-800"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel Registration
            </motion.button>
            <motion.button
              onClick={handleLeaveFeedback}
              className={`w-full sm:w-auto btn ${
                theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-700 hover:bg-blue-800"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Leave Feedback
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={handleRegister}
            className={`w-full btn ${
              theme === "light" ? "bg-green-600 hover:bg-green-700" : "bg-green-700 hover:bg-green-800"
            } mt-4`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>
        )}
        {showFeedbackForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg ${
              theme === "light" ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-white"
            }`}
          >
            <div className="mb-2">
              <label className={theme === "light" ? "text-gray-700" : "text-gray-300"}>Rating: </label>
              <div className="flex space-x-1 sm:space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.svg
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ${
                      rating >= star
                        ? theme === "light"
                          ? "text-yellow-400"
                          : "text-yellow-500"
                        : theme === "light"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.416 8.254L12 18.827l-7.415 3.898 1.416-8.254-6.001-5.852 8.332-1.151z" />
                  </motion.svg>
                ))}
              </div>
            </div>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback..."
              className={`w-full p-2 mb-2 rounded-lg ${
                theme === "light" ? "bg-white text-gray-900 border-gray-300" : "bg-[#3A4449] text-white border-gray-700"
              }`}
            />
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <motion.button
                onClick={handleSubmitFeedback}
                className={`w-full sm:w-auto btn ${
                  theme === "light" ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-700 hover:bg-purple-800"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={!feedbackText || rating === 0}
              >
                Submit Feedback
              </motion.button>
              <motion.button
                onClick={handleCancelFeedback}
                className={`w-full sm:w-auto btn ${
                  theme === "light" ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-700 hover:bg-gray-600"
                } mt-2 sm:mt-0 sm:ml-2`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel Feedback
              </motion.button>
            </div>
          </motion.div>
        )}
        {workshopFeedback.length > 0 && (
          <div className="mt-4">
            <h3 className={theme === "light" ? "text-xl font-semibold text-gray-900" : "text-xl font-semibold text-white"}>Feedbacks</h3>
            {workshopFeedback.map((feedback) => (
              <motion.div
                key={feedback.id}
                className={`p-2 sm:p-3 mt-2 rounded-lg ${
                  theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-700 text-gray-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center mb-1 sm:mb-0">
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={theme === "light" ? "text-gray-800 font-semibold" : "text-gray-200 font-semibold"}>{feedback.user}</span>
                    <div className="ml-1 sm:ml-2 flex">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < feedback.rating
                                ? theme === "light"
                                  ? "text-yellow-400"
                                  : "text-yellow-500"
                                : theme === "light"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.852 1.416 8.254L12 18.827l-7.415 3.898 1.416-8.254-6.001-5.852 8.332-1.151z" />
                          </svg>
                        ))}
                    </div>
                  </div>
                  {feedback.user === "CurrentUser" && (
                    <motion.button
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className={`p-1 sm:p-2 rounded-full ${
                        theme === "light" ? "text-red-600 hover:bg-red-100" : "text-red-400 hover:bg-red-800"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
                <p className={theme === "light" ? "text-gray-700 mt-1 sm:mt-2" : "text-gray-300 mt-1 sm:mt-2"}>{feedback.text}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function WorkshopDetailsPage() {
  return (
    <ErrorBoundary>
      <WorkshopDetails />
    </ErrorBoundary>
  );
}

export default WorkshopDetailsPage;