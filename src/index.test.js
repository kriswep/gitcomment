/* globals jest test expect */
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';

import Gitcomment from './index';

jest.mock('./getJsonFrom', () => () => () =>
  Promise.resolve([
    {
      id: 'id',
      body: 'body',
      created_at: 1505765984492,
      updated_at: 1505765984550,
      url: 'url',
      user: {
        login: 'login',
        avatar_url: 'avatarUrl',
        url: 'url',
      },
    },
  ]),
);
const mockPostThenUpdateComments = jest.fn();
jest.mock('./postComment', () => () => () => ({ then: mockPostThenUpdateComments }));

test('getComments should render', () => {
  const gitcomment = mount(
    <Gitcomment repo="repo" issueNumber={1} token="token">
      {(loaded, comments, postComment) => {
        const commentList = comments.map(comment => <li key={comment.id}>body: {comment.body}</li>);
        const handler = () => {
          postComment('test');
        };
        return (
          <div>
            <p className="loaded">{String(loaded)}</p>
            <ul className="comments">{commentList}</ul>
            <button onClick={handler}>Post sthg</button>
          </div>
        );
      }}
    </Gitcomment>,
  );

  // test before componentDidMount
  expect(toJson(gitcomment.find('.loaded'))).toMatchSnapshot();
  expect(toJson(gitcomment.find('.comments'))).toMatchSnapshot();

  return Promise.resolve().then(() => {
    // test after componentDidMount
    expect(toJson(gitcomment.find('.loaded'))).toMatchSnapshot();
    expect(toJson(gitcomment.find('.comments'))).toMatchSnapshot();

    const btn = gitcomment.find('button');
    expect(toJson(btn)).toMatchSnapshot();
    btn.simulate('click');
    expect(mockPostThenUpdateComments).toHaveBeenCalledTimes(1);
    // should call getComment without failure
    expect(mockPostThenUpdateComments.mock.calls[0][0]).not.toThrow();
  });
});
