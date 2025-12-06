import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import api from '../lib/api'
import { Link } from "react-router-dom";

export default function ClassCard({ classData }) {
  const { title, description, skill, userName, maxStudents, rating } = classData;
  const { user, setUser } = useAuth(); // Include setUser to update context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
const joinClass = async () => {
  if (!user) return alert("You must be signed in to join a class.");
  if (user.credits < 1) return alert("Not enough credits to join this class.");

  try {
    await api.post(`/classes/join/${classData._id}`);

    const newStudentCredits = user.credits - 1;

    const studentRes = await api.put("/users/update-credits", {
      credits: newStudentCredits
    });

    if (studentRes?.data?.credits !== undefined) {
      setUser({
        ...user,
        credits: studentRes.data.credits
      });
    }

    // Increment instructor credits
    if (classData.user !== user._id) {
      await api.put("/users/update-credits-by-id", {
        userId: classData.user,
        credits: 1    // this will increment once backend is updated
      });
    }

    alert("Joined class successfully. Credits updated.");
    closeModal();

  } catch (err) {
    console.error("Join error:", err);
    alert(err.response?.data?.message || "Could not join this class");
  }
};



  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md p-4 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">Skill: {skill.title}</p>
      <Link to={`/profile/${classData.user}`} className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
        Instructor: {userName}
      </Link>
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      <div className="mt-3 flex justify-between items-center">
        <span className="text-blue-600 font-medium">{maxStudents} students max</span>
        <span className="text-yellow-500 text-sm">⭐ {rating || "N/A"}</span>
      </div>

      <div className="mt-4">
        <button
          onClick={openModal}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          View Details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl w-[80vw] max-w-3xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
            <p className="text-lg text-gray-500 mt-1">Skill: {skill.title}</p>
            <p className="text-lg text-gray-600 mt-2 underline">
              Instructor: <Link to={`/profile/${classData.user}`}>{userName}</Link>
            </p>
            <p className="text-lg text-gray-600 mt-4">{description}</p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 font-medium">{maxStudents} students max</span>
              <span className="text-yellow-500 text-lg">⭐ {rating || "N/A"}</span>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {user ? (
                <button
                  onClick={joinClass}
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
