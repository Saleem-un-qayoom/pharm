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
        <div className="pt-2   background-tertiary h-screen  mb-4 relative ion-padding">
          <div className="flex items-center justify-center">
            <span>{catResult.category_name}</span>
          </div>
          {catResult &&
            catResult.productlist &&
            catResult.productlist.map((item, key) => (
              <>
                <div className="flex bg-white mb-3 h-24 relative">
                  <div
                    className="p-2 flex justify-center items-center h-full"
                    style={{
                      width: "120px",
                    }}
                  >
                    <div>
                      <span className="inline-block leading-3	text-xs px-3 py-2 background-primary absolute top-0 left-0 rounded-r-full rounded-b-full">
                        {item.product_info[0].product_discount}%
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
                  <div className="grow py-2">
                    <p>{item.product_name}</p>
                    <div>
                      <span className="font12 font-semibold pl-2">
                        Rs
                        {parseFloat(
                          item.product_info[0].product_price -
                            (item.product_info[0].product_price / 100) *
                              item.product_info[0].product_discount
                        ).toFixed(2)}
                      </span>
                      &nbsp;
                      <span className="font10 font-semibold line-through text-light-grey">
                        Rs
                        {parseFloat(item.product_info[0].product_price).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    {/* <CustomDropDown /> */}
                    <div className="absolute background-primary bottom-0 right-0 py-1 px-5">
                      <button className="font15 font-w-500">Add To Cart</button>
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
