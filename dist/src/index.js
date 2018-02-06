var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as PropTypes from 'prop-types';
import React from 'react';
var isNull = function (val) { return val === null; };
var isFunc = function (val) { return typeof val === 'function'; };
var isObjectLiteral = function (val) { return Object.prototype.toString.call(val) === '[object Object]'; };
var isEmpty = function (val) { return !Object.keys(val).length; };
var getName = function (component) { return component.constructor.name; };
export function withVariants(defaultVariant) {
    if (!isFunc(defaultVariant)) {
        throw new Error('Must provide initial variant as first argument');
    }
    var variants = defaultVariant.variants;
    if (!isObjectLiteral(variants) || isEmpty(variants)) {
        throw new Error('Must provide variant configuration with at least one variant');
    }
    var variantCount = Object.keys(variants).length;
    var internalState = { variantCount: variantCount, renderPropCount: 0 };
    var VariantWrapper = /** @class */ (function (_super) {
        __extends(VariantWrapper, _super);
        function VariantWrapper(props) {
            var _this = _super.call(this, props) || this;
            _this.variants = __assign({ 0: defaultVariant }, variants);
            _this.componentName = getName(defaultVariant);
            /////////////////////////////////////
            var componentName = _this.componentName;
            var variant = props.variant, render = props.render;
            if (isNull(variant) && isNull(render)) {
                throw new Error('Must provide either variant or render prop to ' + componentName);
            }
            if (!isNull(variant) && !!render) {
                throw new Error('Cannot provide both variant and render prop to ' + componentName);
            }
            var newProps = __assign({}, props, { componentName: componentName, isDefault: variant === 0 });
            if (render) {
                internalState.renderPropCount++;
                var renderName = componentName + "-renderProp-" + internalState.renderPropCount;
                newProps.variant = renderName;
            }
            else {
                internalState.variantCount++;
            }
            newProps.variantData = __assign({}, internalState);
            _this.state = newProps;
            return _this;
        }
        VariantWrapper.prototype.render = function () {
            var _a = this.state, render = _a.render, variant = _a.variant, componentName = _a.componentName;
            if (render) {
                return render(this.state);
            }
            var VariantPureComponent = this.variants[variant];
            if (!isFunc(VariantPureComponent)) {
                throw new Error("No variant # " + variant + " exists for " + componentName + ", check your config");
            }
            return React.createElement(VariantPureComponent, __assign({}, this.state));
        };
        return VariantWrapper;
    }(PureComponent));
    ;
    VariantWrapper.propTypes = {
        variant: PropTypes.number,
        render: PropTypes.func
    };
    VariantWrapper.defaultProps = {
        variant: null,
        render: null
    };
    return VariantWrapper;
}
