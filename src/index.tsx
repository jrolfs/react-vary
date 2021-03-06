import React from 'react';

import { InternalState, IVariantProps, IVariantState, DefaultVariantComponent } from './types';

const isNull = (val: any): boolean => val === null;
const isUndefined = (val: any): boolean => val === undefined;
const isFunc = (val: any): boolean => typeof val === 'function';
const isObjectLiteral = (val: any): boolean => Object.prototype.toString.call(val) === '[object Object]';
const isEmpty = (val: object): boolean => !Object.keys(val).length;
const getDisplayName = (comp : Function): string => comp.name || comp.constructor.name;
const generateRenderName = (name : string, displayName: string) : string => name || `${displayName}AsRenderProp`;
const withRenderError = (displayName: string, msg: string): Error => new Error(`Error in WithRenderProps(${displayName}): ${msg}`);
const withVariantsError = (displayName : string, msg: string) : Error => new Error(`Error in WithVariants(${displayName}): ${msg}`);

export function WithRenderProps(DefaultVariant: React.ComponentType): React.ComponentClass<any> {
  const displayName = getDisplayName(DefaultVariant);
  let totalRenderCount = 0;
  let variantCount = 0;

  return class RenderWrapper extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      variantCount++;
    }

    render() {
      const topProps = this.props;
      const { render: topRender, variant } = topProps;
      const isRenderProp = isFunc(topRender);
      const isDefault = !variant;

      if (isDefault) {
        totalRenderCount++;
        const newProps = { ...topProps, variantCount, isDefault, totalRenderCount, isRenderProp, displayName };
        return <DefaultVariant {...newProps}  />
      }

      if (isRenderProp) {
        // @ts-ignore
        class RenderProp extends DefaultVariant<any, any> {
          render() {
            totalRenderCount++;

            const newProps = { ...topProps, variantCount, isDefault, totalRenderCount, isRenderProp, displayName };
            // @ts-ignore
            this.props = newProps;
            return topRender(this);
          }
        }

        // @ts-ignore
        return <RenderProp {...topProps} />
      }

      throw withRenderError(displayName, 'Could not find render definition or variant');
    }
  }
}

export function WithVariants(defaultVariant: DefaultVariantComponent): React.ComponentClass<IVariantProps> {
  if (!isFunc(defaultVariant)) {
    throw new Error('Must provide initial variant as first argument');
  }

  const { variants } = defaultVariant;
  variants[0] = defaultVariant;

  const displayName = getDisplayName(defaultVariant);

  if (!isObjectLiteral(variants) || isEmpty(variants)) {
    throw withVariantsError(displayName, 'Must provide variant configuration with at least one variant');
  }

  // static variants count only
  let staticVariantCount = Object.keys(variants).length;
  let totalRenderCount = staticVariantCount;

  return class VariantWrapper extends React.Component<IVariantProps, IVariantState> {
    constructor(props: IVariantProps) {
      super(props);

      const { variant } = props;

      if (isNull(variant) || isUndefined(variant) || isNaN(variant)) {
        throw withVariantsError(displayName, `Must provide variant prop to ${displayName}`);
      }

      const isRenderProp = isFunc(props.render);
      const isStaticVariant = !!variants[variant];

      const initialState = {
        ...props,
        isRenderProp,
        isStaticVariant,
        displayName,
        variants: { ...variants },
        isDefault: variant === 0,
        staticVariantCount,
        variantRenderCount: 1,
        totalRenderCount: 0
      };

      this.state = initialState;
    }

    componentWillReceiveProps() {
      totalRenderCount++;

      this.setState({
        totalRenderCount,
        variantRenderCount: this.state.variantRenderCount + 1
      });
    }

    render() {
      const { state, props } = this;
      const { variant, variants, isRenderProp } = state;

      const VariantComponent : React.ComponentType<any> = variants[variant];
      let name: string|undefined = VariantComponent && getDisplayName(VariantComponent);

      if (isRenderProp) {
        name = generateRenderName(name, displayName);
      }

      const combinedProps = { ...state, ...props, displayName: name };

      if (isRenderProp) {
        // @ts-ignore
        combinedProps.totalRenderCount = combinedProps.totalRenderCount + 1;
        return props.render(combinedProps);
      }

      if (!isFunc(VariantComponent)) {
        throw withVariantsError(displayName, `No variant # ${variant} exists for ${name}, check your config`);
      }

      return <VariantComponent {...combinedProps} />;
    }
  };
}
