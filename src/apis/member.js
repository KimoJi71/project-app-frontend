import apiRequest from "./api";

const member = {
  // 取得個人資料
  getProfile: (memNum) => apiRequest.get(`/members/${memNum}`),
};

export default member;
