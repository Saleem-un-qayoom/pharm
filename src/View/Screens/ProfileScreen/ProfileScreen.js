import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../../Recoil/atom";

const aboutIcon = "/assets/icons/about.svg";
const contactIcon = "/assets/icons/contact.svg";
const manageAddressIcon = "/assets/icons/manage-address.svg";
const myOrdersIcon = "/assets/icons/my-orders.svg";
const privacyIcon = "/assets/icons/privacy.svg";
const tncIcon = "/assets/icons/Tnc.svg";

const profile = [
  { name: "My Orders", link: "/my-order", icon: myOrdersIcon },
  {
    name: "Manage Adresses",
    link: "/manage-addresses",
    icon: manageAddressIcon,
  },
  { name: "About", link: "/about-page", icon: aboutIcon },
  { name: "Contact", link: "/contact-page", icon: contactIcon },
  { name: "Privacy Policy", link: "/privacy-policy", icon: privacyIcon },
  {
    name: "Terms & Conditions",
    link: "/terms-and-conditions",
    icon: tncIcon,
  },
];

function ProfilePage() {
  let navigate = useNavigate();

  const [user, setUser] = useRecoilState(userDataAtom);

  const firstLetter = user.fname[0];

  useEffect(() => {
    if (!user) {
      navigate("/login-page");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <div className="background-primary py-6 flex flex-col items-center">
          <div className="px bg-sky-500 w-20 h-20 rounded-full flex justify-center items-center text-white font-extrabold text-2xl relative">
            {firstLetter}
            <span className="absolute top-0 right-0 bg-white w-5 h-5 px-1 flex justify-center items-center rounded-full">
              <img
                onClick={() => navigate("/edit-profile")}
                src="/assets/icons/edit.svg"
                alt=""
              />
            </span>
          </div>
          <div className="text-xl font-semibold">{user.fname}</div>
          <div className="text-xl font-semibold">{user.mobile}</div>
        </div>
        <div className="">
          {profile.map((item, key) => (
            <div
              key={key}
              className="flex items-center border px-3 py-1"
              onClick={() => navigate(item.link)}
            >
              <img src={item.icon} className="w-6" alt="" />
              <p className="text-xs font-w-700 py-4 ion-padding">{item.name}</p>
            </div>
          ))}
          <p
            className="text-base font-w-600 px-5 py-2"
            onClick={() => {
              setUser("");
              localStorage.removeItem("pharm-box-user");
              sessionStorage.removeItem("pharm-box-user");
              navigate("/home");
            }}
          >
            Logout
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center pb-3">
          <img
            className="w-12"
            src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
            alt=""
          />
          <span className="font15 font-w-700">Pharm Box (Pvt) Ltd</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
