/* globals window */
import React from 'react';
import Gitcomment from 'gitcomment/dist/gitcomment';

// class App extends Component {
//   render() {
//      (
//         <Gitcomment>{name => <div>{name}</div>}</Gitcomment>
//     );
//   }
// }

const App = () => (
  <Gitcomment repo="kriswep/gitcomment" issueNumber={1} token={process.env.REACT_APP_GH_TOKEN}>
    {(loaded, comments, postComment) => {
      const commentList = comments.map(comment => <li key={comment.id}>body: {comment.body}</li>);
      const handler = () => {
        postComment('test');
      };
      const redirect = () => {
        window.location.replace(
          `http://github.com/login/oauth/authorize?client_id=ce7fd0d5cdbd634de3aa&redirect_uri=${window
            .location.href}test`,
        );
        // Todo: we get a code after gh is done in url query param code.
        // with this we can get token from gatekeeper: 'http://localhost:9999/authenticate/'+code
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
  </Gitcomment>
);

export default App;
