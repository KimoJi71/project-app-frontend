import apiRequest from "./api";

const image = {
  uploadMemPhoto: (payload, reqBody) =>
    apiRequest.post(
      `/images/upload/${payload.memNum}`,
      reqBody,
      payload.headers
    ),
};

export default image;
