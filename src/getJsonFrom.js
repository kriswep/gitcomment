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
  }).then(res => res.json());
};

export default makeGetJsonFrom;
