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
  <Gitcomment repo="kriswep/gitcomment" issueNumber={1}>
    {(loaded, comments) => {
      const commentList = comments.map(comment => <li key={comment.id}>body: {comment.body}</li>);
      return (
        <div>
          <p>loaded: {String(loaded)}</p>
          <ul>{commentList}</ul>
        </div>
      );
    }}
  </Gitcomment>
);

export default App;
