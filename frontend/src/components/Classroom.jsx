import React, { useState, useEffect } from 'react';
import api from "../lib/api";
import { useToasts } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import EnterClass from "../components/EnterClass";

export default function Classroom() {
    const { push } = useToasts();
    const [activePortal, setActivePortal] = useState('student'); // Track which portal is active
    const [userClasses, setUserClasses] = useState([]); // Store user classes
    const [classes, setClasses] = useState([]); // Store instructor's classes
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle portal toggle
    const handlePortalToggle = (portal) => {
        setActivePortal(portal);
    };

    // Fetch the classes that the current user is enrolled in (Student Portal)
    const fetchUserClasses = async () => {
        setLoading(true);
        try {
            const response = await api.get("/classes/user/classes"); // Fetch classes the current user is enrolled in
            setUserClasses(response.data); // Set the user classes
        } catch (error) {
            console.error("Error fetching user classes:", error);
            push("Failed to load classes", "error");
        } finally {
            setLoading(false);
        }
    };

    // Fetch classes for the instructor portal
    const fetchInstructorClasses = async () => {
        setLoading(true);
        try {
            const response = await api.get("/classes"); // Fetch classes the instructor has created
            setClasses(response.data); // Set the instructor's classes
        } catch (error) {
            console.error("Error fetching instructor classes:", error);
            push("Failed to load classes", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activePortal === 'student') {
            fetchUserClasses(); // Fetch student classes when the Student portal is active
        } else if (activePortal === 'instructor') {
            fetchInstructorClasses(); // Fetch instructor classes when the Instructor portal is active
        }
    }, [activePortal]);

    // Navigate to the public profile page
    const navigateToPublicProfile = () => {
        navigate("/public-profile"); // Placeholder route for public profile
    };

    // Function to handle class deletion
    const handleDeleteClass = async (classId) => {
        if (!window.confirm("Are you sure you want to delete this class?")) {
            return;
        }

        try {
            await api.delete(`/classes/${classId}`);
            push("Class deleted successfully", "success");
            fetchInstructorClasses(); // Refresh classes
        } catch (error) {
            push(error.response?.data?.message || "Failed to delete class", "error");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6 fixed h-full">
                <div
                    className={`cursor-pointer p-4 mb-4 rounded-lg hover:bg-slate-50 hover:text-blue-700 transition ${activePortal === 'student' ? 'bg-blue-700' : ''}`}
                    onClick={() => handlePortalToggle('student')}
                >
                    Student Portal
                </div>
                <div
                    className={`cursor-pointer p-4 rounded-lg hover:bg-slate-50 hover:text-blue-700 transition ${activePortal === 'instructor' ? 'bg-blue-700' : ''}`}
                    onClick={() => handlePortalToggle('instructor')}
                >
                    Instructor Portal
                </div>
            </div>

            {/* Main content */}
            <div className="ml-64 w-full p-6">
                

                {/* Student Portal */}
{activePortal === 'student' && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Student Portal</h2>
        <p className="text-lg text-gray-600 mt-4">My Classes (Student View)</p>

        <button
            onClick={navigateToPublicProfile}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
            View Public Profile
        </button>

        {loading && (
            <div className="text-center animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto my-4"></div>
        )}

        {userClasses.length === 0 ? (
            <p className="text-gray-500 mt-4">You have not joined any classes yet.</p>
        ) : (
            <ul className="divide-y divide-gray-200">
                {userClasses.map((classItem) => (
                    <li key={classItem._id} className="flex justify-between items-center py-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{classItem.title}</h3>
                            <p className="text-sm text-gray-600">{classItem.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Date: {new Date(classItem.date).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Only Enter Class Button */}
                        <button
                            onClick={() => navigate(`/enter-class/${classItem._id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                            title="Enter the class"
                        >
                            Enter Class
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
)}






                {/* Instructor Portal */}
{activePortal === 'instructor' && (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Instructor Portal</h2>
        <p className="text-lg text-gray-600 mt-4">My Classes (Instructor View)</p>

        {loading && (
            <div className="text-center animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto my-4"></div>
        )}

        {classes.length === 0 ? (
            <p className="text-gray-500 mt-4">You have not created any classes yet.</p>
        ) : (
            <ul className="divide-y divide-gray-200">
                {classes.map((classItem) => (
                    <li key={classItem._id} className="flex justify-between items-center py-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{classItem.title}</h3>
                            <p className="text-sm text-gray-600">{classItem.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Date: {new Date(classItem.date).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Manage Class Button */}
                        <button
                            onClick={() => navigate(`/manage-class/${classItem._id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            Manage Class
                        </button>
                    </li>
                ))}
            </ul>
        )}

        <button
            onClick={navigateToPublicProfile}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
            View Public Profile
        </button>
    </div>
)}
            </div>
        </div>
    );
}
