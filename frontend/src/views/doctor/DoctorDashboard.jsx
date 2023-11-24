import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useStore } from "../../store";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { PieChart, Pie, Tooltip } from "recharts";

const DoctorDashboard = () => {
  const [userRole, setUserRole] = useState("doctor");
  const { appointments, getAllTimeAppointments } = useStore();

  useEffect(() => {
    // Get token object
    const tokenObject = JSON.parse(localStorage.getItem("token"));
    const token = tokenObject.token;
    // Fetch all-time appointments and update the store
    getAllTimeAppointments(token);
  }, []);

  const diagnosisFrequency = Array.isArray(appointments)
    ? appointments.reduce((acc, appointment) => {
        const diagnosis = appointment.diagnosis
          ? appointment.diagnosis.name
          : "Unknown";
        acc[diagnosis] = (acc[diagnosis] || 0) + 1;
        return acc;
      }, {})
    : {};

    console.log(appointments)
  // Sort the diagnoses by frequency in descending order
  const sortedDiagnoses = Object.entries(diagnosisFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const pieChartData = sortedDiagnoses.map(([name, value]) => ({
    name,
    value,
  }));

  // Check if pieChartData is empty
  const isPieChartDataEmpty = pieChartData.length === 0;

  const sortedAppointments = [...appointments].sort((a, b) => {
    const startTimeA = new Date(a.start);
    const startTimeB = new Date(b.start);
    return startTimeA - startTimeB;
  });

  const today = new Date().toLocaleDateString();

  // Filter appointments for today
  const appointmentsForToday = sortedAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.start).toLocaleDateString();
    return appointmentDate === today;
  });

  const nextPatient =
    appointmentsForToday.length > 0 ? appointmentsForToday[0] : null;
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar userRole={userRole} />
      {/* Container */}
      <section className=" p-2">
        <div className="flex gap-x-2 p-2 h-1/2">
          <div className="bg-white rounded-md w-1/5 flex items-center shadow-lg p-4">
            {appointmentsForToday.length === 0 ? (
              <p className="text-center">No appointments for today </p>
            ) : (
              <p className="text-center">
                TOTAL NUMBER OF PATIENTS BOOKED FOR THE DAY:{" "}
                {appointmentsForToday.length}
              </p>
            )}
          </div>
          <div className="bg-white rounded-md w-2/5 shadow-lg p-4">
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
          <div className="bg-white rounded-md w-2/5 shadow-lg p-4">
            <p className="text-center">NEXT PATIENT DETAILS</p>
            {nextPatient ? (
              <>
                <div className="grid grid-cols-2 gap-x-4">
                  <p>
                    Name: {nextPatient.patientFirstName}{" "}
                    {nextPatient.patientLastName}
                  </p>
                  <p>Appointment ID: {nextPatient._id}</p>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                  <p>
                    Birthday: {nextPatient.patientBirthday || "Not available"}
                  </p>
                  <p>Sex: {nextPatient.patientSex || "Not available"}</p>
                  <p>
                    Last Appointment:{" "}
                    {nextPatient.lastAppointment
                      ? new Date(
                          nextPatient.lastAppointment
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div className="grid grid-cols-1">
                  <p>
                    Patient History:{" "}
                    {nextPatient.patientHistory || "Not available"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center">No upcoming appointments for today</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 p-4 min-h-1/2">
          <div className="flex justify-center items-center bg-white shadow-lg rounded-md p-4 min-h-1/2">
            <div>
            <p className="font-bold text-3xl text-center">Monthly Diagnosis</p>
            {isPieChartDataEmpty ? (
              <p>No data available for the pie chart</p>
            ) : (
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value" // Use dataKey instead of valueKey
                  label
                />
                <Tooltip />
              </PieChart>
            )}
            </div>
            <div className="bg-white shadow-lg rounded-md p-4">
              <h2>Additional Information</h2>
              <p>Total Appointments: {appointments.length}</p>
              <p>Most Common Diagnosis: {sortedDiagnoses[0]?.[0] || "N/A"}</p>
              <p>
                Second Most Common Diagnosis: {sortedDiagnoses[1]?.[0] || "N/A"}
              </p>
              <p>
                Third Most Common Diagnosis: {sortedDiagnoses[2]?.[0] || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-md p-4">
            <h2>APPOINTMENT TODAY</h2>
            {appointmentsForToday.length > 0 ? (
              <ul>
                {appointmentsForToday.map((appointment) => (
                  <li className="grid grid-cols-2" key={appointment._id}>
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
