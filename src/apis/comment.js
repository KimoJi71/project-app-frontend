import apiRequest from "./api";

const comment = {
  // 取得留言
  getComments: (postNum) => apiRequest.get(`/comments/${postNum}`),
  // 新增留言
  createComment: (postNum, reqBody) =>
    apiRequest.post(`/comments/create/${postNum}`, reqBody),
  // 編輯留言
  updateComment: (commentNum, reqBody) =>
    apiRequest.put(`/comments/update/${commentNum}`, reqBody),
  // 刪除留言
  deleteComment: (commentNum) =>
    apiRequest.delete(`/comments/delete/${commentNum}`),
  // 留言按讚
  likeComment: (commentNum, reqBody) =>
    apiRequest.post(`/comments/liked/${commentNum}`, reqBody),
  // 取消留言按讚
  cancelLikeComment: (commentNum, memNum) =>
    apiRequest.delete(`/comments/liked/${commentNum}/${memNum}`),
  // 檢查用戶是否按讚
  checkLikeComment: (commentNum, memNum) =>
    apiRequest.get(`/comments/liked/${commentNum}/${memNum}`),
  // 檢舉留言
  reportComment: (commentNum, reqBody) =>
    apiRequest.post(`/comments/report/${commentNum}`, reqBody),
};

export default comment;
