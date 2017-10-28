// https://api.github.com/user -> logged in user

const makeGetUser = ({ getJsonFrom }) => ({ token }) =>
  getJsonFrom('https://api.github.com/user', token);

export default makeGetUser;
