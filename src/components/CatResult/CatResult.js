import React, { useEffect, useState } from "react";

import config from "../../Services/config";
import { getCategoryListApi, getCategoryResultApi } from "../../Services/apis";
import { useParams } from "react-router";
import Header from "../Header/Header";
import HeaderFooterWrapper from "../HeaderFooterWrapper/HeaderFooterWrapper";
import { useRecoilValue } from "recoil";
import {
  pinCodeData,
  storeData,
  userData,
  userDataAtom,
} from "../../Recoil/atom";

function CatResult() {
  // const [categoryList, setCategoryList] = useState([]);
  // const userRecoil = useRecoilValue(userData);
  // const [storeRecoil, setStoreRecoil] = useRecoilState(storeData);
  // const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);
  // const [categoryListRecoil, setCategoryListRecoil] =
  //   useRecoilState(categoryListData);

  //   const getCategoryListApiFunc = getCategoryListApi();
  const getCategoryResultApiFunc = getCategoryResultApi();

  const { id } = useParams();

  const userData = useRecoilValue(userDataAtom);
  const storeDataRecoil = useRecoilValue(storeData);
  const pinCodeRecoil = useRecoilValue(pinCodeData);
  const [catResult, setCatResult] = useState([]);

  useEffect(() => {
    const data = {
      uID: userData.id || "0",
      storeId: storeDataRecoil.id,
      pinCode: pinCodeRecoil.id,
      catId: id,
    };
    // getCategoryListApiFunc(data, handleResponse);
    getCategoryResultApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      // setCategoryList(res.CategoryData);
      setCatResult(res.CategoryProduct);
    }
  };

  return (
    <>
      <Header />{" "}
      <HeaderFooterWrapper>
        <div className="pt-2  background-tertiary h-screen  mb-4 relative">
          <div className="flex items-center justify-center">
            <span>{catResult.category_name}</span>
          </div>
          {catResult &&
            catResult.productlist &&
            catResult.productlist.map((item, key) => (
              <>
                <div className="flex items-center justify-center ">
                  <span className="text-slate-600 font-w-500">
                    {item.category_name}
                  </span>
                </div>
                <div key={key} className="ion-padding  ">
                  <div className="bg-white  flex rounded-lg">
                    <img
                      style={{ width: "27%" }}
                      src={`${config.baseUrl}/${item.product_image}`}
                      alt=""
                    />
                    <div
                      className="absolute "
                      style={{ left: "0", left: "16px" }}
                    >
                      <span className="inline-block leading-3	text-xs px-3 py-2 background-primary rounded-r-full rounded-b-full">
                        {item.product_info[0].product_discount}%
                        <br />
                        OFF
                      </span>
                    </div>
                    <div className="ml-2 py-4">
                      <h1 className="font13 font-w-600">{item.product_name}</h1>
                      <span className="font13 font-w-600">
                        Rs
                        {parseFloat(
                          item.product_info[0].product_price -
                            (item.product_info[0].product_price / 100) *
                              item.product_info[0].product_discount
                        ).toFixed(2)}{" "}
                      </span>
                      <span className="font13 font-w-600 ml-1 text-slate-500">
                        {parseFloat(item.product_info[0].product_price).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="pt-12">
                      <button className="background-primary font13 font-w-500 py-1 px-5 ml-2">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </HeaderFooterWrapper>
    </>
  );
}

export default CatResult;
