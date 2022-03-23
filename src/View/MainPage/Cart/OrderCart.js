import React from "react";
import { Navigate, useNavigate } from "react-router";
function OrderCart({ history }) {
  let navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center h-12">
          <img
            onClick={() => navigate(-1)}
            src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
            style={{ height: "25px", width: "20px", marginRight: "10px" }}
          />
          <span>Cart</span>
        </div>
        <div className="grow "></div>
        <div className="ion-padding bg-white">
          <div className="flex bg-orange " style={{ padding: "25px 3px" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDehGux_qQs1IgviBho1TINfNpM4J4VDKNQ&usqp=CAU"
              style={{ width: "45px", height: "50px" }}
            />
            <div className="">
              <p className="ml-4">Other</p>
            </div>
            <div>
              <span className="ml-48">Change</span>
            </div>
          </div>
          <div className="flex items-center justify-center  background-primary  rounded-lg">
            <button className="py-2.5 font-bold ">Proceed To Buy</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCart;
