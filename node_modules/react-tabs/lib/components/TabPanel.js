'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = _react2.default.createClass({
  displayName: 'TabPanel',

  propTypes: {
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
    className: _react.PropTypes.string,
    id: _react.PropTypes.string,
    selected: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    tabId: _react.PropTypes.string
  },

  contextTypes: {
    forceRenderTabPanel: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      selected: false,
      id: null,
      tabId: null
    };
  },
  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var selected = _props.selected;
    var id = _props.id;
    var tabId = _props.tabId;
    var style = _props.style;

    var attributes = _objectWithoutProperties(_props, ['className', 'children', 'selected', 'id', 'tabId', 'style']);

    return _react2.default.createElement(
      'div',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__TabPanel', className, {
          'ReactTabs__TabPanel--selected': selected
        }),
        role: 'tabpanel',
        id: id,
        'aria-labelledby': tabId,
        style: _extends({}, style, { display: selected ? null : 'none' })
      }),
      this.context.forceRenderTabPanel || selected ? children : null
    );
  }
});