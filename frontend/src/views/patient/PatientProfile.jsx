import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { BiEdit } from "react-icons/bi";

const PatientProfile = () => {
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

  // Function to format the date as "month day, year"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patient/get", headerToken)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setSex(res.data.sex);
        setBirthday(formatDate(res.data.birthday)); // Format the date
        setEmail(res.data.email);
        setMobileNumber(res.data.mobileNumber);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <section>
          <h1 className="text-center font-semibold text-2xl mt-8 text-[#4867D6] mb-8">
            User Profile
          </h1>
          <div className="grid grid-cols-1 w-4/5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 text-left text-lg break-words">
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">First Name:</label>
                <p>{firstName}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Last Name:</label>
                <p>{lastName}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Sex:</label>
                <p>{sex}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Date of Birth:</label>
                <p>{birthday}</p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Email:</label>
                <p className="grid grid-cols-2 gap-x-2">
                  {email}
                  <span className="mt-1.5 cursor-pointer">
                    <BiEdit />
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 mb-8">
                <label className="font-semibold">Mobile Number:</label>
                <p className="grid grid-cols-2 gap-x-2">
                  {mobileNumber}{" "}
                  <span alt="Edit" className="mt-1.5 cursor-pointer">
                    <BiEdit />
                  </span>
                </p>
              </div>
            </div>
            <button className="p-4 mt-10 w-72 md: mx-auto bg-[#4867D6] rounded-full text-white hover:bg-white hover:text-black hover:border hover:border-black active:bg-gray-200 ">
              Change Password
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PatientProfile;
