import React, { useState } from 'react';

const StaffNavigation = () => {
  const [showDoctorMenu, setShowDoctorMenu] = useState(false);
  const [showPatientMenu, setShowPatientMenu] = useState(false);
  const [showAppointmentsMenu, setShowAppointmentsMenu] = useState(false);

  const toggleDoctorMenu = () => {
    setShowDoctorMenu(!showDoctorMenu);
  };

  const togglePatientMenu = () => {
    setShowPatientMenu(!showPatientMenu);
  };

  const toggleAppointmentsMenu = () => {
    setShowAppointmentsMenu(!showAppointmentsMenu);
  };

  return (
    <>
      <li className='py-4'>
        <a href="#" onClick={toggleDoctorMenu}>
          Doctor
          {showDoctorMenu ? ' ▲' : ' ▼'}
        </a>
        {showDoctorMenu && (
          <ul>
            <li><a className='text-base' href="/staff">- Doctor Information</a></li>
          </ul>
        )}
      </li>
      <li className='py-4'>
        <a href="#" onClick={togglePatientMenu}>
          Patient
          {showPatientMenu ? ' ▲' : ' ▼'}
        </a>
        {showPatientMenu && (
          <ul>
            <li><a className='text-base' href="/staff/findpatient">- Find Patient</a></li>
            <li><a className='text-base' href="/staff/createpatient">- Create Patient Account</a></li>
          </ul>
        )}
      </li>
      <li className='py-4'>
        <a href="#" onClick={toggleAppointmentsMenu}>
          Appointments
          {showAppointmentsMenu ? ' ▲' : ' ▼'}
        </a>
        {showAppointmentsMenu && (
          <ul>
            <li><a className='text-base' href="/staff/findappointment">- Find Appointment</a></li>
            <li><a className='text-base' href="/staff/createappointment">- Create new appointment</a></li>
          </ul>
        )}
      </li>
      <li className='underline'><a href="#">Logout</a></li>
    </>
  );
}

export default StaffNavigation;
