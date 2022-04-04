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
import { toast } from "react-toastify";
import commonService from "../../Services/commonService";
import CommonHeaderFooterPage from "../CommonScreenWithSearchHeaderPage/CommonHeaderFooterPage";

function CatResult(item) {
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

  const [noOfItemsAlreadyAddedInCart, setNoOfItemsAlreadyInCart] = useState(0);

  useEffect(() => {
    setNoOfItemsAlreadyInCart(
      commonService.isItemAlreadyInCart(item, cart, setCart)
    );
  }, [cart]);

  const addItemToCart = (item) => {
    commonService.addItemToCart(item, cart, setCart);
  };

  const increaseQuantity = (item) => {
    commonService.increaseQuantity(item, cart, setCart);
  };

  const decreaseQuantity = (item) => {
    commonService.decreaseQuantity(item, cart, setCart);
  };

  // const addItemToCart = (item) => {
  //   setCart([...cart, item]);
  //   localStorage.setItem("pharm-box-cart", JSON.stringify([...cart, item]));
  // };

  return (
    <>
      <CommonHeaderFooterPage bgColor={"background-tertiary"}>
        <div className="pt-2   h-full  mb-4 relative ion-padding">
          <div className="flex items-center justify-center">
            <span>{catResult.category_name}</span>
          </div>
          {catResult &&
            catResult.productlist &&
            catResult.productlist.map((item, key) => (
              <div className="flex bg-white mb-3 h-24 relative rounded">
                <div
                  className="p-2 flex justify-center items-center h-full"
                  style={{
                    width: "120px",
                  }}
                >
                  <div>
                    <span className="inline-block leading-3	text-xs font-semibold px-3 py-2 background-primary absolute top-0 left-0 rounded-r-full rounded-b-full">
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
                <div className="grow py-2 text-xs font-semibold ">
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedProduct(item);
                      navigate("/product-description");
                    }}
                  >
                    {item.product_name}
                  </p>
                  <div>
                    <span className="font12 font-semibold mr-1">
                      Rs
                      {parseFloat(
                        item.product_info[0].product_price -
                          (item.product_info[0].product_price / 100) *
                            item.product_info[0].product_discount
                      ).toFixed(2)}
                    </span>
                    &nbsp;
                    <span className="font10 font-semibold line-through text-light-grey ">
                      Rs
                      {parseFloat(item.product_info[0].product_price).toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-center items-center w-full h-6 ">
                    {commonService.isItemAlreadyInCart(item, cart, setCart) !==
                    0 ? (
                      <div className="w-full flex justify- items-center">
                        <div
                          className="background-primary w-6 h-full rounded  font-medium text-lg flex justify-center items-center"
                          onClick={() => decreaseQuantity(item)}
                        >
                          -
                        </div>
                        <div className="text-sm">
                          {commonService.isItemAlreadyInCart(
                            item,
                            cart,
                            setCart
                          )}
                        </div>

                        <div
                          className="background-primary w-6 h-full rounded  font-medium text-lg flex justify-center items-center"
                          onClick={() => increaseQuantity(item)}
                        >
                          +
                        </div>
                      </div>
                    ) : (
                      <div className="">
                        <button
                          className="text-xs background-primary font-w-600 py-1 px-5"
                          onClick={() => addItemToCart(item)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CommonHeaderFooterPage>
    </>
  );
}

export default CatResult;
