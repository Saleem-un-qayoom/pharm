import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { SelectedProductAtom } from "../../../Recoil/atom";
import config from "../../../Services/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

function ProductDescription() {
  let navigate = useNavigate();

  const [showBrand, setShowBrand] = useState(false);
  const [showComposition, setShowComposition] = useState(false);
  const [showConsume, setShowConsume] = useState(false);
  const [showDescription, setShowDescreiption] = useState(false);

  const selectedProduct = useRecoilValue(SelectedProductAtom);
  useEffect(() => {
    if (!selectedProduct) {
      navigate("/home");
    }
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="ion-padding background-primary font-semibold rounded-b-xl flex justify-between ">
        <div className="flex items-center">
          {" "}
          <img
            onClick={() => navigate(-1)}
            src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
            style={{
              height: "25px",
              width: "20px",
              marginRight: "10px",
            }}
          />
          <span>Product Description</span>
        </div>

        <div>
          <img
            className="ml-32"
            onClick={() => navigate("/cart-page")}
            style={{ width: "20px" }}
            src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/2x/external-cart-user-interface-icongeek26-glyph-icongeek26.png"
          />
        </div>
      </div>

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
            </div>
            <div className=" flex justify-between text-center items-center">
              <div>
                <span className="font12 font-semibold pl-2">
                  Rs
                  {parseFloat(
                    selectedProduct.product_info[0].product_price -
                      (selectedProduct.product_info[0].product_price / 100) *
                        selectedProduct.product_info[0].product_discount
                  ).toFixed(2)}
                </span>
                <span className="font12 line-through ml-1">
                  {selectedProduct.product_info[0].product_price}
                </span>
              </div>
              <div className="flex flex-col">
                <button className="background-primary font12 font-w-500 py-1 px-3 rounded-md">
                  10% OFF
                </button>

                <button className="background-primary mt-1 font12 font-w-500 py-1 px-3 rounded-md">
                  Add To Cart
                </button>
              </div>
            </div>
            <hr />
            <>
              <div className="ion-padding-x">
                <div
                  className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400	"
                  onClick={() => {
                    setShowBrand(!showBrand);
                  }}
                >
                  Brand
                </div>
                {showBrand && (
                  <div className="px-2 py-1 text-gray-800 text-sm	">
                    {selectedProduct.product_brand}
                  </div>
                )}
              </div>

              <div className="ion-padding-x">
                <div
                  className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400	"
                  onClick={() => {
                    setShowComposition(!showComposition);
                  }}
                >
                  Composition
                </div>
                {showComposition && (
                  <div className="px-2 py-1 text-gray-800 text-sm	">
                    {selectedProduct.composition}
                  </div>
                )}
              </div>

              <div className="ion-padding-x">
                <div
                  className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400	"
                  onClick={() => {
                    setShowConsume(!showConsume);
                  }}
                >
                  Consume Type
                </div>
                {showConsume && (
                  <div className="px-2 py-1 text-gray-800 text-sm	">
                    {selectedProduct.consume_type}
                  </div>
                )}
              </div>

              <div className="ion-padding-x">
                <div
                  className="rounded border mt-2 px-2 uppercase text-sm	text-emerald-400	"
                  onClick={() => {
                    setShowDescreiption(!showDescription);
                  }}
                >
                  Description
                </div>
                {showDescription && (
                  // <div className="px-2 py-1 text-gray-800 text-sm	">
                  //   {selectedProduct.short_desc}
                  // </div>
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

      <div className=" flex items-center justify-center  rounded-lg mb-2">
        <button className="py-2.5 font-bold background-primary w-full rounded-lg">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
