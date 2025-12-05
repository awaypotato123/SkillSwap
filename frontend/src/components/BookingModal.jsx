import { useState } from "react";
import api from "../lib/api";
import { useToasts } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

export default function BookingModal({ isOpen, onClose, skill, teacher }) {
  const { user } = useAuth();
  const { push } = useToasts();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    message: "",
    preferredDate: "",
    preferredTime: "",
    duration: "1hour"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/bookings", {
        skillId: skill._id,
        teacherId: teacher._id,
        ...formData
      });

      push(response.data.message, "success");
      onClose();
      
      // Refresh page to show updated credits
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      push(error.response?.data?.message || "Failed to create booking", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book a Session</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Skill Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">{skill?.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              with {teacher?.firstName} {teacher?.lastName}
            </p>
            <p className="text-sm text-blue-600 mt-2 font-medium">
              Cost: 1 Credit
            </p>
            {user && (
              <p className="text-xs text-gray-500 mt-1">
                Your credits: {user.credits}
              </p>
            )}
          </div>

          {/* Check if user has enough credits */}
          {user && user.credits < 1 ? (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                ⚠️ You don't have enough credits to book this session. You need 1 credit.
              </p>
            </div>
          ) : null}

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Teacher
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell the teacher what you'd like to learn..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Preferred Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Preferred Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["30min", "1hour", "2hours", "3hours"].map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: dur })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      formData.duration === dur
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {dur.replace("min", " min").replace("hour", " hr")}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (user && user.credits < 1)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Booking..." : "Book Session (1 Credit)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}