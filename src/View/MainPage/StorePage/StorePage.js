import React, { useEffect, useState } from "react";
import {
  pinCodeData,
  storeData,
  userData,
  userDataAtom,
} from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import StarRatings from "react-star-ratings/build/star-ratings";
import config from "../../../Services/config";
import { getStoreApi } from "../../../Services/apis";
import { useNavigate } from "react-router";

function StorePage() {
  let navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const pinCodeRecoil = useRecoilValue(pinCodeData);
  const userRecoil = useRecoilValue(userDataAtom);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);

  const getStoreApiFunc = getStoreApi();

  useEffect(() => {
    const data = {
      uId: userRecoil.id || "0",
      pinCode: pinCodeRecoil.id,
    };
    getStoreApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      setStores(res.StoreData);
    }
  };

  return (
    <div className="  font-semibold  background-tertiary h-screen">
      <div className="flex justify-between background-primary h-20 ion-padding">
        <div className="flex flex-row">
          <img
            onClick={() => navigate(-1)}
            src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
            style={{
              height: "25px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          <span>Store</span>
        </div>
        <div>
          <span onClick={() => navigate("/pin-code")}>Deliver to</span>
        </div>
      </div>
      <div className="ion-padding">
        <div className="w-full  " style={{ marginTop: "-38px" }}>
          <input
            type="text"
            className="w-full py-2.5 px-5 pl-7 rounded-full input-border-none"
            placeholder="Search items.."
          />
        </div>
        {stores.map((item, key) => (
          <div
            key={key}
            onClick={() => {
              if (item.Total_Items !== 0) {
                localStorage.setItem("pharm-box-store", JSON.stringify(item));
                localStorage.setItem(
                  "pharm-box-pin-code",
                  JSON.stringify(pinCodeRecoil)
                );

                setStoreRecoil(item);
                navigate("/home");
              } else {
                // error
              }
            }}
            className="bg-white flex mt-10 py-3 rounded-xl pr-5 relative"
          >
            <span
              className="absolute background-primary font12 rounded-full font-w-500 px-5 left-0.5"
              style={{ top: "-11px" }}
            >
              {item.IS_OPEN}
            </span>

            <img
              src={`${config.baseUrl}/${item.store_image}`}
              className="inline-block h-10 w-12 pl-2 self-center"
            />
            <ul className="pl-4">
              <li className="font-w-700 text-md leading-4	">{item.title}</li>
              <li className="text-slate-400 font11 font-w-500">
                {item.Total_Items} items
              </li>
              <StarRatings
                starDimension="15px"
                starSpacing="1px"
                rating={parseInt(item.star)}
                starRatedColor="gold"
                changeRating={() => {}}
                numberOfStars={5}
                name="rating"
              />
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;
