class Api {
  static get(url) {
    return fetch(url, {
      credentials: 'include'
    }).then(response => response.json());
  }

  static post(url, data) {
    return fetch(url, {
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  }
}

export default Api;