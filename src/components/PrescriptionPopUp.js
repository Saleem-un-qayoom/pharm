import React from "react";
import { useNavigate } from "react-router";
import { prescriptionImageAtom } from "../Recoil/atom";
import { useSetRecoilState } from "recoil";

function PrescriptionPopUp({
  showPopUp,
  setShowPopUp,
  handleImage,
  navigateToSubmitPage = false,
}) {
  let navigate = useNavigate();

  const setPrescriptionImage = useSetRecoilState(prescriptionImageAtom);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (navigateToSubmitPage) {
        setPrescriptionImage(URL.createObjectURL(event.target.files[0]));
        setShowPopUp(false);
        navigate("/submit-prescription");
      } else {
        handleImage(URL.createObjectURL(event.target.files[0]));
        setShowPopUp(false);
      }
    }
  };

  return showPopUp ? (
    <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
      <div className="relative  py-12 w-19 bg-white">
        <div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
          <p className="text-xs font-w-500">Choose Prescription Image</p>
        </div>
        <div className="flex flex-col mx-20 ">
          <label
            for="cameraFileInput"
            className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
          >
            <span class="btn">Open camera</span>

            <input
              id="cameraFileInput"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onImageChange}
            />
          </label>
          <label
            for="cameraFileInput"
            className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
          >
            <span class="btn">Choose From Gallary</span>

            <input
              id="cameraFileInput"
              type="file"
              accept="image/*"
              onChange={onImageChange}
            />
          </label>
          <span
            className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
            onClick={() => setShowPopUp(false)}
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default PrescriptionPopUp;
