import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { storeMobileNumberAtom } from "../../../Recoil/atom";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const storeMobileNumber = useRecoilValue(storeMobileNumberAtom);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (window.location.pathname.indexOf("sign-up") !== -1) {
      navigate("/add-user-details");
    } else if (window.location.pathname.indexOf("forget-password") !== -1) {
      navigate("/create-new-password");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center ion-padding h-40">
        <img
          src="https://img.icons8.com/ios/70/000000/no-camera--v1.png"
          alt=""
        />
      </div>
      <div className="ion-padding  ">
        <p className="font15 text-center text-xl font-w-500">
          Enter the 6-digit code sent to you
        </p>

        <p className="font15 text-center text-xl font-w-500">
          at +91-{storeMobileNumber}
        </p>
      </div>

      <form
        method="get"
        class="digit-group"
        data-group-name="digits"
        data-autosubmit="false"
        autocomplete="off"
        className="flex justify-center"
      >
        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
          }}
          numInputs={6}
          separator={<span className="px-1"></span>}
          hasErrored={true}
          inputStyle={{
            width: 35,
            padding: "4px 2px",
            borderRadius: 5,
          }}
        />
      </form>
      <div className="grow"></div>

      <div className="flex flex-col items-center justify-center ion-padding ">
        <span className="font13 font-w-600">Did not recieve the code?</span>
        <span className="mt-6 font13 font-w-600">Re-Send</span>
        <button
          className=" py-2.5 rounded-lg mt-10 font13 font-w-600 background-primary w-full"
          disabled={otp.length < 6}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
