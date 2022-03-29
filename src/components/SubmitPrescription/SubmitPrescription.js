import React from "react";
import { navigate } from "react-router";
import { useNavigate } from "react-router";

function SubmitPrescription() {
  let navigate = useNavigate();
  return (
    <div className="h-screen">
      <div
        className="ion-padding background-primary font-semibold rounded-sm flex items-center "
        style={{ height: "8%" }}
      >
        <img
          onClick={() => navigate(-1)}
          src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
          style={{
            height: "25px",
            width: "20px",
            marginRight: "10px",
          }}
        />
        <span>Upload Prescription</span>
      </div>
      <div className="bg-slate-100 " style={{ height: "92%" }}>
        <div className="flex items-center justify-center ion-padding 	">
          <div
            className="bg-black rounded-lg"
            style={{ width: "350px", height: "320px" }}
          ></div>
        </div>

        <div className="ion-padding">
          <div
            className=" w-full flex flex-col "
            style={{ border: "1px solid grey" }}
          >
            <label className="bg-white">Additional Note</label>
            <textarea
              className="border-0	"
              type="text"
              placeholder="Enter any additional information regarding your order"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPrescription;
