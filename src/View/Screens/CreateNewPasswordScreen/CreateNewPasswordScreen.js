import React from "react";

function CreateNewPasswordScreen() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" pt-10">
        <img src="/assets/img/cash-on-delivery.png" className="w-20" />
      </div>
      <div className="mt-10">
        <p className="text-lg font-bold">Enter New Password?</p>
      </div>
      <form className="ion-padding mt-10 w-full">
        <input
          type="number"
          placeholder="Enter Password"
          className="w-full px-3 py-3 rounded-3xl"
        />
        <input
          type="number"
          placeholder="Confirm Password"
          className="w-full px-3 py-3 rounded-3xl mt-3"
        />
      </form>
      <div className="background-primary py-2 px-12 rounded-md mt-3">
        <button className="text-xs font-semibold">Submit</button>
      </div>
    </div>
  );
}

export default CreateNewPasswordScreen;
