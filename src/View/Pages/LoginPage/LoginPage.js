import "./LoginPage.scss";

import React, { useState } from "react";
import {
  forgetPasswordApi,
  loginApi,
  mobileCheckApi,
} from "../../../Services/apis";
import { storeMobileNumberAtom, userDataAtom } from "../../../Recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

import PopUpFromBottom from "../../../components/PopUpFromBottom/PopUpFromBottom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const loginApiFunc = loginApi();
  const mobileCheckApiFunc = mobileCheckApi();

  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showSignUpModule, setShowSignUpModule] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [forgetNumber, setForgetNumber] = useState("");

  const setStoreMobileNumber = useSetRecoilState(storeMobileNumberAtom);

  const [showLoading, setShowLoading] = useState(false);

  const forgetPasswordApiFunc = forgetPasswordApi();

  useEffect(() => {
    if (userData) {
      navigate("/home");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = 0;

    if (number.length < 10) {
      setNumberError(true);
      error++;
    }

    if (!showSignUpModule) {
      if (!password) {
        setPasswordError(true);
        error++;
      }
    }

    if (!error) {
      setShowLoading(true);
      if (showSignUpModule) {
        const data = {
          mobile: number,
        };
        mobileCheckApiFunc(data, (res) => {
          setShowLoading(false);

          if (res && res.Result === "true") {
            setStoreMobileNumber(number);
            navigate("/sign-up/otp-page");
          } else if (
            res &&
            res.ResponseMsg === "Already Exist Mobile Number!"
          ) {
            toast(res.ResponseMsg);
            setShowSignUpModule(false);
          }
        });
      } else {
        const data = {
          mobile: number,
          password: password,
        };
        loginApiFunc(data, handleResponse);
      }
    }
  };

  // const handleStore = () => {
  //   let error = 0;
  //   if (number.length < 10) {
  //     setNumberError(true);
  //     error++;
  //   }

  //   if (error == 0) {
  //     // setStoreMobileNumber(number);
  //     // navigate("/otp-page");
  //   }
  // };

  const handleResponse = (res) => {
    if (res.Result === "true") {
      if (rememberMe) {
        localStorage.setItem("pharm-box-user", JSON.stringify(res.UserLogin));
      } else {
        sessionStorage.setItem("pharm-box-user", JSON.stringify(res.UserLogin));
      }
      setUserData(res.UserLogin);
      navigate("/home");
    }
    toast(res.ResponseMsg);
  };

  const toggleShowModal = (value) => {
    setNumber("");
    setNumberError("");
    setPassword("");
    setPasswordError("");
    setShowSignUpModule(value);
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (forgetNumber.length == 10) {
      const data = {
        mobile: forgetNumber,
      };
      mobileCheckApiFunc(data, (res) => {
        setShowLoading(false);

        if (res && res.Result === "true") {
          toast(res.ResponseMsg);

          // setStoreMobileNumber(number);
          // navigate('/sign-up/otp-page');
        } else if (res && res.ResponseMsg === "Already Exist Mobile Number!") {
          // toast(res.ResponseMsg);
          navigate("/forget-password/otp-page");
          setShowSignUpModule(false);
        }
      });
    }
  };

  return (
    <>
      <div className="pharm-box__login h-screen flex flex-col justify-end">
        <form onSubmit={handleSubmit} className="pharm-box__login-form ">
          <div className="login-info ion-padding font-w-700 pt-2">
            <p className="text-xs">Sign in / Sign Up</p>
            {showSignUpModule ? (
              <>
                <input
                  value={number}
                  onChange={({ target }) => {
                    setNumber(target.value);
                    setNumberError(false);
                  }}
                  type="text"
                  placeholder="Phone Number "
                  className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
                />
                {numberError && (
                  <span className="text-red-700 text-xs">Number Required</span>
                )}

                <p
                  className="pt-1 text-xs font-w-700"
                  onClick={() => toggleShowModal(false)}
                >
                  Have a Email/Password Account?
                </p>
              </>
            ) : (
              <>
                <input
                  value={number}
                  onChange={({ target }) => {
                    setNumber(target.value);
                    setNumberError(false);
                  }}
                  type="text"
                  placeholder="Phone Number "
                  className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
                />
                {numberError && (
                  <span className="text-red-700 text-xs">Number Required</span>
                )}

                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => {
                    setPassword(target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Password "
                  className="w-full py-2 px-4 mt-2 text-xs  bg-white border border-solid rounded-full"
                />

                {passwordError && (
                  <span className="text-red-700 text-xs">
                    Password Required
                  </span>
                )}

                <p
                  className="pt-1 text-xs font-w-700"
                  onClick={() => toggleShowModal(true)}
                >
                  Sign Up?
                </p>
              </>
            )}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                value={rememberMe}
                onChange={({ target }) => setRememberMe(target.value)}
                className="mr-2"
              />
              <span className="text-xs font-medium">Remember Me</span>
            </div>
            <div className="mt-4">
              <p className="font10 text-slate-400">
                By clicking continue, you agree with our Privacy Policy
              </p>
            </div>
            <button
              className="py-3 font-w-700 flex  justify-center bg-green-400 w-full rounded-xl mt-1 "
              onClick={() => handleSubmit()}
            >
              Continue
            </button>
            <span
              className="flex items-center justify-center mt-3 text-xs"
              onClick={() => setShowPopUp(true)}
            >
              Forgot Password?
            </span>
          </div>
        </form>
      </div>
      {showLoading && (
        <div className="common-screen-page-loading h-screen w-screen absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-56 h-14 bg-white rounded-md flex items-center px-1">
            <img
              className="w-11 inline-block"
              src="/assets/icons/spinner-animated.svg"
              alt=""
            />
            Loading...
          </div>
        </div>
      )}
      <PopUpFromBottom showPopUp={showPopUp}>
        <div className="common-screen-page-loading  w-screen absolute top-0 left-0 z-40 flex justify-center items-center">
          <div
            className="grow common-screen-page-loading h-screen "
            onClick={() => setShowPopUp(false)}
          ></div>
          <div className="w-full  bg-white rounded-md  py-3 px-3 absolute bottom-0">
            <div className="ion-padding mb-2">
              <p className="text-lg font-semibold">Forgot Password</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <form
                className="w-full"
                // onSubmit={handleForgetPassword}
              >
                <input
                  type="number"
                  value={forgetNumber}
                  onChange={({ target }) => setForgetNumber(target.value)}
                  placeholder="Enter Phone Number"
                  className="w-full py-3 px-3 rounded-3xl"
                />
              </form>
              <div className=" mt-32 w-4/5 flex items-center justify-center  rounded-lg">
                <button
                  className="text-xs font-semibold background-primary w-full py-3"
                  onClick={handleForgetPassword}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopUpFromBottom>
    </>
  );
}

export default Login;
