import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import RejectPatientModal from '../../components/modals/RejectPatientModal';

const DocRequest = () => {
  const [showRejectPatientModal, setShowRejectPatientModal] = useState(false);
  const handleOnClose = () => setShowRejectPatientModal(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="bg-white text-center w-full p-4 mt-4">
        <h1 className="text-2xl font-bold mb-8">Upcoming Appointments</h1>
        <div className="mt-4 p-4">
        <input
            type="text"
            placeholder="Search by patient name"
            className="p-4 border rounded-lg mb-4"
          />
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">09-23-23</td>
                <td className="border p-2">10:30 AM</td>
                <td className="border p-2">Juan Cruz</td>
                <td className="border p-2">Checkup</td>
                <td className="border p-2">
                  <button className="px-4 py-2 bg-[#4867D6] text-white rounded mr-2">
                    Reschedule
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border p-2">09-23-23</td>
                <td className="border p-2">10:30 AM</td>
                <td className="border p-2">Juan Cruz</td>
                <td className="border p-2">Checkup</td>
                <td className="border p-2">
                  <button className="px-4 py-2 bg-[#4867D6] text-white rounded mr-2">
                    Reschedule
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <RejectPatientModal onClose={handleOnClose} visible={showRejectPatientModal} />
    </div>
  );
};

export default DocRequest;
