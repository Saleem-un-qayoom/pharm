import React from "react";
import { useNavigate } from "react-router";
import PrescriptionPopUp from "../PrecriptionPopUp/PrescriptionPopUp";

function UploadPrescription(props) {
  const navigate = useNavigate();
  return (
    <div className="py-2 flex justify-between">
      <div
        className="background-primary px-2 py-3 flex rounded-full  items-center justify-center"
        onClick={props.popUpToggle}
      >
        <span className="text-sm font-semibold	text-white">
          Upload Prescription
        </span>
        <img
          className="ml-1"
          src="https://img.icons8.com/ios/70/000000/no-camera--v1.png"
          style={{ height: "20px" }}
        />
      </div>
      <div className="background-primary px-2 py-3 flex rounded-full  items-center justify-center">
        <span className="text-sm font-semibold	text-white">
          Order On Whatsapp
        </span>
        <img
          className="ml-1"
          src="https://img.icons8.com/ios/70/000000/no-camera--v1.png"
          style={{ height: "20px" }}
        />
      </div>
    </div>
  );
}

export default UploadPrescription;
