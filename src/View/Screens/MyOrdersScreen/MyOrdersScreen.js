import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../../../Recoil/atom";
import { getMyOrderApi } from "../../../Services/apis";
import config from "../../../Services/config";
import { useNavigate } from "react-router";

function MyOrder() {
  let navigate = useNavigate();

  const getMyOrderApiFunc = getMyOrderApi();

  const [loading, setLoading] = useState(true);

  const userData = useRecoilValue(userDataAtom);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const data = {
      uid: userData.id,
    };
    getMyOrderApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (response) => {
    if (response.ResponseCode === "200") {
      setMyOrders(response.OrderHistory);
    }
    setLoading(false);
  };

  return (
    <CommonScreenPage
      headingTitle={"My Orders"}
      contentBg={"bg-gray-100"}
      showLoading={loading}
    >
      {myOrders.map((item, key) => (
        <div
          key={key}
          className="bg-white mx-1 my-1 px-1 py-1 rounded-sm flex flex col"
        >
          <div className="w-14">
            <img src={`${config.baseUrl}/${item.store_img}`} alt="" />
          </div>
          <div className="grow ml-1">
            <div className="flex justify-between">
              <div className="text-xs font-bold">
                Order Id &nbsp;: &nbsp;
                <span className="text-blue-400">{item.order_id}</span>
              </div>
              <div className="text-xs font-bold">Rs {item.total}</div>
            </div>
            <div className="text-xs font-bold text-yellow-500 mt-1.5">
              {item.status}
            </div>
            <div className="text-xs font-bold mt-1.5">{item.order_date}</div>
            <div className=" flex justify-end mt-1.5">
              <button
                className=" text-xs font-bold px-12 py-1 rounded background-primary"
                onClick={() => navigate(`/order-details/${item.id}`)}
              >
                info
              </button>
            </div>
          </div>
        </div>
      ))}
    </CommonScreenPage>
  );
}

export default MyOrder;
