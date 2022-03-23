import Catlist from "../../../components/Catlist/Catlist";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import HeaderFooterWrapper from "../../../components/HeaderFooterWrapper/HeaderFooterWrapper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";

import { getCategoryApi } from "../../../Services/apis";
import {
  categoryListData,
  pinCodeData,
  storeData,
  userData,
  userDataAtom,
} from "../../../Recoil/atom";

function CategoryPage({ onLinkPress, popUpToggle }) {
  let navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const userRecoil = useRecoilValue(userDataAtom);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [categoryListRecoil, setCategoryListRecoil] =
    useRecoilState(categoryListData);

  const getCategoryApiFunc = getCategoryApi();

  useEffect(() => {
    const data = {
      uID: userRecoil.id || "0",
      storeId: storeRecoil.id,
      pinCode: pinCodeRecoil.id,
    };
    getCategoryApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      setCategoryList(res.CategoryData);
    }
  };

  return (
    <>
      <Header />
      <HeaderFooterWrapper>
        {<Catlist catList={categoryList} />}
      </HeaderFooterWrapper>
      <Footer onLinkPress={onLinkPress} popUpToggle={popUpToggle} />
    </>
  );
}

export default CategoryPage;
