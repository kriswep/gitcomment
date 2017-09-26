/* globals window */
import React, { Component } from 'react';
import queryString from 'query-string';
import Gitcomment from 'gitcomment/dist/gitcomment';

const redirect = () =>
  window.location.replace(
    `http://github.com/login/oauth/authorize?client_id=ce7fd0d5cdbd634de3aa&scope=repo%20user&redirect_uri=${window
      .location.href}test`,
  );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    const { code } = queryString.parse(window.location.search);
    if (code) {
      // lets pretend we have a gatekeepr instance on localhost:9999
      window
        .fetch(`http://localhost:9999/authenticate/${code}`, {
          method: 'GET',
        })
        .then(res => res.json())
        .then(({ token }) => this.setState({ token }));
    }
  }

  render() {
    return (
      <Gitcomment
        repo="kriswep/gitcomment"
        issueNumber={1}
        token={this.state.token || process.env.REACT_APP_GH_TOKEN}
        render={(loaded, comments, postComment) => {
          const commentList = comments.map(comment => (
            <li key={comment.id}>body: {comment.body}</li>
          ));
          const handler = () => {
            postComment('test');
          };
          return (
            <div>
              <p>loaded: {String(loaded)}</p>
              <ul>{commentList}</ul>
              <button onClick={handler}>Post sthg</button>
              <button onClick={redirect}>Login</button>
            </div>
          );
        }}
      />
    );
  }
}

export default App;
