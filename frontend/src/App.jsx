import { Route, Routes } from "react-router-dom";
import PatientLogin from "./views/patient/PatientLogin";
import PatientDashboard from "./views/patient/PatientDashboard";
import PatientCreateAppointment from "./views/patient/PatientCreateAppointment";

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<PatientDashboard/>}/>
      <Route path="/create" element={<PatientCreateAppointment/>}/>
      <Route path="/patient/login" element={<PatientLogin/>}/>
    </Routes>
  </>
  );
}

export default App;
