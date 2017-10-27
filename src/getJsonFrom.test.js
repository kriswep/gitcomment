/* globals test jest expect */
import makeGetJsonFrom from './getJsonFrom';

test('getJsonFrom should getJSON', () => {
  const res = {
    ok: true,
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
    ok: true,
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

test('getJsonFrom should throw on error', () => {
  const mockGetHeader = jest.fn();
  const res = {
    ok: false,
    json: () => 'response',
    headers: { get: mockGetHeader },
  };
  const fetch = jest.fn(() => Promise.resolve(res));
  const getJsonFrom = makeGetJsonFrom({
    fetch,
  });

  const received = getJsonFrom('url');

  // expect(fetch.mock.calls[0][1].headers).toBe('url');

  return received.then(() => expect(true).toBe(false)).catch(() => {
    expect(mockGetHeader.mock.calls[0]).toEqual(['X-RateLimit-Limit']);
    expect(mockGetHeader.mock.calls[1]).toEqual(['X-RateLimit-Remaining']);
    expect(mockGetHeader.mock.calls[2]).toEqual(['X-RateLimit-Reset']);
  });
});
