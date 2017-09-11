import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import makeGetJsonFrom from './getJsonFrom';
import makeGetComments from './getComments';

const getJsonFrom = makeGetJsonFrom({
  fetch: global.fetch,
});
const getComments = makeGetComments({
  getJsonFrom,
});
// getComments({
//   repo: 'kriswep/gitcomment',
//   issueNumber: 1,
// });

class Gitcomment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      comments: [],
    };
  }

  componentDidMount() {
    getComments({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
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

  render() {
    return <div>{this.props.children(this.state.loaded, this.state.comments)}</div>;
  }
}
// const Gitcomment = ({ children }) => <div>{children('gitcomment to be done!')}</div>;
Gitcomment.propTypes = {
  repo: PropTypes.string.isRequired,
  issueNumber: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

export default Gitcomment;
