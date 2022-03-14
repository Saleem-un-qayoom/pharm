import React from "react";
import Header from "../../../components/Header/Header";
import HeaderFooterWrapper from "../../../components/HeaderFooterWrapper/HeaderFooterWrapper";
import MedicineList from "../../../components/MedicineList/MedicineList";
import Footer from "../../../components/Footer/Footer";

function MedicinePage({ onLinkPress, popUpToggle }) {
  return (
    <>
      <Header />
      <HeaderFooterWrapper>
        <MedicineList />
      </HeaderFooterWrapper>
      <Footer onLinkPress={onLinkPress} popUpToggle={popUpToggle} />
    </>
  );
}

export default MedicinePage;
