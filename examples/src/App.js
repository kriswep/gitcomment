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
  <Gitcomment repo="kriswep/wetainment" issueNumber={1}>
    {name => <div>{name}</div>}
  </Gitcomment>
);

export default App;
