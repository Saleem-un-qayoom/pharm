import * as Sentry from "@sentry/react";

import axios from "axios";
import config from "./config";

const MAINAPI = (method, url, payload, hasFile) => {
  return API(method, url, payload, config.baseUrl, hasFile);
};

export default MAINAPI;

const API = (method, url, payload, server, hasFile) => {
  var options = {};

  if (hasFile) {
    options = {
      method,
      url: `${server}/${url}`,
    };
  } else {
    options = {
      method,
      header: {
        "Content-type": "application/x-www-form-urlencoded\r\n",
      },
      url: `${server}/${url}`,
    };
  }

  if (method === "POST" || method === "PATCH" || method === "PUT") {
    options.data = payload;
  }

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        return res.data;
      })
      .then((respJson) => {
        resolve(respJson);
      })
      .catch((err) => {
        Sentry.captureException(err, url);
        reject(err);
      });
  });
};
