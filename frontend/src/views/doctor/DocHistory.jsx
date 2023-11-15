import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useStore } from "../../store";

const DocHistory = () => {
  const [userRole, setUserRole] = useState("doctor");

  const { appointments, getTodaysAppointments, updateAppointmentStatus } = useStore()

  useEffect(() => {
    // Get token object
    const tokenObject = JSON.parse(localStorage.getItem("token"));
    const token = tokenObject.token;
    // Fetch appointments and update the store
    getTodaysAppointments(token);
  }, []);

  return (
    <div className="h-screen">
      <Navbar userRole={userRole} />
      <div>
        <div className="bg-white p-4">
          <div>
            <h1 className="text-center text-2xl text-[#4867D6] font-bold">
              Appointment History
            </h1>
          </div>
          <div className="mt-4">
            <div className="mt-2 text-center overflow-x-auto">
              <input
                type="text"
                placeholder="Search by Patient Name"
                className="my-4 p-4 border rounded"
              />
              <table className="w-full border-collapse border text-sm mx-auto">
                <thead className="text-xs bg-grey-300 uppercase bg-gray-50">
                  <tr className="text-white text-center">
                    <th className="py-6 px-6 bg-[#4867D6]">Date</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Time</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Patient Name</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Appointment ID</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Diagnosis</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Status</th>
                    <th className="py-6 px-6 bg-[#4867D6]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                    <tr>
                      <td>No data</td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr className="text-center" key={appointment._id}>
                        <td className="py-3 px-6">
                          {new Date(
                            appointment.appointmentDateTime
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6">
                          {new Date(
                            appointment.appointmentDateTime
                          ).toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-6">
                          {appointment.patientFirstName}
                          {}
                        </td>
                        <td className="py-3 px-6">{appointment._id}</td>
                        <td className="py-3 px-6">{appointment.diagnosis}</td>
                        <td className="py-3 px-6">{appointment.appt_status}</td>
                        <td className="py-3 px-6">
                          <button className="px-4 py-2 bg-[#4867D6] text-white rounded mr-2">
                            View Patient
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocHistory;
