import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CartAtom, userDataAtom } from "../../../Recoil/atom";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";
import commonService from "../../../Services/commonService";
import config from "../../../Services/config";
import { useRecoilState, useRecoilValue } from "recoil";
import PrescriptionPopUp from "../../../components/PrescriptionPopUp";
import { getMyDeliveryAddressApi } from "../../../Services/apis";
import PopUpFromBottom from "../../../components/PopUpFromBottom/PopUpFromBottom";

function SingleItemCartScreen() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [myDeliveryAddress, setMyDeliveyAddress] = useState();

  const [paymentMethod, setPaymentMethod] = useState(false);
  const userData = useRecoilValue(userDataAtom);

  const [cart, setCart] = useRecoilState(CartAtom);
  const [prescriptoinImage, setPrescriptoinImage] = useState(null);
  const [prescriptionRequired, setPrescriptionRequired] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState({});

  const getMyDeliveryAddressApiFunc = getMyDeliveryAddressApi();

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

  const [returnItemCart, setReturnItemCart] = useState(
    commonService.returnItemFromCartById(id, cart)
  );

  useEffect(() => {
    setReturnItemCart(commonService.returnItemFromCartById(id, cart));
  }, [cart]);

  useEffect(() => {
    setPrescriptionRequired(commonService.isPrescriptionRequired(cart));
  }, [cart]);

  useEffect(() => {
    const data = {
      uid: userData.id,
    };
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
    getMyDeliveryAddressApiFunc(data, (res) => {
      setMyDeliveyAddress(res.AddressList[0]);
    });
  }, [userData]);

  const handleSubmit = () => {
    setPaymentMethod(true);
  };

  const handleImage = (img) => {
    setPrescriptoinImage(img);
  };

  const isPrescriptionRequired = () => {
    if (prescriptionRequired) {
      if (prescriptoinImage) {
        handleSubmit();
      } else {
        setShowPopUp(true);
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
                    alt=""
                    className="h-14 w-14"
                    src={`${config.baseUrl}/${returnItemCart.product_image[0]}`}
                  />
                  {returnItemCart.prescription_required === "1" && (
                    <img
                      alt=""
                      src="/assets/icons/rx.png"
                      className="w-4 absolute  -right-3"
                      style={{
                        top: -5,
                      }}
                    />
                  )}

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
                    alt=""
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
                  <img src="/assets/icons/coupon.png" alt="" className="w-6" />
                  <span className="text-sm font-bold pl-4">Apply Coupon</span>
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
                        {commonService.getTotalPrice([returnItemCart])}
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
                    {commonService.getTotalPrice([returnItemCart])}
                  </span>
                </div>
                {prescriptoinImage && (
                  <div className="flex justify-between items-center text-xs font-medium mt-3 text-black ion-padding-x relative ">
                    Prescription Image
                    <img src={prescriptoinImage} alt="" className="w-20 h-20" />
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
            </div>

            <div>
              <div className=" bg-white w-full flex flex-col justify-between">
                <div className="flex justify-between bg-slate-100 items-start ion-padding background-tertiary">
                  <div className="grow flex items-start">
                    <img src="/assets/icons/map.png" alt="" className="w-10" />
                    <div className="ml-4">
                      <p className=" font-medium">
                        {myDeliveryAddress && myDeliveryAddress.type}
                      </p>
                      <div className="flex ">
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
              showPopUp={showPopUp}
              setShowPopUp={setShowPopUp}
              handleImage={handleImage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-full">
            <img src="/assets/img/empty-cart.png" alt="" />
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

export default SingleItemCartScreen;
