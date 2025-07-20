import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import WorkshopDetails from "./pages/WorkshopDetails";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import { WorkshopProvider } from "./context/WorkshopContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer"; 

function App() {
  return (
    <ThemeProvider>
      <WorkshopProvider>
        <ErrorBoundary>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshop/:id" element={<WorkshopDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </WorkshopProvider>
    </ThemeProvider>
  );
}

export default App;