var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //displayName = Layout.name
    Layout.prototype.render = function () {
        return (React.createElement(Grid, { fluid: true },
            React.createElement(Row, null,
                React.createElement(Col, { sm: 3 },
                    React.createElement(NavMenu, null)),
                React.createElement(Col, { sm: 9 }, this.props.children))));
    };
    return Layout;
}(Component));
export { Layout };
//# sourceMappingURL=Layout.js.map