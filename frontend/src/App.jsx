import { Route, Routes } from "react-router-dom";
import PatientLogin from "./views/patient/PatientLogin";
import PatientDashboard from "./views/patient/PatientDashboard";
import PatientCreateAppointment from "./views/patient/PatientCreateAppointment";
import PatientRegister from "./views/patient/PatientRegister";
import PatientHome from "./views/patient/PatientHome";
import PatientProfile from "./views/patient/PatientProfile";

function App() {
  return (
  <>
    <Routes>
      <Route path="/patient/" element={<PatientHome/>}/>
      <Route path="/patient/profile" element={<PatientProfile/>}/>
      <Route path="/patient/view-appointment" element={<PatientDashboard/>}/>
      <Route path="/patient/book" element={<PatientCreateAppointment/>}/>
      <Route path="/patient/login" element={<PatientLogin/>}/>
      <Route path="/patient/register" element={<PatientRegister/>}/>
    </Routes>
  </>
  );
}

export default App;
