import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const PatientCreateAppointment = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [patientName, setPatientName] = useState("");
  
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  const token = tokenObject.token;

  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/department/get")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios.get(`http://localhost:5000/api/doctor/department/${selectedDepartment}`)
        .then((res) => {
          setDoctors(res.data);
        });
    }
  }, [selectedDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      patientName,
      doctorId: selectedDoctor,
      appointmentDateTime,
    };

    
    axios.post("http://localhost:5000/api/patient/appointment/create", appointment, headerToken)
      .then((res) => {
        console.log(res.data);
        setPatientName("");
        setSelectedDoctor("");
        setAppointmentDateTime("");
        console.log(appointment)
        window.location = "/";
      })
      .catch((err) => console.log("Error: " + err));
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md p-6 rounded-lg w-full sm:w-96">
          <h1 className="text-xl font-bold mb-4 text-center">
            Create New Appointment
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block">Name:</label>
              <input
                className="border border-gray-300 p-2 w-full"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Choose Department:</label>
              <select
                value={selectedDepartment}
                onChange={(event) => setSelectedDepartment(event.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select a Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label>Select Doctor:</label>
              <select
                value={selectedDoctor}
                onChange={(event) => setSelectedDoctor(event.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block">Date and Time:</label>
              <input
                className="border border-gray-300 p-2 w-full"
                type="datetime-local"
                value={appointmentDateTime}
                onChange={(e) => setAppointmentDateTime(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                type="submit"
              >
                Create Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PatientCreateAppointment;
