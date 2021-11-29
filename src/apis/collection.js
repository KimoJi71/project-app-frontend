import apiRequest from "./api";

const collection = {
  // 取得用戶收藏的文章
  getCollectPost: (memNum) =>
    apiRequest.get(`/collections/posts-list/${memNum}`),
  // 收藏文章
  collectPost: (postNum, reqBody) =>
    apiRequest.post(`/collections/posts/${postNum}`, reqBody),
  // 取消收藏文章
  cancelCollectPost: (postNum, memNum) =>
    apiRequest.delete(`/collections/posts/${postNum}/${memNum}`),
  // 取得用戶收藏的商品
  getCollectProduct: (memNum) =>
    apiRequest.get(`/collections/products-list/${memNum}`),
  // 收藏商品
  collectProduct: (proNum, reqBody) =>
    apiRequest.post(`/collections/products/${proNum}`, reqBody),
  // 取消收藏商品
  cancelCollectProduct: (proNum, memNum) =>
    apiRequest.delete(`/collections/products/${proNum}/${memNum}`),
  // 取得用戶收藏的業務員
  getCollectSalesman: (memNum) =>
    apiRequest.get(`/collections/salesman-list/${memNum}`),
  // 收藏業務員
  collectSalesman: (salesmanNum, reqBody) =>
    apiRequest.post(`/collections/salesman/${salesmanNum}`, reqBody),
  // 取消收藏業務員
  cancelCollectSalesman: (salesmanNum, memNum) =>
    apiRequest.delete(`/collections/salesman/${salesmanNum}/${memNum}`),
};

export default collection;
