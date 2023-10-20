import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  
  //Get token object
  const tokenObject = JSON.parse(localStorage.getItem("token"));

  //Get token string only

  const token = tokenObject.token;
  const username = tokenObject.name;

  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patient/appointment/get", headerToken)
      .then((res) => {
        // Sort the appointments by appointmentDateTime
        const sortedAppointments = res.data.sort(
          (a, b) =>
            new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
        );

        setAppointments(sortedAppointments);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <header className="pt-14 max-w-xs mx-auto">
        <h1 className="text-2xl  font-semibold text-[#4867D6] pt-10 text-center">
          {username}'s Appointment
        </h1>
      </header>
      <section className="pt-10">
        <div className="overflow-auto">
          <table className=" text-sm text-left">
            <thead className="text-xs bg-grey-300 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6 border border-black">Date</th>
                <th className="py-3 px-6 border border-black">Time</th>
                <th className="py-3 px-6 border border-black">
                  Patient's Name
                </th>
                <th className="py-3 px-6 border border-black">
                  Appointment ID
                </th>
                <th className="py-3 px-6 border border-black">Department</th>
                <th className="py-3 px-6 border border-black">Doctor's Name</th>
                <th className="py-3 px-6 border border-black">Reason</th>
                <th className="py-3 px-6 border border-black">Status</th>
                <th className="py-3 px-6 border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center text-lg font-semibold text-[#4867D6]">
                    No appointments available
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="border border-black">
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleDateString()}
                    </td>
                    <td className="border border-black">
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleTimeString()}
                    </td>
                    <td className="border border-black">
                      {appointment.patientFirstName}
                      {appointment.patientLastName}
                    </td>
                    <td className="border border-black">
                      APPT-{appointment._id}
                    </td>
                    <td className="border border-black">
                      {appointment.doctorId.dept_id.name}
                    </td>
                    <td className="border border-black">
                      Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                    </td>
                    <td className="border border-black">
                      {appointment.reason}
                    </td>
                    <td className="border border-black">
                      {appointment.appt_status}
                    </td>
                    <td className="border border-black">
                      Action
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default PatientDashboard;
