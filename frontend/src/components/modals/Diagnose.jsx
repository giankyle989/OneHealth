import React, { useState, useEffect } from "react";
import { useStore } from "../../store";
import axios from "axios";

const Diagnose = ({ visible, onClose, id }) => {
  const [departments, setDepartments] = useState([])
  const { addDiagnosis } = useStore();
  const [diagnoses, setDiagnoses] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");


  useEffect(() => {
   axios.get('http://localhost:5000/api/doctor/department')
        .then((res) => {
          setDepartments(res.data)
        })
        .catch((err) => ("Error: "+ err))
  }, [])

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(
          `http://localhost:5000/api/doctor/diagnosis/${selectedDepartment}`
        )
        .then((res) => {
          setDiagnoses(res.data);
        });
    }
  }, [selectedDepartment]);
  
  const handleUpdate = () => {
    addDiagnosis(id, selectedDiagnosis);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="modal-container bg-white w-96 rounded-lg shadow-lg z-50 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="modal-header bg-[#4867D6] text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Patient's Diagnosis</h2>
        </div>
        <div className="modal-content p-4">
          <label className="block">Department</label>
          <select
            className="bg-[#ccd6f6] p-2 focus:outline-none text-black"
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>{department.name}</option>
            ))}
          </select>

          <label className="block mt-4">Diagnosis Name</label>
          <select
            className="bg-[#ccd6f6] p-2 focus:outline-none text-black"
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
          >
            <option value="">Select Name</option>
            {diagnoses.map((diag) => (
              <option key={diag._id} value={diag._id}>{diag.name}</option>
            ))}
          </select>
        </div>
        <div className="modal-footer bg-gray-100 p-4 rounded-b-lg flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-[#4867D6] hover:bg-[#32499b] text-white px-4 py-2 rounded-lg focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
