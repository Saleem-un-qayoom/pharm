import React from "react";
import { navigate, useNavigate } from "react-router";
import { PrivacyPolicyData } from "../../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

function PrivacyPolicy() {
  let navigate = useNavigate();

  const [privacyPolicyRecoil, setPrivacyPolicyRecoil] =
    useRecoilState(PrivacyPolicyData);

  return (
    <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
      <img
        onClick={() => navigate(-1)}
        src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
        style={{ height: "25px", width: "20px", marginRight: "10px" }}
      />
      <span>Privacy Policy</span>
      <div>{privacyPolicyRecoil}</div>
    </div>
  );
}

export default PrivacyPolicy;
