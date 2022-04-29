import React from "react";
import { useRecoilValue } from "recoil";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { tncAtom } from "../../../Recoil/atom";

function TermsandConditions() {
  const termsAndConditionRecoil = useRecoilValue(tncAtom);

  return (
    <>
      <CommonScreenPage headingTitle={"Terms and Conditions"}>
        <div
          className="ion-padding font11 font-w-700"
          dangerouslySetInnerHTML={{ __html: termsAndConditionRecoil }}
        />
      </CommonScreenPage>

      {/* <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: termsAndConditionRecoil }}
      /> */}
    </>
  );
}

export default TermsandConditions;
