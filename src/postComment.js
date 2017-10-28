// https://api.github.com/repos/:owner/:repo/issues/:number/comments

const makePostComment = ({ postJsonTo }) => ({
  repo, issueNumber, token, comment,
}) =>
  postJsonTo(
    `https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`,
    token,
    JSON.stringify({ body: comment }),
  );

export default makePostComment;
