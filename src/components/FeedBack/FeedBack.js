import React from "react";
import { FeedbackData, testimonialAtom } from "../../Recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import config from "../../Services/config";

// const users = [
//   {
//     paragraph: "wow its really worth to buy thing in discounted price",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//     name: "Zahid Farooq",
//   },
//   {
//     paragraph: "wow its really worth to buy thing in discounted price",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//     name: "Zahid Farooq",
//   },
//   {
//     paragraph: "wow its really worth to buy thing in discounted price",
//     image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
//     name: "Zahid Farooq",
//   },
// ];

function WhatUsersSay() {
  // const FeedbackRecoil = useRecoilValue(FeedbackData);
  const [testimonialRecoil, setTestimonialRecoil] =
    useRecoilState(testimonialAtom);
  return (
    <div className="what-users-say ion-padding w-full bg-slate-50 scrollable-element ">
      <div className="what-users-say__head">
        <p className="text-xs font-medium text-color-primary">What Users Say</p>
      </div>
      <div className="flex mt-4">
        {testimonialRecoil.map((item) => {
          return (
            <div
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
