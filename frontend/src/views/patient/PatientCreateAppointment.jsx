import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const PatientCreateAppointment = () => {
  {
    /**Select inputs */
  }
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("Medical Check up");

  const tokenObject = JSON.parse(localStorage.getItem("token"));
  const token = tokenObject.token;

  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/department/get")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(
          `http://localhost:5000/api/doctor/department/${selectedDepartment}`
        )
        .then((res) => {
          setDoctors(res.data);
        });
    }
  }, [selectedDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      patientFirstName,
      patientLastName,
      email,
      mobileNumber,
      doctorId: selectedDoctor,
      appointmentDateTime,
      reason
    };

    axios
      .post(
        "http://localhost:5000/api/patient/appointment/create",
        appointment,
        headerToken
      )
      .then((res) => {
        console.log(res.data);
        setPatientFirstName("");
        setPatientLastName("");
        setEmail("");
        setMobileNumber("");
        setSelectedDoctor("");
        setAppointmentDateTime("");
        console.log(appointment);
        window.location = "/";
      })
      .catch((err) => console.log("Error: " + err));
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center ">
        <div className=" p-6 md:w-4/5">
          <h1 className="text-3xl font-semibold mb-4 text-center text-[#4867D6]">
            Book an Appointment
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-4">
                <label className="block">First Name:</label>
                <input
                  className="border border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Enter your first name"
                  value={patientFirstName}
                  onChange={(e) => setPatientFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block">Last Name:</label>
                <input
                  className="border border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Enter your last name"
                  value={patientLastName}
                  onChange={(e) => setPatientLastName(e.target.value)}
                />
              </div>
            </div>
            <h1 className=" text-sm italic"> &bull; Fill atleast one</h1>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-4">
                <label className="block">Email:</label>
                <input
                  className="border border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block">Mobile Number:</label>
                <input
                  className="border border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-4">
                <label className="block">Choose Department:</label>
                <select
                  value={selectedDepartment}
                  onChange={(event) =>
                    setSelectedDepartment(event.target.value)
                  }
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
                     Dr. {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="mb-4">
                <label className="block">Reason for Appointment</label>
                <select
                  className="border border-gray-300 p-2 w-full"
                  type="text"
                  placeholder="Select reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="Medical Check-up">Medical Check-up</option>
                  <option value="Follow up Check-up">Follow up Check-up</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block">Select Date and Time:</label>
                <input
                  className="border border-gray-300 p-2 w-full"
                  type="datetime-local"
                  value={appointmentDateTime}
                  onChange={(e) => setAppointmentDateTime(e.target.value)}
                />
              </div>
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
