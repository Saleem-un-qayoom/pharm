import React from "react";
import config from "../../Services/config";
import { testimonialAtom } from "../../Recoil/atom";
import { useRecoilValue } from "recoil";

function WhatUsersSay() {
  const testimonialRecoil = useRecoilValue(testimonialAtom);
  return (
    <div className="what-users-say ion-padding w-full bg-slate-50 scrollable-element-y ">
      <div className="what-users-say__head">
        <p className="text-xs font-medium text-color-primary">What Users Say</p>
      </div>
      <div className="flex mt-4">
        {testimonialRecoil.map((item, key) => {
          return (
            <div
              key={key}
              className="flex flex-col items-center justify-center bg-white mr-3 px-3 py-3 "
              style={{ flex: "0 0 130px" }}
            >
              <span className="text-3xl">"</span>
              <p className="font10 font-w-500">{item.comment}</p>
              <img src={`${config.baseUrl}/${item.img}`} className="w-10" />
              <p className="font10">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WhatUsersSay;
