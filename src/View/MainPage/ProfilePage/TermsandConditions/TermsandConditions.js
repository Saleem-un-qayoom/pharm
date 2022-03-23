import React from "react";
import { navigate, useNavigate } from "react-router";
import { TermsAndConditionData, tncAtom } from "../../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
// var stringToHTML = function (str) {
//   var parser = new DOMParser();
//   var doc = parser.parseFromString(str, "text/html");
//   return doc.body;
// };
function TermsandConditions({ history }) {
  const termsAndConditionRecoil = useRecoilValue(tncAtom);

  let navigate = useNavigate();

  return (
    <>
      <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
        <img
          onClick={() => navigate(-1)}
          src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
          style={{ height: "25px", width: "20px", marginRight: "10px" }}
        />
        <span>Terms and Conditions</span>
      </div>
      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: termsAndConditionRecoil }}
      />
    </>
  );
}

export default TermsandConditions;
