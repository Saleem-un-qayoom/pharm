import React from "react";

function PopUpFromBottom({ children, showPopUp }) {
  return showPopUp ? (
    <div className="flex flex-col ">
      <div className="grow"></div>
      <div>{children}</div>
    </div>
  ) : null;
}

export default PopUpFromBottom;
