import React from 'react';
import ReactDom from 'react-dom';

import { UserProfileProps } from '../exampleTypes';

const style = {
  backgroundColor: 'cornsilk'
};

const UserProfile2 : React.SFC < UserProfileProps > = ({displayName, variant, time}) => {
  return <div style={style}>DisplayName: {displayName} Variant: {variant} Time: {time}</div>
};

export default UserProfile2;