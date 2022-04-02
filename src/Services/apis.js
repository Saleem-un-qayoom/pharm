import MAINAPI from "./api";

export const getPinCodeApi = () => {
  return (callback) => {
    MAINAPI("POST", `capi/p_list_pincode.php`)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 9 ~ getPinCodeApi ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: apis.js ~ line 18 ~ getPinCodeApi ~ error",
          error
        );
        if (callback) callback(error.response);
      });
  };
};

export const getStoreApi = () => {
  return (data, callback) => {
    const { uId, pinCode } = data;
    MAINAPI("POST", `capi/p_store_list.php`, {
      uid: uId,
      pincode: pinCode,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 34 ~ getStoreApi ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: apis.js ~ line 43 ~ getStoreApi ~ error",
          error
        );

        if (callback) callback(error.response);
      });
  };
};

export const loginApi = () => {
  return (data, callback) => {
    const { mobile, password } = data;
    MAINAPI("POST", `capi/p_user_login.php`, {
      mobile: mobile,
      password: password,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 34 ~ getStoreApi ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: apis.js ~ line 43 ~ getStoreApi ~ error",
          error
        );

        if (callback) callback(error.response);
      });
  };
};

export const signUpApi = () => {
  return (data, callback) => {
    const { mobile, password, email, fname, lname, ccode } = data;
    MAINAPI("POST", `capi/p_reg_user.php`, {
      mobile: mobile,
      password: password,
      email: email,
      fname: fname,
      lname: lname,
      ccode: ccode,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 34 ~ getStoreApi ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: apis.js ~ line 43 ~ getStoreApi ~ error",
          error
        );

        if (callback) callback(error.response);
      });
  };
};

export const getOtpApi = () => {
  return (data, callback) => {
    const { mobile } = data;
    MAINAPI("POST", `capi/p_mobile_check.php`, {
      mobile: mobile,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 122 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 131 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getHomeApi = () => {
  return (data, callback) => {
    const { uID, storeId, pinCode } = data;
    MAINAPI("POST", `capi/p_home_data.php`, {
      uid: uID,
      store_id: storeId,
      pincode: pinCode,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 148 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 157 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getCategoryApi = () => {
  return (data, callback) => {
    const { uID, storeId, pinCode } = data;
    MAINAPI("POST", `capi/p_cat_list.php`, {
      uid: uID,
      store_id: storeId,
      pincode: pinCode,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 174 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 183 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getCategoryResultApi = () => {
  return (data, callback) => {
    const { uID, storeId, pinCode, catId } = data;
    MAINAPI("POST", `capi/p_list_product_by_cat_and_pincode.php`, {
      uid: uID,
      store_id: storeId,
      pincode: pinCode,
      cat_id: catId,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 201 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 210 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getExploreNewApi = () => {
  return (data, callback) => {
    const { uID, storeId, pinCode } = data;
    MAINAPI("POST", `capi/p_rand_product.php`, {
      uid: uID,
      store_id: storeId,
      pincode: pinCode,
    })
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 227 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 236 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const uploadPrescriptionApi = () => {
  return (data, callback) => {
    // const { uid, sid, details, prescription_img } = data;
    MAINAPI("POST", `capi/p_upload_prescription.php`, data, true)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 249 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 258 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getNotificationApi = () => {
  return (data, callback) => {
    MAINAPI("POST", `capi/p_notification_list.php`, data)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 288 ~ return ~ response",
            response
          );
          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 297 ~ return ~ error", error);
        if (callback) callback(error.response);
      });
  };
};

export const getMyOrderApi = () => {
  return (data, callback) => {
    MAINAPI("POST", `capi/p_order_history.php`, data)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 293 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 301 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getMyOrderDetailsApi = () => {
  return (data, callback) => {
    MAINAPI("POST", `capi/p_order_details.php`, data)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 311 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 319 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};

export const getMyDeliveryAddressApi = () => {
  return (data, callback) => {
    MAINAPI("POST", `capi/p_address_list.php`, data)
      .then((response) => {
        if (response) {
          console.log(
            "🚀 ~ file: apis.js ~ line 332 ~ .then ~ response",
            response
          );

          if (callback) callback(response);
        }
      })
      .catch((error) => {
        console.log("🚀 ~ file: apis.js ~ line 340 ~ return ~ error", error);

        if (callback) callback(error.response);
      });
  };
};
