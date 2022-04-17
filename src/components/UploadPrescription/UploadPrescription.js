import React, { useState } from "react";
import { userDataAtom } from "../../Recoil/atom";
import { useRecoilValue } from "recoil";

import config from "../../Services/config";
import { useNavigate } from "react-router";
import PrescriptionPopUp from "../PrescriptionPopUp";

function UploadPrescription(props) {
  let navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);
  const userData = useRecoilValue(userDataAtom);

  const prescriptionClick = () => {
    userData ? setShowPopUp(!showPopUp) : navigate("/login-page");
  };

  return (
    <>
      <div className="py-2 px-2 flex justify-between">
        <div
          className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
          onClick={prescriptionClick}
        >
          <span className="text-sm font-semibold	text-white">
            Upload Prescription
          </span>
          <img src="/assets/icons/rx.png" className="w-4 ml-1" alt="" />
        </div>
        <a
          href={`https://api.whatsapp.com/send?phone=${config.whatsappNumber}`}
          target="_blank"
          className="background-secondary px-2 py-3 flex rounded-full  items-center justify-center"
        >
          <span className="text-sm font-semibold	text-white">
            Order On Whatsapp
          </span>
          <img src="/assets/icons/whatsapp.png" className="w-4 ml-1" alt="" />
        </a>
      </div>
      <PrescriptionPopUp
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        navigateToSubmitPage={true}
      />
    </>
  );
}

export default UploadPrescription;
