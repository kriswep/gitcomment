import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { GraphQLClient } from 'graphql-request';
// sadly, we need authentication even for read... so maybe api3, no graphql??
// const client = new GraphQLClient('https://api.github.com/graphql', {
//   headers: {
//     Authorization: 'Bearer token..',
//   },
// });

// const query = `{
//   repository(owner: "kriswep", name: "modern-modular-javascript") {
//     name
//     issue(number: 2) {
//       title
//       bodyText
//       comments(first:2) {
//         edges {
//           node {
//             author
//             body
//           }
//         }
//       }
//     }
//   }
// }`;
// client.request(query).then(data => console.log(data));

class Gitcomment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  render() {
    return <div>{this.props.children('gitcomment to be done!')}</div>;
  }
}
// const Gitcomment = ({ children }) => <div>{children('gitcomment to be done!')}</div>;
Gitcomment.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Gitcomment;
