import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have a custom Auth context

export default function ClassCard({ classData }) {
  const { title, description, skill, userName, maxStudents, rating } = classData;
  const { user } = useAuth(); // Check if the user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md p-4 flex flex-col">
      {/* Class Title */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      
      {/* Class Skill */}
      <p className="text-sm text-gray-500 mt-1">Skill: {skill.title}</p>

      <p className="text-sm text-gray-600 mt-2">Instructor: {userName}</p>

      {/* Class Description */}
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      
      {/* Instructor and Class Details */}
      <div className="mt-3 flex justify-between items-center">
        <span className="text-blue-600 font-medium">
          {maxStudents} students max
        </span>
        <span className="text-yellow-500 text-sm">⭐ {rating || "N/A"}</span>
      </div>

      {/* View Class Details Button */}
      <div className="mt-4">
        <button
          onClick={openModal}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          View Details
        </button>
      </div>

      {/* Modal for Class Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl w-[80vw] max-w-3xl shadow-lg">
            {/* Class Details in Modal */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
            <p className="text-lg text-gray-500 mt-1">Skill: {skill.title}</p>
            <p className="text-lg text-gray-600 mt-2">Instructor: {userName}</p>
            <p className="text-lg text-gray-600 mt-4">{description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                {maxStudents} students max
              </span>
              <span className="text-yellow-500 text-lg">⭐ {rating || "N/A"}</span>
            </div>

            {/* Join Class Button or Sign In Prompt */}
            <div className="mt-6 flex justify-end space-x-4">
              {user ? (
                <button
                  onClick={closeModal} // Ideally, this would join the class via an API
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Join Class
                </button>
              ) : (
                <div className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-center">
                  Please{" "}
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    sign in
                  </span>{" "}
                  to join this class
                </div>
              )}
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
