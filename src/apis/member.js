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
  // 業務員按讚
  likeSalesman: (salesmanNum, reqBody) =>
    apiRequest.post(`/members/liked/${salesmanNum}`, reqBody),
  // 取消業務員按讚
  cancelLikeSalesman: (salesmanNum, memNum) =>
    apiRequest.delete(`/members/liked/${salesmanNum}/${memNum}`),
  // 檢查用戶是否按讚
  checkLikeSalesman: (salesmanNum, memNum) =>
    apiRequest.get(`/members/liked/${salesmanNum}/${memNum}`),
  // 檢舉業務員
  reportSalesman: (salesmanNum, reqBody) =>
    apiRequest.post(`/members/report/${salesmanNum}`, reqBody),
};

export default member;
