import { R as React, O as getDefaultExportFromCjs, r as reactExports, j as jsxRuntimeExports, q as ChartColumn, m as motion, Z as Zap, B as Brain } from "./index-Khuvrpqq.js";
import { T as TrendingUp } from "./trending-up-CAfJ9bVg.js";
import { f as filterProps, p as polarToCartesian, i as isFunction, D as Dot, L as Layer, Q as Polygon, A as Animate, d as interpolateNumber, e as isEqual, k as LabelList, G as Global, g as getValueByDataKey, U as last, a as isNil, z as generateCategoricalChart, P as PolarAngleAxis, H as PolarRadiusAxis, I as formatAxisMap, R as ResponsiveContainer, O as LineChart, K as CartesianGrid, X as XAxis, Y as YAxis, M as Tooltip, N as Legend, J as Line } from "./LineChart-D-lmKdQR.js";
import { L as Lightbulb } from "./lightbulb-D4nCNOLy.js";
import { c as clsx } from "./clsx-DgYk2OaC.js";
var _excluded$1 = ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"];
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getPolygonPath = function getPolygonPath2(radius, cx, cy, polarAngles) {
  var path = "";
  polarAngles.forEach(function(angle, i) {
    var point = polarToCartesian(cx, cy, radius, angle);
    if (i) {
      path += "L ".concat(point.x, ",").concat(point.y);
    } else {
      path += "M ".concat(point.x, ",").concat(point.y);
    }
  });
  path += "Z";
  return path;
};
var PolarAngles = function PolarAngles2(props) {
  var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, polarAngles = props.polarAngles, radialLines = props.radialLines;
  if (!polarAngles || !polarAngles.length || !radialLines) {
    return null;
  }
  var polarAnglesProps = _objectSpread$1({
    stroke: "#ccc"
  }, filterProps(props, false));
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-polar-grid-angle"
  }, polarAngles.map(function(entry) {
    var start = polarToCartesian(cx, cy, innerRadius, entry);
    var end = polarToCartesian(cx, cy, outerRadius, entry);
    return /* @__PURE__ */ React.createElement("line", _extends$1({}, polarAnglesProps, {
      key: "line-".concat(entry),
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    }));
  }));
};
var ConcentricCircle = function ConcentricCircle2(props) {
  var cx = props.cx, cy = props.cy, radius = props.radius, index = props.index;
  var concentricCircleProps = _objectSpread$1(_objectSpread$1({
    stroke: "#ccc"
  }, filterProps(props, false)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ React.createElement("circle", _extends$1({}, concentricCircleProps, {
    className: clsx("recharts-polar-grid-concentric-circle", props.className),
    key: "circle-".concat(index),
    cx,
    cy,
    r: radius
  }));
};
var ConcentricPolygon = function ConcentricPolygon2(props) {
  var radius = props.radius, index = props.index;
  var concentricPolygonProps = _objectSpread$1(_objectSpread$1({
    stroke: "#ccc"
  }, filterProps(props, false)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ React.createElement("path", _extends$1({}, concentricPolygonProps, {
    className: clsx("recharts-polar-grid-concentric-polygon", props.className),
    key: "path-".concat(index),
    d: getPolygonPath(radius, props.cx, props.cy, props.polarAngles)
  }));
};
var ConcentricPath = function ConcentricPath2(props) {
  var polarRadius = props.polarRadius, gridType = props.gridType;
  if (!polarRadius || !polarRadius.length) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-polar-grid-concentric"
  }, polarRadius.map(function(entry, i) {
    var key = i;
    if (gridType === "circle") return /* @__PURE__ */ React.createElement(ConcentricCircle, _extends$1({
      key
    }, props, {
      radius: entry,
      index: i
    }));
    return /* @__PURE__ */ React.createElement(ConcentricPolygon, _extends$1({
      key
    }, props, {
      radius: entry,
      index: i
    }));
  }));
};
var PolarGrid = function PolarGrid2(_ref) {
  var _ref$cx = _ref.cx, cx = _ref$cx === void 0 ? 0 : _ref$cx, _ref$cy = _ref.cy, cy = _ref$cy === void 0 ? 0 : _ref$cy, _ref$innerRadius = _ref.innerRadius, innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius, _ref$outerRadius = _ref.outerRadius, outerRadius = _ref$outerRadius === void 0 ? 0 : _ref$outerRadius, _ref$gridType = _ref.gridType, gridType = _ref$gridType === void 0 ? "polygon" : _ref$gridType, _ref$radialLines = _ref.radialLines, radialLines = _ref$radialLines === void 0 ? true : _ref$radialLines, props = _objectWithoutProperties$1(_ref, _excluded$1);
  if (outerRadius <= 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-polar-grid"
  }, /* @__PURE__ */ React.createElement(PolarAngles, _extends$1({
    cx,
    cy,
    innerRadius,
    outerRadius,
    gridType,
    radialLines
  }, props)), /* @__PURE__ */ React.createElement(ConcentricPath, _extends$1({
    cx,
    cy,
    innerRadius,
    outerRadius,
    gridType,
    radialLines
  }, props)));
};
PolarGrid.displayName = "PolarGrid";
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_1 = head;
var first = head_1;
const first$1 = /* @__PURE__ */ getDefaultExportFromCjs(first);
var _excluded = ["key"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Radar = /* @__PURE__ */ function(_PureComponent) {
  function Radar2() {
    var _this;
    _classCallCheck(this, Radar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Radar2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _defineProperty(_this, "handleMouseEnter", function(e) {
      var onMouseEnter = _this.props.onMouseEnter;
      if (onMouseEnter) {
        onMouseEnter(_this.props, e);
      }
    });
    _defineProperty(_this, "handleMouseLeave", function(e) {
      var onMouseLeave = _this.props.onMouseLeave;
      if (onMouseLeave) {
        onMouseLeave(_this.props, e);
      }
    });
    return _this;
  }
  _inherits(Radar2, _PureComponent);
  return _createClass(Radar2, [{
    key: "renderDots",
    value: function renderDots(points) {
      var _this$props = this.props, dot = _this$props.dot, dataKey = _this$props.dataKey;
      var baseProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, baseProps), customDotProps), {}, {
          dataKey,
          cx: entry.x,
          cy: entry.y,
          index: i,
          payload: entry
        });
        return Radar2.renderDotItem(dot, dotProps);
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-radar-dots"
      }, dots);
    }
  }, {
    key: "renderPolygonStatically",
    value: function renderPolygonStatically(points) {
      var _this$props2 = this.props, shape = _this$props2.shape, dot = _this$props2.dot, isRange = _this$props2.isRange, baseLinePoints = _this$props2.baseLinePoints, connectNulls = _this$props2.connectNulls;
      var radar;
      if (/* @__PURE__ */ React.isValidElement(shape)) {
        radar = /* @__PURE__ */ React.cloneElement(shape, _objectSpread(_objectSpread({}, this.props), {}, {
          points
        }));
      } else if (isFunction(shape)) {
        radar = shape(_objectSpread(_objectSpread({}, this.props), {}, {
          points
        }));
      } else {
        radar = /* @__PURE__ */ React.createElement(Polygon, _extends({}, filterProps(this.props, true), {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          points,
          baseLinePoints: isRange ? baseLinePoints : null,
          connectNulls
        }));
      }
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-radar-polygon"
      }, radar, dot ? this.renderDots(points) : null);
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function renderPolygonWithAnimation() {
      var _this2 = this;
      var _this$props3 = this.props, points = _this$props3.points, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var prevPoints = this.state.prevPoints;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radar-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        var prevPointsDiffFactor = prevPoints && prevPoints.length / points.length;
        var stepData = points.map(function(entry, index) {
          var prev = prevPoints && prevPoints[Math.floor(index * prevPointsDiffFactor)];
          if (prev) {
            var _interpolatorX = interpolateNumber(prev.x, entry.x);
            var _interpolatorY = interpolateNumber(prev.y, entry.y);
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: _interpolatorX(t),
              y: _interpolatorY(t)
            });
          }
          var interpolatorX = interpolateNumber(entry.cx, entry.x);
          var interpolatorY = interpolateNumber(entry.cy, entry.y);
          return _objectSpread(_objectSpread({}, entry), {}, {
            x: interpolatorX(t),
            y: interpolatorY(t)
          });
        });
        return _this2.renderPolygonStatically(stepData);
      });
    }
  }, {
    key: "renderPolygon",
    value: function renderPolygon() {
      var _this$props4 = this.props, points = _this$props4.points, isAnimationActive = _this$props4.isAnimationActive, isRange = _this$props4.isRange;
      var prevPoints = this.state.prevPoints;
      if (isAnimationActive && points && points.length && !isRange && (!prevPoints || !isEqual(prevPoints, points))) {
        return this.renderPolygonWithAnimation();
      }
      return this.renderPolygonStatically(points);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, hide = _this$props5.hide, className = _this$props5.className, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-radar", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, this.renderPolygon(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        dotItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties(props, _excluded);
        dotItem = /* @__PURE__ */ React.createElement(Dot, _extends({}, dotProps, {
          key,
          className: clsx("recharts-radar-dot", typeof option !== "boolean" ? option.className : "")
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Radar, "displayName", "Radar");
_defineProperty(Radar, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: false,
  activeDot: true,
  dot: false,
  legendType: "rect",
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty(Radar, "getComposedData", function(_ref2) {
  var radiusAxis = _ref2.radiusAxis, angleAxis = _ref2.angleAxis, displayedData = _ref2.displayedData, dataKey = _ref2.dataKey, bandSize = _ref2.bandSize;
  var cx = angleAxis.cx, cy = angleAxis.cy;
  var isRange = false;
  var points = [];
  var angleBandSize = angleAxis.type !== "number" ? bandSize !== null && bandSize !== void 0 ? bandSize : 0 : 0;
  displayedData.forEach(function(entry, i) {
    var name = getValueByDataKey(entry, angleAxis.dataKey, i);
    var value = getValueByDataKey(entry, dataKey);
    var angle = angleAxis.scale(name) + angleBandSize;
    var pointValue = Array.isArray(value) ? last(value) : value;
    var radius = isNil(pointValue) ? void 0 : radiusAxis.scale(pointValue);
    if (Array.isArray(value) && value.length >= 2) {
      isRange = true;
    }
    points.push(_objectSpread(_objectSpread({}, polarToCartesian(cx, cy, radius, angle)), {}, {
      name,
      value,
      cx,
      cy,
      radius,
      angle,
      payload: entry
    }));
  });
  var baseLinePoints = [];
  if (isRange) {
    points.forEach(function(point) {
      if (Array.isArray(point.value)) {
        var baseValue = first$1(point.value);
        var radius = isNil(baseValue) ? void 0 : radiusAxis.scale(baseValue);
        baseLinePoints.push(_objectSpread(_objectSpread({}, point), {}, {
          radius
        }, polarToCartesian(cx, cy, radius, point.angle)));
      } else {
        baseLinePoints.push(point);
      }
    });
  }
  return {
    points,
    isRange,
    baseLinePoints
  };
});
var RadarChart = generateCategoricalChart({
  chartName: "RadarChart",
  GraphicalChild: Radar,
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "centric",
    startAngle: 90,
    endAngle: -270,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const FORECAST_DATA = [
  { day: "Mon", performance: 82, taskVolume: 210 },
  { day: "Tue", performance: 85, taskVolume: 280 },
  { day: "Wed", performance: 87, taskVolume: 260 },
  { day: "Thu", performance: 84, taskVolume: 310 },
  { day: "Fri", performance: 89, taskVolume: 340 },
  { day: "Sat", performance: 91, taskVolume: 290 },
  { day: "Sun", performance: 88, taskVolume: 220 }
];
const INSIGHT_BULLETS = [
  { icon: "📈", text: "Tester agent improved 15% accuracy in last 24 hours" },
  { icon: "⏰", text: "Peak usage is Tuesday 2–4 PM — scale workers then" },
  { icon: "🌐", text: "Hindi language queries up 34% this week" },
  { icon: "📚", text: "Knowledge base searches increased 2× since last month" },
  {
    icon: "⏱️",
    text: "Average session length: 12 minutes (▲3 min vs last week)"
  }
];
const SCENARIO_PRESETS = [
  "Scale to 10k users",
  "Add GPU acceleration",
  "Launch mobile app",
  "Expand to 5 languages"
];
const KPI_CARDS = [
  {
    label: "AI Accuracy",
    value: "87.3%",
    trend: "+2.1%",
    sparkline: [80, 82, 81, 84, 85, 87, 87],
    color: "text-primary",
    border: "border-primary/30",
    glow: "oklch(0.7 0.18 200 / 0.3)"
  },
  {
    label: "Tasks Completed",
    value: "1,247",
    trend: "+18%",
    sparkline: [900, 1020, 980, 1100, 1150, 1200, 1247],
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    glow: "oklch(0.65 0.18 155 / 0.3)"
  },
  {
    label: "Avg Response",
    value: "1.4s",
    trend: "-0.3s",
    sparkline: [2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4],
    color: "text-amber-400",
    border: "border-amber-400/30",
    glow: "oklch(0.75 0.15 85 / 0.3)"
  },
  {
    label: "User Growth",
    value: "+23%",
    trend: "this month",
    sparkline: [5, 8, 10, 14, 17, 20, 23],
    color: "text-secondary",
    border: "border-secondary/30",
    glow: "oklch(0.58 0.17 282 / 0.3)"
  }
];
function Sparkline({ values, color }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const W = 72;
  const H = 24;
  const pts = values.map((v, i) => {
    const x = i / (values.length - 1) * W;
    const y = H - (v - min) / range * (H * 0.85) - 2;
    return `${x},${y}`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: W, height: H, className: "overflow-visible shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Sparkline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "polyline",
      {
        points: pts.join(" "),
        fill: "none",
        stroke: color,
        strokeWidth: "1.5",
        strokeLinejoin: "round"
      }
    )
  ] });
}
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function UsageHeatmap() {
  const data = DAYS.map(
    (_, di) => Array.from({ length: 24 }, (__, hi) => {
      const base = di < 5 ? 0.3 : 0.1;
      const peakH = di === 1 ? hi >= 14 && hi <= 16 ? 1 : 0 : 0;
      const morningH = hi >= 9 && hi <= 11 ? 0.5 : 0;
      const eveningH = hi >= 18 && hi <= 21 ? 0.6 : 0;
      return Math.min(
        1,
        base + peakH + morningH + eveningH + (di * 7 + hi) % 5 * 0.04
      );
    })
  );
  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", "data-ocid": "insights.heatmap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-1 pl-8", children: HOURS.filter((h) => h % 3 === 0).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-[8px] font-mono text-muted-foreground/40",
        style: { width: `${3 / 24 * (24 * 11)}px`, textAlign: "center" },
        children: [
          h,
          "h"
        ]
      },
      h
    )) }),
    DAYS.map((day, di) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/50 w-7 shrink-0 text-right", children: day }),
      HOURS.map((h) => {
        const val = data[di][h];
        const lightness = 0.18 + val * 0.52;
        const chroma = val * 0.18;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            title: `${day} ${h}:00 — intensity ${Math.round(val * 100)}%`,
            className: "rounded-[2px] w-2.5 h-2.5 shrink-0 transition-colors",
            style: {
              background: val < 0.05 ? "oklch(0.12 0 0)" : `oklch(${lightness} ${chroma} 200)`
            }
          },
          h
        );
      })
    ] }, day)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 ml-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/40", children: "Low" }),
      [0.1, 0.3, 0.5, 0.7, 0.9].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-2.5 h-2.5 rounded-[2px]",
          style: { background: `oklch(${0.18 + v * 0.52} ${v * 0.18} 200)` }
        },
        v
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/40", children: "High" })
    ] })
  ] });
}
function scoreScenario(text) {
  const len = text.length;
  const risk = Math.min(10, Math.max(1, Math.round(len % 9 + 2)));
  const feasibility = Math.min(10, Math.max(1, Math.round(10 - len % 7)));
  const viability = Math.round((10 - risk + feasibility) / 20 * 100);
  return { risk, feasibility, viability };
}
function DecisionEngine() {
  const [scenario, setScenario] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const evaluate = () => {
    if (!scenario.trim()) return;
    setResult(scoreScenario(scenario));
  };
  const radarData = result ? [
    { axis: "Risk Mgmt", value: 10 - result.risk },
    { axis: "Feasibility", value: result.feasibility },
    { axis: "Viability", value: result.viability / 10 },
    {
      axis: "Scalability",
      value: Math.round(7 + Math.sin(scenario.length) * 2)
    },
    { axis: "ROI", value: Math.round(6 + scenario.length % 4) }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-panel rounded-xl border border-primary/20 p-4",
      "data-ocid": "insights.decision_engine",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label text-primary/80", children: "Decision-Making Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: scenario,
              onChange: (e) => setScenario(e.target.value),
              placeholder: "Enter a scenario to evaluate...",
              className: "flex-1 bg-background/40 border border-border/40 rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 transition-smooth",
              "data-ocid": "insights.scenario_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: evaluate,
              disabled: !scenario.trim(),
              className: "px-3 py-2 rounded-lg btn-cyan text-xs font-mono disabled:opacity-40 shrink-0",
              "data-ocid": "insights.evaluate_button",
              children: "Evaluate"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: SCENARIO_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setScenario(p);
              setResult(scoreScenario(p));
            },
            className: "text-[10px] font-mono px-2 py-0.5 rounded-full border border-primary/30 text-primary/70 hover:bg-primary/10 hover:text-primary transition-colors",
            "data-ocid": `insights.preset_${p.toLowerCase().replace(/ /g, "_")}`,
            children: p
          },
          p
        )) }),
        result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "grid grid-cols-2 gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                {
                  label: "Risk Score",
                  value: result.risk,
                  max: 10,
                  color: "text-red-400",
                  barColor: "bg-red-400"
                },
                {
                  label: "Feasibility",
                  value: result.feasibility,
                  max: 10,
                  color: "text-emerald-400",
                  barColor: "bg-emerald-400"
                },
                {
                  label: "Overall Viability",
                  value: result.viability,
                  max: 100,
                  color: "text-primary",
                  barColor: "bg-primary"
                }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/70", children: s.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-display font-bold ${s.color}`, children: [
                    s.value,
                    s.label.includes("Viability") ? "%" : "/10"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `h-full rounded-full ${s.barColor}`,
                    animate: { width: `${s.value / s.max * 100}%` },
                    transition: { duration: 0.8 }
                  }
                ) })
              ] }, s.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: radarData, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "oklch(0.5 0 0 / 0.2)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PolarAngleAxis,
                  {
                    dataKey: "axis",
                    tick: {
                      fontSize: 9,
                      fill: "oklch(0.7 0 0 / 0.6)",
                      fontFamily: "JetBrainsMono,monospace"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Radar,
                  {
                    dataKey: "value",
                    stroke: "oklch(0.7 0.18 200)",
                    fill: "oklch(0.7 0.18 200 / 0.2)",
                    strokeWidth: 2
                  }
                )
              ] }) }) })
            ]
          }
        )
      ]
    }
  );
}
function InsightsDashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 p-5 space-y-5 overflow-auto",
      "data-ocid": "insights.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-9 h-9 rounded-xl border border-primary/40 flex items-center justify-center",
              style: { boxShadow: "0 0 12px oklch(0.7 0.18 200 / 0.4)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "font-display font-bold text-base text-foreground tracking-widest uppercase",
                style: { textShadow: "0 0 16px oklch(0.7 0.18 200 / 0.6)" },
                children: "Insights Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground/60", children: "Smart analytics · predictions · decision engine" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-4 gap-3",
            "data-ocid": "insights.kpi_row",
            children: KPI_CARDS.map((kpi, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.07 },
                className: `glass-panel rounded-xl p-4 border ${kpi.border} relative overflow-hidden`,
                style: { boxShadow: `0 0 12px ${kpi.glow}` },
                "data-ocid": `insights.kpi.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest", children: kpi.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Sparkline,
                      {
                        values: kpi.sparkline,
                        color: kpi.color.replace("text-", "")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-2xl font-display font-bold leading-none ${kpi.color}`,
                      children: kpi.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/50 mt-1 block", children: kpi.trend })
                ]
              },
              kpi.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.15 },
              className: "lg:col-span-2 glass-panel border border-primary/20 rounded-xl p-4",
              "data-ocid": "insights.forecast_chart",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary uppercase tracking-widest", children: "7-Day AI Forecast" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: FORECAST_DATA, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: "oklch(0.5 0 0 / 0.1)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "day",
                      tick: {
                        fontSize: 9,
                        fill: "oklch(0.6 0 0 / 0.6)",
                        fontFamily: "JetBrainsMono,monospace"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: {
                        fontSize: 9,
                        fill: "oklch(0.6 0 0 / 0.6)",
                        fontFamily: "JetBrainsMono,monospace"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        background: "oklch(0.08 0 0)",
                        border: "1px solid oklch(0.7 0.18 200 / 0.4)",
                        fontSize: 10,
                        fontFamily: "JetBrainsMono,monospace"
                      },
                      labelStyle: { color: "oklch(0.7 0.18 200)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Legend,
                    {
                      wrapperStyle: {
                        fontSize: 9,
                        fontFamily: "JetBrainsMono,monospace"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      type: "monotone",
                      dataKey: "performance",
                      stroke: "oklch(0.7 0.18 200)",
                      strokeWidth: 2,
                      dot: { r: 3, fill: "oklch(0.7 0.18 200)" },
                      name: "AI Performance"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      type: "monotone",
                      dataKey: "taskVolume",
                      stroke: "oklch(0.58 0.17 282)",
                      strokeWidth: 2,
                      dot: { r: 3, fill: "oklch(0.58 0.17 282)" },
                      name: "Task Volume"
                    }
                  )
                ] }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2 },
              className: "glass-panel border border-secondary/20 rounded-xl p-4",
              "data-ocid": "insights.data_insights",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-secondary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-secondary uppercase tracking-widest", children: "Data Insights" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: INSIGHT_BULLETS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.25 + i * 0.07 },
                    className: "flex items-start gap-2.5",
                    "data-ocid": `insights.insight.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm shrink-0", children: item.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground/80 leading-relaxed", children: item.text })
                    ]
                  },
                  item.text
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DecisionEngine, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "glass-panel border border-primary/15 rounded-xl p-4",
            "data-ocid": "insights.heatmap_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary uppercase tracking-widest", children: "Usage Heatmap — 7 Days × 24 Hours" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(UsageHeatmap, {})
            ]
          }
        )
      ]
    }
  );
}
export {
  InsightsDashboardPage
};
