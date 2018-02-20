import React, { Props } from 'react';
import ReactDom from 'react-dom';

import { IVariants, IVariantProps, IWithVariantProps } from '../src/types';
import { WithVariants } from '../src';
import UserProfile1 from './variants/1';
import UserProfile2 from './variants/2';

interface VariantProps {
  variant: number;
}

class UserProfile extends React.Component<IVariantProps> {
  static variants: IVariants = {
    1: UserProfile1,
    2: UserProfile2
  };

  public render() {
    return <div>DisplayName: {this.props.displayName} Variant: {this.props.variant}</div>
  }
}

const UserProfileWithVariants: React.ComponentType<IWithVariantProps> = WithVariants(UserProfile);

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
