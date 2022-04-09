import { CartAtom, SelectedProductAtom } from "../../Recoil/atom";
import React, { useEffect, useState } from "react";

import commonService from "../../Services/commonService";
import config from "../../Services/config";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";

function ExploreNewItem({ item }) {
  const navigate = useNavigate();

  const [cart, setCart] = useRecoilState(CartAtom);
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(SelectedProductAtom);
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
    <div
      className="flex flex-col bg-white mr-3 relative"
      style={{
        flex: "0 0 145px",
      }}
    >
      <div
        onClick={() => {
          setSelectedProduct(item);
          navigate("/product-description");
        }}
      >
        <div>
          <span className="inline-block leading-3	text-xs px-3 py-2 background-primary rounded-r-full rounded-b-full">
            {item.product_info[0].product_discount}
            %
            <br />
            OFF
          </span>
        </div>
        <div className="h-28 flex items-center justify-center">
          <img
            className="h-4/5"
            src={
              item.product_image[0]
                ? `${config.baseUrl}/${item.product_image[0]}`
                : "https://img.icons8.com/ios/100/000000/no-camera--v1.png"
            }
            alt=""
          />
        </div>
        <div>
          <span className="font12 font-semibold pl-2">
            Rs
            {parseFloat(
              item.product_info[0].product_price -
                (item.product_info[0].product_price / 100) * 10
            ).toFixed(2)}
          </span>
          &nbsp;
          <span className="font10 font-semibold line-through text-light-grey">
            Rs
            {parseFloat(item.product_info[0].product_price).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="font12 font-semibold truncate px-2">
            {item.product_name}
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center h-6 w-full	 ">
        {noOfItemsAlreadyAddedInCart !== 0 ? (
          <>
            <div className="absolute top-2 right-2 bg-amber-400	 py-1 px-2 rounded-md">
              <p
                className="text-white text-xs font-semibold"
                onClick={() => navigate("/cart-page")}
              >
                Buy Now
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <div
                className="background-primary w-6 h-full  font-medium text-lg flex justify-center items-center rounded"
                onClick={() => decreaseQuantity(item)}
              >
                -
              </div>
              <div className="text-sm">{noOfItemsAlreadyAddedInCart}</div>

              <div
                className="background-primary w-6 h-full font-medium text-lg flex justify-center items-center rounded"
                onClick={() => increaseQuantity(item)}
              >
                +
              </div>
            </div>
          </>
        ) : (
          <button
            className="text-xs background-primary font-w-600 py-1 px3 w-full	"
            onClick={() => addItemToCart(item)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ExploreNewItem;
