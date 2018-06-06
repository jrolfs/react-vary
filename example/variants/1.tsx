import React from 'react';
import ReactDom from 'react-dom';

import { UserProfileProps } from '../exampleTypes';

const style = {
  backgroundColor: 'turquoise'
};

class UserProfile1 extends React.Component<UserProfileProps> {
  render() {
    console.log('number 1 props', this.props);
    const { displayName, variant, time } = this.props;
    return <div style={style}>DisplayName: {displayName} Variant: {variant} Time: {time}</div>
  }
}

export default UserProfile1;