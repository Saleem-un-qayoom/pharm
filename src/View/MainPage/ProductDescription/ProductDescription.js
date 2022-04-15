import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import { Pagination } from "swiper";
import { CartAtom, SelectedProductAtom } from "../../../Recoil/atom";
import config from "../../../Services/config";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import commonService from "../../../Services/commonService";
import { toast } from "react-toastify";

function ProductDescription() {
  let navigate = useNavigate();

  const [showBrand, setShowBrand] = useState(false);
  const [showComposition, setShowComposition] = useState(false);
  const [showConsume, setShowConsume] = useState(false);
  const [showDescription, setShowDescreiption] = useState(false);
  const selectedProduct = useRecoilValue(SelectedProductAtom);
  const [cart, setCart] = useRecoilState(CartAtom);

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/home");
    }
  }, []);

  const addItemToCart = (item) => {
    commonService.addItemToCart(item, cart, setCart);
  };

  const [noOfItemsAlreadyAddedInCart, setNoOfItemsAlreadyInCart] = useState(0);

  useEffect(() => {
    setNoOfItemsAlreadyInCart(
      commonService.isItemAlreadyInCart(selectedProduct, cart, setCart)
    );
  }, [cart]);

  const increaseQuantity = (item) => {
    commonService.increaseQuantity(item, cart, setCart);
    toast("Added to Cart");
  };

  const decreaseQuantity = (item) => {
    commonService.decreaseQuantity(item, cart, setCart);
  };

  return (
    <CommonScreenPage headingTitle={"Product Description"} showCart={true}>
      <div className="flex flex-col h-full px-2">
        <div className="grow scrollable-element">
          {selectedProduct && (
            <div className="grow">
              <div>
                <Swiper
                  className="mySwiper"
                  modules={[Pagination]}
                  spaceBetween={50}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  <SwiperSlide>
                    <div className="flex justify-center h-64">
                      <img
                        src={`${config.baseUrl}/${selectedProduct.product_image[0]}`}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className=" mt-4">
                  <h1 className="font13 font-w-900 ml-2.5	">
                    {selectedProduct.product_name}
                  </h1>
                  <p className="font13 font-w-500 mt-1">
                    By {selectedProduct.Brand_name}
                  </p>
                  {noOfItemsAlreadyAddedInCart !== 0 && (
                    <div
                      className="absolute top-80 right-2	 bg-amber-400 py-1 px-2 rounded-md text-white text-xs font-semibold"
                      onClick={() => {
                        navigate(`/cart-page/${selectedProduct.id}`);
                      }}
                    >
                      Buy Now
                    </div>
                  )}
                </div>
                <div className=" flex justify-between text-center items-center">
                  <div>
                    <span className="font12 font-semibold pl-2">
                      Rs
                      {parseFloat(
                        selectedProduct.product_info[0].product_price -
                          (selectedProduct.product_info[0].product_price /
                            100) *
                            selectedProduct.product_info[0].product_discount
                      ).toFixed(2)}
                    </span>
                    <span className="font12 line-through ml-1">
                      {selectedProduct.product_info[0].product_price}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="pb-1">
                      <button className="background-primary font12 font-w-500 py-1 px-3 rounded-md">
                        10% OFF
                      </button>
                    </div>

                    <div className="flex justify-center items-center h-6 w-full	 ">
                      {noOfItemsAlreadyAddedInCart !== 0 ? (
                        <>
                          <div className="w-full flex justify-between items-center">
                            <div
                              className="background-primary w-6 h-full  font-medium text-lg flex justify-center items-center rounded"
                              onClick={() => decreaseQuantity(selectedProduct)}
                            >
                              -
                            </div>
                            <div className="text-sm">
                              {noOfItemsAlreadyAddedInCart}
                            </div>

                            <div
                              className="background-primary w-6 h-full font-medium text-lg flex justify-center items-center rounded"
                              onClick={() => increaseQuantity(selectedProduct)}
                            >
                              +
                            </div>
                          </div>
                        </>
                      ) : (
                        <button
                          className="text-xs background-primary font-w-500 py-1 px-1 w-full	"
                          onClick={() => addItemToCart(selectedProduct)}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <>
                  <div className="">
                    <div
                      className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400	flex justify-between items-center"
                      onClick={() => {
                        setShowBrand(!showBrand);
                      }}
                    >
                      <span>Brand</span>
                      <span className="text-xl">{showBrand ? "-" : "+"}</span>
                    </div>
                    {showBrand && (
                      <div className="px-2 py-1 text-gray-800 text-sm	">
                        {selectedProduct.product_brand}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div
                      className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400 flex justify-between	items-center"
                      onClick={() => {
                        setShowComposition(!showComposition);
                      }}
                    >
                      <span>Composition</span>
                      <span className="text-xl">
                        {showComposition ? "-" : "+"}
                      </span>
                    </div>
                    {showComposition && (
                      <div className="px-2 py-1 text-gray-800 text-sm	">
                        {selectedProduct.composition}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div
                      className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400 flex justify-between items-center	"
                      onClick={() => {
                        setShowConsume(!showConsume);
                      }}
                    >
                      <span>Consume Type</span>
                      <span className="text-xl">{showConsume ? "-" : "+"}</span>
                    </div>
                    {showConsume && (
                      <div className="px-2 py-1 text-gray-800 text-sm	">
                        {selectedProduct.consume_type}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div
                      className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400 flex justify-between items-center	"
                      onClick={() => {
                        setShowDescreiption(!showDescription);
                      }}
                    >
                      <span>Description</span>
                      <span className="text-xl">
                        {showDescription ? "-" : "+"}
                      </span>
                    </div>
                    {showDescription && (
                      <div
                        className="ion-padding font11 font-w-700"
                        dangerouslySetInnerHTML={{
                          __html: selectedProduct.short_desc,
                        }}
                      />
                    )}
                  </div>
                </>
              </div>
            </div>
          )}
        </div>
        <div className=" ion-padding-y flex items-center justify-center  rounded-lg mb-2">
          <button className="py-2.5 font-bold background-primary w-full rounded-lg">
            Continue Shopping
          </button>
        </div>
      </div>
    </CommonScreenPage>
  );
}

export default ProductDescription;
