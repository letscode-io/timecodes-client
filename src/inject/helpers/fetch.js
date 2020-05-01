import { queryParamsFromObject } from './queryParamsFromObject';

const HOST = process.env.APP_HOST;

function fetchWith(method) {
  return async function(path, data) {
    let url = path.startsWith('/') ? HOST + path : path;

    if (method === 'GET' && data) {
      url += '?' + queryParamsFromObject(data);
    }

    const response = await window.fetch(url, {
      method,
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    }

    throw response;
  }
}

export const fetch = {
  get: fetchWith('GET'),
  post: fetchWith('POST'),
}
