import apiRequest from "./api";

const FAQ = {
  getFAQ: () => apiRequest.get(`/FAQ`),
};

export default FAQ;
