import React, { useState } from "react";

function Login() {
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!number) {
      setNumberError(true);
    }
  };

  return (
    <div className="pharm-box__login">
      <div className="pharm-box__img">
        <img
          src="https://rlv.zcache.com/gold_caduceus_pharmd_classic_round_sticker-rd4fe1acce9844ff69287c367403102fd_0ugmp_8byvr_307.jpg"
          style={{ width: "100%" }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-info ion-padding font-w-700 pt-2">
          <p className="text-xs">Sign in / Sign Up</p>
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

          <p className="pt-1 text-xs font-w-700">
            Have a Email/Password Account?
          </p>
          <div className="flex items-center mt-4">
            <input type="radio" className="mr-2" />
            <span className="text-xs font-medium">Remember Me</span>
          </div>
          <div className="mt-4">
            <p className="font10 text-slate-400">
              By clicking continue, you agree with our Privacy Policy
            </p>
          </div>
          <div className="flex  justify-center bg-green-400 w-full rounded-xl mt-1">
            <button
              className="py-3 font-w-700"
              onClick={() => console.log("clicked")}
            >
              Continue
            </button>
          </div>
          <span className="flex items-center justify-center mt-3 text-xs">
            Forgot Password?
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
