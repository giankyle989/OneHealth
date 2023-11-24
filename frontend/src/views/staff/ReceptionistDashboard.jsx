import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { useReceptionistStore } from "../../store";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

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

  // Get today's date in Singapore time
  const singaporeTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Singapore",
  });
  const today = new Date(singaporeTime).toISOString().split("T")[0];

  // Filter availabilities for today
  const todayAvailabilities = availabilities.filter(
    (availability) =>
      availability.start.includes(today) || availability.end.includes(today)
  );

  // Get the list of available doctors
  const availableDoctors = todayAvailabilities.map(
    (availability) => availability.doctorId
  );

  // Filter appointments for today
  const todayAppointments = appointments.filter((appointment) =>
    appointment.appointmentDateTime.includes(today)
  );

  // Count checked-out patients
  const checkedOutPatients = todayAppointments.filter(
    (appointment) => appointment.appt_status === "Done"
  ).length;

  // Count checked-in patients
  const checkedInPatients = todayAppointments.filter(
    (appointment) =>
      appointment.appt_status !== "Upcoming" &&
      appointment.appt_status !== "Done"
  ).length;

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Aggregate appointments for each month
  const monthlyAppointments = appointments.reduce((acc, appointment) => {
    const appointmentMonth = new Date(
      appointment.appointmentDateTime
    ).getMonth();
    acc[monthNames[appointmentMonth]] =
      (acc[monthNames[appointmentMonth]] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const data = monthNames.map((month) => ({
    month,
    value: monthlyAppointments[month] || 0,
  }));

  // Calculate percentage change compared to the previous month
  const calculatePercentageChange = (currentMonth, previousMonth) => {
    if (previousMonth === 0 && currentMonth === 0) {
      return "No Data";
    } else if (previousMonth === 0) {
      return "Infinity";
    } else {
      return (
        (
          ((currentMonth - previousMonth) / Math.abs(previousMonth)) *
          100
        ).toFixed(2) + "%"
      );
    }
  };

  // Find the index of the previous month
  const previousMonthIndex = monthNames.indexOf(
    monthNames[monthNames.length - 2]
  );

  // Calculate the percentage change
  const percentageChange = calculatePercentageChange(
    data[data.length - 1].value,
    data[previousMonthIndex].value
  );

  const busiestMonth = data.reduce((max, currentMonth) =>
    currentMonth.value > max.value ? currentMonth : max
  );

  const excelData = data.map((item) => ({
    month: item.month,
    value: item.value,
    percentChange: calculatePercentageChange(
      item.value,
      data[previousMonthIndex]?.value || 0
    ),
  }));

  const formatTime = (startTime, endTime) => {
    const formattedStartTime = new Date(startTime).toLocaleTimeString();
    const formattedEndTime = new Date(endTime).toLocaleTimeString();
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
    <div className="flex h-screen">
      <Sidebar userRole={userRole} />
      <section className="w-full bg-gray-200 p-4 overflow-auto">
        <div className="flex gap-x-4 p-4">
          <div className="rounded-md w-1/12 grid gap-y-2">
            <div className="bg-white rounded-md p-2 shadow-lg">
              <p className="text-center">
                CHECKED OUT PATIENTS: {checkedOutPatients}
              </p>
            </div>
            <div className="bg-white rounded-md p-2 shadow-lg">
              <p className="text-center">
                CHECKED IN PATIENTS: {checkedInPatients}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-md w-2/5 p-4 shadow-lg">
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
          <div className="bg-white rounded-md w-1/2 p-4 shadow-lg">
            <p className="text-center font-bold text-xl mb-4">
              AVAILABLE DOCTORS
            </p>
            {availableDoctors.length === 0 ? (
              <p className="text-center">No Doctors</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Specialization</th>
                    <th className="py-2">Department</th>
                    <th className="py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {availableDoctors.map((doctor) => (
                    <tr key={doctor._id} className="border-b">
                      <td className="py-2 text-center">
                        {doctor.firstName} {doctor.lastName}
                      </td>
                      <td className="py-2 text-center">
                        {doctor.specialization}
                      </td>
                      <td className="py-2 text-center">
                        {doctor.dept_id.name}
                      </td>
                      <td className="py-2 text-center"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="bg-white rounded-md p-4 shadow-lg">
          <div className="w-full">
            <p className="text-center font-bold text-xl mb-4">
              Monthly Appointments
            </p>

            <div className="flex items-center justify-center">
              <BarChart
                width={window.innerWidth * 0.7}
                height={350}
                data={data}
                className="w-full"
              >
                <XAxis dataKey="month" interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4867D6" barSize={30} />
              </BarChart>
            </div>

            <p className="text-center mt-4">
              Total Appointments:{" "}
              {data.reduce((acc, item) => acc + item.value, 0)}
            </p>

            <p className="text-center mt-4">
              Percentage Change: {percentageChange}
            </p>

            <p className="text-center mt-4">
              Busiest Day: {busiestMonth.month} ({busiestMonth.value}{" "}
              Appointments)
            </p>

            {/* Export to Excel button */}
            <div className="text-center mt-4">
              <ReactHtmlTableToExcel
                className="p-4 text-white bg-[#4867D6]"
                table="monthly-appointments-table"
                filename="monthly-appointments"
                sheet="sheet 1"
                buttonText="Export to Excel"
              />
            </div>

            {/* Table for export */}
            <table id="monthly-appointments-table" style={{ display: "none" }}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Value</th>
                  <th>Percentage Change</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((item) => (
                  <tr key={item.month}>
                    <td>{item.month}</td>
                    <td>{item.value}</td>
                    <td>{item.percentChange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReceptionistDashboard;
