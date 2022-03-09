import React from "react";
import { Navigate, useNavigate } from "react-router";

function ProfilePage({ history }) {
  let navigate = useNavigate();
  const profile = [
    { name: "My Orders", link: "/my-order" },
    { name: "Manage Adresses", link: "/manage-addresses" },
    { name: "About", link: "/about-page" },
    { name: "Contact", link: "/contact-page" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms & Conditions", link: "/terms-and-conditions" },
  ];

  return (
    <div>
      <div className=" flex flex-col h-32 items-center background-primary pt-4 relative">
        <div className=" absolute bg-white py-px px-px rounded-full top-2.5 right-40">
          <img
            className="w-4 h-4"
            onClick={() => navigate("/edit-profile")}
            src="https://cdn1.iconfinder.com/data/icons/material-design-icons-light/24/pencil-128.png"
            alt=""
          />
        </div>
        <span className="bg-teal-300 text-white font-w-700 py-2.5 px-5 rounded-full">
          Z
        </span>
        <span className="font-w-700 pt-1">Zahid</span>
        <span className="font-w-700">7006969556</span>
      </div>
      <div className="">
        {profile.map((item) => (
          <>
            <p
              className="text-xs font-w-700 py-4 ion-padding"
              onClick={() => navigate(item.link)}
            >
              {item.name}
            </p>
            <div
              className="w-full"
              style={{ borderBottom: "1px solid lightgrey" }}
            ></div>
          </>
        ))}
      </div>
      <div className="flex justify-between mt-1 ion-padding">
        <p
          className="text-xs font-w-600"
          onClick={() => navigate("/login-page")}
        >
          Logout
        </p>
        <p className="text-xs font-w-600 text-slate-400">V1.0</p>
      </div>
      <div className="flex flex-col justify-center items-center pt-72">
        <img
          className="w-12"
          src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
          alt=""
        />
        <span className="font15 font-w-700">Pharm Box (Pvt) Ltd</span>
      </div>
    </div>
  );
}

export default ProfilePage;