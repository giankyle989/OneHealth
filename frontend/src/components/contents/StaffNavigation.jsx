import React, { useState } from 'react';

const StaffNavigation = () => {
  const [showPatientMenu, setShowPatientMenu] = useState(false);
  const [showAppointmentsMenu, setShowAppointmentsMenu] = useState(false);


  const togglePatientMenu = () => {
    setShowPatientMenu(!showPatientMenu);
  };

  const toggleAppointmentsMenu = () => {
    setShowAppointmentsMenu(!showAppointmentsMenu);
  };

  return (
    <>
      <li className='py-4'>
        <a href="/hospital/receptionist/doctor">
          Doctor
        </a>
      </li>
      <li className='py-4'>
        <a className='cursor-pointer' onClick={togglePatientMenu}>
          Patient
          {showPatientMenu ? ' ▲' : ' ▼'}
        </a>
        {showPatientMenu && (
          <ul>
            <li><a className='text-base' href="/hospital/receptionist/patient/find">- Find Patient</a></li>
            <li><a className='text-base' href="/hospital/receptionist/patient/create">- Create Patient Account</a></li>
          </ul>
        )}
      </li>
      <li className='py-4'>
        <a className='cursor-pointer' onClick={toggleAppointmentsMenu}>
          Appointments
          {showAppointmentsMenu ? ' ▲' : ' ▼'}
        </a>
        {showAppointmentsMenu && (
          <ul>
            <li><a className='text-base' href="/hospital/receptionist/appointment">- Find Appointment</a></li>
            <li><a className='text-base' href="/hospital/receptionist/appointment/create">- Create new appointment</a></li>
          </ul>
        )}
      </li>
      <li className='underline'><a href="#">Logout</a></li>
    </>
  );
}

export default StaffNavigation;
