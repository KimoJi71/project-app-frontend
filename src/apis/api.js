import axios from "axios";

let baseURL = "http://localhost:3000";
// let baseURL = "http://192.168.50.100:3000";

const apiRequest = axios.create({
  baseURL,
});

//axios攔截器
apiRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiRequest.interceptors.response.use(
  (res) => {
    return res.data ? res.data : res;
  },
  (err) => {
    if (err.response.status === undefined) {
      return;
    } else {
      const code = err.response.status;
      if (code === 500) {
        alert("系統忙碌中，請稍後再試！");
      }
      return Promise.reject(err);
    }
  }
);

export default apiRequest;
