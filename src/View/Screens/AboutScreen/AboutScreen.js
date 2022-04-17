import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { aboutAtom } from "../../../Recoil/atom";

function AboutScreen() {
  const aboutRecoil = useRecoilValue(aboutAtom);

  return (
    <>
      <CommonScreenPage headingTitle={"About"}></CommonScreenPage>

      <div
        className="ion-padding font11 font-w-700"
        dangerouslySetInnerHTML={{ __html: aboutRecoil }}
      />
    </>
  );
}

export default AboutScreen;
