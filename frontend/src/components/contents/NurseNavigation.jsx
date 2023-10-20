import React, { useState } from "react";

const NurseNavigation = () => {
  const [showAppointmentsMenu, setShowAppointmentsMenu] = useState(false);

  const toggleAppointmentsMenu = () => {
    setShowAppointmentsMenu(!showAppointmentsMenu);
  };

  return (
    <>
      <li className="py-4">
        <a href="#" onClick={toggleAppointmentsMenu}>
          Appointments
          {showAppointmentsMenu ? " ▲" : " ▼"}
        </a>
        {showAppointmentsMenu && (
          <ul>
            <li>
              <a className="text-base" href="/nurse">
                - Requests
              </a>
            </li>
            <li>
              <a className="text-base" href="/nurse/schedule">
                - Schedule
              </a>
            </li>
          </ul>
        )}
      </li>
      <li className='underline'><a href="#">Logout</a></li>
    </>
  );
};

export default NurseNavigation;
