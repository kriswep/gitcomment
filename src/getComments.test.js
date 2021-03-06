/* globals test jest expect */
import makeGetComments from './getComments';

test('getComments should getJSON from gh', () => {
  const getJsonFrom = jest.fn();
  const token = 'token';
  const getComments = makeGetComments({
    getJsonFrom,
  });

  expect(getComments.bind(null, { repo: 'repo', issueNumber: 1, token })).not.toThrow();

  expect(getJsonFrom).toHaveBeenCalledWith(
    'https://api.github.com/repos/repo/issues/1/comments',
    token,
  );
});
