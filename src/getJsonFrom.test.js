/* globals test jest expect */
import makeGetJsonFrom from './getJsonFrom';

test('getJsonFrom should getJSON', () => {
  const res = {
    json: () => 'response',
  };
  const fetch = jest.fn(() => Promise.resolve(res));
  const getJsonFrom = makeGetJsonFrom({
    fetch,
  });

  const received = getJsonFrom('url');

  expect(fetch.mock.calls[0][0]).toBe('url');
  expect(fetch.mock.calls[0][1].headers).toBeDefined();

  return received.then((response) => {
    expect(response).toBe('response');
  });
});

test('getJsonFrom should getJSON with auth token', () => {
  const res = {
    json: () => 'response',
  };
  const token = 'token';
  const fetch = jest.fn(() => Promise.resolve(res));
  const getJsonFrom = makeGetJsonFrom({
    fetch,
  });

  const received = getJsonFrom('url', token);

  expect(fetch.mock.calls[0][1].headers).toBeDefined();
  expect(fetch.mock.calls[0][1].headers.Authorization).toBe(`token ${token}`);

  return received.then((response) => {
    expect(response).toBe('response');
  });
});
