import React from "react";
import { navigate, useNavigate } from "react-router";
import { privacyPolicyAtom, PrivacyPolicyData } from "../../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

function PrivacyPolicy() {
  let navigate = useNavigate();

  const [privacyPolicyRecoil, setPrivacyPolicyRecoil] =
    useRecoilState(privacyPolicyAtom);

  return (
    <>
      <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
        <img
          onClick={() => navigate(-1)}
          src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
          style={{ height: "25px", width: "20px", marginRight: "10px" }}
        />
        <span>Privacy Policy</span>
      </div>
      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: privacyPolicyRecoil }}
      />
    </>
  );
}

export default PrivacyPolicy;
