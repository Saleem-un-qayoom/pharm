import React from "react";
import { useNavigate } from "react-router";

function ProductDescription() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="ion-padding background-primary font-semibold rounded-b-xl ">
        <div className="flex items-center">
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
          <img
            className="ml-32"
            onClick={() => navigate("/cart-page")}
            style={{ width: "20px" }}
            src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/2x/external-cart-user-interface-icongeek26-glyph-icongeek26.png"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-center mt-12">
          <img
            src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
            alt=""
          />
        </div>
        <div className="ion-padding mt-4">
          <h1 className="font13 font-w-900">ZOPRESS-0.5MD TABLET</h1>
          <p className="font13 font-w-500 mt-1">By PharmBox Store</p>
        </div>
        <div className="ion-padding flex justify-between text-center items-center">
          <div>
            <span className="font12 font-w-600">Rs36</span>
            <span className="ml-2 font12 font-w-400 text-slate-400">Rs40</span>
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
      </div>
    </div>
  );
}

export default ProductDescription;
