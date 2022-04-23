import "./CommonHeaderFooterPage.scss";

import {
  CartAtom,
  pinCodeData,
  storeDataAtom,
  userDataAtom,
} from "../../Recoil/atom";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

import SearchResult from "../SearchResult/SearchResult";
import { getSearchApi } from "../../Services/apis";
import { useNavigate } from "react-router";
import { useState } from "react";
import PrescriptionPopUp from "../PrescriptionPopUp";

const prescriptionIcon = "/assets/icons/treatment.svg";
const notificationIcon = "/assets/icons/bell.svg";
const categoryIcon = "/assets/icons/filter.svg";
const homeIcon = "/assets/icons/home.svg";
const userIcon = "/assets/icons/user.svg";

function CommonHeaderFooterPage({ children, showLoading = false, bgColor }) {
  let navigate = useNavigate();

  const storeData = useRecoilValue(storeDataAtom);
  const cart = useRecoilValue(CartAtom);
  const userData = useRecoilValue(userDataAtom);
  const cartItems = [...cart];
  const [showPopUp, setShowPopUp] = useState(false);

  const pinCodeRecoil = useRecoilValue(pinCodeData);
  const storeRecoil = useRecoilValue(storeDataAtom);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const getSearchApiFunc = getSearchApi();

  useEffect(() => {
    const data = {
      store_id: storeRecoil.id,
      pincode: pinCodeRecoil.pincode,
      keyword: search,
    };
    getSearchApiFunc(data, handleResponse);
  }, [search]);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      setSearchResult(res.SearchData);
    }
  };

  const homeClick = () => {
    navigate("/home");
  };

  const categoryClick = () => {
    navigate("/categories-page");
  };

  const prescriptionClick = () => {
    userData ? setShowPopUp(!showPopUp) : navigate("/login-page");
  };

  const userClick = () => {
    userData ? navigate("/profile-page") : navigate("/login-page");
  };

  const notificationClick = () => {
    userData ? navigate("/notification-page") : navigate("/login-page");
  };

  const footerItems = [
    { label: "Home", icon: homeIcon, onClick: homeClick },
    {
      label: "Prescription",
      icon: prescriptionIcon,
      onClick: prescriptionClick,
    },
    { label: "Category", icon: categoryIcon, onClick: categoryClick },
    {
      label: "Notification",
      icon: notificationIcon,
      onClick: notificationClick,
    },
    { label: "User", icon: userIcon, onClick: userClick },
  ];

  return (
    <div className="h-screen">
      <div className="common-search-box-header height-15 ion-padding-x pt-2 background-primary">
        <div className="flex justify-between items-center">
          <div className="">
            <div
              className="flex items-center"
              onClick={() => {
                navigate("/store-page");
              }}
            >
              <img className="h-3.5 mr-1" src="/assets/icons/pin.png" alt="" />
              <span className="text-base font-medium">Change Store</span>
            </div>
            <div
              className="text-sm font-medium"
              onClick={() => {
                navigate("/store-page");
              }}
            >
              Welcome to
              <span className="text-color-secondary pl-1 ">
                {storeData.title}
              </span>
            </div>
          </div>
          <div
            className="relative"
            onClick={() => {
              if (userData) {
                navigate("/cart-page");
              } else {
                navigate("/login-page");
              }
            }}
          >
            <img className="h-7" src="/assets/icons/shopping-cart.svg" alt="" />
            <span
              style={{
                top: -2,
                right: -5,
              }}
              className="absolute  w-5 h-5 bg-gray-800 rounded-full text-white text-sm flex justify-center items-center"
            >
              {cartItems.length}
            </span>
          </div>
        </div>
        <div className="bg-white mt-2 rounded-full flex overflow-hidden">
          <img
            className="h-full pt-1 pb-1 pl-2"
            src="/assets/icons/search.png"
            alt=""
          />
          <input
            className="grow py-1 border-0 pl-2"
            placeholder="Search Item..."
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        className={`height-77 scrollable-element-y ${
          bgColor ? bgColor : "bg-white"
        }`}
      >
        {search ? (
          <div className="h-full ion-padding">
            {searchResult.map((item, key) => (
              <SearchResult item={item} key={key} />
            ))}
          </div>
        ) : (
          children
        )}
      </div>
      <div className="common-footer bg-white height-8 flex justify-between items-center ion-padding-x">
        {footerItems.map((item, key) => (
          <div
            key={key}
            className="flex flex-col items-center"
            onClick={item.onClick}
          >
            <img src={item.icon} className="w-5" alt="" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
      {showLoading && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-56 h-14 bg-white rounded-md flex items-center px-1">
            <img
              className="w-11 inline-block"
              src="/assets/icons/spinner-animated.svg"
              alt=""
            />
            Loading...
          </div>
        </div>
      )}
      <PrescriptionPopUp
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        navigateToSubmitPage={true}
      />
    </div>
  );
}

export default CommonHeaderFooterPage;
