import React from 'react';
import ReactDom from 'react-dom';

import { IVariantProps } from '../../src/types';

const style = {
  backgroundColor: 'cornsilk'
};

const UserProfile2: React.SFC<IVariantProps> = (props) => {
  return <div style={style}>DisplayName: {props.displayName} Variant: {props.variant}</div>
};

export default UserProfile2;