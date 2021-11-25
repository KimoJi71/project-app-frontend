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
};

export default comment;
