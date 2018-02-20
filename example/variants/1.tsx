import React from 'react';
import ReactDom from 'react-dom';

import { IVariantProps } from '../../src/types';

const style = {
  backgroundColor: 'turquoise'
};

class UserProfile1 extends React.Component<IVariantProps> {
  render() {
    return <div style={style}>DisplayName: {this.props.displayName} Variant: {this.props.variant}</div>
  }
}

export default UserProfile1;