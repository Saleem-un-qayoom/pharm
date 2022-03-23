import "./Home.scss";

import {
  AboutData,
  Banners,
  FeedbackData,
  PrivacyPolicyData,
  ProductListData,
  TermsAndConditionData,
  aboutAtom,
  bannersAtom,
  brandAtom,
  catListAtom,
  contactAtom,
  exploreSomethingData,
  homeDataAtom,
  mainDataAtom,
  medicineAtom,
  pinCodeData,
  storeData,
  tncAtom,
  userData,
  userDataAtom,
  testimonialAtom,
  privacyPolicyAtom,
} from "../../../Recoil/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Catlist from "../../../components/Catlist/Catlist";
import ExploreNew from "../../../components/ExploreNew/ExploreNew";
import FeedBack from "../../../components/FeedBack/FeedBack";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import HeaderFooterWrapper from "../../../components/HeaderFooterWrapper/HeaderFooterWrapper";
import ProductList from "../../../components/ProductList/ProductList";
import { getHomeApi } from "../../../Services/apis";
import { useParams } from "react-router";
import TermsandConditions from "../ProfilePage/TermsandConditions/TermsandConditions";
import UploadPrescription from "../../../components/UploadPrescription/UploadPrescription";
import Slider from "../../../components/Slider/Slider";

const Home = ({ popUpToggle }) => {
  // const [homeData, setHomeData] = useState([]);
  const userRecoil = useRecoilValue(userDataAtom);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [prodcutListRecoil, setProdcutListRecoil] =
    useRecoilState(ProductListData);

  // const [banners, setBanners] = useRecoilState(bannersAtom);
  const [catList, setCatList] = useRecoilState(catListAtom);
  const [brand, setBrand] = useRecoilState(brandAtom);
  const [medicine, setMedicine] = useRecoilState(medicineAtom);
  const [mainData, setMainData] = useRecoilState(mainDataAtom);
  const [about, setAbout] = useRecoilState(aboutAtom);
  const [contact, setContact] = useRecoilState(contactAtom);
  const [tnc, setTnc] = useRecoilState(tncAtom);
  const [homeData, setHomeData] = useRecoilState(homeDataAtom);
  const [testimonial, setTestimonial] = useRecoilState(testimonialAtom);
  const [privacyPolicy, setPrivacyPolicy] = useRecoilState(privacyPolicyAtom);
  const [banner, setBanner] = useRecoilState(bannersAtom);

  // const [feedbackRecoil, setFeedbackRecoil] = useRecoilState(FeedbackData);
  // const [privacyPolicyRecoil, setPrivacyPolicyRecoil] =
  // 	useRecoilState(PrivacyPolicyData);
  // const [termsandConditionRecoil, setTermsandConditionRecoil] =
  // 	useRecoilState(TermsAndConditionData);
  // const [aboutDataRecoil, setAboutDataRecoil] = useRecoilState(AboutData);
  // const [exporeSomethingRecoil, setExporeSomethingRecoil] =
  //   useRecoilState(exploreSomethingData);

  const getHomeApiFunc = getHomeApi();

  useEffect(() => {
    const data = {
      uID: userRecoil.id || "0",
      storeId: storeRecoil.id,
      pinCode: pinCodeRecoil.id,
    };
    getHomeApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      console.log("res", res);
      setCatList(res.ResultData.Catlist);
      setBrand(res.ResultData.Brand);
      setMedicine(res.ResultData.Medicine);
      setMainData(res.ResultData.Main_Data);
      setAbout(res.ResultData.Main_Data.about);
      setContact(res.ResultData.Main_Data.contact);
      setTnc(res.ResultData.Main_Data.terms);
      setHomeData(res.ResultData.HomeData);
      setTestimonial(res.ResultData.testimonial);
      setPrivacyPolicy(res.ResultData.Main_Data.policy);
      setBanner(res.ResultData.Banner);
    }
  };

  return (
    <>
      <Header />
      <HeaderFooterWrapper>
        {banner.length > 0 && <Slider />}
        <UploadPrescription popUpToggle={popUpToggle} />
        <Catlist showHeader catList={catList} />

        <ExploreNew medicine={medicine} />
        {homeData.map((item, key) => (
          <ProductList product={item} key={key} />
        ))}
        <FeedBack />
      </HeaderFooterWrapper>
      <Footer popUpToggle={popUpToggle} />
    </>
  );
};

export default Home;
