// https://api.github.com/repos/kriswep/gitcomment/issues/1/comments

const makeGetComments = ({ getJsonFrom }) => ({ repo, issueNumber }) => {
  console.log('getComments: ', repo, issueNumber);
  return getJsonFrom(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`);
};

export default makeGetComments;
