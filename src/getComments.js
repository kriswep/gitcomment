// https://api.github.com/repos/kriswep/gitcomment/issues/1/comments

const makeGetComments = ({ getJsonFrom }) => ({ repo, issueNumber, token }) =>
  getJsonFrom(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`, token);

export default makeGetComments;
