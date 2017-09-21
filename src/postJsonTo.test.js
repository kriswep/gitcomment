/* globals test jest expect */
import makePostJsonTo from './postJsonTo';

test('postJsonTo should postJSON', () => {
  const url = 'url';
  const json = JSON.stringify({ body: 'comment' });
  const fetch = jest.fn(() => Promise.resolve());
  const postJsonTo = makePostJsonTo({
    fetch,
  });

  expect(postJsonTo.bind(null, url, 'token', json)).not.toThrow();

  expect(fetch.mock.calls[0][0]).toBe(url);
  expect(fetch.mock.calls[0][1].headers).toBeDefined();
  expect(fetch.mock.calls[0][1].body).toBe(json);
});
