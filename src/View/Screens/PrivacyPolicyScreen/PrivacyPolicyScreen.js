import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { PrivacyPolicyData } from "../../../Recoil/atom";

function PrivacyPolicy() {
  const privacyPolicyRecoil = useRecoilValue(PrivacyPolicyData);

  return (
    <>
      <CommonScreenPage headingTitle={"Privacy Policy"}></CommonScreenPage>

      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: privacyPolicyRecoil }}
      />
    </>
  );
}

export default PrivacyPolicy;
