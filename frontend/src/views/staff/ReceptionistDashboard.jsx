import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from "recharts";

const ReceptionistDashboard = () => {
  const [userRole, setUserRole] = useState("receptionist");

    // Sample data for the bar chart
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
              <p className="text-center">
                CHECKED OUT PATIENTS:
              </p>
            </div>
            <div className="bg-white rounded-md">
              <p className="text-center">
                CHECKED IN PATIENTS:
              </p>
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
