'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function renderChildren(props) {
  return _react2.default.Children.map(props.children, function (child) {
    // if child is not a tab we don't need to clone it
    // since we don't need to add custom props

    if (child.type !== _Tab2.default) {
      return child;
    }

    var clonedProps = {
      activeTabClassName: props.activeTabClassName,
      disabledTabClassName: props.disabledTabClassName
    };

    return _react2.default.cloneElement(child, clonedProps);
  });
}

module.exports = _react2.default.createClass({
  displayName: 'TabList',

  propTypes: {
    className: _react.PropTypes.string,
    activeTabClassName: _react.PropTypes.string,
    disabledTabClassName: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var activeTabClassName = _props.activeTabClassName;
    var disabledTabClassName = _props.disabledTabClassName;
    var children = _props.children;

    var attributes = _objectWithoutProperties(_props, ['className', 'activeTabClassName', 'disabledTabClassName', 'children']);

    return _react2.default.createElement(
      'ul',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__TabList', className),
        role: 'tablist'
      }),
      renderChildren({ activeTabClassName: activeTabClassName, disabledTabClassName: disabledTabClassName, children: children })
    );
  }
});