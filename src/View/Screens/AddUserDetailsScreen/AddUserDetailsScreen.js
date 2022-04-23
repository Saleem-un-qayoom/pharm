import React from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router";
// import { useRecoilValue } from "recoil";
// import { useState } from "react";
// import { userDataAtom } from "../../../Recoil/atom";
// import { updateUserDetails } from "../../../Services/apis";
import CommonScreenPage from "../../../components/CommonScreenPage/CommonScreenPage";

function AddUserDetailsScreen() {
  let navigate = useNavigate();

  //   const user = useRecoilValue(userDataAtom);

  //   const [loading, setLoading] = useState(false);

  //   const [firstName, setFirstName] = useState(user.fname);
  //   const [lastName, setLastName] = useState(user.lname);

  //   const [phone, setPhone] = useState(user.mobile);
  //   const [email, setEmail] = useState(user.email);

  //   const [password, setPassword] = useState(user.password);

  //   const userData = useRecoilValue(userDataAtom);

  //   const updateUserDetailsFunc = updateUserDetails();
  //   const [userProfile, setUserProfile] = useState({});

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data = {
  //       uid: userData.id,
  //       fname: firstName,
  //       lname: lastName,
  //       password: password,
  //     };
  //     setLoading(true);
  //     updateUserDetailsFunc(data, handleResponse);
  //   };

  //   const handleResponse = (res) => {
  //     setLoading(false);

  //     if (res && res.ResponseCode === "200") {
  //       toast("Profile Updated SuccessFully");
  //       navigate(-1);
  //     } else {
  //       toast("Something Went Wrong");
  //     }
  //   };

  return (
    <CommonScreenPage
    // showLoading={loading} headingTitle={"Edit Profile"}
    >
      <div className="h-full ">
        <form
          //   onSubmit={handleSubmit}
          className="h-full flex flex-col justify-between ion-padding"
        >
          <div className="flex flex-col items-center">
            <img
              className="inline-block mb-8"
              src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
              alt=""
            />
            <div className="flex flex-col items-center mb-6">
              <p className="text-lg font-medium text-color-tertiary">
                Welcome to Pharm Box
              </p>
              <span className="text-md font-medium text-color-tertiary">
                Please provide us with a few more details
              </span>
            </div>
            <div className="w-full mb-3">
              <div className="flex justify-between">
                <div className="form-group w-3/6 mr-3 border overflow-hidden rounded-xl px-2 py-2">
                  <label className="font-medium text-sm text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    // value={firstName}
                    // onChange={(e) => setFirstName(e.target.value)}
                    className="border-0"
                  />
                </div>
                <div className="form-group w-3/6 ml-3 border overflow-hidden rounded-xl px-2 py-2">
                  <label className="font-medium text-gray-600 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    // value={lastName}
                    // onChange={(e) => {
                    //   setLastName(e.target.value);
                    // }}
                    className="border-0"
                  />
                </div>
              </div>
            </div>

            {/* <div className="form-group mb-3 w-full flex flex-col  border overflow-hidden rounded-xl px-2 py-2 disable-component">
              <label className="font-medium text-gray-600">Mobile</label>
              <input
                disabled={true}
                value={phone}
                type="number"
                className="border-0"
              />
            </div> */}
            <div className="form-group mb-3 w-full flex flex-col  border overflow-hidden rounded-xl px-2 py-2 ">
              <label className="font-medium text-gray-600 text-sm">Email</label>
              <input
                // disabled={true}
                // value={email}
                type="email"
                className="border-0"
              />
            </div>
            <div className="form-group mb-3 w-full flex flex-col  border overflow-hidden rounded-xl px-2 py-2">
              <label className="font-medium text-gray-600">Password</label>
              <input
                type="password"
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                className="border-0"
              />
            </div>
          </div>
          <div className="ion-padding flex items-center justify-center  ">
            <button
              className="  background-primary rounded-lg font-w-700 font15 py-4  px-36"
              onClick={() => navigate("/edit-address")}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </CommonScreenPage>
  );
}

export default AddUserDetailsScreen;
