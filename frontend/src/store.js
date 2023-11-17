import {create} from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
  appointments: [],
  
  //Doctor Functions
  getTodaysAppointments: (token) => {
    axios
      .get("http://localhost:5000/api/doctor/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        
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
  getAllTimeAppointments: (token) => {
    axios
      .get("http://localhost:5000/api/doctor/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        

        set({ appointments: res.data });
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
  },
  createPrescription: async (id, medicines) => {
    try {
      const response = await axios.post("http://localhost:5000/api/doctor/appointment/prescription/create", {
        appointmentId: id,
        medicines: medicines // Assuming 'medicines' is an array of objects containing medicine details
      });
      console.log("Prescription created:", response.data);
      // Handle any state update or other actions after successfully creating the prescription
    } catch (error) {
      console.error("Error creating prescription:", error);
      // Handle error scenarios or inform the user accordingly
    }
 },


 //Nurse Functions
  getAllTodaysAppointments: (token) => {
    axios
      .get("http://localhost:5000/api/nurse/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Process your data as needed
        const sortedAppointments = res.data.sort(
          (a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
        );


        set({ appointments: sortedAppointments });
      })
      .catch((err) => console.log(err));
  },


  createLabResult: async (id, formData) => {
    console.log(formData)
    try {
      const response = await axios.post(`http://localhost:5000/api/nurse/appointment/labresult/create/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Lab Result created:', response.data);
    } catch (error) {
      console.error('Error creating lab result:', error);
    }
  },


}));

export const useReceptionistStore = create((set) =>({
  appointments: [],
  getAllTodaysAppointments: (token) => {
    axios
      .get("http://localhost:5000/api/receptionist/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Process your data as needed
        const sortedAppointments = res.data.sort(
          (a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
        );
  
  
        set({ appointments: sortedAppointments });
      })
      .catch((err) => console.log(err));
  },
}))


export const usePatientStore = create((set) => ({
  appointments:[],
  getAppointments: (token) => {
    return axios
      .get("http://localhost:5000/api/patient/appointment/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set({ appointments: res.data})
      })
      .catch((err) => {
        console.log(err);
        throw err; // Rethrow the error to be caught in the useEffect
      });
  },
}))