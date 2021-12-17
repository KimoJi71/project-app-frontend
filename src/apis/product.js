import apiRequest from "./api";

const product = {
  // 取得商品
  getProductInfo: (params) => {
    if (params === "") {
      return apiRequest.get(`/products`);
    } else {
      return apiRequest.get(
        `/products?proCompany=${params.company}&proBigItem=${params.bigItem}&proKind=${params.kind}&proPeriod=${params.period}&proContent=${params.content}`
      );
    }
  },
  //商品按讚
  likeProduct: (proNum, reqBody) =>
    apiRequest.post(`/products/liked/${proNum}`, reqBody),
  //取消商品按讚
  cancelLikeProduct: (proNum, memNum) =>
    apiRequest.delete(`/products/liked/${proNum}/${memNum}`),
  // 檢查用戶是否按讚
  checkLikeProduct: (proNum, memNum) =>
    apiRequest.get(`/products/liked/${proNum}/${memNum}`),
};

export default product;
