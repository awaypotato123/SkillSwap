import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function ManageClass() {
    const { classId } = useParams();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchClass = async () => {
        try {
            const res = await api.get(`/classes/${classId}`);
            setClassData(res.data);
        } catch (error) {
            console.error("Error loading class details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClass();
    }, [classId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!classData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-600 text-lg">Class not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Manage {classData.title}
                </h1>

                {/* Instructor */}
                <p className="text-gray-700 text-lg mb-1">
                    <span className="font-medium">Instructor:</span> {classData.userName}
                </p>

                {/* Date */}
                <p className="text-gray-700 text-lg mb-1">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(classData.date).toLocaleDateString()}
                </p>

                {/* Max Students */}
                <p className="text-gray-700 text-lg mb-4">
                    <span className="font-medium">Max Students:</span>{" "}
                    {classData.maxStudents}
                </p>

                {/* Description */}
                <div className="mt-4 border-t pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {classData.description}
                    </p>
                </div>

                {/* Skill */}
                <div className="mt-6 border-t pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Skill Taught
                    </h2>
                    <p className="text-gray-700">
                        {classData.skill?.title}
                    </p>
                </div>

                {/* Students Joined */}
                <div className="mt-6 border-t pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Students Joined
                    </h2>
                    <p className="text-gray-700">
                        {classData.students?.length || 0}
                    </p>
                </div>

                {/* Edit Class Button */}
                <div className="mt-6">
                    <button
                        onClick={() => navigate(`/edit-class/${classData._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                    >
                        Edit This Class
                    </button>
                </div>

            </div>
        </div>
    );
}
