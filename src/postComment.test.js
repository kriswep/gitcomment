/* globals test jest expect */
import makePostComment from './postComment';

test('postComment should post Json to gh', () => {
  const postJsonTo = jest.fn();
  const postComment = makePostComment({
    postJsonTo,
  });

  expect(postComment.bind(null, {
    repo: 'repo', issueNumber: 1, token: 'token', comment: 'comment',
  })).not.toThrow();

  expect(postJsonTo).toHaveBeenCalledWith(
    'https://api.github.com/repos/repo/issues/1/comments',
    'token',
    JSON.stringify({ body: 'comment' }),
  );
});
