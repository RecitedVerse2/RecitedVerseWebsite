'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = _react2.default.createClass({
  displayName: 'Tab',

  propTypes: {
    className: _react.PropTypes.string,
    id: _react.PropTypes.string,
    focus: _react.PropTypes.bool,
    selected: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    activeTabClassName: _react.PropTypes.string,
    disabledTabClassName: _react.PropTypes.string,
    panelId: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      focus: false,
      selected: false,
      id: null,
      panelId: null,
      activeTabClassName: 'ReactTabs__Tab--selected',
      disabledTabClassName: 'ReactTabs__Tab--disabled'
    };
  },
  componentDidMount: function componentDidMount() {
    this.checkFocus();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.checkFocus();
  },
  checkFocus: function checkFocus() {
    if (this.props.selected && this.props.focus) {
      (0, _reactDom.findDOMNode)(this).focus();
    }
  },
  render: function render() {
    var _cx;

    var _props = this.props;
    var selected = _props.selected;
    var disabled = _props.disabled;
    var panelId = _props.panelId;
    var activeTabClassName = _props.activeTabClassName;
    var disabledTabClassName = _props.disabledTabClassName;
    var className = _props.className;
    var children = _props.children;
    var id = _props.id;

    var attributes = _objectWithoutProperties(_props, ['selected', 'disabled', 'panelId', 'activeTabClassName', 'disabledTabClassName', 'className', 'children', 'id']);

    delete attributes.focus;

    return _react2.default.createElement(
      'li',
      _extends({}, attributes, {
        className: (0, _classnames2.default)('ReactTabs__Tab', className, (_cx = {}, _defineProperty(_cx, activeTabClassName, selected), _defineProperty(_cx, disabledTabClassName, disabled), _cx)),
        role: 'tab',
        id: id,
        'aria-selected': selected ? 'true' : 'false',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-controls': panelId,
        tabIndex: selected ? '0' : null
      }),
      children
    );
  }
});