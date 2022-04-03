import React, { useEffect, useState } from "react";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import config from "../../../Services/config";
import { Select } from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import { addressesAtom, userDataAtom } from "../../../Recoil/atom";
import { getMyDeliveryAddressApi } from "../../../Services/apis";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading";

function ManageAddressScreen() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userData = useRecoilValue(userDataAtom);

  const [myDeliveryAddress, setMyDeliveyAddress] =
    useRecoilState(addressesAtom);
  const getMyDeliveryAddressApiFunc = getMyDeliveryAddressApi();

  useEffect(() => {
    const data = {
      uid: userData.id,
    };
    getMyDeliveryAddressApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (response) => {
    setLoading(false);
    if (response.ResponseCode === "200") {
      setMyDeliveyAddress(response.AddressList);
    }
  };

  return (
    <CommonScreenPage
      headingTitle={"Address"}
      contentBg={"bg-gray-100"}
      showLoading={loading}
    >
      <div className="ion-padding-x mt-1.5">
        <form>
          <div className="form-group">
            <label className="font12 font-w-600" htmlFor="">
              Select pincode to see product availability
            </label>
            <div className="flex">
              <input
                type="text"
                className="rounded-lg py-0.5 px-2.5 grow border border-slate-400"
                placeholder="Enter Pincode"
              />
              <button className="px-7 py-2 ml-2.5 font-semibold rounded-lg background-primary text-black">
                Check
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div className="ion-padding-x mt-1.5 font-extrabold">
        <span>Delivery Address</span>
      </div>
      {myDeliveryAddress.map((item) => (
        <div className="bg-white mx-2 my-1  px-1  flex  border-2 border-slate-400 py-3 rounded-md	 ">
          <div className="w-14">
            <img src={`${config.baseUrl}/${item.address_image}`} alt="" />
          </div>
          <div className="grow ml-2">
            <div className="">
              <div className="flex flex-col text-xs font-bold">
                {item.type}
                <span>{item.landmark}</span>
                <span>{item.address}</span>
              </div>
            </div>
            <div className="flex justify-center mt-2 items-center">
              <button
                className="border-2 py-1.5 px-4 text-xs font-semibold border-slate-300 rounded-md	"
                onClick={() => navigate("/profile-page")}
              >
                SELECT
              </button>
              <button
                className="border-2 py-1.5 px-4 text-xs font-semibold mx-20 border-slate-300 rounded-md	"
                onClick={() => navigate("/edit-address")}
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      ))}
    </CommonScreenPage>
  );
}

export default ManageAddressScreen;
