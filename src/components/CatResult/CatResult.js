import React, { useEffect, useState } from "react";
import { getCategoryListApi, getCategoryResultApi } from "../../Services/apis";
import {
  CartAtom,
  pinCodeData,
  SelectedProductAtom,
  storeDataAtom,
  userData,
  userDataAtom,
} from "../../Recoil/atom";

import Header from "../Header/Header";
import HeaderFooterWrapper from "../HeaderFooterWrapper/HeaderFooterWrapper";
import config from "../../Services/config";
import { useNavigate, useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";

function CatResult() {
  const navigate = useNavigate();
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
  const storeDataRecoil = useRecoilValue(storeDataAtom);
  const pinCodeRecoil = useRecoilValue(pinCodeData);
  const [catResult, setCatResult] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useRecoilState(SelectedProductAtom);

  const [cart, setCart] = useRecoilState(CartAtom);

  useEffect(() => {
    const data = {
      uID: userData.id || "0",
      storeId: storeDataRecoil.id,
      pinCode: pinCodeRecoil.id,
      catId: id,
    };
    getCategoryResultApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    if (res && res.ResponseCode === "200") {
      setCatResult(res.CategoryProduct);
    }
  };

  const addItemToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem("pharm-box-cart", JSON.stringify([...cart, item]));
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
              <div className="flex bg-white mb-3 h-24 relative">
                <div
                  className="p-2 flex justify-center items-center h-full"
                  style={{
                    width: "120px",
                  }}
                >
                  <div>
                    <span className="inline-block leading-3	text-xs px-3 py-2 background-primary absolute top-0 left-0 rounded-r-full rounded-b-full">
                      {item.product_info[0].product_discount}
                      %
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
                  <p
                    onClick={() => {
                      console.log("first");
                      setSelectedProduct(item);
                      navigate("/product-description");
                    }}
                  >
                    {item.product_name}
                  </p>
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
                  <div className="rounded border mt-2 px-2 uppercase text-sm h-6	text-emerald-400 w-2/5		">
                    <span className="font11">
                      <div>
                        <span className="font12 truncate px-2">
                          {item.product_info &&
                            item.product_info.length > 0 &&
                            item.product_info[0].product_type}
                        </span>
                      </div>
                    </span>
                  </div>

                  <div className="absolute background-primary bottom-0 right-0 py-1 px-5">
                    <button
                      className="font15 font-w-500"
                      onClick={() => {
                        addItemToCart(item);
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
              //   <div
              //     onClick={() => {
              //       console.log("first");
              //       setSelectedProduct(item);
              //       navigate("/product-description");
              //     }}
              //   >
              //     <div className="flex items-center justify-center ">
              //       <span className="text-slate-600 font-w-500">
              //         {item.category_name}
              //       </span>
              //     </div>
              //     <div key={key} className="ion-padding  ">
              //       <div className="bg-white  flex rounded-lg">
              //         <img
              //           style={{ width: "27%" }}
              //           src={`${config.baseUrl}/${item.product_image}`}
              //           alt=""
              //         />
              //         <div
              //           className="absolute "
              //           style={{
              //             left: "0",
              //             left: "16px",
              //           }}
              //         >
              //           <span className="inline-block leading-3	text-xs px-3 py-2 background-primary rounded-r-full rounded-b-full">
              //             {item.product_info[0].product_discount}
              //             %
              //             <br />
              //             OFF
              //           </span>
              //         </div>
              //         <div className="ml-2 py-4">
              //           <h1 className="font13 font-w-600">{item.product_name}</h1>
              //           <span className="font13 font-w-600">
              //             Rs
              //             {parseFloat(
              //               item.product_info[0].product_price -
              //                 (item.product_info[0].product_price / 100) *
              //                   item.product_info[0].product_discount
              //             ).toFixed(2)}{" "}
              //           </span>
              //           <span className="font13 font-w-600 ml-1 text-slate-500">
              //             {parseFloat(item.product_info[0].product_price).toFixed(
              //               2
              //             )}
              //           </span>
              //         </div>
              //         <div className="pt-12">
              //           <button className="background-primary font13 font-w-500 py-1 px-5 ml-2">
              //             Add To Cart
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
            ))}
        </div>
      </HeaderFooterWrapper>
    </>
  );
}

export default CatResult;
