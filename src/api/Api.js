import axios from "axios";

const axiosParams = {
  baseURL: "http://localhost:3000/"
};

const axiosInstance = axios.create(axiosParams);
class Api {
  static axiosInstance = axiosInstance;
  axios = axiosInstance;

  setToken(token) {
    this.token = token;
    this.axios.defaults.headers.Authorization = "Bearer " + token;
  }

  removeToken() {
    delete this.axios.defaults.headers.Authorization;
  }

  getAxiosInstance() {
    return this.axios;
  }
  get(url, options = {}) {
    return this.axios.get(url, options).then(response => response.data);
  }

  getFull(url) {
    return this.axios.get(url);
  }

  post(url, body, options) {
    return this.axios.post(url, body, options);
  }
  put(url, body) {
    return this.axios.put(url, body);
  }
  patch(url, body) {
    return this.axios.patch(url, body);
  }
  delete(url, body) {
    return this.axios.delete(url, body).then(response => ({ response, body }));
  }

  /**
   * Log the errors
   */
  logError(error, calledIn) {
    if (process.env.VUE_APP_DEBUG && error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("ERROR in Api.js: data", error.response.data);
      console.log("ERROR in Api.js: status", error.response.status);
      console.log("ERROR in Api.js: headers", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(
        "ERROR in Api.js: No response received to request: ",
        error.request
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("ERROR in Api.js: Unhandled exception: ", error.message);
    }
    console.log(error.config);
    calledIn && console.log("ERROR in Api.js: Api call made in:", calledIn);
  }

  transformParamsToString(params) {
    return Object.keys(params)
      .map(
        prop =>
          `${encodeURIComponent(prop)}=${encodeURIComponent(params[prop])}`,
        ""
      )
      .join("&");
  }
}

export default Api;
