import React from 'react';

import { IVariants, IVariantProps, IWithVariantProps } from '../src/types';
import { WithVariants } from '../src';
import UserProfile1 from './variants/1';
import UserProfile2 from './variants/2';

export class UserProfile extends React.Component<IVariantProps> {
  static variants: IVariants = {
    1: UserProfile1,
    2: UserProfile2
  };

  public render() {
    return <div>DisplayName: {this.props.displayName} Variant: {this.props.variant}</div>
  }
}

const UserProfileWithVariants: React.ComponentType<IWithVariantProps> = WithVariants(UserProfile);

export default UserProfileWithVariants;