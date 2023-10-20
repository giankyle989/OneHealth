import { Route, Routes } from "react-router-dom";
import PatientLogin from "./views/patient/PatientLogin";
import PatientDashboard from "./views/patient/PatientDashboard";
import PatientCreateAppointment from "./views/patient/PatientCreateAppointment";
import PatientRegister from "./views/patient/PatientRegister";
import PatientHome from "./views/patient/PatientHome";
import PatientProfile from "./views/patient/PatientProfile";
import AddAnnouncement from './views/admin/announcement/AddAnnouncement'
import ManageAnnouncement from './views/admin/announcement/ManageAnnouncement'
import ManageDepartment from './views/admin/department/Department'
import AddDoctor from './views/admin/doctor/AddDoctor'
import ManageDoctor from './views/admin/doctor/ManageDoctor'
import AddNurse from './views/admin/nurse/AddNurse'
import ManageNurse from './views/admin/nurse/ManageNurse'
import ManageStaff from './views/admin/staff/Staff'
import HospitalLogin from "./views/auth/HospitalLogin";
import DocHistory from "./views/doctor/DocHistory";
import DocSchedule from "./views/doctor/DocSchedule";
import ManageSchedule from "./views/doctor/ManageSchedule";
function App() {
  return (
  <>
    <Routes>
      {/**Visitor Routes */}
      <Route path="/" element={<PatientHome/>}/>
      <Route path="/login" element={<PatientLogin/>}/>
      <Route path="/register" element={<PatientRegister/>}/>

      {/**Patient Routes */}
      <Route path="/patient/profile" element={<PatientProfile/>}/>
      <Route path="/patient/view-appointment" element={<PatientDashboard/>}/>
      <Route path="/patient/book" element={<PatientCreateAppointment/>}/>


      {/**Hospital Auth */}
      <Route path="/hospital/auth/login" element={<HospitalLogin/>}/>
      {/**Admin Routes */}
      <Route path="/hospital/admin/announcement/add" element={<AddAnnouncement/>}/>
      <Route path="/hospital/admin/announcement/manage" element={<ManageAnnouncement/>}/>
      <Route path="/hospital/admin" element={<ManageDepartment/>}/>
      <Route path="/hospital/admin/doctor/add" element={<AddDoctor/>}/>
      <Route path="/hospital/admin/doctor/manage" element={<ManageDoctor/>}/>
      <Route path="/hospital/admin/nurse/add" element={<AddNurse/>}/>
      <Route path="/hospital/admin/nurse/manage" element={<ManageNurse/>}/>
      <Route path="/hospital/admin/staff/manage" element={<ManageStaff/>}/>

      {/**Doctor Routes */}
      <Route path="/hospital/doctor/" element={<DocSchedule/>}/>
      <Route path="/hospital/doctor/appointments" element={<DocHistory/>} />
      <Route path="/hospital/doctor/availability" element={<ManageSchedule/>}/>
      

      {/**Nurse Routes */}

      {/**Staff Routes */}



    </Routes>
  </>
  );
}

export default App;
