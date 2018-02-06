import React from 'react';
import ReactDom from 'react-dom';

import { ComponentWithVariants } from '../src/types';
import { withVariants } from '../src';

class UserProfile1 extends React.PureComponent {
  render() {
    const { componentName, variant, isDefault = false } = this.props;
    return <div>hi {componentName} {variant} isDefault: {isDefault.toString()}</div>
  }
}

class UserProfile extends ComponentWithVariants {
  static variants = {
    1: UserProfile1,
  };

  public render() {
    const { componentName, variant, isDefault = false} = this.props;
    return <div>hi {componentName} {variant} isDefault: {isDefault.toString()}</div>
  }
}

const UserProfileWithVariants = withVariants(UserProfile);

class App extends React.PureComponent {
  render() {
    return <UserProfileWithVariants variant={0} />;
  }
}

console.log('rendering');

ReactDom.render(<App/>, document.getElementById('root'));
