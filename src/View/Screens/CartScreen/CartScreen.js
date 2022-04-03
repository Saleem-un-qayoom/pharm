import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { CartAtom } from "../../../Recoil/atom";
import config from "../../../Services/config";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import commonService from "../../../Services/commonService";

function CartScreen() {
  const [cart, setCart] = useRecoilState(CartAtom);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const increaseQuantity = (item) => {
    commonService.increaseQuantity(item, cart, setCart);
  };

  const [selectedItemToDelete, setSelectedItemToDelete] = useState({});

  const decreaseQuantity = (item) => {
    commonService.decreaseQuantity(item, cart, setCart);
  };

  const removeItemFromCart = (item) => {
    commonService.removeItemFromCart(item, cart, setCart);
  };

  const onDeleteModalClick = (value) => {
    if (value) {
      removeItemFromCart(selectedItemToDelete);
    }
    setShowDeleteModal(false);
  };

  return (
    <CommonScreenPage
      headingTitle={"Cart"}
      showDeleteModal={showDeleteModal}
      onDeleteModalClick={onDeleteModalClick}
    >
      <div className="flex flex-col h-full">
        <div className="ion-padding-x scrollable-element grow">
          {cart.map((item) => (
            <>
              <div className="flex justify-between w-full py-2">
                <div className="flex items-center">
                  <img
                    className="h-14 w-14"
                    src={`${config.baseUrl}/${item.product_image[0]}`}
                  />
                  <div className="flex flex-col ml-4">
                    <span className="font14 text-color-gray font-medium">
                      {item.product_name}
                    </span>
                    <div>
                      <span className="font12 font-semibold ">
                        Rs
                        {parseFloat(
                          item.product_info[0].product_price -
                            (item.product_info[0].product_price / 100) *
                              item.product_info[0].product_discount
                        ).toFixed(2)}
                      </span>
                      <span className="font12 line-through ml-1 text-color-gray font-medium">
                        Rs{item.product_info[0].product_price}
                      </span>
                    </div>
                    <span className="font12 text-color-gray font-medium">
                      {item.product_info[0].product_type}
                    </span>
                  </div>
                </div>
                <div className="ml-14 w-20 flex flex-col justify-between items-end">
                  <img
                    onClick={() => {
                      setSelectedItemToDelete(item);
                      setShowDeleteModal(true);
                    }}
                    src="/assets/icons/delete.png"
                    className="w-5"
                  />
                  <div className="w-full flex justify-between items-center">
                    <div
                      className="background-primary w-5 h-5  rounded  font-medium text-lg flex justify-center items-center"
                      onClick={() => decreaseQuantity(item)}
                    >
                      -
                    </div>
                    <div className="text-sm">{item.quantity}</div>

                    <div
                      className="background-primary w-5 h-5   rounded  font-medium text-lg flex justify-center items-center"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <div className=" bg-white w-full flex flex-col justify-between">
          <div className="flex justify-between bg-slate-100 items-start ion-padding background-tertiary">
            <div className="grow flex items-start">
              <img src="/assets/icons/map.png" className="w-10" />
              <div className="ml-2">
                <p className="mb-1 font-medium">Other</p>
                <p className="text-xs text-color-gray font-medium">
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                  lorem lorem{" "}
                </p>
              </div>
            </div>
            <div className="ml-5">
              <span className="text-xs font-medium">Change</span>
            </div>
          </div>
          <div className=" ion-padding flex items-center justify-center  rounded-lg">
            <button className="py-2.5 font-bold background-primary w-full rounded-lg">
              Proceed To Buy
            </button>
          </div>
        </div>
      </div>
    </CommonScreenPage>
  );
}

export default CartScreen;
