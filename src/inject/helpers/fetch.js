const HOST = process.env.APP_HOST;

function fetchWith(method) {
  return async function(path, data = null) {
    let url = path.startsWith('/') ? HOST + path : path;
    if (method === 'GET' && data) {
      url += '?' + Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    }

    let options = {
      method,
      header: {
        "Content-Type": "application/json"
      },
    }

    if (method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(data);
    }

    const response = await window.fetch(url, options);

    if (response.ok) {
      return response.json();
    }

    throw new Error(response)
  }
}

export const fetch = {
  get: fetchWith('GET'),
  post: fetchWith('POST')
}
