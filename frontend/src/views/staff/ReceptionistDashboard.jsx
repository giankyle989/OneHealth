import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { useReceptionistStore } from "../../store";

const ReceptionistDashboard = () => {
  const [userRole, setUserRole] = useState("receptionist");
  const {
    appointments,
    availabilities,
    getAllAppointments,
    getAllAvailability,
  } = useReceptionistStore();

  useEffect(() => {
    getAllAppointments();
    getAllAvailability();

  }, []);

  const today = new Date().toLocaleString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
  // Filter availabilities for today
  const todayAvailabilities = availabilities.filter(
    (availability) => availability.date === today
  );

  // Get doctors associated with the available slots
  const availableDoctors = todayAvailabilities.map(
    (availability) => availability.doctor
  );

    // Filter appointments for today
    const todayAppointments = appointments.filter(
      (appointment) => appointment.appointmentDateTime.includes(today)
    );
  
    // Count checked-out patients
    const checkedOutPatients = todayAppointments.filter(
      (appointment) => appointment.appt_status === "Done"
    ).length;
  
    // Count checked-in patients
    const checkedInPatients = todayAppointments.filter(
      (appointment) =>
        appointment.appt_status !== "Upcoming" && appointment.appt_status !== "Done"
    ).length;

  const data = [
    { month: "January", value: 10 },
    { month: "February", value: 15 },
    { month: "March", value: 8 },
    // Add more months as needed
  ];
  return (
    <div className=" flex">
      <Sidebar userRole={userRole} />
      <section className="w-full bg-gray-200 p-2">
        <div className="flex gap-x-2 p-2 h-1/2">
          <div className=" rounded-md w-1/12 grid gap-y-2">
            <div className="bg-white rounded-md">
              <p className="text-center">CHECKED OUT PATIENTS: {checkedOutPatients}</p>
            </div>
            <div className="bg-white rounded-md">
              <p className="text-center">CHECKED IN PATIENTS: {checkedInPatients}</p>
            </div>
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
          <div className="bg-white rounded-md w-1/2">
            <p className="text-center">AVAILABLE DOCTORS</p>
            <ul>
              {availableDoctors.length === 0 ? (
                <li>No available doctors for today</li>
              ) : (
                availableDoctors.map((doctor) => (
                  <li key={doctor._id}>
                    {doctor.firstName} {doctor.lastName}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-md  h-1/2">
          <div className="flex justify-center items-center w-full bg-white"></div>
          <BarChart width={400} height={350} data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </section>
    </div>
  );
};

export default ReceptionistDashboard;
