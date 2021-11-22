import apiRequest from "./api";

const product = {
  // 取得商品
  getProductInfo: () => apiRequest.get(`/products`),
};

export default product;
