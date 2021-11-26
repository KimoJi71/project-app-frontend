import apiRequest from "./api";

const member = {
  // 取得個人資料
  getProfile: (memNum) => apiRequest.get(`/members/${memNum}`),
  // 編輯個人資料
  updateProfile: (memNum, reqBody) =>
    apiRequest.put(`/members/update/${memNum}`, reqBody),
  // 變更密碼
  updatePassword: (memNum, reqBody) =>
    apiRequest.put(`/members/update-password/${memNum}`, reqBody),
};

export default member;
