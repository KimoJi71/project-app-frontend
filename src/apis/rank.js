import apiRequest from "./api";

const rank = {
  salesmanRank: () => apiRequest.get(`/collections/salesman-rank`),
};

export default rank;
