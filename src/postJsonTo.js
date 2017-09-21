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
  });

export default makePostJsonTo;
