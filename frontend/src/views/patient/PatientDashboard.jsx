import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios"

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([])
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
    axios.get("http://localhost:5000/api/patient/appointment/get", headerToken)
      .then((res) => {
        // Sort the appointments by appointmentDateTime
        const sortedAppointments = res.data.sort((a, b) =>
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
        <h1 className="text-xl  font-bold pt-10 text-center">{tokenObject.first_name}'s Appointment</h1>
      </header>
      <section className="pt-10">
        <div className="overflox-x-auto relative">
            <table className="w-96 text-sm text-left mx-auto">
                <thead className="text-xs bg-grey-300 uppercase bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 border border-black">Patient's Name</th>
                        <th className="py-3 px-6 border border-black">Department</th>
                        <th className="py-3 px-6 border border-black">Doctor's Name</th>
                        <th className="py-3 px-6 border border-black">Date</th>
                        <th className="py-3 px-6 border border-black">Time</th>
                        <th className="py-3 px-6 border border-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                  {appointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No appointments available
                  </td>
                </tr>
              ) :
                  (appointments.map(appointment => (
                    <tr key={appointment._id}>
                      <td className="border border-black">{appointment.patientName}</td>
                      <td className="border border-black">{appointment.doctorId.dept_id.name}</td>
                      <td className="border border-black">{appointment.doctorId.name}</td>
                      <td className="border border-black">{new Date(appointment.appointmentDateTime).toLocaleDateString()}</td>
                      <td className="border border-black">{new Date(appointment.appointmentDateTime).toLocaleTimeString()}</td>
                      <td className="border border-black">{appointment.appt_status}</td>
                    </tr>
                  )))}
                    
                </tbody>
            </table>
            
        </div>
      </section>

    </>
  );
};

export default PatientDashboard;
