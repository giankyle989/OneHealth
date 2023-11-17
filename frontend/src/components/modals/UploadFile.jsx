import React, { useState } from "react";
import { useStore } from "../../store";

const UploadFile = ({ visible, onClose, id }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    await setFilename(selectedFile.name); // Wait for the state to be updated
  };

  const { createLabResult } = useStore();

  const handleUpdate = async () => {
    
    try {
      const formData = new FormData();
      formData.append('appointmentId', id);
      formData.append('filename', filename);
      formData.append('file', file);
  
      await createLabResult(id, formData);
      onClose();
      console.log("Frontend: "+ formData)
    } catch (error) {
      console.error('Error creating lab result:', error);
    }
    
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
          <h2 className="text-2xl font-semibold">Upload Lab Result</h2>
        </div>
        <div className="modal-content p-4">
        <input name='file' type="file" onChange={handleFileChange} />
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

export default UploadFile;
