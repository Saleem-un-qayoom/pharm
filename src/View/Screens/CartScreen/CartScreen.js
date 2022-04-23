import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { addressesAtom, CartAtom, userDataAtom } from "../../../Recoil/atom";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import commonService from "../../../Services/commonService";
import config from "../../../Services/config";
import { useRecoilState, useRecoilValue } from "recoil";
import PrescriptionPopUp from "../../../components/PrescriptionPopUp";
import PopUpFromBottom from "../../../components/PopUpFromBottom/PopUpFromBottom";
import { getMyDeliveryAddressApi } from "../../../Services/apis";

function CartScreen() {
  let navigate = useNavigate();

  const [myDeliveryAddress, setMyDeliveyAddress] = useState();

  const [cart, setCart] = useRecoilState(CartAtom);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [prescriptoinImage, setPrescriptoinImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState({});
  const [prescriptionRequired, setPrescriptionRequired] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const userData = useRecoilValue(userDataAtom);

  const getMyDeliveryAddressApiFunc = getMyDeliveryAddressApi();

  useEffect(() => {
    setPrescriptionRequired(commonService.isPrescriptionRequired(cart));
  }, [cart]);

  useEffect(() => {
    const data = {
      uid: userData.id,
    };
    getMyDeliveryAddressApiFunc(data, (res) => {
      setMyDeliveyAddress(res.AddressList[0]);
    });
  }, []);

  const increaseQuantity = (item) => {
    commonService.increaseQuantity(item, cart, setCart);
  };

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

  const handleSubmit = () => {
    setShowPopUp(true);
  };

  const handleImage = (img) => {
    setPrescriptoinImage(img);
  };

  const isPrescriptionRequired = () => {
    if (prescriptionRequired) {
      if (prescriptoinImage) {
        handleSubmit();
      } else {
        setShowDeletePopUp(true);
      }
    } else {
      handleSubmit();
    }
  };

  return (
    <CommonScreenPage
      headingTitle={"Cart"}
      showDeleteModal={showDeleteModal}
      onDeleteModalClick={onDeleteModalClick}
    >
      <div className="flex flex-col h-full ">
        {cart.length !== 0 ? (
          <>
            <div className=" scrollable-element-y grow ">
              {cart.map((item) => (
                <>
                  <div className="flex justify-between w-full py-2 h-20 ion-padding-x">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          className="h-14 w-14"
                          src={`${config.baseUrl}/${item.product_image[0]}`}
                          alt=""
                        />
                        {item.prescription_required === "1" && (
                          <img
                            src="/assets/icons/rx.png"
                            className="w-4 absolute  -right-3"
                            style={{
                              top: -5,
                            }}
                            alt=""
                          />
                        )}
                      </div>

                      <div className="flex flex-col ml-4">
                        <span className="font14 text-color-gray font-medium leading-4">
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
                            Rs
                            {item.product_info[0].product_price}
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
                        alt=""
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
              {cart.length !== 0 && (
                <>
                  <div className="background-tertiary mt-1 py-4 ion-padding-x flex justify-between">
                    <div className="flex items-center">
                      <img
                        src="/assets/icons/coupon.png"
                        alt=""
                        className="w-6"
                      />
                      <span className="text-sm font-bold pl-4">
                        Apply Coupon
                      </span>
                    </div>
                    <div>
                      <img
                        src="/assets/icons/next.png"
                        alt=""
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
                    {prescriptoinImage && (
                      <div className="flex justify-between items-center text-xs font-medium mt-3 text-black ion-padding-x relative ">
                        Prescription Image
                        <img src={prescriptoinImage} className="w-20 h-20" />
                        <img
                          src="/assets/icons/rx.png"
                          className="w-4 absolute   right-2"
                          alt=""
                          style={{
                            top: -6,
                          }}
                        />
                      </div>
                    )}

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
                </>
              )}
            </div>
            <div>
              <div className=" bg-white w-full flex flex-col justify-between ">
                <div className="flex justify-between bg-slate-100 items-start ion-padding background-tertiary">
                  <div className="grow flex  items-center">
                    <img
                      src=
                      // {myDeliveryAddress && myDeliveryAddress.address}
                      "/assets/icons/map.png"
                      alt=""
                      className="w-10"
                    />
                    <div className="ml-4">
                      <p className=" font-medium">
                        {myDeliveryAddress && myDeliveryAddress.type}
                      </p>
                      <div className="flex">
                        <p className="text-xs text-gray-600  font-semibold">
                          {myDeliveryAddress && myDeliveryAddress.hno},
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          {myDeliveryAddress && myDeliveryAddress.landmark}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        {myDeliveryAddress && myDeliveryAddress.address}
                      </p>
                    </div>
                  </div>
                  <div
                    className="ml-5"
                    onClick={() => navigate("/manage-addresses")}
                  >
                    <span className="text-xs font-medium">Change</span>
                  </div>
                </div>
                <div className=" ion-padding flex items-center justify-center  rounded-lg">
                  <button
                    className="py-2.5 font-bold background-primary w-full rounded-lg"
                    onClick={isPrescriptionRequired}
                  >
                    Proceed To Buy
                  </button>
                </div>
              </div>
            </div>
            <PrescriptionPopUp
              showPopUp={showDeletePopUp}
              setShowPopUp={setShowDeletePopUp}
              handleImage={handleImage}
            />
          </>
        ) : (
          <div className="flex items-center justify-start h-full">
            <img src="assets/img/empty-cart.png" alt="" />
          </div>
        )}
      </div>
      <PopUpFromBottom showPopUp={showPopUp}>
        <div
          className="common-screen-page-loading  w-screen absolute top-0 left-0 z-50 flex justify-center items-center"
          //   onClick={() => onDeleteModalClick(false)}
        >
          <div
            className="grow common-screen-page-loading h-screen "
            onClick={() => setShowPopUp(false)}
          ></div>
          <div className="w-full  bg-white rounded-md  py-3 px-3 absolute bottom-0">
            <div>
              <p className="text-base font-semibold">Select Payment Method</p>
              <p className="text-sm font-semibold text-emerald-600">
                Total Amount Rs{commonService.getTotalPrice(cart)}
              </p>
            </div>
            <div className="ion-padding">
              <div className="flex">
                <img
                  className="h-10"
                  alt=""
                  src="/assets/img/cash-on-delivery.png"
                />
                <div className="flex flex-col pl-4">
                  <span className="text-xs font-semibold">
                    Cash On Delivery
                  </span>
                  <p className="text-xs text-color-tertiary pt-1">
                    Pay via cash at the time of delivery. it's free and only
                    takes a few minutes{" "}
                  </p>
                </div>
              </div>
              <div className="flex mt-6">
                <img className="h-10" alt="" src="/assets/img/payu.png" />
                <div className="flex flex-col pl-4">
                  <span className="text-xs font-semibold">PayU</span>
                  <p className="text-xs text-color-tertiary pt-1">
                    Credit/Debit card with easier way to pay - online in your
                    mobile phone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopUpFromBottom>
    </CommonScreenPage>
  );
}

export default CartScreen;
