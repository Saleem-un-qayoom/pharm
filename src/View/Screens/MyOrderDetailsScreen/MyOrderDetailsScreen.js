import React, { useEffect, useState } from "react";
import { navigate, useParams } from "react-router";
import { storeDataAtom, userDataAtom } from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { getMyOrderDetailsApi } from "../../../Services/apis";
import { useNavigate } from "react-router";

function MyOrderDetailsScreen() {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getMyOrderDetailsApiFunc = getMyOrderDetailsApi();
  const userData = useRecoilValue(userDataAtom);
  // const [storerecoil, setStoreRecoil] = useState(storeDataAtom);
  const [myOrderDetails, setMyOrderDetails] = useState({});

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
    // if (response.ResponseCode === "200") {/
    setMyOrderDetails(response.OrderHistory);
    // }
  };

  // useEffect(() => {
  //   const data = {
  //     uid: userData.id,
  //     order_id: id,
  //   };
  //   getMyOrderDetailsApiFunc(data, handleResponse);
  // }, []);

  // const handleResponse = (response) => {
  //   if (response === "200") {
  //     setMyOrderDetails(response.OrderHistory.store);
  //   }
  // };

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
            <button className="text-xs font-medium px-12 py-1 rounded background-primary">
              Track Order
            </button>
            <button className=" text-xs font-medium px-12 py-1 rounded background-primary">
              Item
            </button>
          </div>
        </div>
        {/* ))} */}
      </CommonScreenPage>
    </>
  );
}

export default MyOrderDetailsScreen;
