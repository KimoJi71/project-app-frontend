import apiRequest from "./api";

const product = {
  // 取得商品
  getProductInfo: (params) => {
    if (params === "") {
      return apiRequest.get(`/products`);
    } else {
      return apiRequest.get(
        `/products?proCompany=${params.company}&proBigItem=${params.bigItem}&proKind=${params.kind}&proSmallItem=${params.smallItem}&proContent=${params.content}`
      );
    }
  },
};

export default product;
