import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WorkshopContext } from "../context/WorkshopContext";
import { ThemeContext } from "../context/ThemeContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Dashboard() {
  const { user, workshops } = useContext(WorkshopContext);
  const { theme } = useContext(ThemeContext);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const registeredWorkshops = workshops.filter((w) => user.registeredWorkshops.includes(w.id));


  const currentUserFeedback = user.feedback.filter((f) => {
    return (
      f.user === "CurrentUser" && 
      user.registeredWorkshops.includes(f.workshopId) 
    );
  });

  
  console.log("User feedback:", user.feedback);
  console.log("Current user's feedback:", currentUserFeedback);

  return (
    <div className={`container mx-auto p-6 mt-24 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`text-3xl font-semibold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}
      >
        My Dashboard
      </motion.h2>
      <p className={`text-sm mb-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>Manage your workshops and feedback</p>
      <div className={`rounded-lg shadow-lg p-6 ${theme === "light" ? "bg-white" : "bg-[#2A3439]"}`}>
        <div className={`flex items-center mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-gray-300"} mr-4`}>
            U
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>User</h3>
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>user@example.com</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`p-4 rounded-lg ${theme === "light" ? "bg-blue-50 text-blue-600" : "bg-blue-900/30 text-blue-300"}`}>
            <h4 className="text-lg font-semibold">Registered Workshops</h4>
            <p className={`text-2xl font-bold mt-2 ${theme === "light" ? "text-blue-700" : "text-blue-200"}`}>{user.registeredWorkshops.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${theme === "light" ? "bg-green-50 text-green-600" : "bg-green-900/30 text-green-300"}`}>
            <h4 className="text-lg font-semibold">Feedback Submitted</h4>
            <p className={`text-2xl font-bold mt-2 ${theme === "light" ? "text-green-700" : "text-green-200"}`}>{currentUserFeedback.length}</p>
          </div>
        </div>
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>My Workshops</h4>
          {registeredWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registeredWorkshops.map((workshop) => (
                <motion.div
                  key={workshop.id}
                  className={`p-4 rounded-lg shadow-md ${theme === "light" ? "bg-gray-50 text-gray-800" : "bg-gray-700 text-gray-200"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-lg font-medium">{workshop.title}</p>
                  <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                    {new Date(workshop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>No workshops registered</p>
          )}
        </div>
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>My Feedback</h4>
          {currentUserFeedback.length > 0 ? (
            <div className="space-y-4">
              {currentUserFeedback.map((f, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg shadow-md ${theme === "light" ? "bg-gray-50 text-gray-800" : "bg-gray-700 text-gray-200"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`font-semibold ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                        Feedback for: {workshops.find((w) => w.id === f.workshopId)?.title || "Unknown Workshop"}
                      </span>
                      <div className="ml-2 flex">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < f.rating
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
                  </div>
                  <p className={`text-sm mt-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>{f.text || "No comment"}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>No feedback submitted</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;