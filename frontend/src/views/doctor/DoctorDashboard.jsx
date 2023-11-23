import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useStore } from "../../store";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { PieChart, Pie, Tooltip } from "recharts";

const DoctorDashboard = () => {
  const [userRole, setUserRole] = useState("doctor");
  const { appointments, getTodaysAppointments } = useStore();
  useEffect(() => {
    // Get token object
    const tokenObject = JSON.parse(localStorage.getItem("token"));
    const token = tokenObject.token;
    // Fetch appointments and update the store
    getTodaysAppointments(token);

  }, []);

  const doughnutChartData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
  ];

  const sortedAppointments = [...appointments].sort((a, b) => {
    const startTimeA = new Date(a.start);
    const startTimeB = new Date(b.start);
    return startTimeA - startTimeB;
  });

  const nextPatient =
    sortedAppointments.length > 0 ? sortedAppointments[0] : null;
  return (
    <div>
      <Navbar userRole={userRole} />
      {/* Container */}
      <section className="bg-gray-200 p-2">
        <div className="flex gap-x-2 p-2 h-1/2">
          <div className="bg-white rounded-md w-1/5 flex items-center">
            <p className="text-center">
              TOTAL NUMBER OF PATIENTS BOOKED FOR THE DAY: {appointments.length}
            </p>
          </div>
          <div className="bg-white rounded-md w-2/5">
            <div className="w-full">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  start: "prev",
                  center: "title",
                  end: "next",
                }}
                aspectRatio={2}
              />
            </div>
          </div>
          <div className="bg-white rounded-md w-2/5">
            <p className="text-center">NEXT PATIENT DETAILS</p>
            {nextPatient && (
              <>
                  <div className="grid grid-cols-2">
                    <p>
                      Name: {nextPatient.patientFirstName}{" "}
                      {nextPatient.patientLastName}
                    </p>
                    <p>Appointment ID: {nextPatient._id}</p>
                  </div>
                  <div className="grid grid-cols-3">
                    <p>Birthday:</p>
                    <p>Sex:</p>
                    <p>Last Appointment:</p>
                  </div>
                  <div className="grid grid-cols-1">
                    <p>Patient History: </p>
                  </div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 p-2 h-1/2">
          <div className="flex justify-center items-center bg-white">
            <PieChart width={400} height={400}>
              <Pie
                data={doughnutChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <div className=" bg-white">
            <h2>APPOINTMENT TODAY</h2>
            {sortedAppointments.length > 0 ? (
              <ul>
                {sortedAppointments.map((appointment) => (
                  <li className="grid grid-cols-2" key={appointment.id}>
                    <p>
                      Name: {appointment.patientFirstName}{" "}
                      {appointment.patientLastName}
                    </p>
                    <p>
                      Time:{" "}
                      {new Date(
                        appointment.appointmentDateTime
                      ).toLocaleTimeString()}
                    </p>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments for today</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
