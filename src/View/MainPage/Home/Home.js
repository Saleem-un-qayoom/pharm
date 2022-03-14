import "./Home.scss";

import {
  AboutData,
  exploreSomethingData,
  FeedbackData,
  pinCodeData,
  PrivacyPolicyData,
  ProductListData,
  storeData,
  TermsAndConditionData,
  userData,
} from "../../../Recoil/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Catlist from "../../../components/Catlist/Catlist";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import HeaderFooterWrapper from "../../../components/HeaderFooterWrapper/HeaderFooterWrapper";
import ProductList from "../../../components/ProductList/ProductList";
import { getHomeApi } from "../../../Services/apis";
import { useParams } from "react-router";
import FeedBack from "../../../components/FeedBack/FeedBack";

// const productList = [
// 	{
// 		ProductTitle: 'Product A',
// 		products: [
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 		],
// 	},

// 	{
// 		ProductTitle: 'Product B',
// 		products: [
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 		],
// 	},
// 	{
// 		ProductTitle: 'Product B',
// 		products: [
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 		],
// 	},
// 	{
// 		ProductTitle: 'Product C',
// 		products: [
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 			{
// 				name: 'Medicine (879)',
// 				image: 'https://img.icons8.com/fluency/48/000000/whatsapp.png',
// 			},
// 		],
// 	},
// ];

const Home = ({ popUpToggle }) => {
  const [homeData, setHomeData] = useState([]);
  const userRecoil = useRecoilValue(userData);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [prodcutListRecoil, setProdcutListRecoil] =
    useRecoilState(ProductListData);
  const [feedbackRecoil, setFeedbackRecoil] = useRecoilState(FeedbackData);
  const [privacyPolicyRecoil, setPrivacyPolicyRecoil] =
    useRecoilState(PrivacyPolicyData);
  const [termsandConditionRecoil, setTermsandConditionRecoil] = useRecoilState(
    TermsAndConditionData
  );
  const [aboutDataRecoil, setAboutDataRecoil] = useRecoilState(AboutData);
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
      // setStores(res.StoreData);
      setProdcutListRecoil(res.ResultData.HomeData);
      setFeedbackRecoil(res.ResultData.testimonial);
      setPrivacyPolicyRecoil(res.ResultData.Main_Data.policy);
      setTermsandConditionRecoil(res.ResultData.Main_Data.terms);
      setAboutDataRecoil(res.ResultData.Main_Data.about);
      // setExporeSomethingRecoil(res.ResultData.Medicine);
    }
  };

  return (
    <>
      <Header />
      <HeaderFooterWrapper>
        <Catlist showHeader />

        {/* <ProductList product={exporeSomethingRecoil} key={1} /> */}
        {prodcutListRecoil.map((item, key) => (
          <ProductList product={item} key={key} />
        ))}
        <FeedBack />
      </HeaderFooterWrapper>
      <Footer popUpToggle={popUpToggle} />
    </>
  );
};

export default Home;
