import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'whatwg-fetch';

import makeGetJsonFrom from './getJsonFrom';
import makeGetComments from './getComments';
import makeGetUser from './getUser';

import makePostJsonTo from './postJsonTo';
import makePostComment from './postComment';

const TOKEN_KEY = '_-GC_-GH_TOKEN';

const getJsonFrom = makeGetJsonFrom({
  fetch: global.fetch,
});
const getComments = makeGetComments({
  getJsonFrom,
});
const getUser = makeGetUser({
  getJsonFrom,
});

const postJsonTo = makePostJsonTo({
  fetch: global.fetch,
});
const postComment = makePostComment({
  postJsonTo,
});

class Gitcomment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      comments: [],
      user: {},
      token: this.props.token || global.localStorage.getItem(TOKEN_KEY),
    };
  }

  componentDidMount() {
    this.saveToken(this.props.token);
    this.updateComments();
  }

  componentWillReceiveProps({ token }) {
    this.saveToken(token);
  }

  saveToken(token) {
    return (
      token &&
      token !== global.localStorage.getItem(TOKEN_KEY) &&
      (global.localStorage.setItem(TOKEN_KEY, token) && this.setState({ token }))
    );
  }

  handleError(e) {
    if (!(e instanceof TypeError) && JSON.parse(e.message).status === 401) {
      global.localStorage.setItem(TOKEN_KEY, '');
      this.setState({ token: '' });
      return this.props.requireAuth && this.props.requireAuth(JSON.parse(e.message));
    }
    return this.props.error && this.props.error(e);
  }

  updateComments() {
    getComments({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
      token: this.state.token,
    })
      .then((response) => {
        const comments = response.map(comment => ({
          id: comment.id,
          body: comment.body,
          created: comment.created_at,
          updated: comment.updated_at,
          url: comment.url,
          author: {
            login: comment.user.login,
            avatar: comment.user.avatar_url,
            url: comment.user.html_url,
          },
        }));
        return this.setState({ loaded: true, comments });
      })
      .then(() => getUser({ token: this.state.token }))
      .then(user =>
        this.setState({
          user: {
            login: user.login,
            name: user.name,
            avatar: user.avatar_url,
            url: user.html_url,
          },
        }))
      .catch(this.handleError.bind(this));
  }

  postCommentToIssue(comment) {
    postComment({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
      token: this.state.token,
      comment,
    })
      .catch(this.handleError.bind(this))
      .then(() => this.updateComments());
  }

  render() {
    return (
      <div>
        {this.props.render(
          this.state.loaded,
          this.state.comments,
          this.state.user,
          this.postCommentToIssue.bind(this), // eslint-disable-line react/jsx-no-bind
        )}
      </div>
    );
  }
}

Gitcomment.propTypes = {
  token: PropTypes.string,
  repo: PropTypes.string.isRequired,
  issueNumber: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  error: PropTypes.func,
  requireAuth: PropTypes.func,
};
Gitcomment.defaultProps = {
  token: undefined,
  error: undefined,
  requireAuth: undefined,
};

export default Gitcomment;
