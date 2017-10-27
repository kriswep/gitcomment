/* globals jest test expect */
import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import Gitcomment from './index';

// Enzyme.configure({ adapter: new Adapter() });

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
const mockPostCatchUpdateComments = jest.fn(() => ({
  then: mockPostThenUpdateComments,
}));
jest.mock('./postComment', () => () => () => ({
  catch: mockPostCatchUpdateComments,
}));

global.localStorage = {
  setItem: jest.fn(() => true),
  getItem: jest.fn(() => 'token'),
};

test('getComments should render', () => {
  const errHandler = jest.fn();
  const requireAuthHandler = jest.fn();
  const gitcomment = mount(
    <Gitcomment
      repo="repo"
      issueNumber={1}
      error={errHandler}
      requireAuth={requireAuthHandler}
      render={(loaded, comments, postComment) => {
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
    />,
  );

  // test before componentDidMount
  expect(toJson(gitcomment.find('.loaded'))).toMatchSnapshot();
  expect(toJson(gitcomment.find('.comments'))).toMatchSnapshot();

  return Promise.resolve().then(() => {
    // test after componentDidMount
    const btn = gitcomment.find('button');
    expect(toJson(btn)).toMatchSnapshot();
    btn.simulate('click');

    expect(toJson(gitcomment.find('.loaded'))).toMatchSnapshot();
    expect(toJson(gitcomment.find('.comments'))).toMatchSnapshot();

    expect(mockPostThenUpdateComments).toHaveBeenCalledTimes(1);
    // should call getComment without failure
    expect(mockPostThenUpdateComments.mock.calls[0][0]).not.toThrow();

    gitcomment.setProps({ token: 'newToken' });
    expect(gitcomment.state('token')).toEqual('newToken');

    // test handleError instance method
    gitcomment.instance().handleError({ message: '{ "status": 500 }' });
    gitcomment.instance().handleError({ message: '{ "status": 401 }' });

    expect(errHandler).toHaveBeenCalled();
    expect(errHandler).toHaveBeenCalled();
  });
});

// test('getComments should render', () => {

// });
