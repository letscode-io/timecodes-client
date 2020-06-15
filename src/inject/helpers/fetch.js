import { queryParamsFromObject } from "./queryParamsFromObject";

const HOST = process.env.APP_HOST;

function fetchWith(method) {
  return async function (path, data, options = {}) {
    let url = path.startsWith("/") ? HOST + path : path;

    if (method === "GET" && data) {
      url += "?" + queryParamsFromObject(data);
    }

    const requestParams = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(options.accessToken),
      },
    };

    if (["POST", "PUT", "DELETE"].includes(method)) {
      requestParams.body = JSON.stringify(data);
    }

    const response = await window.fetch(url, requestParams);

    if (response.ok) {
      return response.json();
    }

    throw response;
  };
}

function getAuthHeader(accessToken) {
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }

  return {};
}

export const fetch = {
  get: fetchWith("GET"),
  post: fetchWith("POST"),
  delete: fetchWith("DELETE"),
};
