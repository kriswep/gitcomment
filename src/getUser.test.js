/* globals test jest expect */
import makeGetUser from './getUser';

test('getUser should getJSON from gh', () => {
  const getJsonFrom = jest.fn();
  const token = 'token';
  const getUser = makeGetUser({
    getJsonFrom,
  });

  expect(getUser.bind(null, { token })).not.toThrow();

  expect(getJsonFrom).toHaveBeenCalledWith('https://api.github.com/user', token);
});
