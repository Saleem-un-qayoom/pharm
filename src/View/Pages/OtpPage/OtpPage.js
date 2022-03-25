import React from "react";

function OtpPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center ion-padding h-40">
        <img src="https://img.icons8.com/ios/70/000000/no-camera--v1.png" />
      </div>
      <div className="ion-padding  ">
        <p className="font15 text-center text-xl font-w-500">
          Enter the 6-digit code sent to you
        </p>

        <p className="font15 text-center text-xl font-w-500">
          at +91-7006969556
        </p>
      </div>

      <form
        method="get"
        class="digit-group"
        data-group-name="digits"
        data-autosubmit="false"
        autocomplete="off"
        className="flex justify-center"
      >
        <input
          type="text"
          id="digit-1"
          name="digit-1"
          data-next="digit-2"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
        <input
          type="text"
          id="digit-2"
          name="digit-2"
          data-next="digit-3"
          data-previous="digit-1"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
        <input
          type="text"
          id="digit-3"
          name="digit-3"
          data-next="digit-4"
          data-previous="digit-2"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
        {/* <span class="splitter">&ndash;</span> */}
        <input
          type="text"
          id="digit-4"
          name="digit-4"
          data-next="digit-5"
          data-previous="digit-3"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
        <input
          type="text"
          id="digit-5"
          name="digit-5"
          data-next="digit-6"
          data-previous="digit-4"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
        <input
          type="text"
          id="digit-6"
          name="digit-6"
          data-previous="digit-5"
          className="w-8 ml-2 rounded-lg py-1 px-5"
        />
      </form>
      <div className="grow "></div>

      <div className="flex flex-col items-center justify-center ion-padding ">
        <span className="font13 font-w-600">Did not recieve the code?</span>
        <span className="mt-6 font13 font-w-600">Re-Send</span>
        <button className=" py-2.5 rounded-lg mt-10 font13 font-w-600 background-primary w-full">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
