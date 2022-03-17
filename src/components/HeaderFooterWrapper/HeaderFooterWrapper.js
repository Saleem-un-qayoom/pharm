import React from "react";

function HeaderFooterWrapper({ className = "", children }) {
  return <div className={`header-footer-wrapper ${className}`}>{children}</div>;
}

export default HeaderFooterWrapper;
