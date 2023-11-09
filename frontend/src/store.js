import {create} from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
  appointments: [],
  getTodaysAppointments: (token) => {
    axios
      .get("http://localhost:5000/api/doctor/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Process your data as needed
        const sortedAppointments = res.data.sort(
          (a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
        );

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()); // Tomorrow's date

        const tomorrowAppointments = sortedAppointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.appointmentDateTime);
          return (
            appointmentDate.getDate() === tomorrow.getDate() &&
            appointmentDate.getMonth() === tomorrow.getMonth() &&
            appointmentDate.getFullYear() === tomorrow.getFullYear()
          );
        });

        set({ appointments: tomorrowAppointments });
      })
      .catch((err) => console.log(err));
  },
  updateAppointmentStatus: (id, status, token) => {
    axios.put(`http://localhost:5000/api/doctor/appointment/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("updated");
      set((state) => ({ appointments: [...state.appointments] }));
      location.reload();
    })
    .catch((err) => console.log(`Error: ${err}`));
  },
  addDiagnosis: (id, diagnosis) => {
    axios.put(`http://localhost:5000/api/doctor/appointment/diagnosis/${id}`, { diagnosis })
      .then((res) => {
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, diagnosis } : appointment
          ),
        }));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

}));
