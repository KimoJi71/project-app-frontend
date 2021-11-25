import apiRequest from "./api";

const member = {
  // 取得個人資料
  getProfile: (memNum) => apiRequest.get(`/members/${memNum}`),
  // 編輯個人資料
  updateProfile: (memNum, reqBody) =>
    apiRequest.put(`/members/update/${memNum}`, reqBody),
};

export default member;
