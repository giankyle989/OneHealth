import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { usePatientStore } from "../../store";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const PatientProfile = () => {
  const [userRole, setUserRole] = useState("patient");
  const [id , setId] = useState()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [sex, setSex] = useState();
  const [birthday, setBirthday] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();

  // Get token object
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  // Get token string only
  const token = tokenObject.token;
  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { getAppointments, appointments } = usePatientStore();

  const calendarEvents = appointments.map((appointment) => {
    const newDate = new Date(appointment.appointmentDateTime)
    newDate.setHours(newDate.getHours() + 8);
    return {
      title: "Appointment",
      start: newDate
    };
  });
  const today = new Date();
  const upcomingAppointments = appointments
    .filter((appointment) => new Date(appointment.appointmentDateTime) >= today)
    .sort(
      (a, b) =>
        new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
    )
    .slice(0, 2);

  const formatAppointmentDate = (dateString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  // Function to format the date as "month day, year"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patient/get", headerToken)
      .then((res) => {
        const { firstName, lastName, sex, birthday, email, mobileNumber, _id} = res.data;
        setFirstName(firstName);
        setLastName(lastName);
        setSex(sex);
        setBirthday(formatDate(birthday));
        setEmail(email);
        setMobileNumber(mobileNumber);
        setId(_id)
      })
      .catch((err) => console.log(err));

      getAppointments(token);
  }, []);


  const notify = () => {

    toast.success("Updated Profile !", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4500,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatePatient = {
      firstName,
      lastName,
      email,
      mobileNumber
    }

    axios.put(`http://localhost:5000/api/patient/${id}`, updatePatient ,headerToken)
          .then((res) => {
            notify()
            setTimeout(() => {
              window.location = "/";
            }, 5000);
          })
          .catch((err) => console.log("Error: " + err))
    

  }

  return (
    <>
    <ToastContainer/>
      <Navbar userRole={userRole} />
      <div className="h-screen flex flex-col lg:flex-row p-8 gap-x-4 bg-slate-100">
        <section className="h-full lg:w-2/5 bg-white shadow-lg rounded-lg border-2">
          <h1 className="text-center font-semibold text-2xl mt-8 text-[#4867D6] mb-8">
            User Profile
          </h1>
          <form className="grid grid-cols-1 w-4/5 mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 text-left text-lg break-words text-[#4867D6]">
              <div className="grid grid-cols-2 mb-8 ">
                <label className="font-semibold">First Name:</label>
                <input
                  type="text"
                  className="border border-black rounded-full text-sm px-4 text-black"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Last Name:</label>
                <input
                  type="text"
                  className="border border-black rounded-full text-sm px-4 text-black"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Sex:</label>
                <p className="text-black">{sex}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Date of Birth:</label>
                <p className="text-black">{birthday}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Email:</label>
                <input
                  type="text"
                  className="border border-black rounded-full text-sm px-4 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Mobile Number:</label>
                <input
                  type="text"
                  className="border border-black rounded-full text-sm px-4 text-black"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <button className="mt-4 p-4 bg-[#4867D6] text-white rounded-full mx-auto" type="submit">Update Profile</button>
          </form>
        </section>
        <section className="h-full w-full bg-white shadow-lg rounded-lg border-2 p-8">
          <div className="">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "",
                center: "title",
                end: "prev,next",
              }}
              height={450}
              events={calendarEvents}
              timeZone="Asia/Manila"
            />
          </div>
          <div className="gap-y-2 mt-4 flex flex-col">
            <h1 className="font-bold text-[#4867D6]">Upcoming Appointments</h1>
            <div className="flex gap-x-2">
              {upcomingAppointments.length === 0 ? (
                <>
                  <div className="p-6 bg-[#4867D6] w-full rounded-lg text-white ">
                    No upcoming appointments
                  </div>
                  <div className="p-6 bg-[#4867D6] w-full rounded-lg text-white ">
                    No upcoming appointments
                  </div>
                </>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id} // Assuming your appointment objects have an id
                    className="p-6 bg-[#4867D6] w-full rounded-lg text-white "
                  >
                    {`Upcoming Schedule: ${formatAppointmentDate(
                      appointment.appointmentDateTime
                    )}`}
                  </div>
                ))
              )}
            </div>
            <a href="/patient/view-appointment" className="mt-4 p-4 bg-[#4867D6] text-white rounded-full mx-auto">
              View Appointment History
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default PatientProfile;
