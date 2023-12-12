import React, { useState } from "react";
import Scanner from "../../components/Scanner";
import Navbar from "../../components/Navbar";
const ReceptionistScanner = () => {
  const [userRole, setUserRole] = useState("receptionist");
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  const token = tokenObject.token;

  const headerToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    <>
    <Navbar userRole={userRole} />
    <div>
      <Scanner
        role={userRole}
      />

    </div>
  </>
  );
};

export default ReceptionistScanner;
