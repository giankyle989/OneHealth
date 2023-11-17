import React from "react";

const EditDoctorModal = ({ visible, onClose, doctor }) => {


    if (!visible) return null;

    const {firstName, _id, lastName, licenceNumber, email} = doctor
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
          <div className="bg-white w-1/2 rounded-lg shadow-lg z-50 relative">
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
            <div className="bg-[#4867D6] text-white p-4 rounded-t-lg">
              <h2 className="text-2xl font-semibold">Edit Doctor Profile</h2>
            </div>
            <div className="p-4 grid g">
              <p className="mb-2">
                <span className="font-semibold">First Name:</span> {doctor.firstName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Last Name:</span> {doctor.lastName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{doctor.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">License Number:</span> {doctor.licenseNumber}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-b-lg flex justify-center">
              <button className="bg-[#4867D6] p-2 text-white rounded-sm">Submit</button>
            </div>
          </div>
        </div>
      );
};

export default EditDoctorModal;
