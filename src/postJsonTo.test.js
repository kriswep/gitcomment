/* globals test jest expect */
import makePostJsonTo from './postJsonTo';

test('postJsonTo should postJSON', () => {
  const url = 'url';
  const json = JSON.stringify({ body: 'comment' });
  const res = {
    ok: true,
    json: () => 'response',
  };
  const fetch = jest.fn(() => Promise.resolve(res));
  const postJsonTo = makePostJsonTo({
    fetch,
  });

  expect(postJsonTo.bind(null, url, 'token', json)).not.toThrow();

  expect(fetch.mock.calls[0][0]).toBe(url);
  expect(fetch.mock.calls[0][1].headers).toBeDefined();
  expect(fetch.mock.calls[0][1].body).toBe(json);
});

test('postJsonTo should throw on error', () => {
  const mockGetHeader = jest.fn();
  const res = {
    ok: false,
    json: () => 'response',
    headers: { get: mockGetHeader },
  };
  const fetch = jest.fn(() => Promise.resolve(res));
  const postJsonTo = makePostJsonTo({
    fetch,
  });

  const received = postJsonTo();

  // expect(fetch.mock.calls[0][1].headers).toBe('url');

  return received.then(() => expect(true).toBe(false)).catch(() => {
    expect(mockGetHeader.mock.calls[0]).toEqual(['X-RateLimit-Limit']);
    expect(mockGetHeader.mock.calls[1]).toEqual(['X-RateLimit-Remaining']);
    expect(mockGetHeader.mock.calls[2]).toEqual(['X-RateLimit-Reset']);
  });
});
