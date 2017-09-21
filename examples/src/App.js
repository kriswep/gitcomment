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
      return (
        <div>
          <p>loaded: {String(loaded)}</p>
          <ul>{commentList}</ul>
          <button onClick={handler}>Post sthg</button>
        </div>
      );
    }}
  </Gitcomment>
);

export default App;
