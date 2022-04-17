import React, { useEffect, useState } from "react";
import {
  CartAtom,
  exploreNewData,
  pinCodeData,
  SelectedProductAtom,
  storeDataAtom,
  userDataAtom,
} from "../../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

import config from "../../../Services/config";
import { getExploreNewApi } from "../../../Services/apis";

// import Select from "react-select";
import { useNavigate } from "react-router";
import commonService from "../../../Services/commonService";
import CommonHeaderFooterPage from "../../../components/CommonScreenWithSearchHeaderPage/CommonHeaderFooterPage";

function ExploreNewScreen(item) {
  const navigate = useNavigate();

  const [exploreNew, setExploreNew] = useState([]);
  const userRecoil = useRecoilValue(userDataAtom);
  const [storeRecoil, setStoreRecoil] = useRecoilState(storeDataAtom);
  const [pinCodeRecoil, setPinCodeRecoil] = useRecoilState(pinCodeData);

  const [loading, setLoading] = useState(true);

  const getExploreNewApiFunc = getExploreNewApi();

  const [selectedProduct, setSelectedProduct] =
    useRecoilState(SelectedProductAtom);

  const [cart, setCart] = useRecoilState(CartAtom);

  useEffect(() => {
    const data = {
      uID: userRecoil.id || "0",
      storeId: storeRecoil.id,
      pinCode: pinCodeRecoil.id,
    };
    getExploreNewApiFunc(data, handleResponse);
  }, []);

  const handleResponse = (res) => {
    setLoading(false);
    if (res && res.ResponseCode === "200") {
      setExploreNew(res.BrandProductList);
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

  return (
    <>
      <CommonHeaderFooterPage
        className="bg-slate-200 ion-padding-x py-6"
        showLoading={loading}
        bgColor={"background-tertiary"}
      >
        <div className="ion-padding">
          {exploreNew.map((item, key) => (
            <div key={key} className="flex bg-white mb-3 h-24 relative">
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
                  onClick={() => {
                    console.log("first");
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
                  <span className="font10 font-semibold line-through text-light-grey">
                    Rs
                    {parseFloat(item.product_info[0].product_price).toFixed(2)}
                  </span>
                </div>

                <div className="rounded border mt-2 px-2 uppercase text-sm	h-6 text-emerald-400 w-2/5		">
                  <span className="font10  truncate">
                    {item.product_info &&
                      item.product_info.length > 0 &&
                      item.product_info[0].product_type}
                  </span>
                </div>

                <div className="flex justify-center items-center w-full h-6 ">
                  {commonService.isItemAlreadyInCart(item, cart, setCart) !==
                  0 ? (
                    <>
                      <div
                        className="absolute top-2 right-2 bg-yellow-300 py-1 px-2 rounded-md"
                        onClick={() => navigate(`/cart-screen/${item.id}`)}
                      >
                        <p className="text-white text-xs font-semibold">
                          Buy Now
                        </p>
                      </div>
                      <div className="w-full flex  justify-end absolute bottom-0 left-0 ">
                        <div
                          className="background-primary w-6 h-full rounded  font-medium text-lg flex justify-center items-center"
                          onClick={() => decreaseQuantity(item)}
                        >
                          -
                        </div>
                        <div className="text-sm px-6 flex items-center">
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
                    </>
                  ) : (
                    <div className="absolute bottom-0 right-0">
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

export default ExploreNewScreen;
