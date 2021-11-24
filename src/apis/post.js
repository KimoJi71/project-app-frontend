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
};

export default post;
