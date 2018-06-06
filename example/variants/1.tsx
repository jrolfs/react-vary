import React from 'react';
import ReactDom from 'react-dom';

import { ExampleComponentProps } from '../exampleTypes';

const style = {
  backgroundColor: 'turquoise'
};

class ExampleComponent1 extends React.Component<ExampleComponentProps> {
  render() {
    const { displayName, variant, time, variantRenderCount } = this.props;
    return <div style={style}>DisplayName: {displayName} Variant: {variant} Time: {time} Variant Render Count: {variantRenderCount}</div>
  }
}

export default ExampleComponent1;