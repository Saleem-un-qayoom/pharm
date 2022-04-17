import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CartAtom } from "../../../Recoil/atom";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import commonService from "../../../Services/commonService";
import config from "../../../Services/config";
import { useRecoilState } from "recoil";

function SingleItemCartScreen() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [paymentMethod, setPaymentMethod] = useState(false);

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

  const [returnItemCart, setReturnItemCart] = useState(
    commonService.returnItemFromCartById(id, cart)
  );

  useEffect(() => {
    setReturnItemCart(commonService.returnItemFromCartById(id, cart));
  }, [cart]);

  return (
    <CommonScreenPage
      headingTitle={"Cart"}
      showDeleteModal={showDeleteModal}
      onDeleteModalClick={onDeleteModalClick}
      showCart={true}
      showPaymentMethod={paymentMethod}
      setPaymentMethod={setPaymentMethod}
    >
      <div className="flex flex-col h-full">
        {returnItemCart ? (
          <>
            <div className=" scrollable-element-y grow">
              <div className="flex justify-between w-full py-2 h-20 ion-padding-x">
                <div className="flex items-center">
                  <img
                    className="h-14 w-14"
                    src={`${config.baseUrl}/${returnItemCart.product_image[0]}`}
                  />

                  <div className="flex flex-col ml-4">
                    <span className="font14 text-color-gray font-medium leading-4">
                      {returnItemCart.product_name}
                    </span>
                    <div>
                      <span className="font12 font-semibold ">
                        Rs
                        {parseFloat(
                          returnItemCart.product_info[0].product_price -
                            (returnItemCart.product_info[0].product_price /
                              100) *
                              returnItemCart.product_info[0].product_discount
                        ).toFixed(2)}
                      </span>
                      <span className="font12 line-through ml-1 text-color-gray font-medium">
                        Rs
                        {returnItemCart.product_info[0].product_price}
                      </span>
                    </div>
                    <span className="font12 text-color-gray font-medium">
                      {returnItemCart.product_info[0].product_type}
                    </span>
                  </div>
                </div>
                <div className="ml-14 w-20 flex flex-col justify-between items-end">
                  <img
                    onClick={() => {
                      setSelectedItemToDelete(returnItemCart);
                      setShowDeleteModal(true);
                    }}
                    src="/assets/icons/delete.png"
                    className="w-5"
                  />
                  <div className="w-full flex justify-between items-center">
                    <div
                      className="background-primary w-5 h-5  rounded  font-medium text-lg flex justify-center items-center"
                      onClick={() => decreaseQuantity(returnItemCart)}
                    >
                      -
                    </div>
                    <div className="text-sm">{returnItemCart.quantity}</div>

                    <div
                      className="background-primary w-5 h-5   rounded  font-medium text-lg flex justify-center items-center"
                      onClick={() => increaseQuantity(returnItemCart)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="background-tertiary mt-1 py-4 ion-padding-x flex justify-between">
                <div className="flex items-center">
                  <img src="/assets/icons/coupon.png" className="w-6" />
                  <span className="text-sm font-bold pl-4">Apply Coupon</span>
                </div>
                <div>
                  <img
                    src="/assets/icons/next.png"
                    className="w-6"
                    onClick={() => navigate("/apply-coupon")}
                  />
                </div>
              </div>

              <div>
                <div className="">
                  <div className="bg-white  my-2.5  rounded-lg flex flex-col ion-padding-x">
                    <div className="flex justify-between text-xs font-medium text-color-gray">
                      Cart Value
                      <span className="text-black">
                        {commonService.getTotalPrice(cart)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-medium mt-2 text-color-gray">
                      Delivery Charges
                      <span className="text-black">Rs0.0</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium mt-2 text-color-gray">
                      Coupon Discount
                      <span className="text-black">Rs0</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between text-xs font-medium mt-3 text-black ion-padding-x">
                  Amount to be Paid :
                  <span className="text-black">
                    {commonService.getTotalPrice(cart)}
                  </span>
                </div>

                <div className="ion-padding-x mb-2">
                  <div className=" w-full flex flex-col border rounded-lg overflow-hidden mt-2 ">
                    <label className="bg-white pl-2 pr-2 pb-1 pt-1 text-xs	font-semibold	mt-1">
                      Additional Note
                    </label>
                    <textarea
                      className="border-0 text-xs	font-semibold pl-2 pr-2"
                      type="text"
                      rows="5"
                      placeholder="Enter any additional information regarding your order"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className=" bg-white w-full flex flex-col justify-between">
                <div className="flex justify-between bg-slate-100 items-start ion-padding background-tertiary">
                  <div className="grow flex items-start">
                    <img src="/assets/icons/map.png" className="w-10" />
                    <div className="ml-2">
                      <p className="mb-1 font-medium">Other</p>
                      <p className="text-xs text-color-gray font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dicta, porro?
                      </p>
                    </div>
                  </div>
                  <div className="ml-5">
                    <span className="text-xs font-medium">Change</span>
                  </div>
                </div>
                <div className=" ion-padding flex items-center justify-center  rounded-lg">
                  <button
                    className="py-2.5 font-bold background-primary w-full rounded-lg"
                    onClick={() => setPaymentMethod(true)}
                  >
                    Proceed To Buy
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-full">
            <img src="/assets/img/empty-cart.png" />
          </div>
        )}
      </div>
    </CommonScreenPage>
  );
}

export default SingleItemCartScreen;
