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
        <div className="pt-2  background-tertiary h-screen relative mb-4">
          <div className="flex items-center justify-center">
            <span>Medicine</span>
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
                      // src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
                      src={`${config.baseUrl}/${item.product_image}`}
                      alt=""
                    />
                    <div
                      className="flex flex-col absolute rounded-br-full background-primary "
                      // style={{
                      //   top: "48px",
                      //   left: "15px",
                      //   padding: "5px 13px",
                      // borderRadius: "10px",
                      // }}
                    >
                      <span className="font12 font-w-500 py-1 px-2">10%</span>
                      <span className="font12 font-w-500 py-1 px-2">OFF</span>
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
                    <div
                      className="absolute"
                      style={{ top: "72px", left: "248px" }}
                    >
                      <button className="background-primary font13 font-w-500 py-1 px-5">
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
