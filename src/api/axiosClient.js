import axios from "axios";

const configAxios = {
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://api.ezfrontend.com/",
};

// Create instance axios
const axiosClient = axios.create(configAxios);

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // console.log("Client: ", response);
    return response.data;
  },
  function (error) {
    const { status, data, config } = error.response;
    const URL = ["/auth/local/register", "/auth/local"];
    if (status === 400 && URL.includes(config.url)) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      const errorMessage = firstMessage.message;
      throw new Error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
