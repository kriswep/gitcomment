const makeGetJsonFrom = ({ fetch }) => (uri, token) => {
  let headers = {
    'User-Agent': 'Gitcomment',
    Accept: 'application/vnd.github.v3.full+json',
  };
  if (token) {
    headers = Object.assign({}, headers, { Authorization: `token ${token}` });
  }
  return fetch(uri, {
    method: 'GET',
    headers,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(JSON.stringify({
        status: res.status,
        statusText: res.statusText,
        'X-RateLimit-Limit': res.headers.get('X-RateLimit-Limit'),
        'X-RateLimit-Remaining': res.headers.get('X-RateLimit-Remaining'),
        'X-RateLimit-Reset': res.headers.get('X-RateLimit-Reset'),
      }));
    }
    return res.json();
  });
};

export default makeGetJsonFrom;
