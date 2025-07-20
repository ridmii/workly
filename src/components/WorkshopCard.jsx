import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function WorkshopCard({ workshop }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-blue-900">{workshop.title}</h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{workshop.description}</p>
      <p className="text-gray-500 text-sm mt-2">Date: {workshop.date}</p>
      <p className="text-gray-500 text-sm">Category: {workshop.category}</p>
      <Link
        to={`/workshop/${workshop.id}`}
        className="mt-4 inline-block text-blue-400 hover:text-blue-600 font-medium"
      >
        View Details →
      </Link>
    </motion.div>
  );
}

export default WorkshopCard;