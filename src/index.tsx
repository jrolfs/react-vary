import React from 'react';

import { ComponentWithVariants } from './types';

// TODO: Make IPropTypes
// VariantWrapper.propTypes = {
//   variant: PropTypes.number,
//   render: PropTypes.func
// }
// VariantWrapper.defaultProps = {
//   variant: null,
//   render: null
// }

const isNull = (val: any): boolean => val === null;
const isFunc = (val: any): boolean => typeof val === 'function';
const isObjectLiteral = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]';
const isEmpty = (val: object): boolean => !Object.keys(val).length;

const getName = (component: React.Component): string => component.constructor.name;

export function withVariants(defaultVariant: ComponentWithVariants) {
  console.log('incoming', defaultVariant.variants);
  if (!isFunc(defaultVariant)) {
    throw new Error('Must provide initial variant as first argument');
  }

  const { variants } = defaultVariant;

  if (!isObjectLiteral(variants) || isEmpty(variants)) {
    throw new Error('Must provide variant configuration with at least one variant');
  }

  const variantCount = Object.keys(variants).length;
  const internalState = { variantCount, renderPropCount: 0 };

  class VariantWrapper extends React.PureComponent {
    constructor(props) {
      super(props);

      this.variants = {
        0: defaultVariant,
        ...variants
      };
      this.componentName = getName(defaultVariant);

      /////////////////////////////////////

      const { componentName } = this;
      const { variant, render } = props;

      if (isNull(variant) && isNull(render)) {
        throw new Error('Must provide either variant or render prop to ' + componentName);
      }

      if (!isNull(variant) && !!render) {
        throw new Error('Cannot provide both variant and render prop to ' + componentName);
      }

      const newProps = {
        ...props,
        componentName,
        isDefault: variant === 0
      };

      if (render) {
        internalState.renderPropCount++;
        const renderName = `${componentName}-renderProp-${internalState.renderPropCount}`;
        newProps.variant = renderName;
      } else {
        internalState.variantCount++;
      }

      newProps.variantData = { ...internalState };
      this.state = newProps;
    }

    render() {
      const { render, variant, componentName } = this.state;

      if (render) {
        return render(this.state);
      }

      const VariantPureComponent = this.variants[variant];

      if (!isFunc(VariantPureComponent)) {
        throw new Error(`No variant # ${variant} exists for ${componentName}, check your config`);
      }

      return <VariantPureComponent {...this.state} />;
    }
  };

  return VariantWrapper;
}
