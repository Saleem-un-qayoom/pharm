import "./CommonScreenPage.scss";

import {
  CartAtom,
  orderDetailsAtom,
  SelectedProductAtom,
} from "../../Recoil/atom";
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import commonService from "../../Services/commonService";
import config from "../../Services/config";

function CommonScreenPage({
  headingTitle,
  contentBg,
  children,
  showLoading = false,
  showDeleteModal = false,
  onDeleteModalClick,
  showCart = false,
  showTrackOrder = false,
  showTrackItem = false,
  setTrackOrder,
  setTrackItem,
  setPaymentMethod,
  showPaymentMethod = false,
}) {
  const navigate = useNavigate();
  const cart = useRecoilValue(CartAtom);
  const cartItems = [...cart];

  const [myOrderDetails, setMyOrderDetails] = useRecoilState(orderDetailsAtom);
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(SelectedProductAtom);

  return (
    <div className={`h-screen ${contentBg ? contentBg : "bg-white"}`}>
      <div className="common-screen-page-header background-primary height-8 flex items-center ion-padding-x justify-between">
        <div className="flex">
          <img
            onClick={() => navigate(-1)}
            src="/assets/icons/back.png"
            alt=""
            className="h-5"
          />
          <p className="font-bold ml-2.5 capitalize">{headingTitle}</p>
        </div>
        {showCart && (
          <div
            className="relative ml-auto"
            onClick={() => navigate("/cart-page")}
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
        )}
      </div>
      <div className="common-screen-page-content height-92 scrollable-element-y ">
        {children}
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
      {showDeleteModal && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-80  bg-white rounded-md px-1 ion-padding">
            <div className="flex items-center">
              <img
                className="w-11 pr-3"
                src="/assets/icons/delete.png"
                alt=""
              />
              <span className="text-base">Delete</span>
            </div>
            <span className="text-sm pt-2 inline-block">
              Are You Sure You Want to Delete?
            </span>
            <div className="flex justify-end text-sm pt-10">
              <span className="pr-4" onClick={() => onDeleteModalClick(false)}>
                Cancel
              </span>
              <span onClick={() => onDeleteModalClick(true)}>Delete</span>
            </div>
          </div>
        </div>
      )}

      {showTrackOrder && (
        <div
          className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex justify-center items-center"
          //   onClick={() => onDeleteModalClick(false)}
        >
          <div
            className="grow common-screen-page-loading h-screen "
            onClick={() => setTrackOrder(false)}
          ></div>
          <div className="w-full  bg-white rounded-md  py-3 px-3 absolute bottom-0">
            <div>
              <span className="text-sm font-semibold">Order Tracking</span>
            </div>
            <div className="ion-padding flex flex-col">
              <div className="bg-slate-400  text-sm font-medium pt-2 pb-8 pl-2">
                <p>Waiting For Store Decision</p>
              </div>
              <div className="bg-slate-400 flex flex-col text-sm font-medium pt-2 pb-6 pl-2 mt-2">
                <p>Cancelled By Store</p>
                <span className="text-red-600">
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.comment_reject}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTrackItem && (
        <div
          className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex "
          //   onClick={() => onDeleteModalClick(false)}
        >
          <div
            className="grow common-screen-page-loading h-screen "
            onClick={() => setTrackItem(false)}
          ></div>
          <div className="w-full  bg-white rounded-md ion-padding-y py-3 px-3 absolute bottom-0 flex items-center ">
            <div className="w-1/5	">
              <img
                className="w-16"
                src="https://apis.pharmbox.in/assets/category/catimg/1646293838.png"
                // src={
                //   item.product_image[0]
                //     ? `${config.baseUrl}/${item.product_image[0]}`
                //     : "https://img.icons8.com/ios/100/000000/no-camera--v1.png"
                // }
              />
            </div>
            <div className="w-3/5	">
              <p className="text-sm text-color-tertiary ">
                ZORAY SUNSCREEN LOTION
              </p>
              <p className="text-xs text-color-tertiary pt-1">
                LOTION OF 60 Ml
              </p>
              <p className="text-xs pt-1">Qty 1</p>
            </div>
            <div className="w-1/5 flex flex-col">
              <span className="text-sm">Rs205.2</span>
              <span className="font10  text-color-tertiary flex ">Rs205.2</span>
            </div>
          </div>
        </div>
      )}

      {showPaymentMethod && (
        <div
          className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex justify-center items-center"
          //   onClick={() => onDeleteModalClick(false)}
        >
          <div
            className="grow common-screen-page-loading h-screen "
            onClick={() => setPaymentMethod(false)}
          ></div>
          <div className="w-full  bg-white rounded-md  py-3 px-3 absolute bottom-0">
            <div>
              <p className="text-base font-semibold">Select Payment Method</p>
              <p className="text-sm font-semibold text-emerald-600">
                Total Amount Rs{commonService.getTotalPrice(cart)}
              </p>
            </div>
            <div className="ion-padding">
              <div className="flex">
                <img className="h-10" src="assets/img/cash-on-delivery.png" />
                <div className="flex flex-col pl-4">
                  <span className="text-xs font-semibold">
                    Cash On Delivery
                  </span>
                  <p className="text-xs text-color-tertiary pt-1">
                    Pay via cash at the time of delivery. it's free and only
                    takes a few minutes{" "}
                  </p>
                </div>
              </div>
              <div className="flex mt-6">
                <img className="h-10" src="assets/img/payu.png" />
                <div className="flex flex-col pl-4">
                  <span className="text-xs font-semibold">PayU</span>
                  <p className="text-xs text-color-tertiary pt-1">
                    Credit/Debit card with easier way to pay - online in your
                    mobile phone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonScreenPage;
