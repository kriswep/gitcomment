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
    };
  }

  componentDidMount() {
    getComments({
      repo: this.props.repo,
      issueNumber: this.props.issueNumber,
    });
  }

  render() {
    return <div>{this.props.children('gitcomment to be done!')}</div>;
  }
}
// const Gitcomment = ({ children }) => <div>{children('gitcomment to be done!')}</div>;
Gitcomment.propTypes = {
  repo: PropTypes.string.isRequired,
  issueNumber: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

export default Gitcomment;
