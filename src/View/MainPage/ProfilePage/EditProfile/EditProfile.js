import React from "react";
import { useNavigate } from "react-router";

function EditProfile() {
  let navigate = useNavigate();
  return (
    <>
      <div className="ion-padding background-primary font-semibold rounded-b-xl flex items-center">
        <img
          onClick={() => navigate(-1)}
          src="https://img.icons8.com/ios-filled/2x/long-arrow-left.png "
          style={{
            height: "25px",
            width: "20px",
            marginRight: "10px",
          }}
        />
        <span>Edit Profile</span>
      </div>
      <div className="flex item-center justify-center h-28 pt-12">
        <img
          src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
          alt=""
        />
      </div>
      <form className="ion-padding mt-6">
        <div className="flex justify-between ">
          <input
            type="text"
            placeholder="First Name "
            className="mt-4 p-4 rounded-xl w-5/12 "
          />
          <input
            type="text"
            placeholder="Last Name"
            className="mt-4 p-4 rounded-xl w-5/12"
          />
        </div>
        <div className="w-full mt-4 flex flex-col">
          <input
            type="text"
            placeholder="Mobile"
            className="mt-4 p-4 rounded-xl"
          />
          <input
            type="text"
            placeholder="Email"
            className="mt-4 p-4 rounded-xl"
          />
          <input
            type="text"
            placeholder="Password"
            className="mt-4 p-4 rounded-xl"
          />
        </div>
        <div
          className=" ion-padding w-full flex items-center justify-center  "
          style={{ paddingTop: "225px" }}
        >
          <button className=" w-full background-primary rounded-lg font-w-700 font15 py-4  px-36">
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
