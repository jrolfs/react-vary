import React from 'react';
import ReactDom from 'react-dom';

import UserProfileWithVariants from './UserProfile';

class App extends React.Component {
  render() {
    return (
      <div>
        <UserProfileWithVariants variant={0} />
        <UserProfileWithVariants variant={1} />
        <UserProfileWithVariants variant={2} />
      </div>
    );
  }
}

ReactDom.render(<App/>, document.getElementById('root'));
