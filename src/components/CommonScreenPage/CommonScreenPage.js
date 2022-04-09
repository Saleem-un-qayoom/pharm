import "./CommonScreenPage.scss";

import React from "react";
import { useNavigate } from "react-router";
import { CartAtom, orderDetailsAtom } from "../../Recoil/atom";
import { useRecoilState } from "recoil";
import commonService from "../../Services/commonService";

function CommonScreenPage({
  headingTitle,
  contentBg,
  children,
  showLoading = false,
  showDeleteModal = false,
  onDeleteModalClick,
  showTrackOrder = false,
  showPaymentMethod = false,
  setTrackOrder,
  showTrackItem = false,
  setTrackItem,
  setPaymentMethod,
}) {
  const navigate = useNavigate();
  const [myOrderDetails, setMyOrderDetails] = useRecoilState(orderDetailsAtom);

  const [cart, setCart] = useRecoilState(CartAtom);

  return (
    <div className={`h-screen ${contentBg ? contentBg : "bg-white"}`}>
      <div className="common-screen-page-header background-primary height-8 flex items-center ion-padding-x">
        <img
          onClick={() => navigate(-1)}
          src="/assets/icons/back.png"
          alt=""
          className="h-5"
        />
        <p className="font-bold ml-2.5 capitalize">{headingTitle}</p>
      </div>
      <div className="common-screen-page-content height-92 scrollable-element ">
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
        <div
          className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center"
          //   onClick={() => onDeleteModalClick(false)}
        >
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
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50  flex flex-col ">
          <div
            className="grow common-screen-page-loading"
            onClick={() => setTrackOrder(false)}
          ></div>
          <div className="bg-white px-3 py-3  rounded-t-xl track-order	">
            <div className="">
              <span className="font-semibold ">Order Tracking</span>
              <div className="ion-padding-x mt-3">
                <div className="bg-slate-200	 ion-padding-x pt-1.5 pb-7">
                  <p className="text-xs font-semibold ">
                    Waiting For Store Decision
                  </p>
                </div>
                <div className="bg-slate-200	 mt-2 ion-padding-x py-2.5	 flex flex-col">
                  <span className="text-xs font-semibold">
                    Cancelled By Store
                  </span>
                  <span>
                    <span className="text-xs text-red-600">
                      {myOrderDetails &&
                        myOrderDetails.order &&
                        myOrderDetails.order.comment_reject}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTrackItem && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50  flex flex-col ">
          <div
            className="grow common-screen-page-loading"
            onClick={() => setTrackItem(false)}
          ></div>
          <div className="bg-white px-3 py-5 z rounded-t-xl flex items-center justify-between track-item">
            {/* <div>
              <span className="inline-block leading-3	text-xs px-1 py-1 background-primary rounded-r-full rounded-b-full absolute bottom-0 left-0">
                10 %
                <br />
                OFF
              </span>
            </div> */}
            <div className="flex">
              <img
                src="https://apis.pharmbox.in/assets/category/catimg/1646293838.png"
                className="w-10 h-10"
              />
              <div className="flex flex-col ml-3">
                <p className="text-sm font-semibold text-slate-500">
                  ZORAY SUNSCREEN LOTION
                </p>
                <span className="text-xs text-slate-500 mt-1">
                  LOTION OF 60 ML
                </span>
                <span className="text-xs mt-1">Qty 1</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">Rs205.2</span>
              <span className="text-xs text-slate-500">Rs228</span>
            </div>
          </div>
        </div>
      )}

      {showPaymentMethod && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50  flex flex-col ">
          <div
            className="grow common-screen-page-loading"
            onClick={() => setPaymentMethod(false)}
          ></div>
          <div className="bg-white py-3 px-3 z rounded-t-xl ">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Select Payment Method
              </span>
              <span className="text-sm font-semibold text-emerald-500	mt-1.5">
                Total Amount {commonService.getTotalPrice(cart)}
              </span>
            </div>
            <div className="ion-padding flex items-center">
              <div>
                <img src="assets/icons/cash-on-delivery.png" className="h-10" />
              </div>
              <div className="flex flex-col ml-3">
                <span className="text-xs font-semibold">Cash On Delivery</span>
                <span className="text-xs text-slate-500">
                  Pay via cash at the time of delivery.It's free and only takes
                  a few minutes
                </span>
              </div>
            </div>
            <div className="ion-padding flex items-center">
              <div>
                <img src="assets/icons/payu.png" className="h-10 w-10" />
              </div>
              <div className="flex flex-col ml-3">
                <span className="text-xs font-semibold">PayU</span>
                <span className="text-xs text-slate-500">
                  Credit/Debit card with easier way to pay-online in your mobile
                  phone
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommonScreenPage;
