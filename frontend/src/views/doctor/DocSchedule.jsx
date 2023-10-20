import React, { useState } from "react";
import Navbar from "../../components/Navbar";


const DocSchedule = () => {
  const [showDiagnose, setShowDiagnose] = useState(false);
  const handleClose = () => setShowDiagnose(false);
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] =
    useState(false);
  const handleOnClose = () => setShowAddPrescriptionModal(false);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div>
          <div className="bg-white p-4">
            <div>
              <h1 className="text-center text-2xl font-bold">
                Visit Status Dashboard
              </h1>
            </div>
            <div className="mt-4">
              <div className="p-4 text-center">
                <div>
                <input
            type="text"
            placeholder="Search by Patient Name"
            className="my-4 p-4 border rounded"

          />
          <button className="p-4 bg-[#4867D6] text-white rounded ml-4">Search</button>
                </div>
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-2 py-8">Patient Name</th>
                      <th className="border-2 py-8">
                        Waiting in Reception Area
                      </th>
                      <th className="border-2 py-8">Initial Assessment</th>
                      <th className="border-2 py-8">Undergoing Test</th>
                      <th className="border-2 py-8">
                        Consultation with Doctor
                      </th>
                      <th className="border-2 py-8">Done</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr className="text-center">
                      <td>John Doe</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="py-8 border-4 border-l-[#4867D6] text-[#4867D6]">
                        Complete
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>John Doe</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="py-8 border-4 border-l-[#4867D6] text-[#4867D6]">
                        <p>In Progress</p>

                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>John Doe</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="py-8 border-4 border-l-[#4867D6] text-[#4867D6]">
                        
                        <p>In Progress</p>
                        <button className="mr-2 mt-4">
                          
                        </button>
                        <button >
                          
                        </button>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td>John Doe</td>
                      <td className="border-2 py-8">Complete</td>
                      <td className="py-8 border-4 border-l-[#4867D6] text-[#4867D6]">
                        In Progress
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="text-center">
                      <td>John Doe</td>
                      <td className="py-8 border-4 border-l-[#4867D6] text-[#4867D6]">
                        In Progress
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default DocSchedule;
