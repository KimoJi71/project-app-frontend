import apiRequest from "./api";

const auth = {
  login: (reqBody) => apiRequest.post(`/auth`, reqBody),
};

export default auth;
