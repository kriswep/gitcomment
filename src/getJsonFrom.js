const makeGetJsonFrom = ({ fetch }) => uri =>
  fetch(uri, {
    method: 'GET',
    headers: {
      'User-Agent': 'Gitcomment',
      Accept: 'application/vnd.github.v3.full+json',
    },
  }).then(res => res.json());

export default makeGetJsonFrom;