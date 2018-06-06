import React from 'react';

import { IVariants } from '../src/types';
import { UserProfileProps } from './exampleTypes';

const style = {
  backgroundColor: 'coral'
};

export class UserProfile extends React.Component<UserProfileProps, any> {
  constructor(props: any) {
    super(props);
    this.state = { isStatefulComponent: true }
  }

  static variants: IVariants = { };

  public render() {
    const { displayName, variant, time } = this.props;
    return <div style={style}>This is the default Variant. DisplayName: {displayName} Variant: {variant} Time: {time}</div>
  }
}

export default UserProfile;