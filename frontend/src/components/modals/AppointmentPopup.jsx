// AppointmentPopup.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentPopup = ({ appointmentId, onClose }) => {
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctor/appointment/spec/${appointmentId}`
        );
        const appointmentData = response.data;

        setAppointmentInfo(appointmentData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointment information:", error);
        setLoading(false);
      }
    };

    fetchAppointmentInfo();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        <div className="modal-container bg-white w-96 rounded-lg shadow-lg z-50 relative">
          <div className="modal-content p-4">
            <p>Loading appointment information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!appointmentInfo) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        <div className="modal-container bg-white w-96 rounded-lg shadow-lg z-50 relative">
          <div className="modal-content p-4">
            <p>Error fetching appointment information</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="modal-container bg-white w-96 rounded-lg shadow-lg z-50 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="modal-header bg-[#4867D6] text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Appointment Information</h2>
        </div>
        <div className="modal-content p-4">
          <p>ID: {appointmentInfo._id || "No Data"}</p>
          <p>
            Name: {appointmentInfo.patientId.firstName || "No Data"}{" "}
            {appointmentInfo.patientId.lastName || "No Data"}
          </p>
          <p>
            Last Appointment:{" "}
            {appointmentInfo.lastAppointment
              ? new Date(appointmentInfo.lastAppointment).toLocaleDateString()
              : "No Data"}
          </p>
          <p>
            Patient Past Diagnoses:{" "}
            {appointmentInfo.pastDiagnoses.length > 0
              ? appointmentInfo.pastDiagnoses.join(", ")
              : "No Data"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPopup;
