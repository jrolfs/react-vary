import React from 'react';
import ReactDom from 'react-dom';

import { ExampleComponentProps } from '../exampleTypes';

const style = {
  backgroundColor: 'cornsilk'
};

const ExampleComponent2: React.SFC<ExampleComponentProps> = ({ displayName, variant, time, variantRenderCount}) => {
  return <div style={style}>DisplayName: {displayName} Variant: {variant} Time: {time} Variant Render Count: {variantRenderCount}</div>
};

export default ExampleComponent2;