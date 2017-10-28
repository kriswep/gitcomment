const makePostJsonTo = ({ fetch }) => (uri, token, json) =>
  fetch(uri, {
    method: 'POST',
    headers: {
      'User-Agent': 'Gitcomment',
      Accept: 'application/vnd.github.v3.full+json',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    body: json,
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
    return res;
  });

export default makePostJsonTo;
