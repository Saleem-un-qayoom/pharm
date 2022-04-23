import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { orderDetailsAtom, userDataAtom } from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { getMyOrderDetailsApi } from "../../../Services/apis";
import { useNavigate } from "react-router";
import PopUpFromBottom from "../../../components/PopUpFromBottom/PopUpFromBottom";

function MyOrderDetailsScreen() {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getMyOrderDetailsApiFunc = getMyOrderDetailsApi();
  const userData = useRecoilValue(userDataAtom);
  const [myOrderDetails, setMyOrderDetails] = useRecoilState(orderDetailsAtom);

  // const [trackOrder, setTrackOrder] = useState(false);
  // const [trackItem, setTrackItem] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const [showTrackPopUp, setShowTrackPopUp] = useState(false);
  const [showItemPopUp, setShowItemPopUp] = useState(false);

  useEffect(() => {
    const data = {
      uid: userData.id,
      order_id: id,
    };
    getMyOrderDetailsApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (response) => {
    setLoading(false);
    console.log("first", response);
    setMyOrderDetails(response.OrderHistory);
  };

  let navigate = useNavigate();
  return (
    <>
      <CommonScreenPage
        headingTitle={"Order Details"}
        contentBg={"bg-gray-100"}
        showLoading={loading}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
              <div className="flex justify-between text-xs font-medium">
                Order ID :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.order_id}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Status :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.o_status}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Order Date :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.odate}
                </span>
              </div>
            </div>

            <div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
              <div className="flex justify-between text-xs font-medium">
                Payment Method :<span>Cash On Delivery</span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Qty :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.store &&
                    myOrderDetails.store.status}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Price :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.o_total}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Delivery Charge :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.d_charge}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium mt-2">
                Paid Amount :
                <span>
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.subtotal}
                </span>
              </div>
            </div>

            <div className="bg-white mx-2.5 my-2.5 px-2.5 py-2.5 rounded-lg flex flex-col ">
              <div className="flex flex-col text-xs font-medium">
                Delivery Address :
                <span className="mt-2">
                  {myOrderDetails &&
                    myOrderDetails.order &&
                    myOrderDetails.order.address}
                </span>
              </div>
            </div>
          </div>
          <div className=" flex justify-between ion-padding	">
            <button
              className="text-xs font-medium px-12 py-1 rounded background-primary"
              onClick={() => setShowTrackPopUp(true)}
            >
              Track Order
            </button>
            <button
              className=" text-xs font-medium px-12 py-1 rounded background-primary"
              onClick={() => setShowItemPopUp(true)}
            >
              Item
            </button>
          </div>
        </div>
        <PopUpFromBottom showPopUp={showTrackPopUp}>
          <div className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
            <div
              className="grow common-screen-page-loading h-screen "
              onClick={() => setShowTrackPopUp(false)}
            ></div>
            <div className="w-full  bg-white rounded-md  py-3 px-3 absolute bottom-0">
              <div>
                <span className="text-sm font-semibold">Order Tracking</span>
              </div>
              <div className="ion-padding flex flex-col">
                <div className="bg-slate-400  text-sm font-medium pt-2 pb-6 pl-2">
                  <p>Waiting For Store Decision</p>
                </div>
                <div className="bg-slate-400 flex flex-col text-xs font-medium pt-2 pb-6 pl-2 mt-2">
                  <p>Cancelled By Store</p>
                  <span className="text-red-600 text-xs">
                    {myOrderDetails &&
                      myOrderDetails.order &&
                      myOrderDetails.order.comment_reject}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </PopUpFromBottom>
        <PopUpFromBottom showPopUp={showItemPopUp}>
          <div className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex ">
            <div
              className="grow common-screen-page-loading h-screen "
              onClick={() => setShowItemPopUp(false)}
            ></div>
            <div className="w-full  bg-white rounded-md ion-padding-y py-3 px-3 absolute bottom-0 flex items-center ">
              <div className="w-1/5	">
                <img
                  alt=""
                  className="w-16"
                  src="https://apis.pharmbox.in/assets/category/catimg/1646293838.png"
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
                <span className="font10  text-color-tertiary flex ">
                  Rs205.2
                </span>
              </div>
            </div>
          </div>
        </PopUpFromBottom>
      </CommonScreenPage>
    </>
  );
}

export default MyOrderDetailsScreen;
