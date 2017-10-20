import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import 'whatwg-fetch';

import makeGetJsonFrom from './getJsonFrom';
import makeGetComments from './getComments';

import makePostJsonTo from './postJsonTo';
import makePostComment from './postComment';

const TOKEN_KEY = '_-GC_-GH_TOKEN';

const getJsonFrom = makeGetJsonFrom({
  fetch: global.fetch,
});
const getComments = makeGetComments({
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

  updateComments() {
    getComments({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
      token: this.state.token,
    }).then((response) => {
      const comments = response.map(comment => ({
        id: comment.id,
        body: comment.body,
        created: comment.created_at,
        updated: comment.updated_at,
        url: comment.url,
        author: {
          name: comment.user.login,
          avatar: comment.user.avatar_url,
          url: comment.user.url,
        },
      }));
      return this.setState({ loaded: true, comments });
    });
  }

  postCommentToIssue(comment) {
    postComment({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
      token: this.state.token,
      comment,
    }).then(() => this.updateComments());
  }

  render() {
    return (
      <div>
        {this.props.render(
          this.state.loaded,
          this.state.comments,
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
};
Gitcomment.defaultProps = {
  token: undefined,
};

export default Gitcomment;
