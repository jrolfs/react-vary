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
import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
var UserProfile1 = /** @class */ (function (_super) {
    __extends(UserProfile1, _super);
    function UserProfile1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserProfile1.prototype.render = function () {
        var _a = this.props, componentName = _a.componentName, variant = _a.variant, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b;
        return React.createElement("div", null,
            "hi ",
            componentName,
            " ",
            variant,
            " isDefault: ",
            isDefault.toString());
    };
    return UserProfile1;
}(PureComponent));
var UserProfile = /** @class */ (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.variants = {
            1: UserProfile1,
        };
        return _this;
    }
    UserProfile.prototype.render = function () {
        var _a = this.props, componentName = _a.componentName, variant = _a.variant, _b = _a.isDefault, isDefault = _b === void 0 ? false : _b;
        return React.createElement("div", null,
            "hi ",
            componentName,
            " ",
            variant,
            " isDefault: ",
            isDefault.toString());
    };
    return UserProfile;
}(PureComponent));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return React.createElement(UserProfile, { variant: 0 });
    };
    return App;
}(PureComponent));
console.log('rendering');
ReactDom.render(React.createElement(App, null), document.getElementById('root'));
