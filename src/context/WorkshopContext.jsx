import { createContext, useState, useEffect } from "react";

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);
  const [user, setUser] = useState({ registeredWorkshops: [], feedback: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/data/workshops.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // Handle raw array directly since workshops.json is [{}]
        const workshopList = Array.isArray(data) ? data : [];
        setWorkshops(workshopList);
        console.log("Workshops loaded:", workshopList);
        setError(null);
      })
      .catch((error) => {
        console.error("Error loading workshops:", error);
        setError("Failed to load workshops. Please try again later.");
        setWorkshops([]);
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

  return (
    <WorkshopContext.Provider value={{ workshops, user, loading, error, registerWorkshop, unregisterWorkshop, addFeedback }}>
      {children}
    </WorkshopContext.Provider>
  );
};

export { WorkshopContext };