import React from 'react';
import ReactDom from 'react-dom';

import UserProfileWithVariants from './UserProfile';

class App extends React.Component {
  render() {
    return <div>
        <UserProfileWithVariants variant={0} />
        <UserProfileWithVariants variant={1} />
        <UserProfileWithVariants variant={2} />
        <UserProfileWithVariants variant={3} render={({ displayName, variant }: { displayName: string, variant: number }) => {
            return <div>DisplayName: {displayName} Variant: {variant}</div>;
        }} />
      </div>;
  }
}

ReactDom.render(<App/>, document.getElementById('root'));
