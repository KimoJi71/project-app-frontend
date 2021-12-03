import apiRequest from "./api";

const search = {
  search: (keywords, target) =>
    apiRequest.get(`/search?keywords=${keywords}&target=${target}`),
};

export default search;
