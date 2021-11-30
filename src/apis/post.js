import apiRequest from "./api";

const post = {
  // 取得文章
  getPosts: () => apiRequest.get(`/posts`),
  // 新增文章
  createPost: (reqBody) => apiRequest.post(`/posts/create`, reqBody),
  // 編輯文章
  updatePost: (postNum, reqBody) =>
    apiRequest.put(`/posts/update/${postNum}`, reqBody),
  // 刪除文章
  deletePost: (postNum) => apiRequest.delete(`/posts/delete/${postNum}`),
  // 文章按讚
  likePost: (postNum, reqBody) =>
    apiRequest.post(`/posts/liked/${postNum}`, reqBody),
  // 取消文章按讚
  cancelLikePost: (postNum, memNum) =>
    apiRequest.delete(`/posts/liked/${postNum}/${memNum}`),
  // 檢查用戶是否按讚
  checkLikePost: (postNum, memNum) =>
    apiRequest.get(`/posts/liked/${postNum}/${memNum}`),
  // 檢舉文章
  reportPost: (postNum, reqBody) =>
    apiRequest.post(`/posts/report/${postNum}`, reqBody),
};

export default post;
