import "./CommonHeaderFooterPage.scss";

import {
  CartAtom,
  pinCodeData,
  prescriptionImageAtom,
  storeDataAtom,
  userDataAtom,
} from "../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { getSearchApi } from "../../Services/apis";
import config from "../../Services/config";
import commonService from "../../Services/commonService";
import SearchResult from "../SearchResult/SearchResult";

const prescriptionIcon = "/assets/icons/treatment.svg";
const notificationIcon = "/assets/icons/bell.svg";
const categoryIcon = "/assets/icons/filter.svg";
const homeIcon = "/assets/icons/home.svg";
const userIcon = "/assets/icons/user.svg";

function CommonHeaderFooterPage({
  children,
  showLoading = false,
  bgColor,
  item,
}) {
  let navigate = useNavigate();

  const storeData = useRecoilValue(storeDataAtom);
  const [cart, setCart] = useRecoilState(CartAtom);
  const userData = useRecoilValue(userDataAtom);
  const cartItems = [...cart];
  const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useRecoilState(
    prescriptionImageAtom
  );
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeDataAtom);
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
      console.log("first", res);
      setSearchResult(res.SearchData);
      console.log(searchResult);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPrescriptionImage(URL.createObjectURL(event.target.files[0]));
      navigate("/submit-prescription");
    }
  };

  const homeClick = () => {
    navigate("/home");
  };

  const categoryClick = () => {
    navigate("/categories-page");
  };

  const prescriptionClick = () => {
    userData
      ? setShowPrescriptionPopup(!showPrescriptionPopup)
      : navigate("/login-page");
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

  const [noOfItemsAlreadyAddedInCart, setNoOfItemsAlreadyInCart] = useState(0);

  // useEffect(() => {
  //   setNoOfItemsAlreadyInCart(
  //     commonService.isItemAlreadyInCart(item, cart, setCart)
  //   );
  // }, [cart]);

  const addItemToCart = (item) => {
    commonService.addItemToCart(item, cart, setCart);
  };

  const increaseQuantity = (item) => {
    commonService.increaseQuantity(item, cart, setCart);
  };

  const decreaseQuantity = (item) => {
    commonService.decreaseQuantity(item, cart, setCart);
  };

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
          <div className="relative" onClick={() => navigate("/cart-page")}>
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
            {/* {searchResult.map((item) => (

              <div className="flex bg-white mb-3 h-24 relative rounded">
                <div
                  className="p-2 flex justify-center items-center h-full"
                  style={{ width: "120px" }}
                >
                  <div>
                    <span className="inline-block leading-3 text-xs font-semibold px-3 py-2 background-primary absolute top-0 left-0 rounded-r-full rounded-b-full">
                      {item.product_info[0].product_discount}
                      %
                      <br />
                      OFF
                    </span>
                  </div>
                  <img
                    className="inline-block h-full"
                    src={
                      item.product_image[0]
                        ? `${config.baseUrl}/${item.product_image[0]}`
                        : "https://img.icons8.com/ios/70/000000/no-camera--v1.png"
                    }
                  />
                </div>
                <div className="grow py-2 text-xs font-semibold">
                  <p
                    className="mb-1"
                    // onClick={() => navigate("/product-description")}
                  >
                    {item.product_name}
                  </p>
                  <div>
                    <span className="font12 font-semibold mr-1">
                      Rs
                      {parseFloat(
                        item.product_info[0].product_price -
                          (item.product_info[0].product_price / 100) *
                            item.product_info[0].product_discount
                      ).toFixed(2)}
                    </span>
                    &nbsp;
                    <span className="font10 font-semibold line-through text-light-grey ">
                      Rs
                      {parseFloat(item.product_info[0].product_price).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full h-6">
                  {noOfItemsAlreadyAddedInCart !== 0 ? (
                    <>
                      <div className="absolute top-2 right-2 bg-amber-400	 py-1 px-2 rounded-md">
                        <p className="text-white text-xs font-semibold">
                          Buy Now
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <div
                          className="background-primary w-6 h-full rounded  font-medium text-lg flex justify-center items-center"
                          onClick={() => decreaseQuantity(item)}
                        >
                          -
                        </div>
                        <div className="text-sm ">
                          {noOfItemsAlreadyAddedInCart}
                        </div>

                        <div
                          className="background-primary w-6 h-full rounded  font-medium text-lg flex justify-center items-center"
                          onClick={() => increaseQuantity(item)}
                        >
                          +
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      className="text-xs background-primary font-w-600 py-1 px3 w-full	"
                      onClick={() => addItemToCart(item)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            ))} */}
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
      {showPrescriptionPopup && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="relative  py-12 w-19 bg-white">
            <div className="absolute top-0 flex justify-center items-center background-primary w-full py-2">
              <p className="text-xs font-w-500">Choose Prescription Image</p>
            </div>
            <div className="flex flex-col mx-20 ">
              <label
                for="cameraFileInput"
                className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
              >
                <span class="btn">Open camera</span>

                <input
                  id="cameraFileInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={onImageChange}
                />
              </label>
              <label
                for="cameraFileInput"
                className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
              >
                <span class="btn">Choose From Gallary</span>

                <input
                  id="cameraFileInput"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </label>
              <span
                className="font10 font-w-600 rounded-md text-center mt-2.5 border border-slate-300 py-2 px-4"
                onClick={() => setShowPrescriptionPopup(false)}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonHeaderFooterPage;
