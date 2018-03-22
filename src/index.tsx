import React from 'react';

import { InternalState, IVariantProps, IVariantState, DefaultVariantComponent } from './types';

const isNull = (val: any): boolean => val === null;
const isUndefined = (val: any): boolean => val === undefined;
const isFunc = (val: any): boolean => typeof val === 'function';
const isObjectLiteral = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]';
const isEmpty = (val: object): boolean => !Object.keys(val).length;

export function WithVariants(defaultVariant: DefaultVariantComponent): React.ComponentClass<IVariantProps> {
  if (!isFunc(defaultVariant)) {
    throw new Error('Must provide initial variant as first argument');
  }

  const { variants } = defaultVariant;
  const displayName = defaultVariant.name || defaultVariant.constructor.name;

  if (!displayName) {
    throw new Error('Must provide static displayName');
  }

  if (!isObjectLiteral(variants) || isEmpty(variants)) {
    throw new Error('Must provide variant configuration with at least one variant');
  }

  const variantCount = Object.keys(variants).length + 1;
  const internalState: InternalState = { variantCount };
  let renderCount = -1;

  return class VariantWrapper extends React.Component<IVariantProps, IVariantState> {
    constructor(props: IVariantProps) {
      super(props);

      const { variant } = props;

      if (isNull(variant) || isUndefined(variant) || isNaN(variant)) {
        throw new Error('Must provide variant prop to ' + displayName);
      }

      const internalVariants = {
        0: defaultVariant,
        ...variants
      };

      const initialState = {
        displayName,
        variants: internalVariants,
        ...props,
        isDefault: variant === 0,
        variantCount: internalState.variantCount
      };

      this.state = initialState;
    }

    render() {
      const { state } = this;
      const { variant, variants } = state;

      if (isFunc(this.props.render)) {
        renderCount++;
        return this.props.render({ ...this.state, renderVariant: renderCount });
      }

      const VariantComponent: React.ComponentType<any> = variants[variant];

      if (!isFunc(VariantComponent)) {
        throw new Error(`No variant # ${variant} exists for ${displayName}, check your config`);
      }

      return <VariantComponent {...state} />;
    }
  };
}
