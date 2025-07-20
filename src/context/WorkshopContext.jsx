import { createContext, useState, useEffect } from "react";

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);
  const [user, setUser] = useState({ registeredWorkshops: [], feedback: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/data/workshops.json").then((res) => res.json()),
      fetch("/data/feedbacks.json").then((res) => res.json())
    ])
      .then(([workshopData, feedbackData]) => {
        setWorkshops(Array.isArray(workshopData) ? workshopData : []);
        setUser((prev) => ({
          ...prev,
          feedback: Array.isArray(feedbackData) ? feedbackData : [],
        }));
        console.log("Workshops and feedback loaded:", { workshops: workshopData, feedback: feedbackData });
        setError(null);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
        setWorkshops([]);
        setUser((prev) => ({ ...prev, feedback: [] }));
      })
      .finally(() => setLoading(false));
  }, []);

  const registerWorkshop = (workshopId) => {
    if (!user.registeredWorkshops.includes(workshopId)) {
      setUser((prev) => ({
        ...prev,
        registeredWorkshops: [...prev.registeredWorkshops, workshopId],
      }));
    }
  };

  const unregisterWorkshop = (workshopId) => {
    setUser((prev) => ({
      ...prev,
      registeredWorkshops: prev.registeredWorkshops.filter((id) => id !== workshopId),
    }));
  };

  const addFeedback = (feedback) => {
    setUser((prev) => ({
      ...prev,
      feedback: [...prev.feedback, feedback],
    }));
  };

  const deleteFeedback = (feedbackId) => {
    setUser((prev) => ({
      ...prev,
      feedback: prev.feedback.filter((f) => f.id !== feedbackId),
    }));
  };

  return (
    <WorkshopContext.Provider value={{ workshops, user, loading, error, registerWorkshop, unregisterWorkshop, addFeedback, deleteFeedback }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export { WorkshopContext };