import apiRequest from "./api";

const auth = {
  login: (reqBody) => apiRequest.post(`/auth`, reqBody),
  register: (reqBody) => apiRequest.post(`/register`, reqBody),
};

export default auth;
