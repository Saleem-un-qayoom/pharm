import React from "react";
import config from "../../Services/config";
import { useNavigate } from "react-router";

function ExploreNew({ medicine }) {
  const navigate = useNavigate();
  return (
    <div className="explore-something-new ion-padding bg-slate-50">
      <div className="explore-something-new__head flex justify-between items-center  ">
        <p className="text-xs font-medium text-color-primary ">
          Explore Something New
        </p>
        <button
          className="text-xs font-w-700"
          onClick={() => navigate("/explore-new-page")}
        >
          View all{" "}
        </button>
      </div>

      <div className=" flex mt-4 scrollable-element">
        {medicine.map((item, key) => (
          <div
            key={key}
            className="flex flex-col bg-white mr-3"
            style={{
              flex: "0 0 145px",
            }}
          >
            <div>
              <span className="inline-block leading-3	text-xs px-3 py-2 background-primary rounded-r-full rounded-b-full">
                {item.product_info[0].product_discount}%
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
            <div className="flex justify-center items-center background-primary w-full	 ">
              <button className="text-xs font-w-600 py-1 px3 w-full	">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreNew;
