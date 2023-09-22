import { Route, Routes } from "react-router-dom";
import PatientLogin from "./views/patient/PatientLogin";
import PatientDashboard from "./views/patient/PatientDashboard";
import PatientCreateAppointment from "./views/patient/PatientCreateAppointment";
import PatientRegister from "./views/patient/PatientRegister";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<PatientDashboard/>}/>
      <Route path="/create" element={<PatientCreateAppointment/>}/>
      <Route path="/patient/login" element={<PatientLogin/>}/>
      <Route path="/patient/register" element={<PatientRegister/>}/>
    </Routes>
  </>
  );
}

export default App;
