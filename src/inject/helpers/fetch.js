const HOST = process.env.APP_HOST;

function fetchWith(method) {
  return async function(path, data = null) {
    let url = path.startsWith('/') ? HOST + path : path;
    const response = await window.fetch(url, {
      method,
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

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
