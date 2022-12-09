function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e = m2[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k2 in e) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d = Object.getOwnPropertyDescriptor(e, k2);
          if (d) {
            Object.defineProperty(n2, k2, d.get ? d : {
              enumerable: true,
              get: () => e[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$4 = Symbol.for("react.element"), n$2 = Symbol.for("react.portal"), p$4 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t$2 = Symbol.for("react.provider"), u$2 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w$2 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$2(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = z$2 && a2[z$2] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$3 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$3(a2, b2, e) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e || B$3;
}
E$3.prototype.isReactComponent = {};
E$3.prototype.setState = function(a2, b2) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b2, "setState");
};
E$3.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$3.prototype;
function G$2(a2, b2, e) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e || B$3;
}
var H$3 = G$2.prototype = new F$1();
H$3.constructor = G$2;
C$2(H$3, E$3.prototype);
H$3.isPureReactComponent = true;
var I$3 = Array.isArray, J$2 = Object.prototype.hasOwnProperty, K$3 = { current: null }, L$3 = { key: true, ref: true, __self: true, __source: true };
function M$3(a2, b2, e) {
  var d, c2 = {}, k2 = null, h = null;
  if (null != b2)
    for (d in void 0 !== b2.ref && (h = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2)
      J$2.call(b2, d) && !L$3.hasOwnProperty(d) && (c2[d] = b2[d]);
  var g = arguments.length - 2;
  if (1 === g)
    c2.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps)
    for (d in g = a2.defaultProps, g)
      void 0 === c2[d] && (c2[d] = g[d]);
  return { $$typeof: l$4, type: a2, key: k2, ref: h, props: c2, _owner: K$3.current };
}
function N$3(a2, b2) {
  return { $$typeof: l$4, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$3(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$4;
}
function escape(a2) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b2[a3];
  });
}
var P$3 = /\/+/g;
function Q$3(a2, b2) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
}
function R$3(a2, b2, e, d, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2)
    a2 = null;
  var h = false;
  if (null === a2)
    h = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$4:
          case n$2:
            h = true;
        }
    }
  if (h)
    return h = a2, c2 = c2(h), a2 = "" === d ? "." + Q$3(h, 0) : d, I$3(c2) ? (e = "", null != a2 && (e = a2.replace(P$3, "$&/") + "/"), R$3(c2, b2, e, "", function(a3) {
      return a3;
    })) : null != c2 && (O$3(c2) && (c2 = N$3(c2, e + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P$3, "$&/") + "/") + a2)), b2.push(c2)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$3(a2))
    for (var g = 0; g < a2.length; g++) {
      k2 = a2[g];
      var f2 = d + Q$3(k2, g);
      h += R$3(k2, b2, e, f2, c2);
    }
  else if (f2 = A$2(a2), "function" === typeof f2)
    for (a2 = f2.call(a2), g = 0; !(k2 = a2.next()).done; )
      k2 = k2.value, f2 = d + Q$3(k2, g++), h += R$3(k2, b2, e, f2, c2);
  else if ("object" === k2)
    throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$3(a2, b2, e) {
  if (null == a2)
    return a2;
  var d = [], c2 = 0;
  R$3(a2, d, "", "", function(a3) {
    return b2.call(e, a3, c2++);
  });
  return d;
}
function T$3(a2) {
  if (-1 === a2._status) {
    var b2 = a2._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 1, a2._result = b3;
    }, function(b3) {
      if (0 === a2._status || -1 === a2._status)
        a2._status = 2, a2._result = b3;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b2);
  }
  if (1 === a2._status)
    return a2._result.default;
  throw a2._result;
}
var U$3 = { current: null }, V$3 = { transition: null }, W$3 = { ReactCurrentDispatcher: U$3, ReactCurrentBatchConfig: V$3, ReactCurrentOwner: K$3 };
react_production_min.Children = { map: S$3, forEach: function(a2, b2, e) {
  S$3(a2, function() {
    b2.apply(this, arguments);
  }, e);
}, count: function(a2) {
  var b2 = 0;
  S$3(a2, function() {
    b2++;
  });
  return b2;
}, toArray: function(a2) {
  return S$3(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$3(a2))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$3;
react_production_min.Fragment = p$4;
react_production_min.Profiler = r$1;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w$2;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$3;
react_production_min.cloneElement = function(a2, b2, e) {
  if (null === a2 || void 0 === a2)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h = a2._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h = K$3.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a2.type && a2.type.defaultProps)
      var g = a2.type.defaultProps;
    for (f2 in b2)
      J$2.call(b2, f2) && !L$3.hasOwnProperty(f2) && (d[f2] = void 0 === b2[f2] && void 0 !== g ? g[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$4, type: a2.type, key: c2, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$2, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$3;
react_production_min.createFactory = function(a2) {
  var b2 = M$3.bind(null, a2);
  b2.type = a2;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$2, render: a2 };
};
react_production_min.isValidElement = O$3;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T$3 };
};
react_production_min.memo = function(a2, b2) {
  return { $$typeof: x$2, type: a2, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a2) {
  var b2 = V$3.transition;
  V$3.transition = {};
  try {
    a2();
  } finally {
    V$3.transition = b2;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a2, b2) {
  return U$3.current.useCallback(a2, b2);
};
react_production_min.useContext = function(a2) {
  return U$3.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$3.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b2) {
  return U$3.current.useEffect(a2, b2);
};
react_production_min.useId = function() {
  return U$3.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b2, e) {
  return U$3.current.useImperativeHandle(a2, b2, e);
};
react_production_min.useInsertionEffect = function(a2, b2) {
  return U$3.current.useInsertionEffect(a2, b2);
};
react_production_min.useLayoutEffect = function(a2, b2) {
  return U$3.current.useLayoutEffect(a2, b2);
};
react_production_min.useMemo = function(a2, b2) {
  return U$3.current.useMemo(a2, b2);
};
react_production_min.useReducer = function(a2, b2, e) {
  return U$3.current.useReducer(a2, b2, e);
};
react_production_min.useRef = function(a2) {
  return U$3.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$3.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b2, e) {
  return U$3.current.useSyncExternalStore(a2, b2, e);
};
react_production_min.useTransition = function() {
  return U$3.current.useTransition();
};
react_production_min.version = "18.2.0";
(function(module) {
  {
    module.exports = react_production_min;
  }
})(react);
const React = /* @__PURE__ */ getDefaultExportFromCjs(react.exports);
const React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [react.exports]);
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a:
      for (; 0 < c2; ) {
        var d = c2 - 1 >>> 1, e = a2[d];
        if (0 < g(e, b2))
          a2[d] = b2, a2[c2] = e, c2 = d;
        else
          break a;
      }
  }
  function h(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length)
      return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a:
        for (var d = 0, e = a2.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g(C2, c2))
            n2 < e && 0 > g(x2, C2) ? (a2[d] = x2, a2[n2] = c2, d = n2) : (a2[d] = C2, a2[m2] = c2, d = m2);
          else if (n2 < e && 0 > g(x2, c2))
            a2[d] = x2, a2[n2] = c2, d = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b2 = h(t2); null !== b2; ) {
      if (null === b2.callback)
        k2(t2);
      else if (b2.startTime <= a2)
        k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else
        break;
      b2 = h(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2)
      if (null !== h(r2))
        A2 = true, I2(J2);
      else {
        var b2 = h(t2);
        null !== b2 && K2(H2, b2.startTime - a2);
      }
  }
  function J2(a2, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b2);
        } else
          k2(r2);
        v2 = h(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b2 = true;
      try {
        b2 = O2(true, a2);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b2) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d + c2 : d) : c2 = d;
    switch (a2) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c2 + e;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e, sortIndex: -1 };
    c2 > d ? (a2.sortIndex = c2, f2(t2, a2), null === h(r2) && a2 === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d))) : (a2.sortIndex = e, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
(function(module) {
  {
    module.exports = scheduler_production_min;
  }
})(scheduler);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa$2 = react.exports, ca$2 = scheduler.exports;
function p$3(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da$1 = /* @__PURE__ */ new Set(), ea$1 = {};
function fa$2(a2, b2) {
  ha$2(a2, b2);
  ha$2(a2 + "Capture", b2);
}
function ha$2(a2, b2) {
  ea$1[a2] = b2;
  for (a2 = 0; a2 < b2.length; a2++)
    da$1.add(b2[a2]);
}
var ia$2 = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja$2 = Object.prototype.hasOwnProperty, ka$2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la$2 = {}, ma$1 = {};
function oa$2(a2) {
  if (ja$2.call(ma$1, a2))
    return true;
  if (ja$2.call(la$2, a2))
    return false;
  if (ka$2.test(a2))
    return ma$1[a2] = true;
  la$2[a2] = true;
  return false;
}
function pa$2(a2, b2, c2, d) {
  if (null !== c2 && 0 === c2.type)
    return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (null !== c2)
        return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa$2(a2, b2, c2, d) {
  if (null === b2 || "undefined" === typeof b2 || pa$2(a2, b2, c2, d))
    return true;
  if (d)
    return false;
  if (null !== c2)
    switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return false === b2;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
  return false;
}
function v$1(a2, b2, c2, d, e, f2, g) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z$1[a2] = new v$1(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z$1[b2] = new v$1(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z$1[a2] = new v$1(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra$2 = /[\-:]([a-z])/g;
function sa$2(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ra$2,
    sa$2
  );
  z$1[b2] = new v$1(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ra$2, sa$2);
  z$1[b2] = new v$1(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ra$2, sa$2);
  z$1[b2] = new v$1(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z$1[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta$2(a2, b2, c2, d) {
  var e = z$1.hasOwnProperty(b2) ? z$1[b2] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
    qa$2(b2, c2, e, d) && (c2 = null), d || null === e ? oa$2(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e.mustUseProperty ? a2[e.propertyName] = null === c2 ? 3 === e.type ? false : "" : c2 : (b2 = e.attributeName, d = e.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e = e.type, c2 = 3 === e || 4 === e && true === c2 ? "" : "" + c2, d ? a2.setAttributeNS(d, b2, c2) : a2.setAttribute(b2, c2)));
}
var ua$2 = aa$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va$2 = Symbol.for("react.element"), wa$2 = Symbol.for("react.portal"), ya$2 = Symbol.for("react.fragment"), za$2 = Symbol.for("react.strict_mode"), Aa$2 = Symbol.for("react.profiler"), Ba$2 = Symbol.for("react.provider"), Ca$2 = Symbol.for("react.context"), Da$2 = Symbol.for("react.forward_ref"), Ea$2 = Symbol.for("react.suspense"), Fa$2 = Symbol.for("react.suspense_list"), Ga$2 = Symbol.for("react.memo"), Ha$2 = Symbol.for("react.lazy");
var Ia$2 = Symbol.for("react.offscreen");
var Ja$2 = Symbol.iterator;
function Ka$2(a2) {
  if (null === a2 || "object" !== typeof a2)
    return null;
  a2 = Ja$2 && a2[Ja$2] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A$1 = Object.assign, La$2;
function Ma$2(a2) {
  if (void 0 === La$2)
    try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      La$2 = b2 && b2[1] || "";
    }
  return "\n" + La$2 + a2;
}
var Na$2 = false;
function Oa$2(a2, b2) {
  if (!a2 || Na$2)
    return "";
  Na$2 = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2)
      if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a2, [], b2);
      } else {
        try {
          b2.call();
        } catch (l2) {
          d = l2;
        }
        a2.call(b2.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; )
        h--;
      for (; 1 <= g && 0 <= h; g--, h--)
        if (e[g] !== f2[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f2[h]) {
                var k2 = "\n" + e[g].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Na$2 = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma$2(a2) : "";
}
function Pa$2(a2) {
  switch (a2.tag) {
    case 5:
      return Ma$2(a2.type);
    case 16:
      return Ma$2("Lazy");
    case 13:
      return Ma$2("Suspense");
    case 19:
      return Ma$2("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa$2(a2.type, false), a2;
    case 11:
      return a2 = Oa$2(a2.type.render, false), a2;
    case 1:
      return a2 = Oa$2(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa$2(a2) {
  if (null == a2)
    return null;
  if ("function" === typeof a2)
    return a2.displayName || a2.name || null;
  if ("string" === typeof a2)
    return a2;
  switch (a2) {
    case ya$2:
      return "Fragment";
    case wa$2:
      return "Portal";
    case Aa$2:
      return "Profiler";
    case za$2:
      return "StrictMode";
    case Ea$2:
      return "Suspense";
    case Fa$2:
      return "SuspenseList";
  }
  if ("object" === typeof a2)
    switch (a2.$$typeof) {
      case Ca$2:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba$2:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da$2:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga$2:
        return b2 = a2.displayName || null, null !== b2 ? b2 : Qa$2(a2.type) || "Memo";
      case Ha$2:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Qa$2(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
function Ra$2(a2) {
  var b2 = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa$2(b2);
    case 8:
      return b2 === za$2 ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2)
        return b2.displayName || b2.name || null;
      if ("string" === typeof b2)
        return b2;
  }
  return null;
}
function Sa$2(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta$2(a2) {
  var b2 = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua$2(a2) {
  var b2 = Ta$2(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d = "" + a2[b2];
  if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b2, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a3) {
      d = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a3) {
      d = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b2];
    } };
  }
}
function Va$2(a2) {
  a2._valueTracker || (a2._valueTracker = Ua$2(a2));
}
function Wa$2(a2) {
  if (!a2)
    return false;
  var b2 = a2._valueTracker;
  if (!b2)
    return true;
  var c2 = b2.getValue();
  var d = "";
  a2 && (d = Ta$2(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d;
  return a2 !== c2 ? (b2.setValue(a2), true) : false;
}
function Xa$2(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2)
    return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b2) {
    return a2.body;
  }
}
function Ya$2(a2, b2) {
  var c2 = b2.checked;
  return A$1({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za$2(a2, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa$2(null != b2.value ? b2.value : c2);
  a2._wrapperState = { initialChecked: d, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab$2(a2, b2) {
  b2 = b2.checked;
  null != b2 && ta$2(a2, "checked", b2, false);
}
function bb$2(a2, b2) {
  ab$2(a2, b2);
  var c2 = Sa$2(b2.value), d = b2.type;
  if (null != c2)
    if ("number" === d) {
      if (0 === c2 && "" === a2.value || a2.value != c2)
        a2.value = "" + c2;
    } else
      a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d || "reset" === d) {
    a2.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb$3(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb$3(a2, b2.type, Sa$2(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
}
function db$2(a2, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d = b2.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b2.value && null !== b2.value))
      return;
    b2 = "" + a2._wrapperState.initialValue;
    c2 || b2 === a2.value || (a2.value = b2);
    a2.defaultValue = b2;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb$3(a2, b2, c2) {
  if ("number" !== b2 || Xa$2(a2.ownerDocument) !== a2)
    null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb$2 = Array.isArray;
function fb$2(a2, b2, c2, d) {
  a2 = a2.options;
  if (b2) {
    b2 = {};
    for (var e = 0; e < c2.length; e++)
      b2["$" + c2[e]] = true;
    for (c2 = 0; c2 < a2.length; c2++)
      e = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e && (a2[c2].selected = e), e && d && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa$2(c2);
    b2 = null;
    for (e = 0; e < a2.length; e++) {
      if (a2[e].value === c2) {
        a2[e].selected = true;
        d && (a2[e].defaultSelected = true);
        return;
      }
      null !== b2 || a2[e].disabled || (b2 = a2[e]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb$2(a2, b2) {
  if (null != b2.dangerouslySetInnerHTML)
    throw Error(p$3(91));
  return A$1({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb$2(a2, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2)
        throw Error(p$3(92));
      if (eb$2(c2)) {
        if (1 < c2.length)
          throw Error(p$3(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a2._wrapperState = { initialValue: Sa$2(c2) };
}
function ib$2(a2, b2) {
  var c2 = Sa$2(b2.value), d = Sa$2(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d && (a2.defaultValue = "" + d);
}
function jb$2(a2) {
  var b2 = a2.textContent;
  b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
}
function kb$2(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb$2(a2, b2) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb$2(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb$1, nb$1 = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b2, c2, d, e);
    });
  } : a2;
}(function(a2, b2) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2)
    a2.innerHTML = b2;
  else {
    mb$1 = mb$1 || document.createElement("div");
    mb$1.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb$1.firstChild; a2.firstChild; )
      a2.removeChild(a2.firstChild);
    for (; b2.firstChild; )
      a2.appendChild(b2.firstChild);
  }
});
function ob$2(a2, b2) {
  if (b2) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a2.textContent = b2;
}
var pb$2 = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb$2 = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb$2).forEach(function(a2) {
  qb$2.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb$2[b2] = pb$2[a2];
  });
});
function rb$2(a2, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb$2.hasOwnProperty(a2) && pb$2[a2] ? ("" + b2).trim() : b2 + "px";
}
function sb$2(a2, b2) {
  a2 = a2.style;
  for (var c2 in b2)
    if (b2.hasOwnProperty(c2)) {
      var d = 0 === c2.indexOf("--"), e = rb$2(c2, b2[c2], d);
      "float" === c2 && (c2 = "cssFloat");
      d ? a2.setProperty(c2, e) : a2[c2] = e;
    }
}
var tb$2 = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub$2(a2, b2) {
  if (b2) {
    if (tb$2[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
      throw Error(p$3(137, a2));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children)
        throw Error(p$3(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
        throw Error(p$3(61));
    }
    if (null != b2.style && "object" !== typeof b2.style)
      throw Error(p$3(62));
  }
}
function vb$2(a2, b2) {
  if (-1 === a2.indexOf("-"))
    return "string" === typeof b2.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb$2 = null;
function xb$2(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb$2 = null, zb$2 = null, Ab$2 = null;
function Bb$2(a2) {
  if (a2 = Cb$2(a2)) {
    if ("function" !== typeof yb$2)
      throw Error(p$3(280));
    var b2 = a2.stateNode;
    b2 && (b2 = Db$2(b2), yb$2(a2.stateNode, a2.type, b2));
  }
}
function Eb$2(a2) {
  zb$2 ? Ab$2 ? Ab$2.push(a2) : Ab$2 = [a2] : zb$2 = a2;
}
function Fb$1() {
  if (zb$2) {
    var a2 = zb$2, b2 = Ab$2;
    Ab$2 = zb$2 = null;
    Bb$2(a2);
    if (b2)
      for (a2 = 0; a2 < b2.length; a2++)
        Bb$2(b2[a2]);
  }
}
function Gb$2(a2, b2) {
  return a2(b2);
}
function Hb$2() {
}
var Ib$2 = false;
function Jb$2(a2, b2, c2) {
  if (Ib$2)
    return a2(b2, c2);
  Ib$2 = true;
  try {
    return Gb$2(a2, b2, c2);
  } finally {
    if (Ib$2 = false, null !== zb$2 || null !== Ab$2)
      Hb$2(), Fb$1();
  }
}
function Kb$2(a2, b2) {
  var c2 = a2.stateNode;
  if (null === c2)
    return null;
  var d = Db$2(c2);
  if (null === d)
    return null;
  c2 = d[b2];
  a:
    switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a2 = a2.type, d = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d;
        break a;
      default:
        a2 = false;
    }
  if (a2)
    return null;
  if (c2 && "function" !== typeof c2)
    throw Error(p$3(231, b2, typeof c2));
  return c2;
}
var Lb$2 = false;
if (ia$2)
  try {
    var Mb$2 = {};
    Object.defineProperty(Mb$2, "passive", { get: function() {
      Lb$2 = true;
    } });
    window.addEventListener("test", Mb$2, Mb$2);
    window.removeEventListener("test", Mb$2, Mb$2);
  } catch (a2) {
    Lb$2 = false;
  }
function Nb$2(a2, b2, c2, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob$2 = false, Pb$2 = null, Qb$2 = false, Rb$2 = null, Sb$2 = { onError: function(a2) {
  Ob$2 = true;
  Pb$2 = a2;
} };
function Tb$2(a2, b2, c2, d, e, f2, g, h, k2) {
  Ob$2 = false;
  Pb$2 = null;
  Nb$2.apply(Sb$2, arguments);
}
function Ub$1(a2, b2, c2, d, e, f2, g, h, k2) {
  Tb$2.apply(this, arguments);
  if (Ob$2) {
    if (Ob$2) {
      var l2 = Pb$2;
      Ob$2 = false;
      Pb$2 = null;
    } else
      throw Error(p$3(198));
    Qb$2 || (Qb$2 = true, Rb$2 = l2);
  }
}
function Vb$1(a2) {
  var b2 = a2, c2 = a2;
  if (a2.alternate)
    for (; b2.return; )
      b2 = b2.return;
  else {
    a2 = b2;
    do
      b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
    while (a2);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb$1(a2) {
  if (13 === a2.tag) {
    var b2 = a2.memoizedState;
    null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
    if (null !== b2)
      return b2.dehydrated;
  }
  return null;
}
function Xb$1(a2) {
  if (Vb$1(a2) !== a2)
    throw Error(p$3(188));
}
function Yb$1(a2) {
  var b2 = a2.alternate;
  if (!b2) {
    b2 = Vb$1(a2);
    if (null === b2)
      throw Error(p$3(188));
    return b2 !== a2 ? null : a2;
  }
  for (var c2 = a2, d = b2; ; ) {
    var e = c2.return;
    if (null === e)
      break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c2 = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c2)
          return Xb$1(e), a2;
        if (f2 === d)
          return Xb$1(e), b2;
        f2 = f2.sibling;
      }
      throw Error(p$3(188));
    }
    if (c2.return !== d.return)
      c2 = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c2) {
          g = true;
          c2 = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c2 = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c2) {
            g = true;
            c2 = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c2 = e;
            break;
          }
          h = h.sibling;
        }
        if (!g)
          throw Error(p$3(189));
      }
    }
    if (c2.alternate !== d)
      throw Error(p$3(190));
  }
  if (3 !== c2.tag)
    throw Error(p$3(188));
  return c2.stateNode.current === c2 ? a2 : b2;
}
function Zb$1(a2) {
  a2 = Yb$1(a2);
  return null !== a2 ? $b$1(a2) : null;
}
function $b$1(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b2 = $b$1(a2);
    if (null !== b2)
      return b2;
    a2 = a2.sibling;
  }
  return null;
}
var ac$1 = ca$2.unstable_scheduleCallback, bc$1 = ca$2.unstable_cancelCallback, cc$2 = ca$2.unstable_shouldYield, dc$1 = ca$2.unstable_requestPaint, B$2 = ca$2.unstable_now, ec$1 = ca$2.unstable_getCurrentPriorityLevel, fc$1 = ca$2.unstable_ImmediatePriority, gc$1 = ca$2.unstable_UserBlockingPriority, hc$1 = ca$2.unstable_NormalPriority, ic$1 = ca$2.unstable_LowPriority, jc$1 = ca$2.unstable_IdlePriority, kc$1 = null, lc$1 = null;
function mc$1(a2) {
  if (lc$1 && "function" === typeof lc$1.onCommitFiberRoot)
    try {
      lc$1.onCommitFiberRoot(kc$1, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b2) {
    }
}
var oc$1 = Math.clz32 ? Math.clz32 : nc$1, pc$1 = Math.log, qc$1 = Math.LN2;
function nc$1(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc$1(a2) / qc$1 | 0) | 0;
}
var rc$1 = 64, sc$1 = 4194304;
function tc$1(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc$1(a2, b2) {
  var c2 = a2.pendingLanes;
  if (0 === c2)
    return 0;
  var d = 0, e = a2.suspendedLanes, f2 = a2.pingedLanes, g = c2 & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc$1(h) : (f2 &= g, 0 !== f2 && (d = tc$1(f2)));
  } else
    g = c2 & ~e, 0 !== g ? d = tc$1(g) : 0 !== f2 && (d = tc$1(f2));
  if (0 === d)
    return 0;
  if (0 !== b2 && b2 !== d && 0 === (b2 & e) && (e = d & -d, f2 = b2 & -b2, e >= f2 || 16 === e && 0 !== (f2 & 4194240)))
    return b2;
  0 !== (d & 4) && (d |= c2 & 16);
  b2 = a2.entangledLanes;
  if (0 !== b2)
    for (a2 = a2.entanglements, b2 &= d; 0 < b2; )
      c2 = 31 - oc$1(b2), e = 1 << c2, d |= a2[c2], b2 &= ~e;
  return d;
}
function vc$1(a2, b2) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc$1(a2, b2) {
  for (var c2 = a2.suspendedLanes, d = a2.pingedLanes, e = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g = 31 - oc$1(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c2) || 0 !== (h & d))
        e[g] = vc$1(h, b2);
    } else
      k2 <= b2 && (a2.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc$1(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc$1() {
  var a2 = rc$1;
  rc$1 <<= 1;
  0 === (rc$1 & 4194240) && (rc$1 = 64);
  return a2;
}
function zc$1(a2) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++)
    b2.push(a2);
  return b2;
}
function Ac$1(a2, b2, c2) {
  a2.pendingLanes |= b2;
  536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b2 = 31 - oc$1(b2);
  a2[b2] = c2;
}
function Bc$1(a2, b2) {
  var c2 = a2.pendingLanes & ~b2;
  a2.pendingLanes = b2;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b2;
  a2.mutableReadLanes &= b2;
  a2.entangledLanes &= b2;
  b2 = a2.entanglements;
  var d = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e = 31 - oc$1(c2), f2 = 1 << e;
    b2[e] = 0;
    d[e] = -1;
    a2[e] = -1;
    c2 &= ~f2;
  }
}
function Cc$1(a2, b2) {
  var c2 = a2.entangledLanes |= b2;
  for (a2 = a2.entanglements; c2; ) {
    var d = 31 - oc$1(c2), e = 1 << d;
    e & b2 | a2[d] & b2 && (a2[d] |= b2);
    c2 &= ~e;
  }
}
var C$1 = 0;
function Dc$1(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec$1, Fc$1, Gc$1, Hc$1, Ic$1, Jc$1 = false, Kc$1 = [], Lc$1 = null, Mc$1 = null, Nc$1 = null, Oc$1 = /* @__PURE__ */ new Map(), Pc$1 = /* @__PURE__ */ new Map(), Qc$1 = [], Rc$1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc$1(a2, b2) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc$1 = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc$1 = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc$1 = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc$1.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc$1.delete(b2.pointerId);
  }
}
function Tc$1(a2, b2, c2, d, e, f2) {
  if (null === a2 || a2.nativeEvent !== f2)
    return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b2 && (b2 = Cb$2(b2), null !== b2 && Fc$1(b2)), a2;
  a2.eventSystemFlags |= d;
  b2 = a2.targetContainers;
  null !== e && -1 === b2.indexOf(e) && b2.push(e);
  return a2;
}
function Uc$1(a2, b2, c2, d, e) {
  switch (b2) {
    case "focusin":
      return Lc$1 = Tc$1(Lc$1, a2, b2, c2, d, e), true;
    case "dragenter":
      return Mc$1 = Tc$1(Mc$1, a2, b2, c2, d, e), true;
    case "mouseover":
      return Nc$1 = Tc$1(Nc$1, a2, b2, c2, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc$1.set(f2, Tc$1(Oc$1.get(f2) || null, a2, b2, c2, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc$1.set(f2, Tc$1(Pc$1.get(f2) || null, a2, b2, c2, d, e)), true;
  }
  return false;
}
function Vc$1(a2) {
  var b2 = Wc$1(a2.target);
  if (null !== b2) {
    var c2 = Vb$1(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb$1(c2), null !== b2) {
          a2.blockedOn = b2;
          Ic$1(a2.priority, function() {
            Gc$1(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc$1(a2) {
  if (null !== a2.blockedOn)
    return false;
  for (var b2 = a2.targetContainers; 0 < b2.length; ) {
    var c2 = Yc$1(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d = new c2.constructor(c2.type, c2);
      wb$2 = d;
      c2.target.dispatchEvent(d);
      wb$2 = null;
    } else
      return b2 = Cb$2(c2), null !== b2 && Fc$1(b2), a2.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc$1(a2, b2, c2) {
  Xc$1(a2) && c2.delete(b2);
}
function $c$1() {
  Jc$1 = false;
  null !== Lc$1 && Xc$1(Lc$1) && (Lc$1 = null);
  null !== Mc$1 && Xc$1(Mc$1) && (Mc$1 = null);
  null !== Nc$1 && Xc$1(Nc$1) && (Nc$1 = null);
  Oc$1.forEach(Zc$1);
  Pc$1.forEach(Zc$1);
}
function ad$1(a2, b2) {
  a2.blockedOn === b2 && (a2.blockedOn = null, Jc$1 || (Jc$1 = true, ca$2.unstable_scheduleCallback(ca$2.unstable_NormalPriority, $c$1)));
}
function bd$1(a2) {
  function b2(b3) {
    return ad$1(b3, a2);
  }
  if (0 < Kc$1.length) {
    ad$1(Kc$1[0], a2);
    for (var c2 = 1; c2 < Kc$1.length; c2++) {
      var d = Kc$1[c2];
      d.blockedOn === a2 && (d.blockedOn = null);
    }
  }
  null !== Lc$1 && ad$1(Lc$1, a2);
  null !== Mc$1 && ad$1(Mc$1, a2);
  null !== Nc$1 && ad$1(Nc$1, a2);
  Oc$1.forEach(b2);
  Pc$1.forEach(b2);
  for (c2 = 0; c2 < Qc$1.length; c2++)
    d = Qc$1[c2], d.blockedOn === a2 && (d.blockedOn = null);
  for (; 0 < Qc$1.length && (c2 = Qc$1[0], null === c2.blockedOn); )
    Vc$1(c2), null === c2.blockedOn && Qc$1.shift();
}
var cd$1 = ua$2.ReactCurrentBatchConfig, dd$1 = true;
function ed$1(a2, b2, c2, d) {
  var e = C$1, f2 = cd$1.transition;
  cd$1.transition = null;
  try {
    C$1 = 1, fd$1(a2, b2, c2, d);
  } finally {
    C$1 = e, cd$1.transition = f2;
  }
}
function gd$1(a2, b2, c2, d) {
  var e = C$1, f2 = cd$1.transition;
  cd$1.transition = null;
  try {
    C$1 = 4, fd$1(a2, b2, c2, d);
  } finally {
    C$1 = e, cd$1.transition = f2;
  }
}
function fd$1(a2, b2, c2, d) {
  if (dd$1) {
    var e = Yc$1(a2, b2, c2, d);
    if (null === e)
      hd$1(a2, b2, d, id$3, c2), Sc$1(a2, d);
    else if (Uc$1(e, a2, b2, c2, d))
      d.stopPropagation();
    else if (Sc$1(a2, d), b2 & 4 && -1 < Rc$1.indexOf(a2)) {
      for (; null !== e; ) {
        var f2 = Cb$2(e);
        null !== f2 && Ec$1(f2);
        f2 = Yc$1(a2, b2, c2, d);
        null === f2 && hd$1(a2, b2, d, id$3, c2);
        if (f2 === e)
          break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else
      hd$1(a2, b2, d, null, c2);
  }
}
var id$3 = null;
function Yc$1(a2, b2, c2, d) {
  id$3 = null;
  a2 = xb$2(d);
  a2 = Wc$1(a2);
  if (null !== a2)
    if (b2 = Vb$1(a2), null === b2)
      a2 = null;
    else if (c2 = b2.tag, 13 === c2) {
      a2 = Wb$1(b2);
      if (null !== a2)
        return a2;
      a2 = null;
    } else if (3 === c2) {
      if (b2.stateNode.current.memoizedState.isDehydrated)
        return 3 === b2.tag ? b2.stateNode.containerInfo : null;
      a2 = null;
    } else
      b2 !== a2 && (a2 = null);
  id$3 = a2;
  return null;
}
function jd$1(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec$1()) {
        case fc$1:
          return 1;
        case gc$1:
          return 4;
        case hc$1:
        case ic$1:
          return 16;
        case jc$1:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd$1 = null, ld$1 = null, md = null;
function nd() {
  if (md)
    return md;
  var a2, b2 = ld$1, c2 = b2.length, d, e = "value" in kd$1 ? kd$1.value : kd$1.textContent, f2 = e.length;
  for (a2 = 0; a2 < c2 && b2[a2] === e[a2]; a2++)
    ;
  var g = c2 - a2;
  for (d = 1; d <= g && b2[c2 - d] === e[f2 - d]; d++)
    ;
  return md = e.slice(a2, 1 < d ? 1 - d : void 0);
}
function od(a2) {
  var b2 = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b2(b3, d, e, f2, g) {
    this._reactName = b3;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c2 in a2)
      a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2)
    return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a2) {
  if (a2.key) {
    var b2 = Md[a2.key] || a2.key;
    if ("Unidentified" !== b2)
      return b2;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia$2 && "CompositionEvent" in window, be = null;
ia$2 && "documentMode" in document && (be = document.documentMode);
var ce = ia$2 && "TextEvent" in window && !be, de = ia$2 && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a2, b2) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b2) {
  switch (a2) {
    case "compositionend":
      return he(b2);
    case "keypress":
      if (32 !== b2.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b2.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b2) {
  if (ie)
    return "compositionend" === a2 || !ae && ge(a2, b2) ? (a2 = nd(), md = ld$1 = kd$1 = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length)
          return b2.char;
        if (b2.which)
          return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b2 ? !!le[a2.type] : "textarea" === b2 ? true : false;
}
function ne(a2, b2, c2, d) {
  Eb$2(d);
  b2 = oe(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({ event: c2, listeners: b2 }));
}
var pe = null, qe = null;
function re(a2) {
  se(a2, 0);
}
function te(a2) {
  var b2 = ue(a2);
  if (Wa$2(b2))
    return a2;
}
function ve(a2, b2) {
  if ("change" === a2)
    return b2;
}
var we = false;
if (ia$2) {
  var xe;
  if (ia$2) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b2 = [];
    ne(b2, qe, a2, xb$2(a2));
    Jb$2(re, b2);
  }
}
function Ce(a2, b2, c2) {
  "focusin" === a2 ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
}
function De(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2)
    return te(qe);
}
function Ee(a2, b2) {
  if ("click" === a2)
    return te(b2);
}
function Fe(a2, b2) {
  if ("input" === a2 || "change" === a2)
    return te(b2);
}
function Ge(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a2, b2) {
  if (He(a2, b2))
    return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2)
    return false;
  var c2 = Object.keys(a2), d = Object.keys(b2);
  if (c2.length !== d.length)
    return false;
  for (d = 0; d < c2.length; d++) {
    var e = c2[d];
    if (!ja$2.call(b2, e) || !He(a2[e], b2[e]))
      return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; )
    a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b2) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d; c2; ) {
    if (3 === c2.nodeType) {
      d = a2 + c2.textContent.length;
      if (a2 <= b2 && d >= b2)
        return { node: c2, offset: b2 - a2 };
      a2 = d;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b2) {
  return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b2 = Xa$2(); b2 instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d) {
      c2 = false;
    }
    if (c2)
      a2 = b2.contentWindow;
    else
      break;
    b2 = Xa$2(a2.document);
  }
  return b2;
}
function Ne(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b2 = Me(), c2 = a2.focusedElem, d = a2.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d && Ne(c2)) {
      if (b2 = d.start, a2 = d.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2)
        c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e = c2.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a2.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c2, f2);
        var g = Ke(
          c2,
          d
        );
        e && g && (1 !== a2.rangeCount || a2.anchorNode !== e.node || a2.anchorOffset !== e.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b2 = b2.createRange(), b2.setStart(e.node, e.offset), a2.removeAllRanges(), f2 > d ? (a2.addRange(b2), a2.extend(g.node, g.offset)) : (b2.setEnd(g.node, g.offset), a2.addRange(b2)));
      }
    }
    b2 = [];
    for (a2 = c2; a2 = a2.parentNode; )
      1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++)
      a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia$2 && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a2, b2, c2) {
  var d = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe || Qe !== Xa$2(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d }), b2.target = Qe)));
}
function Ve(a2, b2) {
  var c2 = {};
  c2[a2.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b2;
  c2["Moz" + a2] = "moz" + b2;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia$2 && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2])
    return Xe[a2];
  if (!We[a2])
    return a2;
  var b2 = We[a2], c2;
  for (c2 in b2)
    if (b2.hasOwnProperty(c2) && c2 in Ye)
      return Xe[a2] = b2[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b2) {
  df.set(a2, b2);
  fa$2(b2, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha$2("onMouseEnter", ["mouseout", "mouseover"]);
ha$2("onMouseLeave", ["mouseout", "mouseover"]);
ha$2("onPointerEnter", ["pointerout", "pointerover"]);
ha$2("onPointerLeave", ["pointerout", "pointerover"]);
fa$2("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa$2("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa$2("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa$2("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa$2("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa$2("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b2, c2) {
  var d = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub$1(d, b2, void 0, a2);
  a2.currentTarget = null;
}
function se(a2, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d = a2[c2], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b2)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k2;
        }
      else
        for (g = 0; g < d.length; g++) {
          h = d[g];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k2;
        }
    }
  }
  if (Qb$2)
    throw a2 = Rb$2, Qb$2 = false, Rb$2 = null, a2;
}
function D$1(a2, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d = a2 + "__bubble";
  c2.has(d) || (pf(b2, a2, 2, false), c2.add(d));
}
function qf(a2, b2, c2) {
  var d = 0;
  b2 && (d |= 4);
  pf(c2, a2, d, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da$1.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
    });
    var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a2, b2, c2, d) {
  switch (jd$1(b2)) {
    case 1:
      var e = ed$1;
      break;
    case 4:
      e = gd$1;
      break;
    default:
      e = fd$1;
  }
  c2 = e.bind(null, b2, c2, a2);
  e = void 0;
  !Lb$2 || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e = true);
  d ? void 0 !== e ? a2.addEventListener(b2, c2, { capture: true, passive: e }) : a2.addEventListener(b2, c2, true) : void 0 !== e ? a2.addEventListener(b2, c2, { passive: e }) : a2.addEventListener(b2, c2, false);
}
function hd$1(a2, b2, c2, d, e) {
  var f2 = d;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d)
    a:
      for (; ; ) {
        if (null === d)
          return;
        var g = d.tag;
        if (3 === g || 4 === g) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e)
            break;
          if (4 === g)
            for (g = d.return; null !== g; ) {
              var k2 = g.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e)
                  return;
              }
              g = g.return;
            }
          for (; null !== h; ) {
            g = Wc$1(h);
            if (null === g)
              return;
            k2 = g.tag;
            if (5 === k2 || 6 === k2) {
              d = f2 = g;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Jb$2(function() {
    var d2 = f2, e2 = xb$2(c2), g2 = [];
    a: {
      var h2 = df.get(a2);
      if (void 0 !== h2) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2))
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb$2(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c2, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h2 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h2 && c2 !== wb$2 && (n2 = c2.relatedTarget || c2.fromElement) && (Wc$1(n2) || n2[uf]))
          break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d2, n2 = n2 ? Wc$1(n2) : null, null !== n2 && (J2 = Vb$1(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2)
              t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c2, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc$1(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c2, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2)
              b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate)
                    break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
            else
              t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type)
          var na2 = ve;
        else if (me(h2))
          if (we)
            na2 = Fe;
          else {
            na2 = De;
            var xa2 = Ce;
          }
        else
          (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na2 = Ee);
        if (na2 && (na2 = na2(a2, d2))) {
          ne(g2, na2, c2, e2);
          break a;
        }
        xa2 && xa2(a2, h2, d2);
        "focusout" === a2 && (xa2 = h2._wrapperState) && xa2.controlled && "number" === h2.type && cb$3(h2, "number", h2.value);
      }
      xa2 = d2 ? ue(d2) : window;
      switch (a2) {
        case "focusin":
          if (me(xa2) || "true" === xa2.contentEditable)
            Qe = xa2, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c2, e2);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g2, c2, e2);
      }
      var $a2;
      if (ae)
        b: {
          switch (a2) {
            case "compositionstart":
              var ba2 = "onCompositionStart";
              break b;
            case "compositionend":
              ba2 = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba2 = "onCompositionUpdate";
              break b;
          }
          ba2 = void 0;
        }
      else
        ie ? ge(a2, c2) && (ba2 = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba2 = "onCompositionStart");
      ba2 && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba2 ? "onCompositionEnd" === ba2 && ie && ($a2 = nd()) : (kd$1 = e2, ld$1 = "value" in kd$1 ? kd$1.value : kd$1.textContent, ie = true)), xa2 = oe(d2, ba2), 0 < xa2.length && (ba2 = new Ld(ba2, a2, null, c2, e2), g2.push({ event: ba2, listeners: xa2 }), $a2 ? ba2.data = $a2 : ($a2 = he(c2), null !== $a2 && (ba2.data = $a2))));
      if ($a2 = ce ? je(a2, c2) : ke(a2, c2))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a2);
    }
    se(g2, b2);
  });
}
function tf(a2, b2, c2) {
  return { instance: a2, listener: b2, currentTarget: c2 };
}
function oe(a2, b2) {
  for (var c2 = b2 + "Capture", d = []; null !== a2; ) {
    var e = a2, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb$2(a2, c2), null != f2 && d.unshift(tf(a2, f2, e)), f2 = Kb$2(a2, b2), null != f2 && d.push(tf(a2, f2, e)));
    a2 = a2.return;
  }
  return d;
}
function vf(a2) {
  if (null === a2)
    return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b2, c2, d, e) {
  for (var f2 = b2._reactName, g = []; null !== c2 && c2 !== d; ) {
    var h = c2, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d)
      break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb$2(c2, f2), null != k2 && g.unshift(tf(c2, k2, h))) : e || (k2 = Kb$2(c2, f2), null != k2 && g.push(tf(c2, k2, h))));
    c2 = c2.return;
  }
  0 !== g.length && a2.push({ event: b2, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b2, c2) {
  b2 = zf(b2);
  if (zf(a2) !== b2 && c2)
    throw Error(p$3(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b2) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b2) {
  var c2 = b2, d = 0;
  do {
    var e = c2.nextSibling;
    a2.removeChild(c2);
    if (e && 8 === e.nodeType)
      if (c2 = e.data, "/$" === c2) {
        if (0 === d) {
          a2.removeChild(e);
          bd$1(b2);
          return;
        }
        d--;
      } else
        "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d++;
    c2 = e;
  } while (c2);
  bd$1(b2);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b2 = a2.nodeType;
    if (1 === b2 || 3 === b2)
      break;
    if (8 === b2) {
      b2 = a2.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2)
        break;
      if ("/$" === b2)
        return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b2 = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2)
          return a2;
        b2--;
      } else
        "/$" === c2 && b2++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc$1(a2) {
  var b2 = a2[Of];
  if (b2)
    return b2;
  for (var c2 = a2.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child)
        for (a2 = Mf(a2); null !== a2; ) {
          if (c2 = a2[Of])
            return c2;
          a2 = Mf(a2);
        }
      return b2;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb$2(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag)
    return a2.stateNode;
  throw Error(p$3(33));
}
function Db$2(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$2(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a2, b2) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b2;
}
var Vf = {}, H$2 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b2) {
  var c2 = a2.type.contextTypes;
  if (!c2)
    return Vf;
  var d = a2.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b2)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c2)
    e[f2] = b2[f2];
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E$2(Wf);
  E$2(H$2);
}
function ag(a2, b2, c2) {
  if (H$2.current !== Vf)
    throw Error(p$3(168));
  G$1(H$2, b2);
  G$1(Wf, c2);
}
function bg(a2, b2, c2) {
  var d = a2.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d.getChildContext)
    return c2;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in b2))
      throw Error(p$3(108, Ra$2(a2) || "Unknown", e));
  return A$1({}, c2, d);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$2.current;
  G$1(H$2, a2);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a2, b2, c2) {
  var d = a2.stateNode;
  if (!d)
    throw Error(p$3(169));
  c2 ? (a2 = bg(a2, b2, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E$2(Wf), E$2(H$2), G$1(H$2, a2)) : E$2(Wf);
  G$1(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b2 = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a2 < c2.length; a2++) {
        var d = c2[a2];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac$1(fc$1, jg), e;
    } finally {
      C$1 = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b2;
}
function ug(a2, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d = rg;
  a2 = sg;
  var e = 32 - oc$1(d) - 1;
  d &= ~(1 << e);
  c2 += 1;
  var f2 = 32 - oc$1(b2) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc$1(b2) + e | c2 << e | d;
    sg = f2 + a2;
  } else
    rg = 1 << f2 | c2 << e | d, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$2 = false, zg = null;
function Ag(a2, b2) {
  var c2 = Bg$1(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a2;
  b2 = a2.deletions;
  null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
}
function Cg(a2, b2) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg$1(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I$2) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a2, b2)) {
        if (Dg(a2))
          throw Error(p$3(418));
        b2 = Lf(c2.nextSibling);
        var d = xg;
        b2 && Cg(a2, b2) ? Ag(d, c2) : (a2.flags = a2.flags & -4097 | 2, I$2 = false, xg = a2);
      }
    } else {
      if (Dg(a2))
        throw Error(p$3(418));
      a2.flags = a2.flags & -4097 | 2;
      I$2 = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; )
    a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg)
    return false;
  if (!I$2)
    return Fg(a2), I$2 = true, false;
  var b2;
  (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a2))
      throw Hg(), Error(p$3(418));
    for (; b2; )
      Ag(a2, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2)
      throw Error(p$3(317));
    a: {
      a2 = a2.nextSibling;
      for (b2 = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b2--;
          } else
            "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; )
    a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$2 = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua$2.ReactCurrentBatchConfig;
function Lg(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = A$1({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a2) {
  var b2 = Mg.current;
  E$2(Mg);
  a2._currentValue = b2;
}
function Sg(a2, b2, c2) {
  for (; null !== a2; ) {
    var d = a2.alternate;
    (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d && (d.childLanes |= b2)) : null !== d && (d.childLanes & b2) !== b2 && (d.childLanes |= b2);
    if (a2 === c2)
      break;
    a2 = a2.return;
  }
}
function Tg(a2, b2) {
  Ng = a2;
  Pg = Og = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (Ug = true), a2.firstContext = null);
}
function Vg(a2) {
  var b2 = a2._currentValue;
  if (Pg !== a2)
    if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Og) {
      if (null === Ng)
        throw Error(p$3(308));
      Og = a2;
      Ng.dependencies = { lanes: 0, firstContext: a2 };
    } else
      Og = Og.next = a2;
  return b2;
}
var Wg = null;
function Xg(a2) {
  null === Wg ? Wg = [a2] : Wg.push(a2);
}
function Yg(a2, b2, c2, d) {
  var e = b2.interleaved;
  null === e ? (c2.next = c2, Xg(b2)) : (c2.next = e.next, e.next = c2);
  b2.interleaved = c2;
  return Zg(a2, d);
}
function Zg(a2, b2) {
  a2.lanes |= b2;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a2;
  for (a2 = a2.return; null !== a2; )
    a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var $g = false;
function ah(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a2, b2) {
  a2 = a2.updateQueue;
  b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function ch(a2, b2) {
  return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function dh(a2, b2, c2) {
  var d = a2.updateQueue;
  if (null === d)
    return null;
  d = d.shared;
  if (0 !== (K$2 & 2)) {
    var e = d.pending;
    null === e ? b2.next = b2 : (b2.next = e.next, e.next = b2);
    d.pending = b2;
    return Zg(a2, c2);
  }
  e = d.interleaved;
  null === e ? (b2.next = b2, Xg(d)) : (b2.next = e.next, e.next = b2);
  d.interleaved = b2;
  return Zg(a2, c2);
}
function eh(a2, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d = b2.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b2.lanes = c2;
    Cc$1(a2, c2);
  }
}
function fh(a2, b2) {
  var c2 = a2.updateQueue, d = a2.alternate;
  if (null !== d && (d = d.updateQueue, c2 === d)) {
    var e = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e = f2 = b2 : f2 = f2.next = b2;
    } else
      e = f2 = b2;
    c2 = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
  c2.lastBaseUpdate = b2;
}
function gh(a2, b2, c2, d) {
  var e = a2.updateQueue;
  $g = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h;
          r2 = b2;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2)
                break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              $g = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h)
        if (h = e.shared.pending, null === h)
          break;
        else
          r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b2 = e.shared.interleaved;
    if (null !== b2) {
      e = b2;
      do
        g |= e.lane, e = e.next;
      while (e !== b2);
    } else
      null === f2 && (e.shared.lanes = 0);
    hh |= g;
    a2.lanes = g;
    a2.memoizedState = q2;
  }
}
function ih(a2, b2, c2) {
  a2 = b2.effects;
  b2.effects = null;
  if (null !== a2)
    for (b2 = 0; b2 < a2.length; b2++) {
      var d = a2[b2], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c2;
        if ("function" !== typeof e)
          throw Error(p$3(191, e));
        e.call(d);
      }
    }
}
var jh = new aa$2.Component().refs;
function kh(a2, b2, c2, d) {
  b2 = a2.memoizedState;
  c2 = c2(d, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$1({}, b2, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var nh = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb$1(a2) === a2 : false;
}, enqueueSetState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d = L$2(), e = lh(a2), f2 = ch(d, e);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a2, f2, e);
  null !== b2 && (mh(b2, a2, e, d), eh(b2, a2, e));
}, enqueueReplaceState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d = L$2(), e = lh(a2), f2 = ch(d, e);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a2, f2, e);
  null !== b2 && (mh(b2, a2, e, d), eh(b2, a2, e));
}, enqueueForceUpdate: function(a2, b2) {
  a2 = a2._reactInternals;
  var c2 = L$2(), d = lh(a2), e = ch(c2, d);
  e.tag = 2;
  void 0 !== b2 && null !== b2 && (e.callback = b2);
  b2 = dh(a2, e, d);
  null !== b2 && (mh(b2, a2, d, c2), eh(b2, a2, d));
} };
function oh(a2, b2, c2, d, e, f2, g) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d, f2, g) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d) || !Ie(e, f2) : true;
}
function ph(a2, b2, c2) {
  var d = false, e = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = Vg(f2) : (e = Zf(b2) ? Xf : H$2.current, d = b2.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a2, e) : Vf);
  b2 = new b2(c2, f2);
  a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = nh;
  a2.stateNode = b2;
  b2._reactInternals = a2;
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function qh(a2, b2, c2, d) {
  a2 = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d);
  b2.state !== a2 && nh.enqueueReplaceState(b2, b2.state, null);
}
function rh(a2, b2, c2, d) {
  var e = a2.stateNode;
  e.props = c2;
  e.state = a2.memoizedState;
  e.refs = jh;
  ah(a2);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = Vg(f2) : (f2 = Zf(b2) ? Xf : H$2.current, e.context = Yf(a2, f2));
  e.state = a2.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (kh(a2, b2, f2, c2), e.state = a2.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b2 = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b2 !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a2, c2, e, d), e.state = a2.memoizedState);
  "function" === typeof e.componentDidMount && (a2.flags |= 4194308);
}
function sh(a2, b2, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag)
          throw Error(p$3(309));
        var d = c2.stateNode;
      }
      if (!d)
        throw Error(p$3(147, a2));
      var e = d, f2 = "" + a2;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2)
        return b2.ref;
      b2 = function(a3) {
        var b3 = e.refs;
        b3 === jh && (b3 = e.refs = {});
        null === a3 ? delete b3[f2] : b3[f2] = a3;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a2)
      throw Error(p$3(284));
    if (!c2._owner)
      throw Error(p$3(290, a2));
  }
  return a2;
}
function th(a2, b2) {
  a2 = Object.prototype.toString.call(b2);
  throw Error(p$3(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
}
function uh(a2) {
  var b2 = a2._init;
  return b2(a2._payload);
}
function vh$1(a2) {
  function b2(b3, c3) {
    if (a2) {
      var d2 = b3.deletions;
      null === d2 ? (b3.deletions = [c3], b3.flags |= 16) : d2.push(c3);
    }
  }
  function c2(c3, d2) {
    if (!a2)
      return null;
    for (; null !== d2; )
      b2(c3, d2), d2 = d2.sibling;
    return null;
  }
  function d(a3, b3) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b3; )
      null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
    return a3;
  }
  function e(a3, b3) {
    a3 = wh(a3, b3);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b3, c3, d2) {
    b3.index = d2;
    if (!a2)
      return b3.flags |= 1048576, c3;
    d2 = b3.alternate;
    if (null !== d2)
      return d2 = d2.index, d2 < c3 ? (b3.flags |= 2, c3) : d2;
    b3.flags |= 2;
    return c3;
  }
  function g(b3) {
    a2 && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h(a3, b3, c3, d2) {
    if (null === b3 || 6 !== b3.tag)
      return b3 = xh(c3, a3.mode, d2), b3.return = a3, b3;
    b3 = e(b3, c3);
    b3.return = a3;
    return b3;
  }
  function k2(a3, b3, c3, d2) {
    var f3 = c3.type;
    if (f3 === ya$2)
      return m2(a3, b3, c3.props.children, d2, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha$2 && uh(f3) === b3.type))
      return d2 = e(b3, c3.props), d2.ref = sh(a3, b3, c3), d2.return = a3, d2;
    d2 = yh(c3.type, c3.key, c3.props, null, a3.mode, d2);
    d2.ref = sh(a3, b3, c3);
    d2.return = a3;
    return d2;
  }
  function l2(a3, b3, c3, d2) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
      return b3 = zh(c3, a3.mode, d2), b3.return = a3, b3;
    b3 = e(b3, c3.children || []);
    b3.return = a3;
    return b3;
  }
  function m2(a3, b3, c3, d2, f3) {
    if (null === b3 || 7 !== b3.tag)
      return b3 = Ah(c3, a3.mode, d2, f3), b3.return = a3, b3;
    b3 = e(b3, c3);
    b3.return = a3;
    return b3;
  }
  function q2(a3, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
      return b3 = xh("" + b3, a3.mode, c3), b3.return = a3, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va$2:
          return c3 = yh(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = sh(a3, null, b3), c3.return = a3, c3;
        case wa$2:
          return b3 = zh(b3, a3.mode, c3), b3.return = a3, b3;
        case Ha$2:
          var d2 = b3._init;
          return q2(a3, d2(b3._payload), c3);
      }
      if (eb$2(b3) || Ka$2(b3))
        return b3 = Ah(b3, a3.mode, c3, null), b3.return = a3, b3;
      th(a3, b3);
    }
    return null;
  }
  function r2(a3, b3, c3, d2) {
    var e2 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
      return null !== e2 ? null : h(a3, b3, "" + c3, d2);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va$2:
          return c3.key === e2 ? k2(a3, b3, c3, d2) : null;
        case wa$2:
          return c3.key === e2 ? l2(a3, b3, c3, d2) : null;
        case Ha$2:
          return e2 = c3._init, r2(
            a3,
            b3,
            e2(c3._payload),
            d2
          );
      }
      if (eb$2(c3) || Ka$2(c3))
        return null !== e2 ? null : m2(a3, b3, c3, d2, null);
      th(a3, c3);
    }
    return null;
  }
  function y2(a3, b3, c3, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
      return a3 = a3.get(c3) || null, h(b3, a3, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va$2:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, k2(b3, a3, d2, e2);
        case wa$2:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, l2(b3, a3, d2, e2);
        case Ha$2:
          var f3 = d2._init;
          return y2(a3, b3, c3, f3(d2._payload), e2);
      }
      if (eb$2(d2) || Ka$2(d2))
        return a3 = a3.get(c3) || null, m2(b3, a3, d2, e2, null);
      th(b3, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b2(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length)
      return c2(e2, u2), I$2 && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++)
        u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$2 && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++)
      x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b2(e2, a3);
    });
    I$2 && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka$2(h2);
    if ("function" !== typeof l3)
      throw Error(p$3(150));
    h2 = l3.call(h2);
    if (null == h2)
      throw Error(p$3(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t3.alternate && b2(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done)
      return c2(
        e2,
        m3
      ), I$2 && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next())
        n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$2 && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next())
      n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b2(e2, a3);
    });
    I$2 && tg(e2, w2);
    return l3;
  }
  function J2(a3, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya$2 && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va$2:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya$2) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a3;
                    a3 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha$2 && uh(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = sh(a3, l3, f3);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                }
                c2(a3, l3);
                break;
              } else
                b2(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya$2 ? (d2 = Ah(f3.props.children, a3.mode, h2, f3.key), d2.return = a3, a3 = d2) : (h2 = yh(f3.type, f3.key, f3.props, null, a3.mode, h2), h2.ref = sh(a3, d2, f3), h2.return = a3, a3 = h2);
          }
          return g(a3);
        case wa$2:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3)
                if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c2(a3, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                } else {
                  c2(a3, d2);
                  break;
                }
              else
                b2(a3, d2);
              d2 = d2.sibling;
            }
            d2 = zh(f3, a3.mode, h2);
            d2.return = a3;
            a3 = d2;
          }
          return g(a3);
        case Ha$2:
          return l3 = f3._init, J2(a3, d2, l3(f3._payload), h2);
      }
      if (eb$2(f3))
        return n2(a3, d2, f3, h2);
      if (Ka$2(f3))
        return t2(a3, d2, f3, h2);
      th(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c2(a3, d2.sibling), d2 = e(d2, f3), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = xh(f3, a3.mode, h2), d2.return = a3, a3 = d2), g(a3)) : c2(a3, d2);
  }
  return J2;
}
var Bh = vh$1(true), Ch = vh$1(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a2) {
  if (a2 === Dh)
    throw Error(p$3(174));
  return a2;
}
function Ih(a2, b2) {
  G$1(Gh, b2);
  G$1(Fh, a2);
  G$1(Eh, Dh);
  a2 = b2.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb$2(null, "");
      break;
    default:
      a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb$2(b2, a2);
  }
  E$2(Eh);
  G$1(Eh, b2);
}
function Jh() {
  E$2(Eh);
  E$2(Fh);
  E$2(Gh);
}
function Kh(a2) {
  Hh(Gh.current);
  var b2 = Hh(Eh.current);
  var c2 = lb$2(b2, a2.type);
  b2 !== c2 && (G$1(Fh, a2), G$1(Eh, c2));
}
function Lh(a2) {
  Fh.current === a2 && (E$2(Eh), E$2(Fh));
}
var M$2 = Uf(0);
function Mh(a2) {
  for (var b2 = a2; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
        return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128))
        return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a2)
      break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a2)
        return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a2 = 0; a2 < Nh.length; a2++)
    Nh[a2]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua$2.ReactCurrentDispatcher, Qh = ua$2.ReactCurrentBatchConfig, Rh = 0, N$2 = null, O$2 = null, P$2 = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q$2() {
  throw Error(p$3(321));
}
function Wh(a2, b2) {
  if (null === b2)
    return false;
  for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
    if (!He(a2[c2], b2[c2]))
      return false;
  return true;
}
function Xh(a2, b2, c2, d, e, f2) {
  Rh = f2;
  N$2 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Ph.current = null === a2 || null === a2.memoizedState ? Yh : Zh;
  a2 = c2(d, e);
  if (Th) {
    f2 = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f2)
        throw Error(p$3(301));
      f2 += 1;
      P$2 = O$2 = null;
      b2.updateQueue = null;
      Ph.current = $h;
      a2 = c2(d, e);
    } while (Th);
  }
  Ph.current = ai;
  b2 = null !== O$2 && null !== O$2.next;
  Rh = 0;
  P$2 = O$2 = N$2 = null;
  Sh = false;
  if (b2)
    throw Error(p$3(300));
  return a2;
}
function bi() {
  var a2 = 0 !== Uh;
  Uh = 0;
  return a2;
}
function ci() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === P$2 ? N$2.memoizedState = P$2 = a2 : P$2 = P$2.next = a2;
  return P$2;
}
function di() {
  if (null === O$2) {
    var a2 = N$2.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else
    a2 = O$2.next;
  var b2 = null === P$2 ? N$2.memoizedState : P$2.next;
  if (null !== b2)
    P$2 = b2, O$2 = a2;
  else {
    if (null === a2)
      throw Error(p$3(310));
    O$2 = a2;
    a2 = { memoizedState: O$2.memoizedState, baseState: O$2.baseState, baseQueue: O$2.baseQueue, queue: O$2.queue, next: null };
    null === P$2 ? N$2.memoizedState = P$2 = a2 : P$2 = P$2.next = a2;
  }
  return P$2;
}
function ei(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function fi(a2) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$3(311));
  c2.lastRenderedReducer = a2;
  var d = O$2, e = d.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c2.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Rh & m2) === m2)
        null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a2(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        N$2.lanes |= m2;
        hh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b2.memoizedState) || (Ug = true);
    b2.memoizedState = d;
    b2.baseState = g;
    b2.baseQueue = k2;
    c2.lastRenderedState = d;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e = a2;
    do
      f2 = e.lane, N$2.lanes |= f2, hh |= f2, e = e.next;
    while (e !== a2);
  } else
    null === e && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function gi(a2) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$3(311));
  c2.lastRenderedReducer = a2;
  var d = c2.dispatch, e = c2.pending, f2 = b2.memoizedState;
  if (null !== e) {
    c2.pending = null;
    var g = e = e.next;
    do
      f2 = a2(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b2.memoizedState) || (Ug = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d];
}
function hi() {
}
function ii(a2, b2) {
  var c2 = N$2, d = di(), e = b2(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, Ug = true);
  d = d.queue;
  ji(ki.bind(null, c2, d, a2), [a2]);
  if (d.getSnapshot !== b2 || f2 || null !== P$2 && P$2.memoizedState.tag & 1) {
    c2.flags |= 2048;
    li(9, mi.bind(null, c2, d, e, b2), void 0, null);
    if (null === R$2)
      throw Error(p$3(349));
    0 !== (Rh & 30) || ni(c2, b2, e);
  }
  return e;
}
function ni(a2, b2, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b2, value: c2 };
  b2 = N$2.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N$2.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
}
function mi(a2, b2, c2, d) {
  b2.value = c2;
  b2.getSnapshot = d;
  oi(b2) && pi(a2);
}
function ki(a2, b2, c2) {
  return c2(function() {
    oi(b2) && pi(a2);
  });
}
function oi(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b2();
    return !He(a2, c2);
  } catch (d) {
    return true;
  }
}
function pi(a2) {
  var b2 = Zg(a2, 1);
  null !== b2 && mh(b2, a2, 1, -1);
}
function qi(a2) {
  var b2 = ci();
  "function" === typeof a2 && (a2 = a2());
  b2.memoizedState = b2.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a2 };
  b2.queue = a2;
  a2 = a2.dispatch = ri.bind(null, N$2, a2);
  return [b2.memoizedState, a2];
}
function li(a2, b2, c2, d) {
  a2 = { tag: a2, create: b2, destroy: c2, deps: d, next: null };
  b2 = N$2.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N$2.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b2.lastEffect = a2));
  return a2;
}
function si() {
  return di().memoizedState;
}
function ti(a2, b2, c2, d) {
  var e = ci();
  N$2.flags |= a2;
  e.memoizedState = li(1 | b2, c2, void 0, void 0 === d ? null : d);
}
function ui(a2, b2, c2, d) {
  var e = di();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== O$2) {
    var g = O$2.memoizedState;
    f2 = g.destroy;
    if (null !== d && Wh(d, g.deps)) {
      e.memoizedState = li(b2, c2, f2, d);
      return;
    }
  }
  N$2.flags |= a2;
  e.memoizedState = li(1 | b2, c2, f2, d);
}
function vi(a2, b2) {
  return ti(8390656, 8, a2, b2);
}
function ji(a2, b2) {
  return ui(2048, 8, a2, b2);
}
function wi(a2, b2) {
  return ui(4, 2, a2, b2);
}
function xi(a2, b2) {
  return ui(4, 4, a2, b2);
}
function yi(a2, b2) {
  if ("function" === typeof b2)
    return a2 = a2(), b2(a2), function() {
      b2(null);
    };
  if (null !== b2 && void 0 !== b2)
    return a2 = a2(), b2.current = a2, function() {
      b2.current = null;
    };
}
function zi(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ui(4, 4, yi.bind(null, b2, a2), c2);
}
function Ai() {
}
function Bi(a2, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d = c2.memoizedState;
  if (null !== d && null !== b2 && Wh(b2, d[1]))
    return d[0];
  c2.memoizedState = [a2, b2];
  return a2;
}
function Ci(a2, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d = c2.memoizedState;
  if (null !== d && null !== b2 && Wh(b2, d[1]))
    return d[0];
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}
function Di(a2, b2, c2) {
  if (0 === (Rh & 21))
    return a2.baseState && (a2.baseState = false, Ug = true), a2.memoizedState = c2;
  He(c2, b2) || (c2 = yc$1(), N$2.lanes |= c2, hh |= c2, a2.baseState = true);
  return b2;
}
function Ei(a2, b2) {
  var c2 = C$1;
  C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a2(false), b2();
  } finally {
    C$1 = c2, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a2, b2, c2) {
  var d = lh(a2);
  c2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b2, c2);
  else if (c2 = Yg(a2, b2, c2, d), null !== c2) {
    var e = L$2();
    mh(c2, a2, d, e);
    Ji(c2, b2, d);
  }
}
function ri(a2, b2, c2) {
  var d = lh(a2), e = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b2, e);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2))
      try {
        var g = b2.lastRenderedState, h = f2(g, c2);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k2 = b2.interleaved;
          null === k2 ? (e.next = e, Xg(b2)) : (e.next = k2.next, k2.next = e);
          b2.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c2 = Yg(a2, b2, e, d);
    null !== c2 && (e = L$2(), mh(c2, a2, d, e), Ji(c2, b2, d));
  }
}
function Hi(a2) {
  var b2 = a2.alternate;
  return a2 === N$2 || null !== b2 && b2 === N$2;
}
function Ii(a2, b2) {
  Th = Sh = true;
  var c2 = a2.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a2.pending = b2;
}
function Ji(a2, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d = b2.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b2.lanes = c2;
    Cc$1(a2, c2);
  }
}
var ai = { readContext: Vg, useCallback: Q$2, useContext: Q$2, useEffect: Q$2, useImperativeHandle: Q$2, useInsertionEffect: Q$2, useLayoutEffect: Q$2, useMemo: Q$2, useReducer: Q$2, useRef: Q$2, useState: Q$2, useDebugValue: Q$2, useDeferredValue: Q$2, useTransition: Q$2, useMutableSource: Q$2, useSyncExternalStore: Q$2, useId: Q$2, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a2, b2) {
  ci().memoizedState = [a2, void 0 === b2 ? null : b2];
  return a2;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a2, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ti(
    4194308,
    4,
    yi.bind(null, b2, a2),
    c2
  );
}, useLayoutEffect: function(a2, b2) {
  return ti(4194308, 4, a2, b2);
}, useInsertionEffect: function(a2, b2) {
  return ti(4, 2, a2, b2);
}, useMemo: function(a2, b2) {
  var c2 = ci();
  b2 = void 0 === b2 ? null : b2;
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}, useReducer: function(a2, b2, c2) {
  var d = ci();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d.memoizedState = d.baseState = b2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
  d.queue = a2;
  a2 = a2.dispatch = Gi.bind(null, N$2, a2);
  return [d.memoizedState, a2];
}, useRef: function(a2) {
  var b2 = ci();
  a2 = { current: a2 };
  return b2.memoizedState = a2;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a2) {
  return ci().memoizedState = a2;
}, useTransition: function() {
  var a2 = qi(false), b2 = a2[0];
  a2 = Ei.bind(null, a2[1]);
  ci().memoizedState = a2;
  return [b2, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b2, c2) {
  var d = N$2, e = ci();
  if (I$2) {
    if (void 0 === c2)
      throw Error(p$3(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === R$2)
      throw Error(p$3(349));
    0 !== (Rh & 30) || ni(d, b2, c2);
  }
  e.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e.queue = f2;
  vi(ki.bind(
    null,
    d,
    f2,
    a2
  ), [a2]);
  d.flags |= 2048;
  li(9, mi.bind(null, d, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a2 = ci(), b2 = R$2.identifierPrefix;
  if (I$2) {
    var c2 = sg;
    var d = rg;
    c2 = (d & ~(1 << 32 - oc$1(d) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Uh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else
    c2 = Vh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b2;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a2) {
    var b2 = di();
    return Di(b2, O$2.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = fi(ei)[0], b2 = di().memoizedState;
    return [a2, b2];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a2) {
  var b2 = di();
  return null === O$2 ? b2.memoizedState = a2 : Di(b2, O$2.memoizedState, a2);
}, useTransition: function() {
  var a2 = gi(ei)[0], b2 = di().memoizedState;
  return [a2, b2];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a2, b2) {
  try {
    var c2 = "", d = b2;
    do
      c2 += Pa$2(d), d = d.return;
    while (d);
    var e = c2;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b2, stack: e, digest: null };
}
function Li(a2, b2, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Mi(a2, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a2, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d = b2.value;
  c2.callback = function() {
    Pi || (Pi = true, Qi = d);
    Mi(a2, b2);
  };
  return c2;
}
function Ri(a2, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  var d = a2.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b2.value;
    c2.payload = function() {
      return d(e);
    };
    c2.callback = function() {
      Mi(a2, b2);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Mi(a2, b2);
    "function" !== typeof d && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Ti(a2, b2, c2) {
  var d = a2.pingCache;
  if (null === d) {
    d = a2.pingCache = new Ni();
    var e = /* @__PURE__ */ new Set();
    d.set(b2, e);
  } else
    e = d.get(b2), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b2, e));
  e.has(c2) || (e.add(c2), a2 = Ui.bind(null, a2, b2, c2), b2.then(a2, a2));
}
function Vi(a2) {
  do {
    var b2;
    if (b2 = 13 === a2.tag)
      b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2)
      return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Wi(a2, b2, c2, d, e) {
  if (0 === (a2.mode & 1))
    return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = ch(-1, 1), b2.tag = 2, dh(c2, b2, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e;
  return a2;
}
var Xi = ua$2.ReactCurrentOwner, Ug = false;
function Yi(a2, b2, c2, d) {
  b2.child = null === a2 ? Ch(b2, null, c2, d) : Bh(b2, a2.child, c2, d);
}
function Zi(a2, b2, c2, d, e) {
  c2 = c2.render;
  var f2 = b2.ref;
  Tg(b2, e);
  d = Xh(a2, b2, c2, d, f2, e);
  c2 = bi();
  if (null !== a2 && !Ug)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e, $i(a2, b2, e);
  I$2 && c2 && vg(b2);
  b2.flags |= 1;
  Yi(a2, b2, d, e);
  return b2.child;
}
function aj(a2, b2, c2, d, e) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !bj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
      return b2.tag = 15, b2.type = f2, cj(a2, b2, f2, d, e);
    a2 = yh(c2.type, null, d, b2, b2.mode, e);
    a2.ref = b2.ref;
    a2.return = b2;
    return b2.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e)) {
    var g = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g, d) && a2.ref === b2.ref)
      return $i(a2, b2, e);
  }
  b2.flags |= 1;
  a2 = wh(f2, d);
  a2.ref = b2.ref;
  a2.return = b2;
  return b2.child = a2;
}
function cj(a2, b2, c2, d, e) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d) && a2.ref === b2.ref)
      if (Ug = false, b2.pendingProps = d = f2, 0 !== (a2.lanes & e))
        0 !== (a2.flags & 131072) && (Ug = true);
      else
        return b2.lanes = a2.lanes, $i(a2, b2, e);
  }
  return dj(a2, b2, c2, d, e);
}
function ej(a2, b2, c2) {
  var d = b2.pendingProps, e = d.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d.mode)
    if (0 === (b2.mode & 1))
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(fj, gj), gj |= c2;
    else {
      if (0 === (c2 & 1073741824))
        return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G$1(fj, gj), gj |= a2, null;
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c2;
      G$1(fj, gj);
      gj |= d;
    }
  else
    null !== f2 ? (d = f2.baseLanes | c2, b2.memoizedState = null) : d = c2, G$1(fj, gj), gj |= d;
  Yi(a2, b2, e, c2);
  return b2.child;
}
function hj(a2, b2) {
  var c2 = b2.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2)
    b2.flags |= 512, b2.flags |= 2097152;
}
function dj(a2, b2, c2, d, e) {
  var f2 = Zf(c2) ? Xf : H$2.current;
  f2 = Yf(b2, f2);
  Tg(b2, e);
  c2 = Xh(a2, b2, c2, d, f2, e);
  d = bi();
  if (null !== a2 && !Ug)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e, $i(a2, b2, e);
  I$2 && d && vg(b2);
  b2.flags |= 1;
  Yi(a2, b2, c2, e);
  return b2.child;
}
function ij(a2, b2, c2, d, e) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else
    f2 = false;
  Tg(b2, e);
  if (null === b2.stateNode)
    jj(a2, b2), ph(b2, c2, d), rh(b2, c2, d, e), d = true;
  else if (null === a2) {
    var g = b2.stateNode, h = b2.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = Vg(l2) : (l2 = Zf(c2) ? Xf : H$2.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && qh(b2, g, d, l2);
    $g = false;
    var r2 = b2.memoizedState;
    g.state = r2;
    gh(b2, d, g, e);
    k2 = b2.memoizedState;
    h !== d || r2 !== k2 || Wf.current || $g ? ("function" === typeof m2 && (kh(b2, c2, m2, d), k2 = b2.memoizedState), (h = $g || oh(b2, c2, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d, b2.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b2.flags |= 4194308), d = false);
  } else {
    g = b2.stateNode;
    bh(a2, b2);
    h = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h : Lg(b2.type, h);
    g.props = l2;
    q2 = b2.pendingProps;
    r2 = g.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = Vg(k2) : (k2 = Zf(c2) ? Xf : H$2.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && qh(b2, g, d, k2);
    $g = false;
    r2 = b2.memoizedState;
    g.state = r2;
    gh(b2, d, g, e);
    var n2 = b2.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || $g ? ("function" === typeof y2 && (kh(b2, c2, y2, d), n2 = b2.memoizedState), (l2 = $g || oh(b2, c2, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b2.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d, b2.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b2.flags |= 1024), d = false);
  }
  return kj(a2, b2, c2, d, f2, e);
}
function kj(a2, b2, c2, d, e, f2) {
  hj(a2, b2);
  var g = 0 !== (b2.flags & 128);
  if (!d && !g)
    return e && dg(b2, c2, false), $i(a2, b2, f2);
  d = b2.stateNode;
  Xi.current = b2;
  var h = g && "function" !== typeof c2.getDerivedStateFromError ? null : d.render();
  b2.flags |= 1;
  null !== a2 && g ? (b2.child = Bh(b2, a2.child, null, f2), b2.child = Bh(b2, null, h, f2)) : Yi(a2, b2, h, f2);
  b2.memoizedState = d.state;
  e && dg(b2, c2, true);
  return b2.child;
}
function lj(a2) {
  var b2 = a2.stateNode;
  b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
  Ih(a2, b2.containerInfo);
}
function mj(a2, b2, c2, d, e) {
  Ig();
  Jg(e);
  b2.flags |= 256;
  Yi(a2, b2, c2, d);
  return b2.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function pj(a2, b2, c2) {
  var d = b2.pendingProps, e = M$2.current, f2 = false, g = 0 !== (b2.flags & 128), h;
  (h = g) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e & 2));
  if (h)
    f2 = true, b2.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState)
    e |= 1;
  G$1(M$2, e & 1);
  if (null === a2) {
    Eg(b2);
    a2 = b2.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2))
      return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g = d.children;
    a2 = d.fallback;
    return f2 ? (d = b2.mode, f2 = b2.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = qj(g, d, 0, null), a2 = Ah(a2, d, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = oj(c2), b2.memoizedState = nj, a2) : rj(b2, g);
  }
  e = a2.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h))
    return sj(a2, b2, g, d, h, e, c2);
  if (f2) {
    f2 = d.fallback;
    g = b2.mode;
    e = a2.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b2.child !== e ? (d = b2.child, d.childLanes = 0, d.pendingProps = k2, b2.deletions = null) : (d = wh(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = wh(h, f2) : (f2 = Ah(f2, g, c2, null), f2.flags |= 2);
    f2.return = b2;
    d.return = b2;
    d.sibling = f2;
    b2.child = d;
    d = f2;
    f2 = b2.child;
    g = a2.child.memoizedState;
    g = null === g ? oj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a2.childLanes & ~c2;
    b2.memoizedState = nj;
    return d;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d = wh(f2, { mode: "visible", children: d.children });
  0 === (b2.mode & 1) && (d.lanes = c2);
  d.return = b2;
  d.sibling = null;
  null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
  b2.child = d;
  b2.memoizedState = null;
  return d;
}
function rj(a2, b2) {
  b2 = qj({ mode: "visible", children: b2 }, a2.mode, 0, null);
  b2.return = a2;
  return a2.child = b2;
}
function tj(a2, b2, c2, d) {
  null !== d && Jg(d);
  Bh(b2, a2.child, null, c2);
  a2 = rj(b2, b2.pendingProps.children);
  a2.flags |= 2;
  b2.memoizedState = null;
  return a2;
}
function sj(a2, b2, c2, d, e, f2, g) {
  if (c2) {
    if (b2.flags & 256)
      return b2.flags &= -257, d = Li(Error(p$3(422))), tj(a2, b2, g, d);
    if (null !== b2.memoizedState)
      return b2.child = a2.child, b2.flags |= 128, null;
    f2 = d.fallback;
    e = b2.mode;
    d = qj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Ah(f2, e, g, null);
    f2.flags |= 2;
    d.return = b2;
    f2.return = b2;
    d.sibling = f2;
    b2.child = d;
    0 !== (b2.mode & 1) && Bh(b2, a2.child, null, g);
    b2.child.memoizedState = oj(g);
    b2.memoizedState = nj;
    return f2;
  }
  if (0 === (b2.mode & 1))
    return tj(a2, b2, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d)
      var h = d.dgst;
    d = h;
    f2 = Error(p$3(419));
    d = Li(f2, d, void 0);
    return tj(a2, b2, g, d);
  }
  h = 0 !== (g & a2.childLanes);
  if (Ug || h) {
    d = R$2;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, Zg(a2, e), mh(d, a2, e, -1));
    }
    uj();
    d = Li(Error(p$3(421)));
    return tj(a2, b2, g, d);
  }
  if ("$?" === e.data)
    return b2.flags |= 128, b2.child = a2.child, b2 = vj.bind(null, a2), e._reactRetry = b2, null;
  a2 = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b2;
  I$2 = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
  b2 = rj(b2, d.children);
  b2.flags |= 4096;
  return b2;
}
function wj(a2, b2, c2) {
  a2.lanes |= b2;
  var d = a2.alternate;
  null !== d && (d.lanes |= b2);
  Sg(a2.return, b2, c2);
}
function xj(a2, b2, c2, d, e) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c2, f2.tailMode = e);
}
function yj(a2, b2, c2) {
  var d = b2.pendingProps, e = d.revealOrder, f2 = d.tail;
  Yi(a2, b2, d.children, c2);
  d = M$2.current;
  if (0 !== (d & 2))
    d = d & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128))
      a:
        for (a2 = b2.child; null !== a2; ) {
          if (13 === a2.tag)
            null !== a2.memoizedState && wj(a2, c2, b2);
          else if (19 === a2.tag)
            wj(a2, c2, b2);
          else if (null !== a2.child) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b2)
            break a;
          for (; null === a2.sibling; ) {
            if (null === a2.return || a2.return === b2)
              break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
    d &= 1;
  }
  G$1(M$2, d);
  if (0 === (b2.mode & 1))
    b2.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c2 = b2.child;
        for (e = null; null !== c2; )
          a2 = c2.alternate, null !== a2 && null === Mh(a2) && (e = c2), c2 = c2.sibling;
        c2 = e;
        null === c2 ? (e = b2.child, b2.child = null) : (e = c2.sibling, c2.sibling = null);
        xj(b2, false, e, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e = b2.child;
        for (b2.child = null; null !== e; ) {
          a2 = e.alternate;
          if (null !== a2 && null === Mh(a2)) {
            b2.child = e;
            break;
          }
          a2 = e.sibling;
          e.sibling = c2;
          c2 = e;
          e = a2;
        }
        xj(b2, true, c2, null, f2);
        break;
      case "together":
        xj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
  return b2.child;
}
function jj(a2, b2) {
  0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function $i(a2, b2, c2) {
  null !== a2 && (b2.dependencies = a2.dependencies);
  hh |= b2.lanes;
  if (0 === (c2 & b2.childLanes))
    return null;
  if (null !== a2 && b2.child !== a2.child)
    throw Error(p$3(153));
  if (null !== b2.child) {
    a2 = b2.child;
    c2 = wh(a2, a2.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a2.sibling; )
      a2 = a2.sibling, c2 = c2.sibling = wh(a2, a2.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function zj(a2, b2, c2) {
  switch (b2.tag) {
    case 3:
      lj(b2);
      Ig();
      break;
    case 5:
      Kh(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      Ih(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d = b2.type._context, e = b2.memoizedProps.value;
      G$1(Mg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b2.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated)
          return G$1(M$2, M$2.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes))
          return pj(a2, b2, c2);
        G$1(M$2, M$2.current & 1);
        a2 = $i(a2, b2, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G$1(M$2, M$2.current & 1);
      break;
    case 19:
      d = 0 !== (c2 & b2.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d)
          return yj(a2, b2, c2);
        b2.flags |= 128;
      }
      e = b2.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G$1(M$2, M$2.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b2.lanes = 0, ej(a2, b2, c2);
  }
  return $i(a2, b2, c2);
}
var Aj, Bj, Cj, Dj;
Aj = function(a2, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag)
      a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2)
      break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Bj = function() {
};
Cj = function(a2, b2, c2, d) {
  var e = a2.memoizedProps;
  if (e !== d) {
    a2 = b2.stateNode;
    Hh(Eh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e = Ya$2(a2, e);
        d = Ya$2(a2, d);
        f2 = [];
        break;
      case "select":
        e = A$1({}, e, { value: void 0 });
        d = A$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb$2(a2, e);
        d = gb$2(a2, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a2.onclick = Bf);
    }
    ub$2(c2, d);
    var g;
    c2 = null;
    for (l2 in e)
      if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2])
        if ("style" === l2) {
          var h = e[l2];
          for (g in h)
            h.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea$1.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h))
        if ("style" === l2)
          if (h) {
            for (g in h)
              !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
            for (g in k2)
              k2.hasOwnProperty(g) && h[g] !== k2[g] && (c2 || (c2 = {}), c2[g] = k2[g]);
          } else
            c2 || (f2 || (f2 = []), f2.push(
              l2,
              c2
            )), c2 = k2;
        else
          "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea$1.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2)
      b2.flags |= 4;
  }
};
Dj = function(a2, b2, c2, d) {
  c2 !== d && (b2.flags |= 4);
};
function Ej(a2, b2) {
  if (!I$2)
    switch (a2.tailMode) {
      case "hidden":
        b2 = a2.tail;
        for (var c2 = null; null !== b2; )
          null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
        null === c2 ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d = null; null !== c2; )
          null !== c2.alternate && (d = c2), c2 = c2.sibling;
        null === d ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
    }
}
function S$2(a2) {
  var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d = 0;
  if (b2)
    for (var e = a2.child; null !== e; )
      c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a2, e = e.sibling;
  else
    for (e = a2.child; null !== e; )
      c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a2, e = e.sibling;
  a2.subtreeFlags |= d;
  a2.childLanes = c2;
  return b2;
}
function Fj(a2, b2, c2) {
  var d = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$2(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S$2(b2), null;
    case 3:
      d = b2.stateNode;
      Jh();
      E$2(Wf);
      E$2(H$2);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a2 || null === a2.child)
        Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a2, b2);
      S$2(b2);
      return null;
    case 5:
      Lh(b2);
      var e = Hh(Gh.current);
      c2 = b2.type;
      if (null !== a2 && null != b2.stateNode)
        Cj(a2, b2, c2, d, e), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d) {
          if (null === b2.stateNode)
            throw Error(p$3(166));
          S$2(b2);
          return null;
        }
        a2 = Hh(Eh.current);
        if (Gg(b2)) {
          d = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d[Of] = b2;
          d[Pf] = f2;
          a2 = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d);
              D$1("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++)
                D$1(lf[e], d);
              break;
            case "source":
              D$1("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d
              );
              D$1("load", d);
              break;
            case "details":
              D$1("toggle", d);
              break;
            case "input":
              Za$2(d, f2);
              D$1("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d);
              break;
            case "textarea":
              hb$2(d, f2), D$1("invalid", d);
          }
          ub$2(c2, f2);
          e = null;
          for (var g in f2)
            if (f2.hasOwnProperty(g)) {
              var h = f2[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a2), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a2
              ), e = ["children", "" + h]) : ea$1.hasOwnProperty(g) && null != h && "onScroll" === g && D$1("scroll", d);
            }
          switch (c2) {
            case "input":
              Va$2(d);
              db$2(d, f2, true);
              break;
            case "textarea":
              Va$2(d);
              jb$2(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b2.updateQueue = d;
          null !== d && (b2.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb$2(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d.is ? a2 = g.createElement(c2, { is: d.is }) : (a2 = g.createElement(c2), "select" === c2 && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
          a2[Of] = b2;
          a2[Pf] = d;
          Aj(a2, b2, false, false);
          b2.stateNode = a2;
          a: {
            g = vb$2(c2, d);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++)
                  D$1(lf[e], a2);
                e = d;
                break;
              case "source":
                D$1("error", a2);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e = d;
                break;
              case "details":
                D$1("toggle", a2);
                e = d;
                break;
              case "input":
                Za$2(a2, d);
                e = Ya$2(a2, d);
                D$1("invalid", a2);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d.multiple };
                e = A$1({}, d, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb$2(a2, d);
                e = gb$2(a2, d);
                D$1("invalid", a2);
                break;
              default:
                e = d;
            }
            ub$2(c2, e);
            h = e;
            for (f2 in h)
              if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                "style" === f2 ? sb$2(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb$1(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob$2(a2, k2) : "number" === typeof k2 && ob$2(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea$1.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta$2(a2, f2, k2, g));
              }
            switch (c2) {
              case "input":
                Va$2(a2);
                db$2(a2, d, false);
                break;
              case "textarea":
                Va$2(a2);
                jb$2(a2);
                break;
              case "option":
                null != d.value && a2.setAttribute("value", "" + Sa$2(d.value));
                break;
              case "select":
                a2.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb$2(a2, !!d.multiple, f2, false) : null != d.defaultValue && fb$2(
                  a2,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S$2(b2);
      return null;
    case 6:
      if (a2 && null != b2.stateNode)
        Dj(a2, b2, a2.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b2.stateNode)
          throw Error(p$3(166));
        c2 = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b2)) {
          d = b2.stateNode;
          c2 = b2.memoizedProps;
          d[Of] = b2;
          if (f2 = d.nodeValue !== c2) {
            if (a2 = xg, null !== a2)
              switch (a2.tag) {
                case 3:
                  Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
              }
          }
          f2 && (b2.flags |= 4);
        } else
          d = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d), d[Of] = b2, b2.stateNode = d;
      }
      S$2(b2);
      return null;
    case 13:
      E$2(M$2);
      d = b2.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I$2 && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128))
          Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d && null !== d.dehydrated) {
          if (null === a2) {
            if (!f2)
              throw Error(p$3(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$3(317));
            f2[Of] = b2;
          } else
            Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S$2(b2);
          f2 = false;
        } else
          null !== zg && (Gj(zg), zg = null), f2 = true;
        if (!f2)
          return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128))
        return b2.lanes = c2, b2;
      d = null !== d;
      d !== (null !== a2 && null !== a2.memoizedState) && d && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (M$2.current & 1) ? 0 === T$2 && (T$2 = 3) : uj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S$2(b2);
      return null;
    case 4:
      return Jh(), Bj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S$2(b2), null;
    case 10:
      return Rg(b2.type._context), S$2(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S$2(b2), null;
    case 19:
      E$2(M$2);
      f2 = b2.memoizedState;
      if (null === f2)
        return S$2(b2), null;
      d = 0 !== (b2.flags & 128);
      g = f2.rendering;
      if (null === g)
        if (d)
          Ej(f2, false);
        else {
          if (0 !== T$2 || null !== a2 && 0 !== (a2.flags & 128))
            for (a2 = b2.child; null !== a2; ) {
              g = Mh(a2);
              if (null !== g) {
                b2.flags |= 128;
                Ej(f2, false);
                d = g.updateQueue;
                null !== d && (b2.updateQueue = d, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d = c2;
                for (c2 = b2.child; null !== c2; )
                  f2 = c2, a2 = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                G$1(M$2, M$2.current & 1 | 2);
                return b2.child;
              }
              a2 = a2.sibling;
            }
          null !== f2.tail && B$2() > Hj && (b2.flags |= 128, d = true, Ej(f2, false), b2.lanes = 4194304);
        }
      else {
        if (!d)
          if (a2 = Mh(g), null !== a2) {
            if (b2.flags |= 128, d = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Ej(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I$2)
              return S$2(b2), null;
          } else
            2 * B$2() - f2.renderingStartTime > Hj && 1073741824 !== c2 && (b2.flags |= 128, d = true, Ej(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b2.child, b2.child = g) : (c2 = f2.last, null !== c2 ? c2.sibling = g : b2.child = g, f2.last = g);
      }
      if (null !== f2.tail)
        return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B$2(), b2.sibling = null, c2 = M$2.current, G$1(M$2, d ? c2 & 1 | 2 : c2 & 1), b2;
      S$2(b2);
      return null;
    case 22:
    case 23:
      return Ij(), d = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d && (b2.flags |= 8192), d && 0 !== (b2.mode & 1) ? 0 !== (gj & 1073741824) && (S$2(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S$2(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$3(156, b2.tag));
}
function Jj(a2, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 3:
      return Jh(), E$2(Wf), E$2(H$2), Oh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 5:
      return Lh(b2), null;
    case 13:
      E$2(M$2);
      a2 = b2.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b2.alternate)
          throw Error(p$3(340));
        Ig();
      }
      a2 = b2.flags;
      return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 19:
      return E$2(M$2), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b2.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U$2 = false, Lj = "function" === typeof WeakSet ? WeakSet : Set, V$2 = null;
function Mj(a2, b2) {
  var c2 = a2.ref;
  if (null !== c2)
    if ("function" === typeof c2)
      try {
        c2(null);
      } catch (d) {
        W$2(a2, b2, d);
      }
    else
      c2.current = null;
}
function Nj(a2, b2, c2) {
  try {
    c2();
  } catch (d) {
    W$2(a2, b2, d);
  }
}
var Oj = false;
function Pj(a2, b2) {
  Cf = dd$1;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2)
      var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else
      a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d = c2.getSelection && c2.getSelection();
        if (d && 0 !== d.rangeCount) {
          c2 = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || 0 !== e && 3 !== q2.nodeType || (h = g + e);
                q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
                3 === q2.nodeType && (g += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a2)
                  break b;
                r2 === c2 && ++l2 === e && (h = g);
                r2 === f2 && ++m2 === d && (k2 = g);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c2 = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd$1 = false;
  for (V$2 = b2; null !== V$2; )
    if (b2 = V$2, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2)
      a2.return = b2, V$2 = a2;
    else
      for (; null !== V$2; ) {
        b2 = V$2;
        try {
          var n2 = b2.alternate;
          if (0 !== (b2.flags & 1024))
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Lg(b2.type, t2), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b2.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$3(163));
            }
        } catch (F2) {
          W$2(b2, b2.return, F2);
        }
        a2 = b2.sibling;
        if (null !== a2) {
          a2.return = b2.return;
          V$2 = a2;
          break;
        }
        V$2 = b2.return;
      }
  n2 = Oj;
  Oj = false;
  return n2;
}
function Qj(a2, b2, c2) {
  var d = b2.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a2) === a2) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Nj(b2, c2, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Rj(a2, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d = c2.create;
        c2.destroy = d();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Sj(a2) {
  var b2 = a2.ref;
  if (null !== b2) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b2 ? b2(a2) : b2.current = a2;
  }
}
function Tj(a2) {
  var b2 = a2.alternate;
  null !== b2 && (a2.alternate = null, Tj(b2));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Uj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Vj(a2) {
  a:
    for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Uj(a2.return))
          return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2)
          continue a;
        if (null === a2.child || 4 === a2.tag)
          continue a;
        else
          a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2))
        return a2.stateNode;
    }
}
function Wj(a2, b2, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d)
    a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d && (a2 = a2.child, null !== a2))
    for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Wj(a2, b2, c2), a2 = a2.sibling;
}
function Xj(a2, b2, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d)
    a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
  else if (4 !== d && (a2 = a2.child, null !== a2))
    for (Xj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
      Xj(a2, b2, c2), a2 = a2.sibling;
}
var X$2 = null, Yj = false;
function Zj(a2, b2, c2) {
  for (c2 = c2.child; null !== c2; )
    ak(a2, b2, c2), c2 = c2.sibling;
}
function ak(a2, b2, c2) {
  if (lc$1 && "function" === typeof lc$1.onCommitFiberUnmount)
    try {
      lc$1.onCommitFiberUnmount(kc$1, c2);
    } catch (h) {
    }
  switch (c2.tag) {
    case 5:
      U$2 || Mj(c2, b2);
    case 6:
      var d = X$2, e = Yj;
      X$2 = null;
      Zj(a2, b2, c2);
      X$2 = d;
      Yj = e;
      null !== X$2 && (Yj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X$2.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$2 && (Yj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd$1(a2)) : Kf(X$2, c2.stateNode));
      break;
    case 4:
      d = X$2;
      e = Yj;
      X$2 = c2.stateNode.containerInfo;
      Yj = true;
      Zj(a2, b2, c2);
      X$2 = d;
      Yj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$2 && (d = c2.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Nj(c2, b2, g) : 0 !== (f2 & 4) && Nj(c2, b2, g));
          e = e.next;
        } while (e !== d);
      }
      Zj(a2, b2, c2);
      break;
    case 1:
      if (!U$2 && (Mj(c2, b2), d = c2.stateNode, "function" === typeof d.componentWillUnmount))
        try {
          d.props = c2.memoizedProps, d.state = c2.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W$2(c2, b2, h);
        }
      Zj(a2, b2, c2);
      break;
    case 21:
      Zj(a2, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$2 = (d = U$2) || null !== c2.memoizedState, Zj(a2, b2, c2), U$2 = d) : Zj(a2, b2, c2);
      break;
    default:
      Zj(a2, b2, c2);
  }
}
function bk(a2) {
  var b2 = a2.updateQueue;
  if (null !== b2) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Lj());
    b2.forEach(function(b3) {
      var d = ck.bind(null, a2, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d, d));
    });
  }
}
function dk(a2, b2) {
  var c2 = b2.deletions;
  if (null !== c2)
    for (var d = 0; d < c2.length; d++) {
      var e = c2[d];
      try {
        var f2 = a2, g = b2, h = g;
        a:
          for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X$2 = h.stateNode;
                Yj = false;
                break a;
              case 3:
                X$2 = h.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X$2 = h.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h = h.return;
          }
        if (null === X$2)
          throw Error(p$3(160));
        ak(f2, g, e);
        X$2 = null;
        Yj = false;
        var k2 = e.alternate;
        null !== k2 && (k2.return = null);
        e.return = null;
      } catch (l2) {
        W$2(e, b2, l2);
      }
    }
  if (b2.subtreeFlags & 12854)
    for (b2 = b2.child; null !== b2; )
      ek(b2, a2), b2 = b2.sibling;
}
function ek(a2, b2) {
  var c2 = a2.alternate, d = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b2, a2);
      fk(a2);
      if (d & 4) {
        try {
          Qj(3, a2, a2.return), Rj(3, a2);
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
        try {
          Qj(5, a2, a2.return);
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      dk(b2, a2);
      fk(a2);
      d & 512 && null !== c2 && Mj(c2, c2.return);
      break;
    case 5:
      dk(b2, a2);
      fk(a2);
      d & 512 && null !== c2 && Mj(c2, c2.return);
      if (a2.flags & 32) {
        var e = a2.stateNode;
        try {
          ob$2(e, "");
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      if (d & 4 && (e = a2.stateNode, null != e)) {
        var f2 = a2.memoizedProps, g = null !== c2 ? c2.memoizedProps : f2, h = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2)
          try {
            "input" === h && "radio" === f2.type && null != f2.name && ab$2(e, f2);
            vb$2(h, g);
            var l2 = vb$2(h, f2);
            for (g = 0; g < k2.length; g += 2) {
              var m2 = k2[g], q2 = k2[g + 1];
              "style" === m2 ? sb$2(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb$1(e, q2) : "children" === m2 ? ob$2(e, q2) : ta$2(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb$2(e, f2);
                break;
              case "textarea":
                ib$2(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb$2(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb$2(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb$2(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W$2(a2, a2.return, t2);
          }
      }
      break;
    case 6:
      dk(b2, a2);
      fk(a2);
      if (d & 4) {
        if (null === a2.stateNode)
          throw Error(p$3(162));
        e = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      dk(b2, a2);
      fk(a2);
      if (d & 4 && null !== c2 && c2.memoizedState.isDehydrated)
        try {
          bd$1(b2.containerInfo);
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      break;
    case 4:
      dk(b2, a2);
      fk(a2);
      break;
    case 13:
      dk(b2, a2);
      fk(a2);
      e = a2.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B$2()));
      d & 4 && bk(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U$2 = (l2 = U$2) || m2, dk(b2, a2), U$2 = l2) : dk(b2, a2);
      fk(a2);
      if (d & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1))
          for (V$2 = a2, m2 = a2.child; null !== m2; ) {
            for (q2 = V$2 = m2; null !== V$2; ) {
              r2 = V$2;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r2, r2.return);
                  break;
                case 1:
                  Mj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c2 = r2.return;
                    try {
                      b2 = d, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W$2(d, c2, t2);
                    }
                  }
                  break;
                case 5:
                  Mj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    hk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V$2 = y2) : hk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a2; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb$2("display", g));
                } catch (t2) {
                  W$2(a2, a2.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W$2(a2, a2.return, t2);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a2)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      dk(b2, a2);
      fk(a2);
      d & 4 && bk(a2);
      break;
    case 21:
      break;
    default:
      dk(
        b2,
        a2
      ), fk(a2);
  }
}
function fk(a2) {
  var b2 = a2.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Uj(c2)) {
            var d = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$3(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob$2(e, ""), d.flags &= -33);
          var f2 = Vj(a2);
          Xj(a2, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Vj(a2);
          Wj(a2, h, g);
          break;
        default:
          throw Error(p$3(161));
      }
    } catch (k2) {
      W$2(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b2 & 4096 && (a2.flags &= -4097);
}
function ik(a2, b2, c2) {
  V$2 = a2;
  jk(a2);
}
function jk(a2, b2, c2) {
  for (var d = 0 !== (a2.mode & 1); null !== V$2; ) {
    var e = V$2, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Kj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U$2;
        h = Kj;
        var l2 = U$2;
        Kj = g;
        if ((U$2 = k2) && !l2)
          for (V$2 = e; null !== V$2; )
            g = V$2, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k2 ? (k2.return = g, V$2 = k2) : kk(e);
        for (; null !== f2; )
          V$2 = f2, jk(f2), f2 = f2.sibling;
        V$2 = e;
        Kj = h;
        U$2 = l2;
      }
      lk(a2);
    } else
      0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V$2 = f2) : lk(a2);
  }
}
function lk(a2) {
  for (; null !== V$2; ) {
    var b2 = V$2;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772))
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              U$2 || Rj(5, b2);
              break;
            case 1:
              var d = b2.stateNode;
              if (b2.flags & 4 && !U$2)
                if (null === c2)
                  d.componentDidMount();
                else {
                  var e = b2.elementType === b2.type ? c2.memoizedProps : Lg(b2.type, c2.memoizedProps);
                  d.componentDidUpdate(e, c2.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b2.updateQueue;
              null !== f2 && ih(b2, f2, d);
              break;
            case 3:
              var g = b2.updateQueue;
              if (null !== g) {
                c2 = null;
                if (null !== b2.child)
                  switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                ih(b2, g, c2);
              }
              break;
            case 5:
              var h = b2.stateNode;
              if (null === c2 && b2.flags & 4) {
                c2 = h;
                var k2 = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b2.memoizedState) {
                var l2 = b2.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd$1(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$3(163));
          }
        U$2 || b2.flags & 512 && Sj(b2);
      } catch (r2) {
        W$2(b2, b2.return, r2);
      }
    }
    if (b2 === a2) {
      V$2 = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$2 = c2;
      break;
    }
    V$2 = b2.return;
  }
}
function hk(a2) {
  for (; null !== V$2; ) {
    var b2 = V$2;
    if (b2 === a2) {
      V$2 = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V$2 = c2;
      break;
    }
    V$2 = b2.return;
  }
}
function kk(a2) {
  for (; null !== V$2; ) {
    var b2 = V$2;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Rj(4, b2);
          } catch (k2) {
            W$2(b2, c2, k2);
          }
          break;
        case 1:
          var d = b2.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b2.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W$2(b2, e, k2);
            }
          }
          var f2 = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W$2(b2, f2, k2);
          }
          break;
        case 5:
          var g = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W$2(b2, g, k2);
          }
      }
    } catch (k2) {
      W$2(b2, b2.return, k2);
    }
    if (b2 === a2) {
      V$2 = null;
      break;
    }
    var h = b2.sibling;
    if (null !== h) {
      h.return = b2.return;
      V$2 = h;
      break;
    }
    V$2 = b2.return;
  }
}
var mk = Math.ceil, nk = ua$2.ReactCurrentDispatcher, ok = ua$2.ReactCurrentOwner, pk = ua$2.ReactCurrentBatchConfig, K$2 = 0, R$2 = null, Y$2 = null, Z$2 = 0, gj = 0, fj = Uf(0), T$2 = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L$2() {
  return 0 !== (K$2 & 6) ? B$2() : -1 !== Bk ? Bk : Bk = B$2();
}
function lh(a2) {
  if (0 === (a2.mode & 1))
    return 1;
  if (0 !== (K$2 & 2) && 0 !== Z$2)
    return Z$2 & -Z$2;
  if (null !== Kg.transition)
    return 0 === Ck && (Ck = yc$1()), Ck;
  a2 = C$1;
  if (0 !== a2)
    return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd$1(a2.type);
  return a2;
}
function mh(a2, b2, c2, d) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p$3(185));
  Ac$1(a2, c2, d);
  if (0 === (K$2 & 2) || a2 !== R$2)
    a2 === R$2 && (0 === (K$2 & 2) && (rk |= c2), 4 === T$2 && Dk(a2, Z$2)), Ek(a2, d), 1 === c2 && 0 === K$2 && 0 === (b2.mode & 1) && (Hj = B$2() + 500, fg && jg());
}
function Ek(a2, b2) {
  var c2 = a2.callbackNode;
  wc$1(a2, b2);
  var d = uc$1(a2, a2 === R$2 ? Z$2 : 0);
  if (0 === d)
    null !== c2 && bc$1(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b2 = d & -d, a2.callbackPriority !== b2) {
    null != c2 && bc$1(c2);
    if (1 === b2)
      0 === a2.tag ? ig(Fk.bind(null, a2)) : hg(Fk.bind(null, a2)), Jf(function() {
        0 === (K$2 & 6) && jg();
      }), c2 = null;
    else {
      switch (Dc$1(d)) {
        case 1:
          c2 = fc$1;
          break;
        case 4:
          c2 = gc$1;
          break;
        case 16:
          c2 = hc$1;
          break;
        case 536870912:
          c2 = jc$1;
          break;
        default:
          c2 = hc$1;
      }
      c2 = Gk(c2, Hk.bind(null, a2));
    }
    a2.callbackPriority = b2;
    a2.callbackNode = c2;
  }
}
function Hk(a2, b2) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K$2 & 6))
    throw Error(p$3(327));
  var c2 = a2.callbackNode;
  if (Ik() && a2.callbackNode !== c2)
    return null;
  var d = uc$1(a2, a2 === R$2 ? Z$2 : 0);
  if (0 === d)
    return null;
  if (0 !== (d & 30) || 0 !== (d & a2.expiredLanes) || b2)
    b2 = Jk(a2, d);
  else {
    b2 = d;
    var e = K$2;
    K$2 |= 2;
    var f2 = Kk();
    if (R$2 !== a2 || Z$2 !== b2)
      vk = null, Hj = B$2() + 500, Lk(a2, b2);
    do
      try {
        Mk();
        break;
      } catch (h) {
        Nk(a2, h);
      }
    while (1);
    Qg();
    nk.current = f2;
    K$2 = e;
    null !== Y$2 ? b2 = 0 : (R$2 = null, Z$2 = 0, b2 = T$2);
  }
  if (0 !== b2) {
    2 === b2 && (e = xc$1(a2), 0 !== e && (d = e, b2 = Ok(a2, e)));
    if (1 === b2)
      throw c2 = qk, Lk(a2, 0), Dk(a2, d), Ek(a2, B$2()), c2;
    if (6 === b2)
      Dk(a2, d);
    else {
      e = a2.current.alternate;
      if (0 === (d & 30) && !Pk(e) && (b2 = Jk(a2, d), 2 === b2 && (f2 = xc$1(a2), 0 !== f2 && (d = f2, b2 = Ok(a2, f2))), 1 === b2))
        throw c2 = qk, Lk(a2, 0), Dk(a2, d), Ek(a2, B$2()), c2;
      a2.finishedWork = e;
      a2.finishedLanes = d;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$3(345));
        case 2:
          Qk(a2, uk, vk);
          break;
        case 3:
          Dk(a2, d);
          if ((d & 130023424) === d && (b2 = gk + 500 - B$2(), 10 < b2)) {
            if (0 !== uc$1(a2, 0))
              break;
            e = a2.suspendedLanes;
            if ((e & d) !== d) {
              L$2();
              a2.pingedLanes |= a2.suspendedLanes & e;
              break;
            }
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), b2);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 4:
          Dk(a2, d);
          if ((d & 4194240) === d)
            break;
          b2 = a2.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc$1(d);
            f2 = 1 << g;
            g = b2[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B$2() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), d);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 5:
          Qk(a2, uk, vk);
          break;
        default:
          throw Error(p$3(329));
      }
    }
  }
  Ek(a2, B$2());
  return a2.callbackNode === c2 ? Hk.bind(null, a2) : null;
}
function Ok(a2, b2) {
  var c2 = tk;
  a2.current.memoizedState.isDehydrated && (Lk(a2, b2).flags |= 256);
  a2 = Jk(a2, b2);
  2 !== a2 && (b2 = uk, uk = c2, null !== b2 && Gj(b2));
  return a2;
}
function Gj(a2) {
  null === uk ? uk = a2 : uk.push.apply(uk, a2);
}
function Pk(a2) {
  for (var b2 = a2; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2))
        for (var d = 0; d < c2.length; d++) {
          var e = c2[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e))
              return false;
          } catch (g) {
            return false;
          }
        }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2)
      c2.return = b2, b2 = c2;
    else {
      if (b2 === a2)
        break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a2)
          return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Dk(a2, b2) {
  b2 &= ~sk;
  b2 &= ~rk;
  a2.suspendedLanes |= b2;
  a2.pingedLanes &= ~b2;
  for (a2 = a2.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc$1(b2), d = 1 << c2;
    a2[c2] = -1;
    b2 &= ~d;
  }
}
function Fk(a2) {
  if (0 !== (K$2 & 6))
    throw Error(p$3(327));
  Ik();
  var b2 = uc$1(a2, 0);
  if (0 === (b2 & 1))
    return Ek(a2, B$2()), null;
  var c2 = Jk(a2, b2);
  if (0 !== a2.tag && 2 === c2) {
    var d = xc$1(a2);
    0 !== d && (b2 = d, c2 = Ok(a2, d));
  }
  if (1 === c2)
    throw c2 = qk, Lk(a2, 0), Dk(a2, b2), Ek(a2, B$2()), c2;
  if (6 === c2)
    throw Error(p$3(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b2;
  Qk(a2, uk, vk);
  Ek(a2, B$2());
  return null;
}
function Rk(a2, b2) {
  var c2 = K$2;
  K$2 |= 1;
  try {
    return a2(b2);
  } finally {
    K$2 = c2, 0 === K$2 && (Hj = B$2() + 500, fg && jg());
  }
}
function Sk(a2) {
  null !== xk && 0 === xk.tag && 0 === (K$2 & 6) && Ik();
  var b2 = K$2;
  K$2 |= 1;
  var c2 = pk.transition, d = C$1;
  try {
    if (pk.transition = null, C$1 = 1, a2)
      return a2();
  } finally {
    C$1 = d, pk.transition = c2, K$2 = b2, 0 === (K$2 & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E$2(fj);
}
function Lk(a2, b2) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y$2)
    for (c2 = Y$2.return; null !== c2; ) {
      var d = c2;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          Jh();
          E$2(Wf);
          E$2(H$2);
          Oh();
          break;
        case 5:
          Lh(d);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E$2(M$2);
          break;
        case 19:
          E$2(M$2);
          break;
        case 10:
          Rg(d.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c2 = c2.return;
    }
  R$2 = a2;
  Y$2 = a2 = wh(a2.current, null);
  Z$2 = gj = b2;
  T$2 = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b2 = 0; b2 < Wg.length; b2++)
      if (c2 = Wg[b2], d = c2.interleaved, null !== d) {
        c2.interleaved = null;
        var e = d.next, f2 = c2.pending;
        if (null !== f2) {
          var g = f2.next;
          f2.next = e;
          d.next = g;
        }
        c2.pending = d;
      }
    Wg = null;
  }
  return a2;
}
function Nk(a2, b2) {
  do {
    var c2 = Y$2;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N$2.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Sh = false;
      }
      Rh = 0;
      P$2 = O$2 = N$2 = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (null === c2 || null === c2.return) {
        T$2 = 1;
        qk = b2;
        Y$2 = null;
        break;
      }
      a: {
        var f2 = a2, g = c2.return, h = c2, k2 = b2;
        b2 = Z$2;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Vi(g);
          if (null !== y2) {
            y2.flags &= -257;
            Wi(y2, g, h, f2, b2);
            y2.mode & 1 && Ti(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b2.updateQueue = t2;
            } else
              n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Ti(f2, l2, b2);
              uj();
              break a;
            }
            k2 = Error(p$3(426));
          }
        } else if (I$2 && h.mode & 1) {
          var J2 = Vi(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Wi(J2, g, h, f2, b2);
            Jg(Ki(k2, h));
            break a;
          }
        }
        f2 = k2 = Ki(k2, h);
        4 !== T$2 && (T$2 = 2);
        null === tk ? tk = [f2] : tk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Oi(f2, k2, b2);
              fh(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Si || !Si.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Ri(f2, h, b2);
                fh(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Tk(c2);
    } catch (na2) {
      b2 = na2;
      Y$2 === c2 && null !== c2 && (Y$2 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a2 = nk.current;
  nk.current = ai;
  return null === a2 ? ai : a2;
}
function uj() {
  if (0 === T$2 || 3 === T$2 || 2 === T$2)
    T$2 = 4;
  null === R$2 || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R$2, Z$2);
}
function Jk(a2, b2) {
  var c2 = K$2;
  K$2 |= 2;
  var d = Kk();
  if (R$2 !== a2 || Z$2 !== b2)
    vk = null, Lk(a2, b2);
  do
    try {
      Uk();
      break;
    } catch (e) {
      Nk(a2, e);
    }
  while (1);
  Qg();
  K$2 = c2;
  nk.current = d;
  if (null !== Y$2)
    throw Error(p$3(261));
  R$2 = null;
  Z$2 = 0;
  return T$2;
}
function Uk() {
  for (; null !== Y$2; )
    Vk(Y$2);
}
function Mk() {
  for (; null !== Y$2 && !cc$2(); )
    Vk(Y$2);
}
function Vk(a2) {
  var b2 = Wk(a2.alternate, a2, gj);
  a2.memoizedProps = a2.pendingProps;
  null === b2 ? Tk(a2) : Y$2 = b2;
  ok.current = null;
}
function Tk(a2) {
  var b2 = a2;
  do {
    var c2 = b2.alternate;
    a2 = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Fj(c2, b2, gj), null !== c2) {
        Y$2 = c2;
        return;
      }
    } else {
      c2 = Jj(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$2 = c2;
        return;
      }
      if (null !== a2)
        a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T$2 = 6;
        Y$2 = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y$2 = b2;
      return;
    }
    Y$2 = b2 = a2;
  } while (null !== b2);
  0 === T$2 && (T$2 = 5);
}
function Qk(a2, b2, c2) {
  var d = C$1, e = pk.transition;
  try {
    pk.transition = null, C$1 = 1, Xk(a2, b2, c2, d);
  } finally {
    pk.transition = e, C$1 = d;
  }
  return null;
}
function Xk(a2, b2, c2, d) {
  do
    Ik();
  while (null !== xk);
  if (0 !== (K$2 & 6))
    throw Error(p$3(327));
  c2 = a2.finishedWork;
  var e = a2.finishedLanes;
  if (null === c2)
    return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current)
    throw Error(p$3(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc$1(a2, f2);
  a2 === R$2 && (Y$2 = R$2 = null, Z$2 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || wk || (wk = true, Gk(hc$1, function() {
    Ik();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = pk.transition;
    pk.transition = null;
    var g = C$1;
    C$1 = 1;
    var h = K$2;
    K$2 |= 4;
    ok.current = null;
    Pj(a2, c2);
    ek(c2, a2);
    Oe(Df);
    dd$1 = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    ik(c2);
    dc$1();
    K$2 = h;
    C$1 = g;
    pk.transition = f2;
  } else
    a2.current = c2;
  wk && (wk = false, xk = a2, yk = e);
  f2 = a2.pendingLanes;
  0 === f2 && (Si = null);
  mc$1(c2.stateNode);
  Ek(a2, B$2());
  if (null !== b2)
    for (d = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
      e = b2[c2], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Pi)
    throw Pi = false, a2 = Qi, Qi = null, a2;
  0 !== (yk & 1) && 0 !== a2.tag && Ik();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === Ak ? zk++ : (zk = 0, Ak = a2) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a2 = Dc$1(yk), b2 = pk.transition, c2 = C$1;
    try {
      pk.transition = null;
      C$1 = 16 > a2 ? 16 : a2;
      if (null === xk)
        var d = false;
      else {
        a2 = xk;
        xk = null;
        yk = 0;
        if (0 !== (K$2 & 6))
          throw Error(p$3(331));
        var e = K$2;
        K$2 |= 4;
        for (V$2 = a2.current; null !== V$2; ) {
          var f2 = V$2, g = f2.child;
          if (0 !== (V$2.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V$2 = l2; null !== V$2; ) {
                  var m2 = V$2;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V$2 = q2;
                  else
                    for (; null !== V$2; ) {
                      m2 = V$2;
                      var r2 = m2.sibling, y2 = m2.return;
                      Tj(m2);
                      if (m2 === l2) {
                        V$2 = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V$2 = r2;
                        break;
                      }
                      V$2 = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$2 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g)
            g.return = f2, V$2 = g;
          else
            b:
              for (; null !== V$2; ) {
                f2 = V$2;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V$2 = x2;
                  break b;
                }
                V$2 = f2.return;
              }
        }
        var w2 = a2.current;
        for (V$2 = w2; null !== V$2; ) {
          g = V$2;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2)
            u2.return = g, V$2 = u2;
          else
            b:
              for (g = w2; null !== V$2; ) {
                h = V$2;
                if (0 !== (h.flags & 2048))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h);
                    }
                  } catch (na2) {
                    W$2(h, h.return, na2);
                  }
                if (h === g) {
                  V$2 = null;
                  break b;
                }
                var F2 = h.sibling;
                if (null !== F2) {
                  F2.return = h.return;
                  V$2 = F2;
                  break b;
                }
                V$2 = h.return;
              }
        }
        K$2 = e;
        jg();
        if (lc$1 && "function" === typeof lc$1.onPostCommitFiberRoot)
          try {
            lc$1.onPostCommitFiberRoot(kc$1, a2);
          } catch (na2) {
          }
        d = true;
      }
      return d;
    } finally {
      C$1 = c2, pk.transition = b2;
    }
  }
  return false;
}
function Yk(a2, b2, c2) {
  b2 = Ki(c2, b2);
  b2 = Oi(a2, b2, 1);
  a2 = dh(a2, b2, 1);
  b2 = L$2();
  null !== a2 && (Ac$1(a2, 1, b2), Ek(a2, b2));
}
function W$2(a2, b2, c2) {
  if (3 === a2.tag)
    Yk(a2, a2, c2);
  else
    for (; null !== b2; ) {
      if (3 === b2.tag) {
        Yk(b2, a2, c2);
        break;
      } else if (1 === b2.tag) {
        var d = b2.stateNode;
        if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
          a2 = Ki(c2, a2);
          a2 = Ri(b2, a2, 1);
          b2 = dh(b2, a2, 1);
          a2 = L$2();
          null !== b2 && (Ac$1(b2, 1, a2), Ek(b2, a2));
          break;
        }
      }
      b2 = b2.return;
    }
}
function Ui(a2, b2, c2) {
  var d = a2.pingCache;
  null !== d && d.delete(b2);
  b2 = L$2();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  R$2 === a2 && (Z$2 & c2) === c2 && (4 === T$2 || 3 === T$2 && (Z$2 & 130023424) === Z$2 && 500 > B$2() - gk ? Lk(a2, 0) : sk |= c2);
  Ek(a2, b2);
}
function Zk(a2, b2) {
  0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc$1, sc$1 <<= 1, 0 === (sc$1 & 130023424) && (sc$1 = 4194304)));
  var c2 = L$2();
  a2 = Zg(a2, b2);
  null !== a2 && (Ac$1(a2, b2, c2), Ek(a2, c2));
}
function vj(a2) {
  var b2 = a2.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Zk(a2, c2);
}
function ck(a2, b2) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d = a2.stateNode;
      var e = a2.memoizedState;
      null !== e && (c2 = e.retryLane);
      break;
    case 19:
      d = a2.stateNode;
      break;
    default:
      throw Error(p$3(314));
  }
  null !== d && d.delete(b2);
  Zk(a2, c2);
}
var Wk;
Wk = function(a2, b2, c2) {
  if (null !== a2)
    if (a2.memoizedProps !== b2.pendingProps || Wf.current)
      Ug = true;
    else {
      if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128))
        return Ug = false, zj(a2, b2, c2);
      Ug = 0 !== (a2.flags & 131072) ? true : false;
    }
  else
    Ug = false, I$2 && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d = b2.type;
      jj(a2, b2);
      a2 = b2.pendingProps;
      var e = Yf(b2, H$2.current);
      Tg(b2, c2);
      e = Xh(null, b2, d, a2, e, c2);
      var f2 = bi();
      b2.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b2), e.updater = nh, b2.stateNode = e, e._reactInternals = b2, rh(b2, d, a2, c2), b2 = kj(null, b2, d, true, f2, c2)) : (b2.tag = 0, I$2 && f2 && vg(b2), Yi(null, b2, e, c2), b2 = b2.child);
      return b2;
    case 16:
      d = b2.elementType;
      a: {
        jj(a2, b2);
        a2 = b2.pendingProps;
        e = d._init;
        d = e(d._payload);
        b2.type = d;
        e = b2.tag = $k(d);
        a2 = Lg(d, a2);
        switch (e) {
          case 0:
            b2 = dj(null, b2, d, a2, c2);
            break a;
          case 1:
            b2 = ij(null, b2, d, a2, c2);
            break a;
          case 11:
            b2 = Zi(null, b2, d, a2, c2);
            break a;
          case 14:
            b2 = aj(null, b2, d, Lg(d.type, a2), c2);
            break a;
        }
        throw Error(p$3(
          306,
          d,
          ""
        ));
      }
      return b2;
    case 0:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Lg(d, e), dj(a2, b2, d, e, c2);
    case 1:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Lg(d, e), ij(a2, b2, d, e, c2);
    case 3:
      a: {
        lj(b2);
        if (null === a2)
          throw Error(p$3(387));
        d = b2.pendingProps;
        f2 = b2.memoizedState;
        e = f2.element;
        bh(a2, b2);
        gh(b2, d, null, c2);
        var g = b2.memoizedState;
        d = g.element;
        if (f2.isDehydrated)
          if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e = Ki(Error(p$3(423)), b2);
            b2 = mj(a2, b2, d, c2, e);
            break a;
          } else if (d !== e) {
            e = Ki(Error(p$3(424)), b2);
            b2 = mj(a2, b2, d, c2, e);
            break a;
          } else
            for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I$2 = true, zg = null, c2 = Ch(b2, null, d, c2), b2.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d === e) {
            b2 = $i(a2, b2, c2);
            break a;
          }
          Yi(a2, b2, d, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Kh(b2), null === a2 && Eg(b2), d = b2.type, e = b2.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b2.flags |= 32), hj(a2, b2), Yi(a2, b2, g, c2), b2.child;
    case 6:
      return null === a2 && Eg(b2), null;
    case 13:
      return pj(a2, b2, c2);
    case 4:
      return Ih(b2, b2.stateNode.containerInfo), d = b2.pendingProps, null === a2 ? b2.child = Bh(b2, null, d, c2) : Yi(a2, b2, d, c2), b2.child;
    case 11:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Lg(d, e), Zi(a2, b2, d, e, c2);
    case 7:
      return Yi(a2, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Yi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Yi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d = b2.type._context;
        e = b2.pendingProps;
        f2 = b2.memoizedProps;
        g = e.value;
        G$1(Mg, d._currentValue);
        d._currentValue = g;
        if (null !== f2)
          if (He(f2.value, g)) {
            if (f2.children === e.children && !Wf.current) {
              b2 = $i(a2, b2, c2);
              break a;
            }
          } else
            for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
              var h = f2.dependencies;
              if (null !== h) {
                g = f2.child;
                for (var k2 = h.firstContext; null !== k2; ) {
                  if (k2.context === d) {
                    if (1 === f2.tag) {
                      k2 = ch(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c2);
                    Sg(
                      f2.return,
                      c2,
                      b2
                    );
                    h.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag)
                g = f2.type === b2.type ? null : f2.child;
              else if (18 === f2.tag) {
                g = f2.return;
                if (null === g)
                  throw Error(p$3(341));
                g.lanes |= c2;
                h = g.alternate;
                null !== h && (h.lanes |= c2);
                Sg(g, c2, b2);
                g = f2.sibling;
              } else
                g = f2.child;
              if (null !== g)
                g.return = f2;
              else
                for (g = f2; null !== g; ) {
                  if (g === b2) {
                    g = null;
                    break;
                  }
                  f2 = g.sibling;
                  if (null !== f2) {
                    f2.return = g.return;
                    g = f2;
                    break;
                  }
                  g = g.return;
                }
              f2 = g;
            }
        Yi(a2, b2, e.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e = b2.type, d = b2.pendingProps.children, Tg(b2, c2), e = Vg(e), d = d(e), b2.flags |= 1, Yi(a2, b2, d, c2), b2.child;
    case 14:
      return d = b2.type, e = Lg(d, b2.pendingProps), e = Lg(d.type, e), aj(a2, b2, d, e, c2);
    case 15:
      return cj(a2, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Lg(d, e), jj(a2, b2), b2.tag = 1, Zf(d) ? (a2 = true, cg(b2)) : a2 = false, Tg(b2, c2), ph(b2, d, e), rh(b2, d, e, c2), kj(null, b2, d, true, a2, c2);
    case 19:
      return yj(a2, b2, c2);
    case 22:
      return ej(a2, b2, c2);
  }
  throw Error(p$3(156, b2.tag));
};
function Gk(a2, b2) {
  return ac$1(a2, b2);
}
function al(a2, b2, c2, d) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg$1(a2, b2, c2, d) {
  return new al(a2, b2, c2, d);
}
function bj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function $k(a2) {
  if ("function" === typeof a2)
    return bj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da$2)
      return 11;
    if (a2 === Ga$2)
      return 14;
  }
  return 2;
}
function wh(a2, b2) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg$1(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b2 = a2.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function yh(a2, b2, c2, d, e, f2) {
  var g = 2;
  d = a2;
  if ("function" === typeof a2)
    bj(a2) && (g = 1);
  else if ("string" === typeof a2)
    g = 5;
  else
    a:
      switch (a2) {
        case ya$2:
          return Ah(c2.children, e, f2, b2);
        case za$2:
          g = 8;
          e |= 8;
          break;
        case Aa$2:
          return a2 = Bg$1(12, c2, b2, e | 2), a2.elementType = Aa$2, a2.lanes = f2, a2;
        case Ea$2:
          return a2 = Bg$1(13, c2, b2, e), a2.elementType = Ea$2, a2.lanes = f2, a2;
        case Fa$2:
          return a2 = Bg$1(19, c2, b2, e), a2.elementType = Fa$2, a2.lanes = f2, a2;
        case Ia$2:
          return qj(c2, e, f2, b2);
        default:
          if ("object" === typeof a2 && null !== a2)
            switch (a2.$$typeof) {
              case Ba$2:
                g = 10;
                break a;
              case Ca$2:
                g = 9;
                break a;
              case Da$2:
                g = 11;
                break a;
              case Ga$2:
                g = 14;
                break a;
              case Ha$2:
                g = 16;
                d = null;
                break a;
            }
          throw Error(p$3(130, null == a2 ? a2 : typeof a2, ""));
      }
  b2 = Bg$1(g, c2, b2, e);
  b2.elementType = a2;
  b2.type = d;
  b2.lanes = f2;
  return b2;
}
function Ah(a2, b2, c2, d) {
  a2 = Bg$1(7, a2, d, b2);
  a2.lanes = c2;
  return a2;
}
function qj(a2, b2, c2, d) {
  a2 = Bg$1(22, a2, d, b2);
  a2.elementType = Ia$2;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function xh(a2, b2, c2) {
  a2 = Bg$1(6, a2, null, b2);
  a2.lanes = c2;
  return a2;
}
function zh(a2, b2, c2) {
  b2 = Bg$1(4, null !== a2.children ? a2.children : [], a2.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b2;
}
function bl(a2, b2, c2, d, e) {
  this.tag = b2;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc$1(0);
  this.expirationTimes = zc$1(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc$1(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a2, b2, c2, d, e, f2, g, h, k2) {
  a2 = new bl(a2, b2, c2, h, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg$1(3, null, null, b2);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f2);
  return a2;
}
function dl(a2, b2, c2) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa$2, key: null == d ? null : "" + d, children: a2, containerInfo: b2, implementation: c2 };
}
function el(a2) {
  if (!a2)
    return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb$1(a2) !== a2 || 1 !== a2.tag)
      throw Error(p$3(170));
    var b2 = a2;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$3(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2))
      return bg(a2, c2, b2);
  }
  return b2;
}
function fl(a2, b2, c2, d, e, f2, g, h, k2) {
  a2 = cl(c2, d, true, a2, e, f2, g, h, k2);
  a2.context = el(null);
  c2 = a2.current;
  d = L$2();
  e = lh(c2);
  f2 = ch(d, e);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  dh(c2, f2, e);
  a2.current.lanes = e;
  Ac$1(a2, e, d);
  Ek(a2, d);
  return a2;
}
function gl(a2, b2, c2, d) {
  var e = b2.current, f2 = L$2(), g = lh(e);
  c2 = el(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = ch(f2, g);
  b2.payload = { element: a2 };
  d = void 0 === d ? null : d;
  null !== d && (b2.callback = d);
  a2 = dh(e, b2, g);
  null !== a2 && (mh(a2, e, g, f2), eh(a2, e, g));
  return g;
}
function hl(a2) {
  a2 = a2.current;
  if (!a2.child)
    return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function il(a2, b2) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function jl(a2, b2) {
  il(a2, b2);
  (a2 = a2.alternate) && il(a2, b2);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ml(a2) {
  this._internalRoot = a2;
}
nl.prototype.render = ml.prototype.render = function(a2) {
  var b2 = this._internalRoot;
  if (null === b2)
    throw Error(p$3(409));
  gl(a2, b2, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b2 = a2.containerInfo;
    Sk(function() {
      gl(null, a2, null, null);
    });
    b2[uf] = null;
  }
};
function nl(a2) {
  this._internalRoot = a2;
}
nl.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b2 = Hc$1();
    a2 = { blockedOn: null, target: a2, priority: b2 };
    for (var c2 = 0; c2 < Qc$1.length && 0 !== b2 && b2 < Qc$1[c2].priority; c2++)
      ;
    Qc$1.splice(c2, 0, a2);
    0 === c2 && Vc$1(a2);
  }
};
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function pl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function ql() {
}
function rl(a2, b2, c2, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a3 = hl(g);
        f2.call(a3);
      };
    }
    var g = fl(b2, d, a2, 0, null, false, false, "", ql);
    a2._reactRootContainer = g;
    a2[uf] = g.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Sk();
    return g;
  }
  for (; e = a2.lastChild; )
    a2.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a3 = hl(k2);
      h.call(a3);
    };
  }
  var k2 = cl(a2, 0, false, null, null, false, false, "", ql);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Sk(function() {
    gl(b2, k2, c2, d);
  });
  return k2;
}
function sl(a2, b2, c2, d, e) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a3 = hl(g);
        h.call(a3);
      };
    }
    gl(b2, g, a2, e);
  } else
    g = rl(c2, b2, a2, e, d);
  return hl(g);
}
Ec$1 = function(a2) {
  switch (a2.tag) {
    case 3:
      var b2 = a2.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc$1(b2.pendingLanes);
        0 !== c2 && (Cc$1(b2, c2 | 1), Ek(b2, B$2()), 0 === (K$2 & 6) && (Hj = B$2() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b3 = Zg(a2, 1);
        if (null !== b3) {
          var c3 = L$2();
          mh(b3, a2, 1, c3);
        }
      }), jl(a2, 1);
  }
};
Fc$1 = function(a2) {
  if (13 === a2.tag) {
    var b2 = Zg(a2, 134217728);
    if (null !== b2) {
      var c2 = L$2();
      mh(b2, a2, 134217728, c2);
    }
    jl(a2, 134217728);
  }
};
Gc$1 = function(a2) {
  if (13 === a2.tag) {
    var b2 = lh(a2), c2 = Zg(a2, b2);
    if (null !== c2) {
      var d = L$2();
      mh(c2, a2, b2, d);
    }
    jl(a2, b2);
  }
};
Hc$1 = function() {
  return C$1;
};
Ic$1 = function(a2, b2) {
  var c2 = C$1;
  try {
    return C$1 = a2, b2();
  } finally {
    C$1 = c2;
  }
};
yb$2 = function(a2, b2, c2) {
  switch (b2) {
    case "input":
      bb$2(a2, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a2; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d = c2[b2];
          if (d !== a2 && d.form === a2.form) {
            var e = Db$2(d);
            if (!e)
              throw Error(p$3(90));
            Wa$2(d);
            bb$2(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib$2(a2, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb$2(a2, !!c2.multiple, b2, false);
  }
};
Gb$2 = Rk;
Hb$2 = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb$2, ue, Db$2, Eb$2, Fb$1, Rk] }, ul = { findFiberByHostInstance: Wc$1, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua$2.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb$1(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc$1 = wl.inject(vl), lc$1 = wl;
    } catch (a2) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(a2, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b2))
    throw Error(p$3(200));
  return dl(a2, b2, null, c2);
};
reactDom_production_min.createRoot = function(a2, b2) {
  if (!ol(a2))
    throw Error(p$3(299));
  var c2 = false, d = "", e = ll;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e = b2.onRecoverableError));
  b2 = cl(a2, 1, false, null, null, c2, false, d, e);
  a2[uf] = b2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ml(b2);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2)
    return null;
  if (1 === a2.nodeType)
    return a2;
  var b2 = a2._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a2.render)
      throw Error(p$3(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$3(268, a2));
  }
  a2 = Zb$1(b2);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Sk(a2);
};
reactDom_production_min.hydrate = function(a2, b2, c2) {
  if (!pl(b2))
    throw Error(p$3(200));
  return sl(null, a2, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b2, c2) {
  if (!ol(a2))
    throw Error(p$3(405));
  var d = null != c2 && c2.hydratedSources || null, e = false, f2 = "", g = ll;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g = c2.onRecoverableError));
  b2 = fl(b2, null, a2, 1, null != c2 ? c2 : null, e, false, f2, g);
  a2[uf] = b2.current;
  sf(a2);
  if (d)
    for (a2 = 0; a2 < d.length; a2++)
      c2 = d[a2], e = c2._getVersion, e = e(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e] : b2.mutableSourceEagerHydrationData.push(
        c2,
        e
      );
  return new nl(b2);
};
reactDom_production_min.render = function(a2, b2, c2) {
  if (!pl(b2))
    throw Error(p$3(200));
  return sl(null, a2, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!pl(a2))
    throw Error(p$3(40));
  return a2._reactRootContainer ? (Sk(function() {
    sl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d) {
  if (!pl(c2))
    throw Error(p$3(200));
  if (null == a2 || void 0 === a2._reactInternals)
    throw Error(p$3(38));
  return sl(a2, b2, c2, false, d);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
(function(module) {
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    module.exports = reactDom_production_min;
  }
})(reactDom);
var m$1 = reactDom.exports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
/**
 * @remix-run/router v1.0.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
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
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function warning$1(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location) {
  return {
    usr: location.state,
    key: location.key
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$1({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function createURL(location) {
  let base = typeof window !== "undefined" && typeof window.location !== "undefined" && window.location.origin !== "null" ? window.location.origin : "unknown://unknown";
  let href = typeof location === "string" ? location : createPath(location);
  return new URL(href, base);
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  function handlePop() {
    action = Action.Pop;
    if (listener) {
      listener({
        action,
        location: history.location
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    let historyState = getHistoryState(location);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    let historyState = getHistoryState(location);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location
      });
    }
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    encodeLocation(location) {
      let url = createURL(createPath(location));
      return _extends$1({}, location, {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      });
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      safelyDecodeURI(pathname)
    );
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  routes.forEach((route, index2) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant$1(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant$1(
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  });
  return branches;
}
function rankRouteBranches(branches) {
  branches.sort((a2, b2) => a2.score !== b2.score ? b2.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b2) {
  let siblings = a2.length === b2.length && a2.slice(0, -1).every((n2, i) => n2 === b2[i]);
  return siblings ? a2[a2.length - 1] - b2[b2.length - 1] : 0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index2) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index2] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning$2(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning$2(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning$2(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function invariant$1(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning$2(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
class ErrorResponse {
  constructor(status, statusText, data) {
    this.status = status;
    this.statusText = statusText || "";
    this.data = data;
  }
}
function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse;
}
const validActionMethods = /* @__PURE__ */ new Set(["POST", "PUT", "PATCH", "DELETE"]);
/* @__PURE__ */ new Set(["GET", "HEAD", ...validActionMethods]);
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react.exports, k$1 = Symbol.for("react.element"), l$3 = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n$1 = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g) {
  var b2, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a2.key && (e = "" + a2.key);
  void 0 !== a2.ref && (h = a2.ref);
  for (b2 in a2)
    m.call(a2, b2) && !p$2.hasOwnProperty(b2) && (d[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      void 0 === d[b2] && (d[b2] = a2[b2]);
  return { $$typeof: k$1, type: c2, key: e, ref: h, props: d, _owner: n$1.current };
}
reactJsxRuntime_production_min.Fragment = l$3;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
(function(module) {
  {
    module.exports = reactJsxRuntime_production_min;
  }
})(jsxRuntime);
const Fragment = jsxRuntime.exports.Fragment;
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
/**
 * React Router v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
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
function isPolyfill(x2, y2) {
  return x2 === y2 && (x2 !== 0 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
const is = typeof Object.is === "function" ? Object.is : isPolyfill;
const {
  useState,
  useEffect,
  useLayoutEffect,
  useDebugValue
} = React$1;
function useSyncExternalStore$2(subscribe, getSnapshot, getServerSnapshot) {
  const value = getSnapshot();
  const [{
    inst
  }, forceUpdate] = useState({
    inst: {
      value,
      getSnapshot
    }
  });
  useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot;
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(() => {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst
      });
    }
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({
          inst
        });
      }
    };
    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  return getSnapshot();
}
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const isServerEnvironment = !canUseDOM;
const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
"useSyncExternalStore" in React$1 ? ((module) => module.useSyncExternalStore)(React$1) : shim;
const DataStaticRouterContext = /* @__PURE__ */ react.exports.createContext(null);
const DataRouterContext = /* @__PURE__ */ react.exports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ react.exports.createContext(null);
const NavigationContext = /* @__PURE__ */ react.exports.createContext(null);
const LocationContext = /* @__PURE__ */ react.exports.createContext(null);
const RouteContext = /* @__PURE__ */ react.exports.createContext({
  outlet: null,
  matches: []
});
const RouteErrorContext = /* @__PURE__ */ react.exports.createContext(null);
function useInRouterContext() {
  return react.exports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant$1(false) : void 0;
  return react.exports.useContext(LocationContext).location;
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant$1(false) : void 0;
  let dataRouterStateContext = react.exports.useContext(DataRouterStateContext);
  let {
    matches: parentMatches
  } = react.exports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant$1(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
  })), parentMatches, dataRouterStateContext || void 0);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ jsx(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      },
      children: renderedMatches
    });
  }
  return renderedMatches;
}
function DefaultErrorElement() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Unhandled Thrown Error!"
    }), /* @__PURE__ */ jsx("h3", {
      style: {
        fontStyle: "italic"
      },
      children: message
    }), stack ? /* @__PURE__ */ jsx("pre", {
      style: preStyles,
      children: stack
    }) : null, /* @__PURE__ */ jsx("p", {
      children: "\u{1F4BF} Hey developer \u{1F44B}"
    }), /* @__PURE__ */ jsxs("p", {
      children: ["You can provide a way better UX than this when your app throws errors by providing your own\xA0", /* @__PURE__ */ jsx("code", {
        style: codeStyles,
        children: "errorElement"
      }), " props on\xA0", /* @__PURE__ */ jsx("code", {
        style: codeStyles,
        children: "<Route>"
      })]
    })]
  });
}
class RenderErrorBoundary extends react.exports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error,
        location: props.location
      };
    }
    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error ? /* @__PURE__ */ jsx(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    }) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataStaticRouterContext = react.exports.useContext(DataStaticRouterContext);
  if (dataStaticRouterContext && match.route.errorElement) {
    dataStaticRouterContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ jsx(RouteContext.Provider, {
    value: routeContext,
    children
  });
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]));
    !(errorIndex >= 0) ? invariant$1(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null;
    let errorElement = dataRouterState ? match.route.errorElement || /* @__PURE__ */ jsx(DefaultErrorElement, {}) : null;
    let getChildren = () => /* @__PURE__ */ jsx(RenderedRoute, {
      match,
      routeContext: {
        outlet,
        matches: parentMatches.concat(renderedMatches.slice(0, index2 + 1))
      },
      children: error ? errorElement : match.route.element !== void 0 ? match.route.element : outlet
    });
    return dataRouterState && (match.route.errorElement || index2 === 0) ? /* @__PURE__ */ jsx(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error,
      children: getChildren()
    }) : getChildren();
  }, null);
}
var DataRouterHook$1;
(function(DataRouterHook2) {
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
})(DataRouterHook$1 || (DataRouterHook$1 = {}));
var DataRouterStateHook$1;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook$1 || (DataRouterStateHook$1 = {}));
function useDataRouterState(hookName) {
  let state = react.exports.useContext(DataRouterStateContext);
  !state ? invariant$1(false) : void 0;
  return state;
}
function useRouteError() {
  var _state$errors;
  let error = react.exports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let route = react.exports.useContext(RouteContext);
  let thisRoute = route.matches[route.matches.length - 1];
  if (error) {
    return error;
  }
  !route ? invariant$1(false) : void 0;
  !thisRoute.route.id ? invariant$1(false) : void 0;
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[thisRoute.route.id];
}
function Route(_props) {
  invariant$1(false);
}
function Router(_ref4) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false
  } = _ref4;
  !!useInRouterContext() ? invariant$1(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react.exports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react.exports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  if (location == null) {
    return null;
  }
  return /* @__PURE__ */ jsx(NavigationContext.Provider, {
    value: navigationContext,
    children: /* @__PURE__ */ jsx(LocationContext.Provider, {
      children,
      value: {
        location,
        navigationType
      }
    })
  });
}
function Routes(_ref5) {
  let {
    children,
    location
  } = _ref5;
  let dataRouterContext = react.exports.useContext(DataRouterContext);
  let routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}
var AwaitRenderStatus;
(function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react.exports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(element)) {
      return;
    }
    if (element.type === react.exports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }
    !(element.type === Route) ? invariant$1(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant$1(false) : void 0;
    let treePath = [...parentPath, index2];
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.4.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window: window2
  } = _ref2;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setState] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  react.exports.useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ jsx(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook2["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
const App$1 = "";
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
const defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || {};
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || {};
  let currentProps = {};
  function parse2(name2) {
    currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps);
  }
  parse2(name);
  tree.forEach(parse2);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps)) {
      return null;
    }
  }
  const aliases = data.aliases || {};
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps)) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = {
        ...icon
      };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  ...defaultIconSizeCustomisations,
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const result = {
    attributes: {
      width: width.toString(),
      height: height.toString(),
      viewBox: box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString()
    },
    body
  };
  return result;
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  ids.forEach((id2) => {
    const newID = typeof prefix === "function" ? prefix(id2) : prefix + (counter++).toString();
    const escapedID = id2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"), "$1" + newID + "$3");
  });
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path || "/",
    maxURL: source.maxURL || 500,
    rotate: source.rotate || 750,
    timeout: source.timeout || 5e3,
    random: source.random === true,
    index: source.index || 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = ["https://api.simplesvg.com", "https://api.unisvg.com"];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index2) => {
    length += name.length + 1;
    if (length >= maxLength && index2 > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a2, b2) => {
    if (a2.provider !== b2.provider) {
      return a2.provider.localeCompare(b2.provider);
    }
    if (a2.prefix !== b2.prefix) {
      return a2.prefix.localeCompare(b2.prefix);
    }
    return a2.name.localeCompare(b2.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id2) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id2);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id2 = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id2);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id: id2,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index2 = config.resources.indexOf(item.resource);
      if (index2 !== -1 && index2 !== config.index) {
        config.index = index2;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) {
        doneCallback(data, error);
      }
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index2) => {
      config.index = index2;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index2) => {
    const name = browserCachePrefix + index2.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && callback(data, index2)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(provider, prefix);
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (lastValue && lastValue >= lastModified) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index2;
    if (set.size) {
      set.delete(index2 = Array.from(set).shift());
    } else {
      index2 = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index2 + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(func, browserCachePrefix + index2.toString(), JSON.stringify(item));
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const {
        provider,
        prefix
      } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data, error) => {
          if (typeof data !== "object") {
            if (error !== 404) {
              return;
            }
            item.icons.forEach((name) => {
              storage2.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(storage2, data);
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const {
      provider,
      prefix
    } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const {
      provider,
      prefix,
      name
    } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const {
      provider,
      prefix
    } = storage2;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(storage2, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToURL(svg) {
  return 'url("data:image/svg+xml,' + encodeSVGforURL(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlnsXlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  backgroundColor: "currentColor"
};
const coloredProps = {
  backgroundColor: "transparent"
};
const propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
const propsToAddTo = {
  webkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
const inlineDefaults = {
  ...defaultExtendedIconCustomisations,
  inline: true
};
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
const render = (icon, props, inline, ref) => {
  const defaultProps = inline ? inlineDefaults : defaultExtendedIconCustomisations;
  const customisations = mergeCustomisations(defaultProps, props);
  const mode = props.mode || "svg";
  const style = {};
  const customStyle = props.style || {};
  const componentProps = {
    ...mode === "svg" ? svgDefaults : {},
    ref
  };
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "children":
      case "onLoad":
      case "mode":
      case "_ref":
      case "_inline":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style.color = value;
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (defaultProps[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    let localCounter = 0;
    let id2 = props.id;
    if (typeof id2 === "string") {
      id2 = id2.replace(/-/g, "_");
    }
    componentProps.dangerouslySetInnerHTML = {
      __html: replaceIDs(item.body, id2 ? () => id2 + "ID" + localCounter++ : "iconifyReact")
    };
    return /* @__PURE__ */ jsx("svg", {
      ...componentProps
    });
  }
  const {
    body,
    width,
    height
  } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL(html),
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return /* @__PURE__ */ jsx("span", {
    ...componentProps
  });
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (typeof item !== "object" || item === null || item instanceof Array || typeof item.icons !== "object" || typeof item.prefix !== "string" || !addCollection(item)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
class IconComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null
    };
  }
  _abortLoading() {
    if (this._loading) {
      this._loading.abort();
      this._loading = null;
    }
  }
  _setData(icon) {
    if (this.state.icon !== icon) {
      this.setState({
        icon
      });
    }
  }
  _checkIcon(changed) {
    const state = this.state;
    const icon = this.props.icon;
    if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
      this._icon = "";
      this._abortLoading();
      if (changed || state.icon === null) {
        this._setData({
          data: icon
        });
      }
      return;
    }
    let iconName;
    if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
      this._abortLoading();
      this._setData(null);
      return;
    }
    const data = getIconData(iconName);
    if (!data) {
      if (!this._loading || this._loading.name !== icon) {
        this._abortLoading();
        this._icon = "";
        this._setData(null);
        if (data !== null) {
          this._loading = {
            name: icon,
            abort: loadIcons([iconName], this._checkIcon.bind(this, false))
          };
        }
      }
      return;
    }
    if (this._icon !== icon || state.icon === null) {
      this._abortLoading();
      this._icon = icon;
      const classes = ["iconify"];
      if (iconName.prefix !== "") {
        classes.push("iconify--" + iconName.prefix);
      }
      if (iconName.provider !== "") {
        classes.push("iconify--" + iconName.provider);
      }
      this._setData({
        data,
        classes
      });
      if (this.props.onLoad) {
        this.props.onLoad(icon);
      }
    }
  }
  componentDidMount() {
    this._checkIcon(false);
  }
  componentDidUpdate(oldProps) {
    if (oldProps.icon !== this.props.icon) {
      this._checkIcon(true);
    }
  }
  componentWillUnmount() {
    this._abortLoading();
  }
  render() {
    const props = this.props;
    const icon = this.state.icon;
    if (icon === null) {
      return props.children ? props.children : /* @__PURE__ */ jsx("span", {});
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        className: (typeof props.className === "string" ? props.className + " " : "") + icon.classes.join(" ")
      };
    }
    return render({
      ...defaultIconProps,
      ...icon.data
    }, newProps, props._inline, props._ref);
  }
}
const Icon = React.forwardRef(function Icon2(props, ref) {
  const newProps = {
    ...props,
    _ref: ref,
    _inline: false
  };
  return /* @__PURE__ */ jsx(IconComponent, {
    ...newProps
  });
});
React.forwardRef(function InlineIcon(props, ref) {
  const newProps = {
    ...props,
    _ref: ref,
    _inline: true
  };
  return /* @__PURE__ */ jsx(IconComponent, {
    ...newProps
  });
});
const MotionConfigContext = react.exports.createContext({
  transformPagePoint: (p2) => p2,
  isStatic: false,
  reducedMotion: "never"
});
const MotionContext = react.exports.createContext({});
function useVisualElementContext() {
  return react.exports.useContext(MotionContext).visualElement;
}
const PresenceContext = react.exports.createContext(null);
const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? react.exports.useLayoutEffect : react.exports.useEffect;
const LazyContext = react.exports.createContext({ strict: false });
function useVisualElement(Component, visualState, props, createVisualElement) {
  const parent = useVisualElementContext();
  const lazyContext = react.exports.useContext(LazyContext);
  const presenceContext = react.exports.useContext(PresenceContext);
  const reducedMotionConfig = react.exports.useContext(MotionConfigContext).reducedMotion;
  const visualElementRef = react.exports.useRef();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState,
      parent,
      props,
      presenceId: presenceContext ? presenceContext.id : void 0,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  useIsomorphicLayoutEffect(() => {
    visualElement && visualElement.render();
  });
  react.exports.useEffect(() => {
    if (visualElement && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  useIsomorphicLayoutEffect(() => () => visualElement && visualElement.notify("Unmount"), []);
  return visualElement;
}
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement, externalRef) {
  return react.exports.useCallback(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    [visualElement]
  );
}
function isVariantLabel(v2) {
  return typeof v2 === "string" || Array.isArray(v2);
}
function isAnimationControls(v2) {
  return typeof v2 === "object" && typeof v2.start === "function";
}
const variantProps$1 = [
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileDrag",
  "whileTap",
  "whileFocus",
  "whileInView"
];
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps$1.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate: animate2 } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}
function useCreateMotionContext(props) {
  const { initial, animate: animate2 } = getCurrentTreeVariants(props, react.exports.useContext(MotionContext));
  return react.exports.useMemo(() => ({ initial, animate: animate2 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate2)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
const createDefinition = (propNames) => ({
  isEnabled: (props) => propNames.some((name) => !!props[name])
});
const featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  inView: createDefinition([
    "whileInView",
    "onViewportEnter",
    "onViewportLeave"
  ])
};
function loadFeatures(features2) {
  for (const key in features2) {
    if (key === "projectionNodeConstructor") {
      featureDefinitions.projectionNodeConstructor = features2[key];
    } else {
      featureDefinitions[key].Component = features2[key];
    }
  }
}
function useConstant(init) {
  const ref = react.exports.useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}
const globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};
let id$2 = 1;
function useProjectionId() {
  return useConstant(() => {
    if (globalProjectionState.hasEverUpdated) {
      return id$2++;
    }
  });
}
const LayoutGroupContext = react.exports.createContext({});
class VisualElementHandler extends React.Component {
  getSnapshotBeforeUpdate() {
    const { visualElement, props } = this.props;
    if (visualElement)
      visualElement.setProps(props);
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
const SwitchLayoutGroupContext = react.exports.createContext({});
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
function createMotionComponent({
  preloadedFeatures,
  createVisualElement,
  projectionNodeConstructor,
  useRender,
  useVisualState,
  Component
}) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    const configAndProps = {
      ...react.exports.useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const {
      isStatic
    } = configAndProps;
    let features2 = null;
    const context = useCreateMotionContext(props);
    const projectionId = isStatic ? void 0 : useProjectionId();
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
      const lazyStrictMode = react.exports.useContext(LazyContext).strict;
      const initialLayoutGroupConfig = react.exports.useContext(SwitchLayoutGroupContext);
      if (context.visualElement) {
        features2 = context.visualElement.loadFeatures(
          configAndProps,
          lazyStrictMode,
          preloadedFeatures,
          projectionId,
          projectionNodeConstructor || featureDefinitions.projectionNodeConstructor,
          initialLayoutGroupConfig
        );
      }
    }
    return /* @__PURE__ */ jsxs(VisualElementHandler, {
      visualElement: context.visualElement,
      props: configAndProps,
      children: [features2, /* @__PURE__ */ jsx(MotionContext.Provider, {
        value: context,
        children: useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)
      })]
    });
  }
  const ForwardRefComponent = react.exports.forwardRef(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component;
  return ForwardRefComponent;
}
function useLayoutId({
  layoutId
}) {
  const layoutGroupId = react.exports.useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}
const lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component) {
  if (typeof Component !== "string" || Component.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) {
    return true;
  }
  return false;
}
const scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
const transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
const transformProps = new Set(transformPropOrder);
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
const isMotionValue = (value) => !!(value === null || value === void 0 ? void 0 : value.getVelocity);
const translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
const sortTransformProps = (a2, b2) => transformPropOrder.indexOf(a2) - transformPropOrder.indexOf(b2);
function buildTransform({ transform, transformKeys: transformKeys2 }, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
  let transformString = "";
  transformKeys2.sort(sortTransformProps);
  for (const key of transformKeys2) {
    transformString += `${translateAlias[key] || key}(${transform[key]}) `;
  }
  if (enableHardwareAcceleration && !transform.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function isCSSVariable$1(key) {
  return key.startsWith("--");
}
const getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};
const clamp$1 = (min, max) => (v2) => Math.max(Math.min(v2, max), min);
const sanitize = (v2) => v2 % 1 ? Number(v2.toFixed(5)) : v2;
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v2) {
  return typeof v2 === "string";
}
const number = {
  test: (v2) => typeof v2 === "number",
  parse: parseFloat,
  transform: (v2) => v2
};
const alpha = Object.assign(Object.assign({}, number), { transform: clamp$1(0, 1) });
const scale = Object.assign(Object.assign({}, number), { default: 1 });
const createUnitType = (unit) => ({
  test: (v2) => isString(v2) && v2.endsWith(unit) && v2.split(" ").length === 1,
  parse: parseFloat,
  transform: (v2) => `${v2}${unit}`
});
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const vh = createUnitType("vh");
const vw = createUnitType("vw");
const progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v2) => percent.parse(v2) / 100, transform: (v2) => percent.transform(v2 * 100) });
const isColorString = (type, testProp) => (v2) => {
  return Boolean(isString(v2) && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v2, testProp));
};
const splitColor = (aName, bName, cName) => (v2) => {
  if (!isString(v2))
    return v2;
  const [a2, b2, c2, alpha2] = v2.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};
const hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};
const clampRgbUnit = clamp$1(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v2) => Math.round(clampRgbUnit(v2)) });
const rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};
function parseHex(v2) {
  let r2 = "";
  let g = "";
  let b2 = "";
  let a2 = "";
  if (v2.length > 5) {
    r2 = v2.substr(1, 2);
    g = v2.substr(3, 2);
    b2 = v2.substr(5, 2);
    a2 = v2.substr(7, 2);
  } else {
    r2 = v2.substr(1, 1);
    g = v2.substr(2, 1);
    b2 = v2.substr(3, 1);
    a2 = v2.substr(4, 1);
    r2 += r2;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
const hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};
const color = {
  test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
  parse: (v2) => {
    if (rgba.test(v2)) {
      return rgba.parse(v2);
    } else if (hsla.test(v2)) {
      return hsla.parse(v2);
    } else {
      return hex.parse(v2);
    }
  },
  transform: (v2) => {
    return isString(v2) ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
  }
};
const colorToken = "${c}";
const numberToken = "${n}";
function test(v2) {
  var _a, _b, _c, _d;
  return isNaN(v2) && isString(v2) && ((_b = (_a = v2.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v2.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse$1(v2) {
  if (typeof v2 === "number")
    v2 = `${v2}`;
  const values = [];
  let numColors = 0;
  const colors = v2.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v2 = v2.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v2.match(floatRegex);
  if (numbers) {
    v2 = v2.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v2 };
}
function parse(v2) {
  return analyse$1(v2).values;
}
function createTransformer(v2) {
  const { values, numColors, tokenised } = analyse$1(v2);
  const numValues = values.length;
  return (v3) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v3[i]) : sanitize(v3[i]));
    }
    return output;
  };
}
const convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : v2;
function getAnimatableNone$1(v2) {
  const parsed = parse(v2);
  const transformer = createTransformer(v2);
  return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone: getAnimatableNone$1 };
const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v2) {
  let [name, value] = v2.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v2;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v2;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
const filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v2) => {
  const functions = v2.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
} });
const int = {
  ...number,
  transform: Math.round
};
const numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  const { style, vars, transform, transformKeys: transformKeys2, transformOrigin } = state;
  transformKeys2.length = 0;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariable$1(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
const createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformKeys: [],
  transformOrigin: {},
  vars: {}
});
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
  return react.exports.useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return props.transformValues ? props.transformValues(style) : style;
}
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  htmlProps.style = style;
  return htmlProps;
}
const animationProps = [
  "animate",
  "exit",
  "variants",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "whileInView"
];
const tapProps = ["whileTap", "onTap", "onTapStart", "onTapCancel"];
const panProps = ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"];
const inViewProps = [
  "whileInView",
  "onViewportEnter",
  "onViewportLeave",
  "viewport"
];
const validMotionProps = /* @__PURE__ */ new Set([
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "layoutDependency",
  "onLayoutAnimationStart",
  "onLayoutAnimationComplete",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "dragSnapToOrigin",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "onHoverStart",
  "onHoverEnd",
  "layoutScroll",
  ...inViewProps,
  ...tapProps,
  ...animationProps,
  ...panProps
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
function calcOrigin$1(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
const dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
const camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
function buildSVGAttrs(state, {
  attrX,
  attrY,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  ...latest
}, options, transformTemplate) {
  buildHTMLStyles(state, latest, options, transformTemplate);
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
const createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});
function useSVGProps(props, visualState) {
  const visualProps = react.exports.useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component, props, projectionId, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic);
    const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    const elementProps = {
      ...filteredProps,
      ...visualProps,
      ref
    };
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return react.exports.createElement(Component, elementProps);
  };
  return useRender;
}
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
const camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength"
]);
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
function scrapeMotionValuesFromProps$1(props) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
function scrapeMotionValuesFromProps(props) {
  const newValues = scrapeMotionValuesFromProps$1(props);
  for (const key in props) {
    if (isMotionValue(props[key])) {
      const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
const isKeyframesTarget = (v2) => {
  return Array.isArray(v2);
};
const isCustomValue = (v2) => {
  return Boolean(v2 && typeof v2 === "object" && v2.mix && v2.toValue);
};
const resolveFinalValueInKeyframes = (v2) => {
  return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
};
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
}
const makeUseVisualState = (config) => (props, isStatic) => {
  const context = react.exports.useContext(MotionContext);
  const presenceContext = react.exports.useContext(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props);
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate2 } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate2 === void 0)
      animate2 = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate2 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index2 = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index2];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
const svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};
const htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
    createRenderState: createHtmlRenderState
  })
};
function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
  const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    projectionNodeConstructor,
    Component
  };
}
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["InView"] = "whileInView";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
function useDomEvent(ref, eventName, handler, options) {
  react.exports.useEffect(() => {
    const element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}
function useFocusGesture({ whileFocus, visualElement }) {
  const { animationState } = visualElement;
  const onFocus = () => {
    animationState && animationState.setActive(AnimationType.Focus, true);
  };
  const onBlur = () => {
    animationState && animationState.setActive(AnimationType.Focus, false);
  };
  useDomEvent(visualElement, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement, "blur", whileFocus ? onBlur : void 0);
}
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  const hasTouches = !!event.touches;
  return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
  return (event) => {
    const isMouseEvent2 = event instanceof MouseEvent;
    const isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
const defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType = "page") {
  const primaryTouch = e.touches[0] || e.changedTouches[0];
  const point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType = "page") {
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType = "page") {
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
const wrapHandler = (handler, shouldFilterPrimaryPointer = false) => {
  const listener = (event) => handler(event, extractEventInfo(event));
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};
const supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
const supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
const supportsMouseEvents = () => isBrowser && window.onmousedown === null;
const mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
const touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
const globalHorizontalLock = createLock("dragHorizontal");
const globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = () => {
        openHorizontal();
        openVertical();
      };
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
function createHoverEvent(visualElement, isActive, callback) {
  return (event, info) => {
    if (!isMouseEvent(event) || isDragActive())
      return;
    if (visualElement.animationState) {
      visualElement.animationState.setActive(AnimationType.Hover, isActive);
    }
    callback && callback(event, info);
  };
}
function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement }) {
  usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement, true, onHoverStart) : void 0, { passive: !onHoverStart });
  usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
}
const isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};
function useUnmountEffect(callback) {
  return react.exports.useEffect(() => () => callback(), []);
}
function __rest(s2, e) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
        t2[p2[i]] = s2[p2[i]];
    }
  return t2;
}
var warning = function() {
};
var invariant = function() {
};
const clamp = (min, max, v2) => Math.min(Math.max(v2, min), max);
const safeMin = 1e-3;
const minDuration = 0.01;
const maxDuration = 10;
const minDamping = 0.05;
const maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3);
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f2 = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f2) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
      };
      resolveVelocity = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t2) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t2)) - envelope * (Math.cos(angularFreq * t2) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t2));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t2) => to - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const freqForT = Math.min(dampedAngularFreq * t2, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t2) => {
      const current = resolveSpring(t2);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t2) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t2 >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
const zero = (_t) => 0;
const progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
const mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
function hueToRgb(p2, q2, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p2 + (q2 - p2) * 6 * t2;
  if (t2 < 1 / 2)
    return q2;
  if (t2 < 2 / 3)
    return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
  return p2;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q2;
    red = hueToRgb(p2, q2, hue + 1 / 3);
    green = hueToRgb(p2, q2, hue);
    blue = hueToRgb(p2, q2, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
const mixLinearColor = (from, to, v2) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v2 * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v2) => colorTypes.find((type) => type.test(v2));
const mixColor = (from, to) => {
  let fromColorType = getColorType(from);
  let toColorType = getColorType(to);
  let fromColor = fromColorType.parse(from);
  let toColor = toColorType.parse(to);
  if (fromColorType === hsla) {
    fromColor = hslaToRgba(fromColor);
    fromColorType = rgba;
  }
  if (toColorType === hsla) {
    toColor = hslaToRgba(toColor);
    toColorType = rgba;
  }
  const blended = Object.assign({}, fromColor);
  return (v2) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixLinearColor(fromColor[key], toColor[key], v2);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v2);
    return fromColorType.transform(blended);
  };
};
const isNum = (v2) => typeof v2 === "number";
const combineFunctions = (a2, b2) => (v2) => b2(a2(v2));
const pipe = (...transformers) => transformers.reduce(combineFunctions);
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v2) => mix(origin, target, v2);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
const mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v2) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v2);
    }
    return output;
  };
};
const mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v2) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v2);
    }
    return output;
  };
};
function analyse(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse(origin);
  const targetStats = analyse(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    return (p2) => `${p2 > 0 ? target : origin}`;
  }
};
const mixNumber = (from, to) => (p2) => mix(from, to, p2);
function detectMixerFactory(v2) {
  if (typeof v2 === "number") {
    return mixNumber;
  } else if (typeof v2 === "string") {
    if (color.test(v2)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v2)) {
    return mixArray;
  } else if (typeof v2 === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v2) => mixer(progress(from, to, v2));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v2) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v2 <= input[0]) {
      foundMixerIndex = true;
    } else if (v2 >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v2 || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v2);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length);
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1);
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
}
const reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
const mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
const createExpoIn = (power) => (p2) => Math.pow(p2, power);
const createBackIn = (power) => (p2) => p2 * p2 * ((power + 1) * p2 - power);
const createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p2) => (p2 *= 2) < 1 ? 0.5 * backEasing(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
};
const DEFAULT_OVERSHOOT_STRENGTH = 1.525;
const BOUNCE_FIRST_THRESHOLD = 4 / 11;
const BOUNCE_SECOND_THRESHOLD = 8 / 11;
const BOUNCE_THIRD_THRESHOLD = 9 / 10;
const linear = (p2) => p2;
const easeIn = createExpoIn(2);
const easeOut = reverseEasing(easeIn);
const easeInOut = mirrorEasing(easeIn);
const circIn = (p2) => 1 - Math.sin(Math.acos(p2));
const circOut = reverseEasing(circIn);
const circInOut = mirrorEasing(circOut);
const backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
const backOut = reverseEasing(backIn);
const backInOut = mirrorEasing(backIn);
const anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
const ca$1 = 4356 / 361;
const cb$2 = 35442 / 1805;
const cc$1 = 16061 / 1805;
const bounceOut = (p2) => {
  if (p2 === 1 || p2 === 0)
    return p2;
  const p22 = p2 * p2;
  return p2 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p2 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p2 + 3.4 : p2 < BOUNCE_THIRD_THRESHOLD ? ca$1 * p22 - cb$2 * p2 + cc$1 : 10.8 * p2 * p2 - 20.52 * p2 + 10.72;
};
const bounceIn = reverseEasing(bounceOut);
const bounceInOut = (p2) => p2 < 0.5 ? 0.5 * (1 - bounceOut(1 - p2 * 2)) : 0.5 * bounceOut(p2 * 2 - 1) + 0.5;
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes$1({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t2) => {
      state.value = interpolator(t2);
      state.done = t2 >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t2) => {
      const delta = -amplitude * Math.exp(-t2 / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}
const types = { keyframes: keyframes$1, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes$1;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes$1;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes$1;
}
const defaultTimestep = 1 / 60 * 1e3;
const getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
const onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index2 = toRunNextFrame.indexOf(callback);
      if (index2 !== -1)
        toRunNextFrame.splice(index2, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
  delta: 0,
  timestamp: 0
};
const stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
const steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
const sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process2, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
const cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
const flushSync = stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
const startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
const getFrameData = () => frame;
function loopElapsed(elapsed, duration, delay2 = 0) {
  return elapsed - duration - delay2;
}
function reverseElapsed(elapsed, duration, delay2 = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay2) : duration - (elapsed - duration) + delay2;
}
function hasRepeatDelayElapsed(elapsed, duration, delay2, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay2 : elapsed <= -delay2;
}
const framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => sync.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate$1(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v2) {
    return min !== void 0 && v2 < min || max !== void 0 && v2 > max;
  }
  function boundaryNearest(v2) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
  }
  function startAnimation2(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate$1(Object.assign(Object.assign({}, options), {
      driver,
      onUpdate: (v2) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v2);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v2);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v2) => {
      prev = current;
      current = v2;
      velocity = velocityPerSecond(v2 - prev, getFrameData().delta);
      if (heading === 1 && v2 > boundary || heading === -1 && v2 < boundary) {
        startSpring({ from: v2, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}
const isPoint = (point) => point.hasOwnProperty("x") && point.hasOwnProperty("y");
const isPoint3D = (point) => isPoint(point) && point.hasOwnProperty("z");
const distance1D = (a2, b2) => Math.abs(a2 - b2);
function distance(a2, b2) {
  if (isNum(a2) && isNum(b2)) {
    return distance1D(a2, b2);
  } else if (isPoint(a2) && isPoint(b2)) {
    const xDelta = distance1D(a2.x, b2.x);
    const yDelta = distance1D(a2.y, b2.y);
    const zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}
const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
const b = (a1, a2) => 3 * a2 - 6 * a1;
const c = (a1) => 3 * a1;
const calcBezier = (t2, a1, a2) => ((a(a1, a2) * t2 + b(a1, a2)) * t2 + c(a1)) * t2;
const getSlope = (t2, a1, a2) => 3 * a(a1, a2) * t2 * t2 + 2 * b(a1, a2) * t2 + c(a1);
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
const newtonIterations = 8;
const newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < newtonIterations; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
const kSplineTableSize = 11;
const kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}
function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement }) {
  const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  const isPressing = react.exports.useRef(false);
  const cancelPointerEndListeners = react.exports.useRef(null);
  const eventOptions = {
    passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
  };
  function removePointerEndListener() {
    cancelPointerEndListeners.current && cancelPointerEndListeners.current();
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    removePointerEndListener();
    isPressing.current = false;
    visualElement.animationState && visualElement.animationState.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement.current, event.target) ? onTapCancel && onTapCancel(event, info) : onTap && onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel && onTapCancel(event, info);
  }
  function onPointerDown(event, info) {
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
    visualElement.animationState && visualElement.animationState.setActive(AnimationType.Tap, true);
    onTapStart && onTapStart(event, info);
  }
  usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
  useUnmountEffect(removePointerEndListener);
}
const defaultEnvironment = "production";
const env = typeof process === "undefined" || process.env === void 0 ? defaultEnvironment : "production";
const warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
function useViewport({ visualElement, whileInView, onViewportEnter, onViewportLeave, viewport = {} }) {
  const state = react.exports.useRef({
    hasEnteredView: false,
    isInView: false
  });
  let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
  if (viewport.once && state.current.hasEnteredView)
    shouldObserve = false;
  const useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
  useObserver(shouldObserve, state.current, visualElement, viewport);
}
const thresholdNames = {
  some: 0,
  all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement, { root, margin: rootMargin, amount = "some", once }) {
  react.exports.useEffect(() => {
    if (!shouldObserve || !visualElement.current)
      return;
    const options = {
      root: root === null || root === void 0 ? void 0 : root.current,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const intersectionCallback = (entry) => {
      const { isIntersecting } = entry;
      if (state.isInView === isIntersecting)
        return;
      state.isInView = isIntersecting;
      if (once && !isIntersecting && state.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        state.hasEnteredView = true;
      }
      if (visualElement.animationState) {
        visualElement.animationState.setActive(AnimationType.InView, isIntersecting);
      }
      const props = visualElement.getProps();
      const callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(visualElement.current, options, intersectionCallback);
  }, [shouldObserve, root, rootMargin, amount]);
}
function useMissingIntersectionObserver(shouldObserve, state, visualElement, { fallback = true }) {
  react.exports.useEffect(() => {
    if (!shouldObserve || !fallback)
      return;
    if (env !== "production") {
      warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
    }
    requestAnimationFrame(() => {
      state.hasEnteredView = true;
      const { onViewportEnter } = visualElement.getProps();
      onViewportEnter && onViewportEnter(null);
      if (visualElement.animationState) {
        visualElement.animationState.setActive(AnimationType.InView, true);
      }
    });
  }, [shouldObserve]);
}
const makeRenderlessComponent = (hook) => (props) => {
  hook(props);
  return null;
};
const gestureAnimations = {
  inView: makeRenderlessComponent(useViewport),
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};
function usePresence() {
  const context = react.exports.useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id2 = react.exports.useId();
  react.exports.useEffect(() => register(id2), []);
  const safeToRemove = () => onExitComplete && onExitComplete(id2);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
const secondsToMilliseconds = (seconds) => seconds * 1e3;
const easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
const easingDefinitionToFunction = (definition) => {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    return easingLookup[definition];
  }
  return definition;
};
const isEasingArray = (ease) => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};
const isAnimatable = (key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};
const underDampedSpring = () => ({
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
});
const criticallyDampedSpring = (to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
const linearTween = () => ({
  type: "keyframes",
  ease: "linear",
  duration: 0.3
});
const keyframes = (values) => ({
  type: "keyframes",
  duration: 0.8,
  values
});
const defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
const getDefaultTransition = (valueKey, to) => {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return { to, ...transitionFactory(to) };
};
const defaultValueTypes = {
  ...numberValueTypes,
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
const getDefaultValueType = (key) => defaultValueTypes[key];
function getAnimatableNone(key, value) {
  var _a;
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
const instantAnimationState = {
  current: false
};
function delay(callback, timeout) {
  const start = performance.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelSync.read(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  sync.read(checkElapsed, true);
  return () => cancelSync.read(checkElapsed);
}
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, ...transition }) {
  return !!Object.keys(transition).length;
}
function convertTransitionToAnimationOptions({ ease, times, yoyo, flip, loop, ...transition }) {
  const options = { ...transition };
  if (times)
    options["offset"] = times;
  if (transition.duration)
    options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options.type = "keyframes";
  if (yoyo || loop || flip) {
    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }
    options.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options.type = "keyframes";
  return options;
}
function getDelayFromTransition(transition, key) {
  var _a, _b;
  const valueTransition = getValueTransition(transition, key) || {};
  return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to) && transition.duration === void 0) {
    transition.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to)
    };
  }
  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition)
  };
}
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key) || {};
  let origin = valueTransition.from !== void 0 ? valueTransition.from : value.get();
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  const isOriginAnimatable = isAnimatable(key, origin);
  function start() {
    const options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: (v2) => value.set(v2)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia({ ...options, ...valueTransition }) : animate$1({
      ...getPopmotionAnimationOptions(valueTransition, options, key),
      onUpdate: (v2) => {
        options.onUpdate(v2);
        valueTransition.onUpdate && valueTransition.onUpdate(v2);
      },
      onComplete: () => {
        options.onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      }
    });
  }
  function set() {
    const finalTarget = resolveFinalValueInKeyframes(target);
    value.set(finalTarget);
    onComplete();
    valueTransition.onUpdate && valueTransition.onUpdate(finalTarget);
    valueTransition.onComplete && valueTransition.onComplete();
    return { stop: () => {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition = {}) {
  if (instantAnimationState.current) {
    transition = { type: false };
  }
  return value.start((onComplete) => {
    let controls;
    const animation = getAnimation(key, value, target, transition, onComplete);
    const delayBy = getDelayFromTransition(transition, key);
    const start = () => controls = animation();
    let cancelDelay;
    if (delayBy) {
      cancelDelay = delay(start, secondsToMilliseconds(delayBy));
    } else {
      start();
    }
    return () => {
      cancelDelay && cancelDelay();
      controls && controls.stop();
    };
  });
}
const isNumericalString = (v2) => /^\-?\d*\.?\d+$/.test(v2);
const isZeroValueString = (v2) => /^0[^.\s]+$/.test(v2);
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index2 = arr.indexOf(item);
  if (index2 > -1)
    arr.splice(index2, 1);
}
class SubscriptionManager {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a2, b2, c2) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b2, c2);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a2, b2, c2);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
class MotionValue {
  constructor(init) {
    this.version = "7.6.15";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = (v2, render2 = true) => {
      this.prev = this.current;
      this.current = v2;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
        sync.postRender(this.scheduleVelocityCheck);
      }
      if (this.prev !== this.current) {
        this.updateSubscribers.notify(this.current);
      }
      if (this.velocityUpdateSubscribers.getSize()) {
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
      if (render2) {
        this.renderSubscribers.notify(this.current);
      }
    };
    this.scheduleVelocityCheck = () => sync.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  onRenderRequest(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  }
  attach(passiveEffect) {
    this.passiveEffect = passiveEffect;
  }
  set(v2, render2 = true) {
    if (!render2 || !this.passiveEffect) {
      this.updateAndNotify(v2, render2);
    } else {
      this.passiveEffect(v2, this.updateAndNotify);
    }
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.stopAnimation = animation(resolve);
    }).then(() => this.clearAnimation());
  }
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  }
}
function motionValue(init) {
  return new MotionValue(init);
}
const testValueType = (v2) => (type) => type.test(v2);
const auto = {
  test: (v2) => v2 === "auto",
  parse: (v2) => v2
};
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
const findDimensionValueType = (v2) => dimensionValueTypes.find(testValueType(v2));
const valueTypes = [...dimensionValueTypes, color, complex];
const findValueType = (v2) => valueTypes.find(testValueType(v2));
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
function getVelocity$1(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity$1(visualElement));
}
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
function checkTargetForNewValues(visualElement, target, origin) {
  var _a, _b;
  const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i = 0; i < numNewValues; i++) {
    const key = newValueKeys[i];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone(key, targetValue);
    }
    visualElement.addValue(key, motionValue(value));
    if (origin[key] === void 0) {
      origin[key] = value;
    }
    if (value !== null)
      visualElement.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  const valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement) {
  var _a;
  const origin = {};
  for (const key in target) {
    const transitionOrigin = getOriginFromTransition(key, transition);
    origin[key] = transitionOrigin !== void 0 ? transitionOrigin : (_a = visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.get();
  }
  return origin;
}
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = animateTarget(visualElement, resolvedDefinition, options);
  }
  return animation.then(() => visualElement.notify("AnimationComplete", definition));
}
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement, variant, options.custom);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation2 = resolved ? () => animateTarget(visualElement, resolved, options) : () => Promise.resolve();
  const getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  var _a;
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && ((_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
  for (const key in target) {
    const value = visualElement.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    let valueTransition = { delay: delay2, ...transition };
    if (visualElement.shouldReduceMotion && transformProps.has(key)) {
      valueTransition = {
        ...valueTransition,
        type: false,
        delay: 0
      };
    }
    let animation = startAnimation(key, value, valueTarget, valueTransition);
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation = animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  return Promise.all(animations2).then(() => {
    transitionEnd && setTarget(visualElement, transitionEnd);
  });
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
const variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.InView,
  AnimationType.Focus,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Exit
];
const reversePriorityOrder = [...variantPriorityOrder].reverse();
const numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate2 = animateList(visualElement);
  const state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (acc, definition) => {
    const resolved = resolveVariant(visualElement, definition);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        removedKeys.delete(key);
        typeState.needsAnimating[key] = true;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev) || variantDidChange) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type, ...options }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    [AnimationType.Animate]: createTypeState(true),
    [AnimationType.InView]: createTypeState(),
    [AnimationType.Hover]: createTypeState(),
    [AnimationType.Tap]: createTypeState(),
    [AnimationType.Drag]: createTypeState(),
    [AnimationType.Focus]: createTypeState(),
    [AnimationType.Exit]: createTypeState()
  };
}
const animations = {
  animation: makeRenderlessComponent(({ visualElement, animate: animate2 }) => {
    visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
    if (isAnimationControls(animate2)) {
      react.exports.useEffect(() => animate2.subscribe(visualElement), [animate2]);
    }
  }),
  exit: makeRenderlessComponent((props) => {
    const { custom, visualElement } = props;
    const [isPresent, safeToRemove] = usePresence();
    const presenceContext = react.exports.useContext(PresenceContext);
    react.exports.useEffect(() => {
      visualElement.isPresent = isPresent;
      const animation = visualElement.animationState && visualElement.animationState.setActive(AnimationType.Exit, !isPresent, {
        custom: presenceContext && presenceContext.custom || custom
      });
      if (animation && !isPresent) {
        animation.then(safeToRemove);
      }
    }, [isPresent]);
  })
};
class PanSession {
  constructor(event, handlers, { transformPagePoint } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = getFrameData();
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        this.handlePointerUp(event2, info2);
        return;
      }
      sync.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd } = this.handlers;
      const panInfo = getPanInfo(transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = getFrameData();
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  }
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target = 0, maxDistance = 0.01) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
  calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
const defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
const createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
const createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
  x: createAxis(),
  y: createAxis()
});
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x: x2, y: y2 }) {
  return { top: y2.min, right: x2.max, bottom: y2.max, left: x2.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x: x2, y: y2 }) {
  applyAxisDelta(box.x, x2.translate, x2.scale, x2.originPoint);
  applyAxisDelta(box.y, y2.translate, y2.scale, y2.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  var _a, _b;
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
      continue;
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  treeScale.x = snapToDefault(treeScale.x);
  treeScale.y = snapToDefault(treeScale.y);
}
function snapToDefault(scale2) {
  if (Number.isInteger(scale2))
    return scale2;
  return scale2 > 1.0000000000001 || scale2 < 0.999999999999 ? scale2 : 1;
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
  const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  const originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
const xKeys$1 = ["x", "scaleX", "originX"];
const yKeys$1 = ["y", "scaleY", "originY"];
function transformBox(box, transform) {
  transformAxis(box.x, transform, xKeys$1);
  transformAxis(box.y, transform, yKeys$1);
}
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}
const elementDragControls = /* @__PURE__ */ new WeakMap();
class VisualElementDragControls {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    if (this.visualElement.isPresent === false)
      return;
    const onSessionStart = (event) => {
      this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    const onStart = (event, info) => {
      var _a;
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        var _a2, _b;
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const measuredAxis = (_b = (_a2 = this.visualElement.projection) === null || _a2 === void 0 ? void 0 : _a2.layout) === null || _b === void 0 ? void 0 : _b.layoutBox[axis];
          if (measuredAxis) {
            const length = calcLength(measuredAxis);
            current = length * (parseFloat(current) / 100);
          }
        }
        this.originPoint[axis] = current;
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
      (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  }
  cancel() {
    var _a, _b;
    this.isDragging = false;
    if (this.visualElement.projection) {
      this.visualElement.projection.isAnimationBlocked = false;
    }
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const { layout } = this.visualElement.projection || {};
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      var _a;
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    return startAnimation(axis, axisValue, 0, transition);
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  getAxisMotionValue(axis) {
    var _a, _b;
    const dragKey = "_drag" + axis.toUpperCase();
    const externalMotionValue = this.visualElement.getProps()[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mix(min, max, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    var _a;
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    var _a;
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
function useDrag(props) {
  const { dragControls: groupDragControls, visualElement } = props;
  const dragControls = useConstant(() => new VisualElementDragControls(visualElement));
  react.exports.useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
  react.exports.useEffect(() => dragControls.addListeners(), [dragControls]);
}
function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement }) {
  const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  const panSession = react.exports.useRef(null);
  const { transformPagePoint } = react.exports.useContext(MotionConfigContext);
  const handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  react.exports.useEffect(() => {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });
  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint
    });
  }
  usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(() => panSession.current && panSession.current.end());
}
const drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};
function isCSSVariable(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
}
function getVariableValue(current, element, depth = 1) {
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
  const element = visualElement.current;
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = { ...transitionEnd };
  }
  visualElement.values.forEach((value) => {
    const current = value.get();
    if (!isCSSVariable(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariable(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd && transitionEnd[key] === void 0) {
      transitionEnd[key] = current;
    }
  }
  return { target, transitionEnd };
}
const positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
const isPositionalKey = (key) => positionalKeys.has(key);
const hasPositionalKey = (target) => {
  return Object.keys(target).some(isPositionalKey);
};
const setAndResetVelocity = (value, to) => {
  value.set(to, false);
  value.set(to);
};
const isNumOrPxType = (v2) => v2 === number || v2 === px;
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
  if (transform === "none" || !transform)
    return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement.render();
  return removedTransforms;
}
const positionalValues = {
  width: ({ x: x2 }, { paddingLeft = "0", paddingRight = "0" }) => x2.max - x2.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y: y2 }, { paddingTop = "0", paddingBottom = "0" }) => y2.max - y2.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y: y2 }, { top }) => parseFloat(top) + (y2.max - y2.min),
  right: ({ x: x2 }, { left }) => parseFloat(left) + (x2.max - x2.min),
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
const convertChangedValueTypes = (target, visualElement, changedKeys) => {
  const originBbox = visualElement.measureViewportBox();
  const element = visualElement.current;
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement.render();
  const targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    setAndResetVelocity(value, origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
const checkAndConvertChangedValueTypes = (visualElement, target, origin = {}, transitionEnd = {}) => {
  target = { ...target };
  transitionEnd = { ...transitionEnd };
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (!visualElement.hasValue(key))
      return;
    let from = origin[key];
    let fromType = findDimensionValueType(from);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (let i = fromIndex; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
        } else {
          invariant(findDimensionValueType(to[i]) === toType);
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement.getValue(key).set(value);
      });
    }
    visualElement.render();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : { target, transitionEnd };
}
const parseDomVariant = (visualElement, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
};
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function updateMotionValuesFromProps(element, next, prev) {
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
const featureNames = Object.keys(featureDefinitions);
const numFeatures = featureNames.length;
const propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "Unmount",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class VisualElement {
  constructor({ parent, props, reducedMotionConfig, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.isPresent = true;
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => sync.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  scrapeMotionValuesFromProps(_props) {
    return {};
  }
  mount(instance) {
    var _a;
    this.current = instance;
    if (this.projection) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (this.parent)
      this.parent.children.add(this);
    this.setProps(this.props);
  }
  unmount() {
    var _a, _b, _c;
    (_a = this.projection) === null || _a === void 0 ? void 0 : _a.unmount();
    cancelSync.update(this.notifyUpdate);
    cancelSync.render(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    (_b = this.removeFromVariantTree) === null || _b === void 0 ? void 0 : _b.call(this);
    (_c = this.parent) === null || _c === void 0 ? void 0 : _c.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const valueIsTransform = transformProps.has(key);
    const removeOnChange = value.onChange((latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && sync.update(this.notifyUpdate, false, true);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.onRenderRequest(this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type)
      return 0;
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures(renderedProps, isStrict, preloadedFeatures, projectionId, ProjectionNodeConstructor, initialLayoutGroupConfig) {
    const features2 = [];
    for (let i = 0; i < numFeatures; i++) {
      const name = featureNames[i];
      const { isEnabled, Component } = featureDefinitions[name];
      if (isEnabled(renderedProps) && Component) {
        features2.push(react.exports.createElement(Component, {
          key: name,
          ...renderedProps,
          visualElement: this
        }));
      }
    }
    if (!this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(projectionId, this.latestValues, this.parent && this.parent.projection);
      const { layoutId, layout, drag: drag2, dragConstraints, layoutScroll } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll
      });
    }
    return features2;
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  makeTargetAnimatable(target, canMutate = true) {
    return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
  }
  setProps(props) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.props = props;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listener = props["on" + key];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props), this.prevMotionValues);
  }
  getProps() {
    return this.props;
  }
  getVariant(name) {
    var _a;
    return (_a = this.props.variants) === null || _a === void 0 ? void 0 : _a[name];
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    var _a;
    return this.isVariantNode ? this : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getClosestVariantNode();
  }
  getVariantContext(startAtParent = false) {
    var _a, _b;
    if (startAtParent)
      return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getVariantContext();
    if (!this.isControllingVariants) {
      const context2 = ((_b = this.parent) === null || _b === void 0 ? void 0 : _b.getVariantContext()) || {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps[i];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  addVariantChild(child) {
    var _a;
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  addValue(key, value) {
    if (this.hasValue(key))
      this.removeValue(key);
    this.values.set(key, value);
    this.latestValues[key] = value.get();
    this.bindToMotionValue(key, value);
  }
  removeValue(key) {
    var _a;
    this.values.delete(key);
    (_a = this.valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
    this.valueSubscriptions.delete(key);
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue);
      this.addValue(key, value);
    }
    return value;
  }
  readValue(key) {
    return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.readValueFromInstance(this.current, key, this.options);
  }
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a = resolveVariantFromProps(this.props, initial)) === null || _a === void 0 ? void 0 : _a[key] : void 0;
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    var _a;
    (_a = this.events[eventName]) === null || _a === void 0 ? void 0 : _a.notify(...args);
  }
}
const variantProps = ["initial", ...variantPriorityOrder];
const numVariantProps = variantProps.length;
class DOMVisualElement extends VisualElement {
  sortInstanceNodePosition(a2, b2) {
    return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }, { transformValues }, isMounted) {
    let origin = getOrigin(target, transition || {}, this);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(this, target, origin);
      const parsed = parseDomVariant(this, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return {
      transition,
      transitionEnd,
      ...target
    };
  }
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle$1(instance);
      const value = (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props) {
    return scrapeMotionValuesFromProps$1(props);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
}
class SVGVisualElement extends DOMVisualElement {
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    var _a;
    if (transformProps.has(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props) {
    return scrapeMotionValuesFromProps(props);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
}
const createDomVisualElement = (Component, options) => {
  return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
};
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
const correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x2 = pixelsToPercent(latest, node.target.x);
    const y2 = pixelsToPercent(latest, node.target.y);
    return `${x2}% ${y2}%`;
  }
};
const varToken = "_$css";
const correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const containsCSSVariables = latest.includes("var(");
    const cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, (match) => {
        cssVariables.push(match);
        return varToken;
      });
    }
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    let output = template(shadow);
    if (containsCSSVariables) {
      let i = 0;
      output = output.replace(varToken, () => {
        const cssVariable = cssVariables[i];
        i++;
        return cssVariable;
      });
    }
    return output;
  }
};
class MeasureLayoutWithContext extends React.Component {
  componentDidMount() {
    const {
      visualElement,
      layoutGroup,
      switchLayoutGroup,
      layoutId
    } = this.props;
    const {
      projection
    } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const {
      layoutDependency,
      visualElement,
      drag: drag2,
      isPresent
    } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        sync.postRender(() => {
          var _a;
          if (!((_a = projection.getStack()) === null || _a === void 0 ? void 0 : _a.members.length)) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const {
      projection
    } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  }
  componentWillUnmount() {
    const {
      visualElement,
      layoutGroup,
      switchLayoutGroup: promoteContext
    } = this.props;
    const {
      projection
    } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const {
      safeToRemove
    } = this.props;
    safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
  }
  render() {
    return null;
  }
}
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = react.exports.useContext(LayoutGroupContext);
  return /* @__PURE__ */ jsx(MeasureLayoutWithContext, {
    ...props,
    layoutGroup,
    switchLayoutGroup: react.exports.useContext(SwitchLayoutGroupContext),
    isPresent,
    safeToRemove
  });
}
const defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
const layoutFeatures = {
  measureLayout: MeasureLayout
};
function animate(from, to, transition = {}) {
  const value = isMotionValue(from) ? from : motionValue(from);
  startAnimation("", value, to, transition);
  return {
    stop: () => value.stop(),
    isAnimating: () => value.isAnimating()
  };
}
const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  var _a, _b, _c, _d;
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  var _a;
  return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
const easeCrossfadeIn = compress(0, 0.5, circOut);
const easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
  return (p2) => {
    if (p2 < min)
      return 0;
    if (p2 > max)
      return 1;
    return easing(progress(min, max, p2));
  };
}
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
  removeAxisTransforms(box.y, transforms, yKeys, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a2, b2) {
  return a2.x.min === b2.x.min && a2.x.max === b2.x.max && a2.y.min === b2.y.min && a2.y.max === b2.y.max;
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
class NodeStack {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    var _a;
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      var _a, _b, _c, _d, _e;
      (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
}
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  if (xTranslate || yTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform += `rotate(${rotate}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}
const compareByDepth = (a2, b2) => a2.depth - b2.depth;
class FlatTree {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
}
const transformAxes = ["", "X", "Y", "Z"];
const animationTarget = 1e3;
let id$1 = 0;
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(elementId, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id$1++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isTransformDirty = false;
      this.isProjectionDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.potentialNodes = /* @__PURE__ */ new Map();
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.elementId = elementId;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      elementId && this.root.registerPotentialNode(elementId, this);
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    registerPotentialNode(elementId, node) {
      this.potentialNodes.set(elementId, node);
    }
    mount(instance, isLayoutDirty = false) {
      var _a;
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      const { layoutId, layout, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
      this.elementId && this.root.potentialNodes.delete(this.elementId);
      if (isLayoutDirty && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          var _a2, _b, _c, _d, _e;
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = (_b = (_a2 = this.options.transition) !== null && _a2 !== void 0 ? _a2 : visualElement.getDefaultTransition()) !== null && _b !== void 0 ? _b : defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEquals(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (((_c = this.resumeFrom) === null || _c === void 0 ? void 0 : _c.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && this.animationProgress === 0) {
              finishAnimation(this);
            }
            this.isLead() && ((_e = (_d = this.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d));
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      var _a, _b;
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.remove(this);
      (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      var _a;
      return this.isAnimationBlocked || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimationBlocked()) || false;
    }
    startUpdate() {
      var _a;
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(resetRotation);
      this.animationId++;
    }
    willUpdate(shouldNotifyListeners = true) {
      var _a, _b, _c;
      if (this.root.isUpdateBlocked()) {
        (_b = (_a = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
      }
      const { layoutId, layout } = this.options;
      if (layoutId === void 0 && !layout)
        return;
      const transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
      this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating)
        return;
      this.isUpdating = false;
      if (this.potentialNodes.size) {
        this.potentialNodes.forEach(mountNodeEarly);
        this.potentialNodes.clear();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      flushSync.update();
      flushSync.preRender();
      flushSync.render();
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      sync.preRender(this.updateProjection, false, true);
    }
    scheduleCheckAfterUnmount() {
      sync.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      var _a;
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notify("LayoutMeasure", this.layout.layoutBox, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.layoutBox);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot: checkIsScrollRoot(this.instance),
          offset: measureScroll(this.instance)
        };
      }
    }
    resetTransform() {
      var _a;
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      const transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll } = this.root;
      if (scroll) {
        translateAxis(box.x, scroll.offset.x);
        translateAxis(box.y, scroll.offset.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.isRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.offset.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.offset.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      var _a;
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layoutBox, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.isProjectionDirty = true;
      this.root.scheduleUpdateProjection();
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    resolveTargetDelta() {
      var _a;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      if (!this.isProjectionDirty && !this.attemptToResolveRelativeTarget)
        return;
      const { layout, layoutId } = this.options;
      if (!this.layout || !(layout || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues))
        return void 0;
      if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    calcProjection() {
      var _a;
      const { isProjectionDirty, isTransformDirty } = this;
      this.isProjectionDirty = this.isTransformDirty = false;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (isProjectionDirty)
        canSkip = false;
      if (isShared && isTransformDirty)
        canSkip = false;
      if (canSkip)
        return;
      const { layout, layoutId } = this.options;
      this.isTreeAnimating = Boolean(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      const { target } = lead;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      var _a, _b, _c;
      (_b = (_a = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a);
      notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      var _a, _b;
      const snapshot = this.snapshot;
      const snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const isSharedLayoutAnimation = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.source) !== ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.source);
      const isOnlyMember = (((_b = this.getStack()) === null || _b === void 0 ? void 0 : _b.members.length) || 0) <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      this.mixTargetDelta = (latest) => {
        var _a2;
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.layout)) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(0);
    }
    startAnimation(options) {
      var _a, _b;
      this.notifyListeners("animationStart");
      (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      if (this.resumingFrom) {
        (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = sync.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animate(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            var _a2;
            this.mixTargetDelta(latest);
            (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, latest);
          },
          onComplete: () => {
            var _a2;
            (_a2 = options.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(options);
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      var _a;
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      var _a;
      if (this.currentAnimation) {
        (_a = this.mixTargetDelta) === null || _a === void 0 ? void 0 : _a.call(this, animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout)
        return;
      if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      var _a, _b, _c;
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      node.promote({
        transition: (_a = node.options.initialPromotionConfig) === null || _a === void 0 ? void 0 : _a.transition,
        preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasRotate = false;
      const { latestValues } = visualElement;
      if (latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ) {
        hasRotate = true;
      }
      if (!hasRotate)
        return;
      const resetValues = {};
      for (let i = 0; i < transformAxes.length; i++) {
        const key = "rotate" + transformAxes[i];
        if (latestValues[key]) {
          resetValues[key] = latestValues[key];
          visualElement.setStaticValue(key, 0);
        }
      }
      visualElement === null || visualElement === void 0 ? void 0 : visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp = {}) {
      var _a, _b, _c;
      const styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x: x2, y: y2 } = this.projectionDelta;
      styles.transformOrigin = `${x2.origin * 100}% ${y2.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_c = (_b = valuesToRender.opacity) !== null && _b !== void 0 ? _b : this.latestValues.opacity) !== null && _c !== void 0 ? _c : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a, _b, _c;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    (_c = (_b = node.options).onExitComplete) === null || _c === void 0 ? void 0 : _c.call(_b);
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  node.isProjectionDirty || (node.isProjectionDirty = Boolean(node.parent && node.parent.isProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = Boolean(node.parent && node.parent.isTransformDirty));
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement === null || visualElement === void 0 ? void 0 : visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetRotation(node) {
  node.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p2) {
  output.translate = mix(delta.translate, 0, p2);
  output.scale = mix(delta.scale, 1, p2);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p2) {
  output.min = mix(from.min, to.min, p2);
  output.max = mix(from.max, to.max, p2);
}
function mixBox(output, from, to, p2) {
  mixAxis(output.x, from.x, to.x, p2);
  mixAxis(output.y, from.y, to.y, p2);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
const defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node, elementId) {
  let searchNode = node.root;
  for (let i = node.path.length - 1; i >= 0; i--) {
    if (Boolean(node.path[i].instance)) {
      searchNode = node.path[i];
      break;
    }
  }
  const searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
  const element = searchElement.querySelector(`[data-projection-id="${elementId}"]`);
  if (element)
    node.mount(element, true);
}
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout), 0.2);
}
const DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});
const rootProjectionNode = {
  current: void 0
};
const HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});
const featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layoutFeatures
};
const motion = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, featureBundle, createDomVisualElement, HTMLProjectionNode));
function Navbar({
  setActiveSection
}) {
  return /* @__PURE__ */ jsxs(motion.div, {
    initial: {
      y: -100
    },
    animate: {
      y: 0
    },
    className: "navbar bg-black bg-opacity-20 dark:bg-stone900 dark:bg-opacity-60 h-min fixed lg:px-12 z-10",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex-1",
      children: /* @__PURE__ */ jsx("span", {
        className: "btn btn-ghost normal-case text-xl",
        children: /* @__PURE__ */ jsx("a", {
          href: "https://github.com/GabrielRuizVarela",
          children: /* @__PURE__ */ jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            className: "fill-white ",
            children: /* @__PURE__ */ jsx("path", {
              d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            })
          })
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-none",
      children: /* @__PURE__ */ jsxs("ul", {
        className: "menu menu-horizontal p-0",
        children: [/* @__PURE__ */ jsx("li", {
          className: "xs:hidden sm:block",
          children: /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setActiveSection(0),
            children: "About"
          })
        }), /* @__PURE__ */ jsx("li", {
          className: "xs:hidden sm:block",
          children: /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setActiveSection(1),
            children: "Projects"
          })
        }), /* @__PURE__ */ jsx("li", {
          className: "xs:hidden sm:block",
          children: /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setActiveSection(3),
            children: "Skills"
          })
        }), /* @__PURE__ */ jsx("li", {
          className: "xs:hidden sm:block",
          children: /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setActiveSection(4),
            children: "Contact"
          })
        }), /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsxs("label", {
            className: "swap swap-rotate h-5 self-center",
            children: [/* @__PURE__ */ jsx("input", {
              name: "theme",
              type: "checkbox",
              onClick: () => {
                const body = document.querySelector("html");
                body == null ? void 0 : body.classList.toggle("dark");
              }
            }), /* @__PURE__ */ jsx("svg", {
              className: "swap-on fill-current w-5 h-5",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                d: "M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
              })
            }), /* @__PURE__ */ jsx("svg", {
              className: "swap-off fill-current w-5 h-5",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                d: "M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
              })
            })]
          })
        })]
      })
    })]
  });
}
var reactDomServerLegacy_browser_production_min = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa$1 = react.exports;
function l$2(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var p$1 = Object.prototype.hasOwnProperty, fa$1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ha$1 = {}, ia$1 = {};
function ja$1(a2) {
  if (p$1.call(ia$1, a2))
    return true;
  if (p$1.call(ha$1, a2))
    return false;
  if (fa$1.test(a2))
    return ia$1[a2] = true;
  ha$1[a2] = true;
  return false;
}
function r(a2, b2, c2, d, f2, e, g) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d;
  this.attributeNamespace = f2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = e;
  this.removeEmptyString = g;
}
var t$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  t$1[a2] = new r(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  t$1[b2] = new r(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  t$1[a2] = new r(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  t$1[a2] = new r(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  t$1[a2] = new r(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  t$1[a2] = new r(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  t$1[a2] = new r(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  t$1[a2] = new r(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  t$1[a2] = new r(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ka$1 = /[\-:]([a-z])/g;
function la$1(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ka$1,
    la$1
  );
  t$1[b2] = new r(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ka$1, la$1);
  t$1[b2] = new r(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ka$1, la$1);
  t$1[b2] = new r(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  t$1[a2] = new r(a2, 1, false, a2.toLowerCase(), null, false, false);
});
t$1.xlinkHref = new r("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  t$1[a2] = new r(a2, 1, false, a2.toLowerCase(), null, true, true);
});
var u$1 = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, ma = ["Webkit", "ms", "Moz", "O"];
Object.keys(u$1).forEach(function(a2) {
  ma.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    u$1[b2] = u$1[a2];
  });
});
var na = /["'&<>]/;
function v(a2) {
  if ("boolean" === typeof a2 || "number" === typeof a2)
    return "" + a2;
  a2 = "" + a2;
  var b2 = na.exec(a2);
  if (b2) {
    var c2 = "", d, f2 = 0;
    for (d = b2.index; d < a2.length; d++) {
      switch (a2.charCodeAt(d)) {
        case 34:
          b2 = "&quot;";
          break;
        case 38:
          b2 = "&amp;";
          break;
        case 39:
          b2 = "&#x27;";
          break;
        case 60:
          b2 = "&lt;";
          break;
        case 62:
          b2 = "&gt;";
          break;
        default:
          continue;
      }
      f2 !== d && (c2 += a2.substring(f2, d));
      f2 = d + 1;
      c2 += b2;
    }
    a2 = f2 !== d ? c2 + a2.substring(f2, d) : c2;
  }
  return a2;
}
var oa$1 = /([A-Z])/g, pa$1 = /^ms-/, qa$1 = Array.isArray;
function w$1(a2, b2) {
  return { insertionMode: a2, selectedValue: b2 };
}
function ra$1(a2, b2, c2) {
  switch (b2) {
    case "select":
      return w$1(1, null != c2.value ? c2.value : c2.defaultValue);
    case "svg":
      return w$1(2, null);
    case "math":
      return w$1(3, null);
    case "foreignObject":
      return w$1(1, null);
    case "table":
      return w$1(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return w$1(5, null);
    case "colgroup":
      return w$1(7, null);
    case "tr":
      return w$1(6, null);
  }
  return 4 <= a2.insertionMode || 0 === a2.insertionMode ? w$1(1, null) : a2;
}
var sa$1 = /* @__PURE__ */ new Map();
function ta$1(a2, b2, c2) {
  if ("object" !== typeof c2)
    throw Error(l$2(62));
  b2 = true;
  for (var d in c2)
    if (p$1.call(c2, d)) {
      var f2 = c2[d];
      if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
        if (0 === d.indexOf("--")) {
          var e = v(d);
          f2 = v(("" + f2).trim());
        } else {
          e = d;
          var g = sa$1.get(e);
          void 0 !== g ? e = g : (g = v(e.replace(oa$1, "-$1").toLowerCase().replace(pa$1, "-ms-")), sa$1.set(e, g), e = g);
          f2 = "number" === typeof f2 ? 0 === f2 || p$1.call(u$1, d) ? "" + f2 : f2 + "px" : v(("" + f2).trim());
        }
        b2 ? (b2 = false, a2.push(' style="', e, ":", f2)) : a2.push(";", e, ":", f2);
      }
    }
  b2 || a2.push('"');
}
function x$1(a2, b2, c2, d) {
  switch (c2) {
    case "style":
      ta$1(a2, b2, d);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
    if (b2 = t$1.hasOwnProperty(c2) ? t$1[c2] : null, null !== b2) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!b2.acceptsBooleans)
            return;
      }
      c2 = b2.attributeName;
      switch (b2.type) {
        case 3:
          d && a2.push(" ", c2, '=""');
          break;
        case 4:
          true === d ? a2.push(" ", c2, '=""') : false !== d && a2.push(" ", c2, '="', v(d), '"');
          break;
        case 5:
          isNaN(d) || a2.push(" ", c2, '="', v(d), '"');
          break;
        case 6:
          !isNaN(d) && 1 <= d && a2.push(" ", c2, '="', v(d), '"');
          break;
        default:
          b2.sanitizeURL && (d = "" + d), a2.push(" ", c2, '="', v(d), '"');
      }
    } else if (ja$1(c2)) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (b2 = c2.toLowerCase().slice(0, 5), "data-" !== b2 && "aria-" !== b2)
            return;
      }
      a2.push(" ", c2, '="', v(d), '"');
    }
  }
}
function y$1(a2, b2, c2) {
  if (null != b2) {
    if (null != c2)
      throw Error(l$2(60));
    if ("object" !== typeof b2 || !("__html" in b2))
      throw Error(l$2(61));
    b2 = b2.__html;
    null !== b2 && void 0 !== b2 && a2.push("" + b2);
  }
}
function ua$1(a2) {
  var b2 = "";
  aa$1.Children.forEach(a2, function(a3) {
    null != a3 && (b2 += a3);
  });
  return b2;
}
function va$1(a2, b2, c2, d) {
  a2.push(A(c2));
  var f2 = c2 = null, e;
  for (e in b2)
    if (p$1.call(b2, e)) {
      var g = b2[e];
      if (null != g)
        switch (e) {
          case "children":
            c2 = g;
            break;
          case "dangerouslySetInnerHTML":
            f2 = g;
            break;
          default:
            x$1(a2, d, e, g);
        }
    }
  a2.push(">");
  y$1(a2, f2, c2);
  return "string" === typeof c2 ? (a2.push(v(c2)), null) : c2;
}
var wa$1 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, xa$1 = /* @__PURE__ */ new Map();
function A(a2) {
  var b2 = xa$1.get(a2);
  if (void 0 === b2) {
    if (!wa$1.test(a2))
      throw Error(l$2(65, a2));
    b2 = "<" + a2;
    xa$1.set(a2, b2);
  }
  return b2;
}
function ya$1(a2, b2, c2, d, f2) {
  switch (b2) {
    case "select":
      a2.push(A("select"));
      var e = null, g = null;
      for (n2 in c2)
        if (p$1.call(c2, n2)) {
          var h = c2[n2];
          if (null != h)
            switch (n2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                x$1(a2, d, n2, h);
            }
        }
      a2.push(">");
      y$1(a2, g, e);
      return e;
    case "option":
      g = f2.selectedValue;
      a2.push(A("option"));
      var k2 = h = null, m2 = null;
      var n2 = null;
      for (e in c2)
        if (p$1.call(c2, e)) {
          var q2 = c2[e];
          if (null != q2)
            switch (e) {
              case "children":
                h = q2;
                break;
              case "selected":
                m2 = q2;
                break;
              case "dangerouslySetInnerHTML":
                n2 = q2;
                break;
              case "value":
                k2 = q2;
              default:
                x$1(a2, d, e, q2);
            }
        }
      if (null != g)
        if (c2 = null !== k2 ? "" + k2 : ua$1(h), qa$1(g))
          for (d = 0; d < g.length; d++) {
            if ("" + g[d] === c2) {
              a2.push(' selected=""');
              break;
            }
          }
        else
          "" + g === c2 && a2.push(' selected=""');
      else
        m2 && a2.push(' selected=""');
      a2.push(">");
      y$1(a2, n2, h);
      return h;
    case "textarea":
      a2.push(A("textarea"));
      n2 = g = e = null;
      for (h in c2)
        if (p$1.call(c2, h) && (k2 = c2[h], null != k2))
          switch (h) {
            case "children":
              n2 = k2;
              break;
            case "value":
              e = k2;
              break;
            case "defaultValue":
              g = k2;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(l$2(91));
            default:
              x$1(
                a2,
                d,
                h,
                k2
              );
          }
      null === e && null !== g && (e = g);
      a2.push(">");
      if (null != n2) {
        if (null != e)
          throw Error(l$2(92));
        if (qa$1(n2) && 1 < n2.length)
          throw Error(l$2(93));
        e = "" + n2;
      }
      "string" === typeof e && "\n" === e[0] && a2.push("\n");
      null !== e && a2.push(v("" + e));
      return null;
    case "input":
      a2.push(A("input"));
      k2 = n2 = h = e = null;
      for (g in c2)
        if (p$1.call(c2, g) && (m2 = c2[g], null != m2))
          switch (g) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l$2(399, "input"));
            case "defaultChecked":
              k2 = m2;
              break;
            case "defaultValue":
              h = m2;
              break;
            case "checked":
              n2 = m2;
              break;
            case "value":
              e = m2;
              break;
            default:
              x$1(a2, d, g, m2);
          }
      null !== n2 ? x$1(a2, d, "checked", n2) : null !== k2 && x$1(a2, d, "checked", k2);
      null !== e ? x$1(a2, d, "value", e) : null !== h && x$1(a2, d, "value", h);
      a2.push("/>");
      return null;
    case "menuitem":
      a2.push(A("menuitem"));
      for (var C2 in c2)
        if (p$1.call(c2, C2) && (e = c2[C2], null != e))
          switch (C2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l$2(400));
            default:
              x$1(a2, d, C2, e);
          }
      a2.push(">");
      return null;
    case "title":
      a2.push(A("title"));
      e = null;
      for (q2 in c2)
        if (p$1.call(c2, q2) && (g = c2[q2], null != g))
          switch (q2) {
            case "children":
              e = g;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(l$2(434));
            default:
              x$1(a2, d, q2, g);
          }
      a2.push(">");
      return e;
    case "listing":
    case "pre":
      a2.push(A(b2));
      g = e = null;
      for (k2 in c2)
        if (p$1.call(c2, k2) && (h = c2[k2], null != h))
          switch (k2) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            default:
              x$1(a2, d, k2, h);
          }
      a2.push(">");
      if (null != g) {
        if (null != e)
          throw Error(l$2(60));
        if ("object" !== typeof g || !("__html" in g))
          throw Error(l$2(61));
        c2 = g.__html;
        null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push("\n", c2) : a2.push("" + c2));
      }
      "string" === typeof e && "\n" === e[0] && a2.push("\n");
      return e;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      a2.push(A(b2));
      for (var D2 in c2)
        if (p$1.call(c2, D2) && (e = c2[D2], null != e))
          switch (D2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(l$2(399, b2));
            default:
              x$1(a2, d, D2, e);
          }
      a2.push("/>");
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return va$1(
        a2,
        c2,
        b2,
        d
      );
    case "html":
      return 0 === f2.insertionMode && a2.push("<!DOCTYPE html>"), va$1(a2, c2, b2, d);
    default:
      if (-1 === b2.indexOf("-") && "string" !== typeof c2.is)
        return va$1(a2, c2, b2, d);
      a2.push(A(b2));
      g = e = null;
      for (m2 in c2)
        if (p$1.call(c2, m2) && (h = c2[m2], null != h))
          switch (m2) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            case "style":
              ta$1(a2, d, h);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              ja$1(m2) && "function" !== typeof h && "symbol" !== typeof h && a2.push(" ", m2, '="', v(h), '"');
          }
      a2.push(">");
      y$1(a2, g, e);
      return e;
  }
}
function za$1(a2, b2, c2) {
  a2.push('<!--$?--><template id="');
  if (null === c2)
    throw Error(l$2(395));
  a2.push(c2);
  return a2.push('"></template>');
}
function Aa$1(a2, b2, c2, d) {
  switch (c2.insertionMode) {
    case 0:
    case 1:
      return a2.push('<div hidden id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 2:
      return a2.push('<svg aria-hidden="true" style="display:none" id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 3:
      return a2.push('<math aria-hidden="true" style="display:none" id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 4:
      return a2.push('<table hidden id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 5:
      return a2.push('<table hidden><tbody id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 6:
      return a2.push('<table hidden><tr id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    case 7:
      return a2.push('<table hidden><colgroup id="'), a2.push(b2.segmentPrefix), b2 = d.toString(16), a2.push(b2), a2.push('">');
    default:
      throw Error(l$2(397));
  }
}
function Ba$1(a2, b2) {
  switch (b2.insertionMode) {
    case 0:
    case 1:
      return a2.push("</div>");
    case 2:
      return a2.push("</svg>");
    case 3:
      return a2.push("</math>");
    case 4:
      return a2.push("</table>");
    case 5:
      return a2.push("</tbody></table>");
    case 6:
      return a2.push("</tr></table>");
    case 7:
      return a2.push("</colgroup></table>");
    default:
      throw Error(l$2(397));
  }
}
var Ca$1 = /[<\u2028\u2029]/g;
function Da$1(a2) {
  return JSON.stringify(a2).replace(Ca$1, function(a3) {
    switch (a3) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
function Ea$1(a2, b2) {
  b2 = void 0 === b2 ? "" : b2;
  return { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b2 + "P:", segmentPrefix: b2 + "S:", boundaryPrefix: b2 + "B:", idPrefix: b2, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: a2 };
}
function Fa$1(a2, b2, c2, d) {
  if (c2.generateStaticMarkup)
    return a2.push(v(b2)), false;
  "" === b2 ? a2 = d : (d && a2.push("<!-- -->"), a2.push(v(b2)), a2 = true);
  return a2;
}
var B$1 = Object.assign, Ga$1 = Symbol.for("react.element"), Ha$1 = Symbol.for("react.portal"), Ia$1 = Symbol.for("react.fragment"), Ja$1 = Symbol.for("react.strict_mode"), Ka$1 = Symbol.for("react.profiler"), La$1 = Symbol.for("react.provider"), Ma$1 = Symbol.for("react.context"), Na$1 = Symbol.for("react.forward_ref"), Oa$1 = Symbol.for("react.suspense"), Pa$1 = Symbol.for("react.suspense_list"), Qa$1 = Symbol.for("react.memo"), Ra$1 = Symbol.for("react.lazy"), Sa$1 = Symbol.for("react.scope"), Ta$1 = Symbol.for("react.debug_trace_mode"), Ua$1 = Symbol.for("react.legacy_hidden"), Va$1 = Symbol.for("react.default_value"), Wa$1 = Symbol.iterator;
function Xa$1(a2) {
  if (null == a2)
    return null;
  if ("function" === typeof a2)
    return a2.displayName || a2.name || null;
  if ("string" === typeof a2)
    return a2;
  switch (a2) {
    case Ia$1:
      return "Fragment";
    case Ha$1:
      return "Portal";
    case Ka$1:
      return "Profiler";
    case Ja$1:
      return "StrictMode";
    case Oa$1:
      return "Suspense";
    case Pa$1:
      return "SuspenseList";
  }
  if ("object" === typeof a2)
    switch (a2.$$typeof) {
      case Ma$1:
        return (a2.displayName || "Context") + ".Consumer";
      case La$1:
        return (a2._context.displayName || "Context") + ".Provider";
      case Na$1:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Qa$1:
        return b2 = a2.displayName || null, null !== b2 ? b2 : Xa$1(a2.type) || "Memo";
      case Ra$1:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Xa$1(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
var Ya$1 = {};
function Za$1(a2, b2) {
  a2 = a2.contextTypes;
  if (!a2)
    return Ya$1;
  var c2 = {}, d;
  for (d in a2)
    c2[d] = b2[d];
  return c2;
}
var E$1 = null;
function F(a2, b2) {
  if (a2 !== b2) {
    a2.context._currentValue2 = a2.parentValue;
    a2 = a2.parent;
    var c2 = b2.parent;
    if (null === a2) {
      if (null !== c2)
        throw Error(l$2(401));
    } else {
      if (null === c2)
        throw Error(l$2(401));
      F(a2, c2);
    }
    b2.context._currentValue2 = b2.value;
  }
}
function $a$1(a2) {
  a2.context._currentValue2 = a2.parentValue;
  a2 = a2.parent;
  null !== a2 && $a$1(a2);
}
function ab$1(a2) {
  var b2 = a2.parent;
  null !== b2 && ab$1(b2);
  a2.context._currentValue2 = a2.value;
}
function bb$1(a2, b2) {
  a2.context._currentValue2 = a2.parentValue;
  a2 = a2.parent;
  if (null === a2)
    throw Error(l$2(402));
  a2.depth === b2.depth ? F(a2, b2) : bb$1(a2, b2);
}
function cb$1(a2, b2) {
  var c2 = b2.parent;
  if (null === c2)
    throw Error(l$2(402));
  a2.depth === c2.depth ? F(a2, c2) : cb$1(a2, c2);
  b2.context._currentValue2 = b2.value;
}
function G(a2) {
  var b2 = E$1;
  b2 !== a2 && (null === b2 ? ab$1(a2) : null === a2 ? $a$1(b2) : b2.depth === a2.depth ? F(b2, a2) : b2.depth > a2.depth ? bb$1(b2, a2) : cb$1(b2, a2), E$1 = a2);
}
var db$1 = { isMounted: function() {
  return false;
}, enqueueSetState: function(a2, b2) {
  a2 = a2._reactInternals;
  null !== a2.queue && a2.queue.push(b2);
}, enqueueReplaceState: function(a2, b2) {
  a2 = a2._reactInternals;
  a2.replace = true;
  a2.queue = [b2];
}, enqueueForceUpdate: function() {
} };
function eb$1(a2, b2, c2, d) {
  var f2 = void 0 !== a2.state ? a2.state : null;
  a2.updater = db$1;
  a2.props = c2;
  a2.state = f2;
  var e = { queue: [], replace: false };
  a2._reactInternals = e;
  var g = b2.contextType;
  a2.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
  g = b2.getDerivedStateFromProps;
  "function" === typeof g && (g = g(c2, f2), f2 = null === g || void 0 === g ? f2 : B$1({}, f2, g), a2.state = f2);
  if ("function" !== typeof b2.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount))
    if (b2 = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b2 !== a2.state && db$1.enqueueReplaceState(a2, a2.state, null), null !== e.queue && 0 < e.queue.length)
      if (b2 = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b2.length)
        a2.state = b2[0];
      else {
        e = g ? b2[0] : a2.state;
        f2 = true;
        for (g = g ? 1 : 0; g < b2.length; g++) {
          var h = b2[g];
          h = "function" === typeof h ? h.call(a2, e, c2, d) : h;
          null != h && (f2 ? (f2 = false, e = B$1({}, e, h)) : B$1(e, h));
        }
        a2.state = e;
      }
    else
      e.queue = null;
}
var fb$1 = { id: 1, overflow: "" };
function gb$1(a2, b2, c2) {
  var d = a2.id;
  a2 = a2.overflow;
  var f2 = 32 - H$1(d) - 1;
  d &= ~(1 << f2);
  c2 += 1;
  var e = 32 - H$1(b2) + f2;
  if (30 < e) {
    var g = f2 - f2 % 5;
    e = (d & (1 << g) - 1).toString(32);
    d >>= g;
    f2 -= g;
    return { id: 1 << 32 - H$1(b2) + f2 | c2 << f2 | d, overflow: e + a2 };
  }
  return { id: 1 << e | c2 << f2 | d, overflow: a2 };
}
var H$1 = Math.clz32 ? Math.clz32 : hb$1, ib$1 = Math.log, jb$1 = Math.LN2;
function hb$1(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (ib$1(a2) / jb$1 | 0) | 0;
}
function kb$1(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var lb$1 = "function" === typeof Object.is ? Object.is : kb$1, I$1 = null, ob$1 = null, J$1 = null, K$1 = null, L$1 = false, M$1 = false, N$1 = 0, O$1 = null, P$1 = 0;
function Q$1() {
  if (null === I$1)
    throw Error(l$2(321));
  return I$1;
}
function pb$1() {
  if (0 < P$1)
    throw Error(l$2(312));
  return { memoizedState: null, queue: null, next: null };
}
function qb$1() {
  null === K$1 ? null === J$1 ? (L$1 = false, J$1 = K$1 = pb$1()) : (L$1 = true, K$1 = J$1) : null === K$1.next ? (L$1 = false, K$1 = K$1.next = pb$1()) : (L$1 = true, K$1 = K$1.next);
  return K$1;
}
function rb$1() {
  ob$1 = I$1 = null;
  M$1 = false;
  J$1 = null;
  P$1 = 0;
  K$1 = O$1 = null;
}
function sb$1(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function tb$1(a2, b2, c2) {
  I$1 = Q$1();
  K$1 = qb$1();
  if (L$1) {
    var d = K$1.queue;
    b2 = d.dispatch;
    if (null !== O$1 && (c2 = O$1.get(d), void 0 !== c2)) {
      O$1.delete(d);
      d = K$1.memoizedState;
      do
        d = a2(d, c2.action), c2 = c2.next;
      while (null !== c2);
      K$1.memoizedState = d;
      return [d, b2];
    }
    return [K$1.memoizedState, b2];
  }
  a2 = a2 === sb$1 ? "function" === typeof b2 ? b2() : b2 : void 0 !== c2 ? c2(b2) : b2;
  K$1.memoizedState = a2;
  a2 = K$1.queue = { last: null, dispatch: null };
  a2 = a2.dispatch = ub$1.bind(null, I$1, a2);
  return [K$1.memoizedState, a2];
}
function vb$1(a2, b2) {
  I$1 = Q$1();
  K$1 = qb$1();
  b2 = void 0 === b2 ? null : b2;
  if (null !== K$1) {
    var c2 = K$1.memoizedState;
    if (null !== c2 && null !== b2) {
      var d = c2[1];
      a:
        if (null === d)
          d = false;
        else {
          for (var f2 = 0; f2 < d.length && f2 < b2.length; f2++)
            if (!lb$1(b2[f2], d[f2])) {
              d = false;
              break a;
            }
          d = true;
        }
      if (d)
        return c2[0];
    }
  }
  a2 = a2();
  K$1.memoizedState = [a2, b2];
  return a2;
}
function ub$1(a2, b2, c2) {
  if (25 <= P$1)
    throw Error(l$2(301));
  if (a2 === I$1)
    if (M$1 = true, a2 = { action: c2, next: null }, null === O$1 && (O$1 = /* @__PURE__ */ new Map()), c2 = O$1.get(b2), void 0 === c2)
      O$1.set(b2, a2);
    else {
      for (b2 = c2; null !== b2.next; )
        b2 = b2.next;
      b2.next = a2;
    }
}
function wb$1() {
  throw Error(l$2(394));
}
function R$1() {
}
var xb$1 = { readContext: function(a2) {
  return a2._currentValue2;
}, useContext: function(a2) {
  Q$1();
  return a2._currentValue2;
}, useMemo: vb$1, useReducer: tb$1, useRef: function(a2) {
  I$1 = Q$1();
  K$1 = qb$1();
  var b2 = K$1.memoizedState;
  return null === b2 ? (a2 = { current: a2 }, K$1.memoizedState = a2) : b2;
}, useState: function(a2) {
  return tb$1(sb$1, a2);
}, useInsertionEffect: R$1, useLayoutEffect: function() {
}, useCallback: function(a2, b2) {
  return vb$1(function() {
    return a2;
  }, b2);
}, useImperativeHandle: R$1, useEffect: R$1, useDebugValue: R$1, useDeferredValue: function(a2) {
  Q$1();
  return a2;
}, useTransition: function() {
  Q$1();
  return [
    false,
    wb$1
  ];
}, useId: function() {
  var a2 = ob$1.treeContext;
  var b2 = a2.overflow;
  a2 = a2.id;
  a2 = (a2 & ~(1 << 32 - H$1(a2) - 1)).toString(32) + b2;
  var c2 = S$1;
  if (null === c2)
    throw Error(l$2(404));
  b2 = N$1++;
  a2 = ":" + c2.idPrefix + "R" + a2;
  0 < b2 && (a2 += "H" + b2.toString(32));
  return a2 + ":";
}, useMutableSource: function(a2, b2) {
  Q$1();
  return b2(a2._source);
}, useSyncExternalStore: function(a2, b2, c2) {
  if (void 0 === c2)
    throw Error(l$2(407));
  return c2();
} }, S$1 = null, yb$1 = aa$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function zb$1(a2) {
  console.error(a2);
  return null;
}
function T$1() {
}
function Ab$1(a2, b2, c2, d, f2, e, g, h, k2) {
  var m2 = [], n2 = /* @__PURE__ */ new Set();
  b2 = { destination: null, responseState: b2, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: n2, pingedTasks: m2, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f2 ? zb$1 : f2, onAllReady: void 0 === e ? T$1 : e, onShellReady: void 0 === g ? T$1 : g, onShellError: void 0 === h ? T$1 : h, onFatalError: void 0 === k2 ? T$1 : k2 };
  c2 = U$1(b2, 0, null, c2, false, false);
  c2.parentFlushed = true;
  a2 = Bb$1(b2, a2, null, c2, n2, Ya$1, null, fb$1);
  m2.push(a2);
  return b2;
}
function Bb$1(a2, b2, c2, d, f2, e, g, h) {
  a2.allPendingTasks++;
  null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
  var k2 = { node: b2, ping: function() {
    var b3 = a2.pingedTasks;
    b3.push(k2);
    1 === b3.length && Cb$1(a2);
  }, blockedBoundary: c2, blockedSegment: d, abortSet: f2, legacyContext: e, context: g, treeContext: h };
  f2.add(k2);
  return k2;
}
function U$1(a2, b2, c2, d, f2, e) {
  return { status: 0, id: -1, index: b2, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f2, textEmbedded: e };
}
function V$1(a2, b2) {
  a2 = a2.onError(b2);
  if (null != a2 && "string" !== typeof a2)
    throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
  return a2;
}
function W$1(a2, b2) {
  var c2 = a2.onShellError;
  c2(b2);
  c2 = a2.onFatalError;
  c2(b2);
  null !== a2.destination ? (a2.status = 2, a2.destination.destroy(b2)) : (a2.status = 1, a2.fatalError = b2);
}
function Db$1(a2, b2, c2, d, f2) {
  I$1 = {};
  ob$1 = b2;
  N$1 = 0;
  for (a2 = c2(d, f2); M$1; )
    M$1 = false, N$1 = 0, P$1 += 1, K$1 = null, a2 = c2(d, f2);
  rb$1();
  return a2;
}
function Eb$1(a2, b2, c2, d) {
  var f2 = c2.render(), e = d.childContextTypes;
  if (null !== e && void 0 !== e) {
    var g = b2.legacyContext;
    if ("function" !== typeof c2.getChildContext)
      d = g;
    else {
      c2 = c2.getChildContext();
      for (var h in c2)
        if (!(h in e))
          throw Error(l$2(108, Xa$1(d) || "Unknown", h));
      d = B$1({}, g, c2);
    }
    b2.legacyContext = d;
    X$1(a2, b2, f2);
    b2.legacyContext = g;
  } else
    X$1(a2, b2, f2);
}
function Fb(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = B$1({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
function Gb$1(a2, b2, c2, d, f2) {
  if ("function" === typeof c2)
    if (c2.prototype && c2.prototype.isReactComponent) {
      f2 = Za$1(c2, b2.legacyContext);
      var e = c2.contextType;
      e = new c2(d, "object" === typeof e && null !== e ? e._currentValue2 : f2);
      eb$1(e, c2, d, f2);
      Eb$1(a2, b2, e, c2);
    } else {
      e = Za$1(c2, b2.legacyContext);
      f2 = Db$1(a2, b2, c2, d, e);
      var g = 0 !== N$1;
      if ("object" === typeof f2 && null !== f2 && "function" === typeof f2.render && void 0 === f2.$$typeof)
        eb$1(f2, c2, d, e), Eb$1(a2, b2, f2, c2);
      else if (g) {
        d = b2.treeContext;
        b2.treeContext = gb$1(d, 1, 0);
        try {
          X$1(a2, b2, f2);
        } finally {
          b2.treeContext = d;
        }
      } else
        X$1(a2, b2, f2);
    }
  else if ("string" === typeof c2) {
    f2 = b2.blockedSegment;
    e = ya$1(f2.chunks, c2, d, a2.responseState, f2.formatContext);
    f2.lastPushedText = false;
    g = f2.formatContext;
    f2.formatContext = ra$1(g, c2, d);
    Hb$1(a2, b2, e);
    f2.formatContext = g;
    switch (c2) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        f2.chunks.push("</", c2, ">");
    }
    f2.lastPushedText = false;
  } else {
    switch (c2) {
      case Ua$1:
      case Ta$1:
      case Ja$1:
      case Ka$1:
      case Ia$1:
        X$1(a2, b2, d.children);
        return;
      case Pa$1:
        X$1(a2, b2, d.children);
        return;
      case Sa$1:
        throw Error(l$2(343));
      case Oa$1:
        a: {
          c2 = b2.blockedBoundary;
          f2 = b2.blockedSegment;
          e = d.fallback;
          d = d.children;
          g = /* @__PURE__ */ new Set();
          var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k2 = U$1(a2, f2.chunks.length, h, f2.formatContext, false, false);
          f2.children.push(k2);
          f2.lastPushedText = false;
          var m2 = U$1(a2, 0, null, f2.formatContext, false, false);
          m2.parentFlushed = true;
          b2.blockedBoundary = h;
          b2.blockedSegment = m2;
          try {
            if (Hb$1(
              a2,
              b2,
              d
            ), a2.responseState.generateStaticMarkup || m2.lastPushedText && m2.textEmbedded && m2.chunks.push("<!-- -->"), m2.status = 1, Y$1(h, m2), 0 === h.pendingTasks)
              break a;
          } catch (n2) {
            m2.status = 4, h.forceClientRender = true, h.errorDigest = V$1(a2, n2);
          } finally {
            b2.blockedBoundary = c2, b2.blockedSegment = f2;
          }
          b2 = Bb$1(a2, e, c2, k2, g, b2.legacyContext, b2.context, b2.treeContext);
          a2.pingedTasks.push(b2);
        }
        return;
    }
    if ("object" === typeof c2 && null !== c2)
      switch (c2.$$typeof) {
        case Na$1:
          d = Db$1(a2, b2, c2.render, d, f2);
          if (0 !== N$1) {
            c2 = b2.treeContext;
            b2.treeContext = gb$1(c2, 1, 0);
            try {
              X$1(a2, b2, d);
            } finally {
              b2.treeContext = c2;
            }
          } else
            X$1(a2, b2, d);
          return;
        case Qa$1:
          c2 = c2.type;
          d = Fb(c2, d);
          Gb$1(a2, b2, c2, d, f2);
          return;
        case La$1:
          f2 = d.children;
          c2 = c2._context;
          d = d.value;
          e = c2._currentValue2;
          c2._currentValue2 = d;
          g = E$1;
          E$1 = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c2, parentValue: e, value: d };
          b2.context = d;
          X$1(a2, b2, f2);
          a2 = E$1;
          if (null === a2)
            throw Error(l$2(403));
          d = a2.parentValue;
          a2.context._currentValue2 = d === Va$1 ? a2.context._defaultValue : d;
          a2 = E$1 = a2.parent;
          b2.context = a2;
          return;
        case Ma$1:
          d = d.children;
          d = d(c2._currentValue2);
          X$1(a2, b2, d);
          return;
        case Ra$1:
          f2 = c2._init;
          c2 = f2(c2._payload);
          d = Fb(c2, d);
          Gb$1(
            a2,
            b2,
            c2,
            d,
            void 0
          );
          return;
      }
    throw Error(l$2(130, null == c2 ? c2 : typeof c2, ""));
  }
}
function X$1(a2, b2, c2) {
  b2.node = c2;
  if ("object" === typeof c2 && null !== c2) {
    switch (c2.$$typeof) {
      case Ga$1:
        Gb$1(a2, b2, c2.type, c2.props, c2.ref);
        return;
      case Ha$1:
        throw Error(l$2(257));
      case Ra$1:
        var d = c2._init;
        c2 = d(c2._payload);
        X$1(a2, b2, c2);
        return;
    }
    if (qa$1(c2)) {
      Ib$1(a2, b2, c2);
      return;
    }
    null === c2 || "object" !== typeof c2 ? d = null : (d = Wa$1 && c2[Wa$1] || c2["@@iterator"], d = "function" === typeof d ? d : null);
    if (d && (d = d.call(c2))) {
      c2 = d.next();
      if (!c2.done) {
        var f2 = [];
        do
          f2.push(c2.value), c2 = d.next();
        while (!c2.done);
        Ib$1(a2, b2, f2);
      }
      return;
    }
    a2 = Object.prototype.toString.call(c2);
    throw Error(l$2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
  }
  "string" === typeof c2 ? (d = b2.blockedSegment, d.lastPushedText = Fa$1(b2.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b2.blockedSegment, d.lastPushedText = Fa$1(b2.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
}
function Ib$1(a2, b2, c2) {
  for (var d = c2.length, f2 = 0; f2 < d; f2++) {
    var e = b2.treeContext;
    b2.treeContext = gb$1(e, d, f2);
    try {
      Hb$1(a2, b2, c2[f2]);
    } finally {
      b2.treeContext = e;
    }
  }
}
function Hb$1(a2, b2, c2) {
  var d = b2.blockedSegment.formatContext, f2 = b2.legacyContext, e = b2.context;
  try {
    return X$1(a2, b2, c2);
  } catch (k2) {
    if (rb$1(), "object" === typeof k2 && null !== k2 && "function" === typeof k2.then) {
      c2 = k2;
      var g = b2.blockedSegment, h = U$1(a2, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
      g.children.push(h);
      g.lastPushedText = false;
      a2 = Bb$1(a2, b2.node, b2.blockedBoundary, h, b2.abortSet, b2.legacyContext, b2.context, b2.treeContext).ping;
      c2.then(a2, a2);
      b2.blockedSegment.formatContext = d;
      b2.legacyContext = f2;
      b2.context = e;
      G(e);
    } else
      throw b2.blockedSegment.formatContext = d, b2.legacyContext = f2, b2.context = e, G(e), k2;
  }
}
function Jb$1(a2) {
  var b2 = a2.blockedBoundary;
  a2 = a2.blockedSegment;
  a2.status = 3;
  Kb$1(this, b2, a2);
}
function Lb$1(a2, b2, c2) {
  var d = a2.blockedBoundary;
  a2.blockedSegment.status = 3;
  null === d ? (b2.allPendingTasks--, 2 !== b2.status && (b2.status = 2, null !== b2.destination && b2.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(l$2(432)) : c2, d.errorDigest = b2.onError(a2), d.parentFlushed && b2.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
    return Lb$1(a3, b2, c2);
  }), d.fallbackAbortableTasks.clear(), b2.allPendingTasks--, 0 === b2.allPendingTasks && (d = b2.onAllReady, d()));
}
function Y$1(a2, b2) {
  if (0 === b2.chunks.length && 1 === b2.children.length && null === b2.children[0].boundary) {
    var c2 = b2.children[0];
    c2.id = b2.id;
    c2.parentFlushed = true;
    1 === c2.status && Y$1(a2, c2);
  } else
    a2.completedSegments.push(b2);
}
function Kb$1(a2, b2, c2) {
  if (null === b2) {
    if (c2.parentFlushed) {
      if (null !== a2.completedRootSegment)
        throw Error(l$2(389));
      a2.completedRootSegment = c2;
    }
    a2.pendingRootTasks--;
    0 === a2.pendingRootTasks && (a2.onShellError = T$1, b2 = a2.onShellReady, b2());
  } else
    b2.pendingTasks--, b2.forceClientRender || (0 === b2.pendingTasks ? (c2.parentFlushed && 1 === c2.status && Y$1(b2, c2), b2.parentFlushed && a2.completedBoundaries.push(b2), b2.fallbackAbortableTasks.forEach(Jb$1, a2), b2.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (Y$1(b2, c2), 1 === b2.completedSegments.length && b2.parentFlushed && a2.partialBoundaries.push(b2)));
  a2.allPendingTasks--;
  0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
}
function Cb$1(a2) {
  if (2 !== a2.status) {
    var b2 = E$1, c2 = yb$1.current;
    yb$1.current = xb$1;
    var d = S$1;
    S$1 = a2.responseState;
    try {
      var f2 = a2.pingedTasks, e;
      for (e = 0; e < f2.length; e++) {
        var g = f2[e];
        var h = a2, k2 = g.blockedSegment;
        if (0 === k2.status) {
          G(g.context);
          try {
            X$1(h, g, g.node), h.responseState.generateStaticMarkup || k2.lastPushedText && k2.textEmbedded && k2.chunks.push("<!-- -->"), g.abortSet.delete(g), k2.status = 1, Kb$1(h, g.blockedBoundary, k2);
          } catch (z2) {
            if (rb$1(), "object" === typeof z2 && null !== z2 && "function" === typeof z2.then) {
              var m2 = g.ping;
              z2.then(m2, m2);
            } else {
              g.abortSet.delete(g);
              k2.status = 4;
              var n2 = g.blockedBoundary, q2 = z2, C2 = V$1(h, q2);
              null === n2 ? W$1(h, q2) : (n2.pendingTasks--, n2.forceClientRender || (n2.forceClientRender = true, n2.errorDigest = C2, n2.parentFlushed && h.clientRenderedBoundaries.push(n2)));
              h.allPendingTasks--;
              if (0 === h.allPendingTasks) {
                var D2 = h.onAllReady;
                D2();
              }
            }
          } finally {
          }
        }
      }
      f2.splice(0, e);
      null !== a2.destination && Mb$1(a2, a2.destination);
    } catch (z2) {
      V$1(a2, z2), W$1(a2, z2);
    } finally {
      S$1 = d, yb$1.current = c2, c2 === xb$1 && G(b2);
    }
  }
}
function Z$1(a2, b2, c2) {
  c2.parentFlushed = true;
  switch (c2.status) {
    case 0:
      var d = c2.id = a2.nextSegmentId++;
      c2.lastPushedText = false;
      c2.textEmbedded = false;
      a2 = a2.responseState;
      b2.push('<template id="');
      b2.push(a2.placeholderPrefix);
      a2 = d.toString(16);
      b2.push(a2);
      return b2.push('"></template>');
    case 1:
      c2.status = 2;
      var f2 = true;
      d = c2.chunks;
      var e = 0;
      c2 = c2.children;
      for (var g = 0; g < c2.length; g++) {
        for (f2 = c2[g]; e < f2.index; e++)
          b2.push(d[e]);
        f2 = Nb$1(a2, b2, f2);
      }
      for (; e < d.length - 1; e++)
        b2.push(d[e]);
      e < d.length && (f2 = b2.push(d[e]));
      return f2;
    default:
      throw Error(l$2(390));
  }
}
function Nb$1(a2, b2, c2) {
  var d = c2.boundary;
  if (null === d)
    return Z$1(a2, b2, c2);
  d.parentFlushed = true;
  if (d.forceClientRender)
    return a2.responseState.generateStaticMarkup || (d = d.errorDigest, b2.push("<!--$!-->"), b2.push("<template"), d && (b2.push(' data-dgst="'), d = v(d), b2.push(d), b2.push('"')), b2.push("></template>")), Z$1(a2, b2, c2), a2 = a2.responseState.generateStaticMarkup ? true : b2.push("<!--/$-->"), a2;
  if (0 < d.pendingTasks) {
    d.rootSegmentID = a2.nextSegmentId++;
    0 < d.completedSegments.length && a2.partialBoundaries.push(d);
    var f2 = a2.responseState;
    var e = f2.nextSuspenseID++;
    f2 = f2.boundaryPrefix + e.toString(16);
    d = d.id = f2;
    za$1(b2, a2.responseState, d);
    Z$1(a2, b2, c2);
    return b2.push("<!--/$-->");
  }
  if (d.byteSize > a2.progressiveChunkSize)
    return d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), za$1(b2, a2.responseState, d.id), Z$1(a2, b2, c2), b2.push("<!--/$-->");
  a2.responseState.generateStaticMarkup || b2.push("<!--$-->");
  c2 = d.completedSegments;
  if (1 !== c2.length)
    throw Error(l$2(391));
  Nb$1(a2, b2, c2[0]);
  a2 = a2.responseState.generateStaticMarkup ? true : b2.push("<!--/$-->");
  return a2;
}
function Ob$1(a2, b2, c2) {
  Aa$1(b2, a2.responseState, c2.formatContext, c2.id);
  Nb$1(a2, b2, c2);
  return Ba$1(b2, c2.formatContext);
}
function Pb$1(a2, b2, c2) {
  for (var d = c2.completedSegments, f2 = 0; f2 < d.length; f2++)
    Qb$1(a2, b2, c2, d[f2]);
  d.length = 0;
  a2 = a2.responseState;
  d = c2.id;
  c2 = c2.rootSegmentID;
  b2.push(a2.startInlineScript);
  a2.sentCompleteBoundaryFunction ? b2.push('$RC("') : (a2.sentCompleteBoundaryFunction = true, b2.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
  if (null === d)
    throw Error(l$2(395));
  c2 = c2.toString(16);
  b2.push(d);
  b2.push('","');
  b2.push(a2.segmentPrefix);
  b2.push(c2);
  return b2.push('")<\/script>');
}
function Qb$1(a2, b2, c2, d) {
  if (2 === d.status)
    return true;
  var f2 = d.id;
  if (-1 === f2) {
    if (-1 === (d.id = c2.rootSegmentID))
      throw Error(l$2(392));
    return Ob$1(a2, b2, d);
  }
  Ob$1(a2, b2, d);
  a2 = a2.responseState;
  b2.push(a2.startInlineScript);
  a2.sentCompleteSegmentFunction ? b2.push('$RS("') : (a2.sentCompleteSegmentFunction = true, b2.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
  b2.push(a2.segmentPrefix);
  f2 = f2.toString(16);
  b2.push(f2);
  b2.push('","');
  b2.push(a2.placeholderPrefix);
  b2.push(f2);
  return b2.push('")<\/script>');
}
function Mb$1(a2, b2) {
  try {
    var c2 = a2.completedRootSegment;
    if (null !== c2 && 0 === a2.pendingRootTasks) {
      Nb$1(a2, b2, c2);
      a2.completedRootSegment = null;
      var d = a2.responseState.bootstrapChunks;
      for (c2 = 0; c2 < d.length - 1; c2++)
        b2.push(d[c2]);
      c2 < d.length && b2.push(d[c2]);
    }
    var f2 = a2.clientRenderedBoundaries, e;
    for (e = 0; e < f2.length; e++) {
      var g = f2[e];
      d = b2;
      var h = a2.responseState, k2 = g.id, m2 = g.errorDigest, n2 = g.errorMessage, q2 = g.errorComponentStack;
      d.push(h.startInlineScript);
      h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = true, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'));
      if (null === k2)
        throw Error(l$2(395));
      d.push(k2);
      d.push('"');
      if (m2 || n2 || q2) {
        d.push(",");
        var C2 = Da$1(m2 || "");
        d.push(C2);
      }
      if (n2 || q2) {
        d.push(",");
        var D2 = Da$1(n2 || "");
        d.push(D2);
      }
      if (q2) {
        d.push(",");
        var z2 = Da$1(q2);
        d.push(z2);
      }
      if (!d.push(")<\/script>")) {
        a2.destination = null;
        e++;
        f2.splice(0, e);
        return;
      }
    }
    f2.splice(0, e);
    var ba2 = a2.completedBoundaries;
    for (e = 0; e < ba2.length; e++)
      if (!Pb$1(a2, b2, ba2[e])) {
        a2.destination = null;
        e++;
        ba2.splice(0, e);
        return;
      }
    ba2.splice(0, e);
    var ca2 = a2.partialBoundaries;
    for (e = 0; e < ca2.length; e++) {
      var mb2 = ca2[e];
      a: {
        f2 = a2;
        g = b2;
        var da2 = mb2.completedSegments;
        for (h = 0; h < da2.length; h++)
          if (!Qb$1(f2, g, mb2, da2[h])) {
            h++;
            da2.splice(0, h);
            var nb2 = false;
            break a;
          }
        da2.splice(0, h);
        nb2 = true;
      }
      if (!nb2) {
        a2.destination = null;
        e++;
        ca2.splice(0, e);
        return;
      }
    }
    ca2.splice(0, e);
    var ea2 = a2.completedBoundaries;
    for (e = 0; e < ea2.length; e++)
      if (!Pb$1(a2, b2, ea2[e])) {
        a2.destination = null;
        e++;
        ea2.splice(0, e);
        return;
      }
    ea2.splice(0, e);
  } finally {
    0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b2.push(null);
  }
}
function Rb$1(a2, b2) {
  try {
    var c2 = a2.abortableTasks;
    c2.forEach(function(c3) {
      return Lb$1(c3, a2, b2);
    });
    c2.clear();
    null !== a2.destination && Mb$1(a2, a2.destination);
  } catch (d) {
    V$1(a2, d), W$1(a2, d);
  }
}
function Sb$1() {
}
function Tb$1(a2, b2, c2, d) {
  var f2 = false, e = null, g = "", h = { push: function(a3) {
    null !== a3 && (g += a3);
    return true;
  }, destroy: function(a3) {
    f2 = true;
    e = a3;
  } }, k2 = false;
  a2 = Ab$1(a2, Ea$1(c2, b2 ? b2.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, Infinity, Sb$1, void 0, function() {
    k2 = true;
  }, void 0, void 0);
  Cb$1(a2);
  Rb$1(a2, d);
  if (1 === a2.status)
    a2.status = 2, h.destroy(a2.fatalError);
  else if (2 !== a2.status && null === a2.destination) {
    a2.destination = h;
    try {
      Mb$1(a2, h);
    } catch (m2) {
      V$1(a2, m2), W$1(a2, m2);
    }
  }
  if (f2)
    throw e;
  if (!k2)
    throw Error(l$2(426));
  return g;
}
reactDomServerLegacy_browser_production_min.renderToNodeStream = function() {
  throw Error(l$2(207));
};
reactDomServerLegacy_browser_production_min.renderToStaticMarkup = function(a2, b2) {
  return Tb$1(a2, b2, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
reactDomServerLegacy_browser_production_min.renderToStaticNodeStream = function() {
  throw Error(l$2(208));
};
reactDomServerLegacy_browser_production_min.renderToString = function(a2, b2) {
  return Tb$1(a2, b2, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
reactDomServerLegacy_browser_production_min.version = "18.2.0";
var reactDomServer_browser_production_min = {};
/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = react.exports;
function k(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var l$1 = null, n = 0;
function p(a2, b2) {
  if (0 !== b2.length)
    if (512 < b2.length)
      0 < n && (a2.enqueue(new Uint8Array(l$1.buffer, 0, n)), l$1 = new Uint8Array(512), n = 0), a2.enqueue(b2);
    else {
      var c2 = l$1.length - n;
      c2 < b2.length && (0 === c2 ? a2.enqueue(l$1) : (l$1.set(b2.subarray(0, c2), n), a2.enqueue(l$1), b2 = b2.subarray(c2)), l$1 = new Uint8Array(512), n = 0);
      l$1.set(b2, n);
      n += b2.length;
    }
}
function t(a2, b2) {
  p(a2, b2);
  return true;
}
function ba(a2) {
  l$1 && 0 < n && (a2.enqueue(new Uint8Array(l$1.buffer, 0, n)), l$1 = null, n = 0);
}
var ca = new TextEncoder();
function u(a2) {
  return ca.encode(a2);
}
function w(a2) {
  return ca.encode(a2);
}
function da(a2, b2) {
  "function" === typeof a2.error ? a2.error(b2) : a2.close();
}
var x = Object.prototype.hasOwnProperty, ea = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, fa = {}, ha = {};
function ia(a2) {
  if (x.call(ha, a2))
    return true;
  if (x.call(fa, a2))
    return false;
  if (ea.test(a2))
    return ha[a2] = true;
  fa[a2] = true;
  return false;
}
function y(a2, b2, c2, d, f2, e, g) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d;
  this.attributeNamespace = f2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = e;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new y(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z[b2] = new y(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new y(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new y(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new y(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new y(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new y(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new y(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new y(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ja = /[\-:]([a-z])/g;
function ka(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(
    ja,
    ka
  );
  z[b2] = new y(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(ja, ka);
  z[b2] = new y(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(ja, ka);
  z[b2] = new y(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new y("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, true, true);
});
var B = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, la = ["Webkit", "ms", "Moz", "O"];
Object.keys(B).forEach(function(a2) {
  la.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    B[b2] = B[a2];
  });
});
var oa = /["'&<>]/;
function C(a2) {
  if ("boolean" === typeof a2 || "number" === typeof a2)
    return "" + a2;
  a2 = "" + a2;
  var b2 = oa.exec(a2);
  if (b2) {
    var c2 = "", d, f2 = 0;
    for (d = b2.index; d < a2.length; d++) {
      switch (a2.charCodeAt(d)) {
        case 34:
          b2 = "&quot;";
          break;
        case 38:
          b2 = "&amp;";
          break;
        case 39:
          b2 = "&#x27;";
          break;
        case 60:
          b2 = "&lt;";
          break;
        case 62:
          b2 = "&gt;";
          break;
        default:
          continue;
      }
      f2 !== d && (c2 += a2.substring(f2, d));
      f2 = d + 1;
      c2 += b2;
    }
    a2 = f2 !== d ? c2 + a2.substring(f2, d) : c2;
  }
  return a2;
}
var pa = /([A-Z])/g, qa = /^ms-/, ra = Array.isArray, sa = w("<script>"), ta = w("<\/script>"), ua = w('<script src="'), va = w('<script type="module" src="'), wa = w('" async=""><\/script>'), xa = /(<\/|<)(s)(cript)/gi;
function ya(a2, b2, c2, d) {
  return "" + b2 + ("s" === c2 ? "\\u0073" : "\\u0053") + d;
}
function za(a2, b2, c2, d, f2) {
  a2 = void 0 === a2 ? "" : a2;
  b2 = void 0 === b2 ? sa : w('<script nonce="' + C(b2) + '">');
  var e = [];
  void 0 !== c2 && e.push(b2, u(("" + c2).replace(xa, ya)), ta);
  if (void 0 !== d)
    for (c2 = 0; c2 < d.length; c2++)
      e.push(ua, u(C(d[c2])), wa);
  if (void 0 !== f2)
    for (d = 0; d < f2.length; d++)
      e.push(va, u(C(f2[d])), wa);
  return { bootstrapChunks: e, startInlineScript: b2, placeholderPrefix: w(a2 + "P:"), segmentPrefix: w(a2 + "S:"), boundaryPrefix: a2 + "B:", idPrefix: a2, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
}
function D(a2, b2) {
  return { insertionMode: a2, selectedValue: b2 };
}
function Aa(a2) {
  return D("http://www.w3.org/2000/svg" === a2 ? 2 : "http://www.w3.org/1998/Math/MathML" === a2 ? 3 : 0, null);
}
function Ba(a2, b2, c2) {
  switch (b2) {
    case "select":
      return D(1, null != c2.value ? c2.value : c2.defaultValue);
    case "svg":
      return D(2, null);
    case "math":
      return D(3, null);
    case "foreignObject":
      return D(1, null);
    case "table":
      return D(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return D(5, null);
    case "colgroup":
      return D(7, null);
    case "tr":
      return D(6, null);
  }
  return 4 <= a2.insertionMode || 0 === a2.insertionMode ? D(1, null) : a2;
}
var Ca = w("<!-- -->");
function Da(a2, b2, c2, d) {
  if ("" === b2)
    return d;
  d && a2.push(Ca);
  a2.push(u(C(b2)));
  return true;
}
var Ea = /* @__PURE__ */ new Map(), Fa = w(' style="'), Ga = w(":"), Ha = w(";");
function Ia(a2, b2, c2) {
  if ("object" !== typeof c2)
    throw Error(k(62));
  b2 = true;
  for (var d in c2)
    if (x.call(c2, d)) {
      var f2 = c2[d];
      if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
        if (0 === d.indexOf("--")) {
          var e = u(C(d));
          f2 = u(C(("" + f2).trim()));
        } else {
          e = d;
          var g = Ea.get(e);
          void 0 !== g ? e = g : (g = w(C(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-"))), Ea.set(e, g), e = g);
          f2 = "number" === typeof f2 ? 0 === f2 || x.call(B, d) ? u("" + f2) : u(f2 + "px") : u(C(("" + f2).trim()));
        }
        b2 ? (b2 = false, a2.push(Fa, e, Ga, f2)) : a2.push(Ha, e, Ga, f2);
      }
    }
  b2 || a2.push(E);
}
var H = w(" "), I = w('="'), E = w('"'), Ja = w('=""');
function J(a2, b2, c2, d) {
  switch (c2) {
    case "style":
      Ia(a2, b2, d);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
    if (b2 = z.hasOwnProperty(c2) ? z[c2] : null, null !== b2) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!b2.acceptsBooleans)
            return;
      }
      c2 = u(b2.attributeName);
      switch (b2.type) {
        case 3:
          d && a2.push(H, c2, Ja);
          break;
        case 4:
          true === d ? a2.push(H, c2, Ja) : false !== d && a2.push(H, c2, I, u(C(d)), E);
          break;
        case 5:
          isNaN(d) || a2.push(H, c2, I, u(C(d)), E);
          break;
        case 6:
          !isNaN(d) && 1 <= d && a2.push(H, c2, I, u(C(d)), E);
          break;
        default:
          b2.sanitizeURL && (d = "" + d), a2.push(H, c2, I, u(C(d)), E);
      }
    } else if (ia(c2)) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (b2 = c2.toLowerCase().slice(0, 5), "data-" !== b2 && "aria-" !== b2)
            return;
      }
      a2.push(H, u(c2), I, u(C(d)), E);
    }
  }
}
var K = w(">"), Ka = w("/>");
function L(a2, b2, c2) {
  if (null != b2) {
    if (null != c2)
      throw Error(k(60));
    if ("object" !== typeof b2 || !("__html" in b2))
      throw Error(k(61));
    b2 = b2.__html;
    null !== b2 && void 0 !== b2 && a2.push(u("" + b2));
  }
}
function La(a2) {
  var b2 = "";
  aa.Children.forEach(a2, function(a3) {
    null != a3 && (b2 += a3);
  });
  return b2;
}
var Ma = w(' selected=""');
function Na(a2, b2, c2, d) {
  a2.push(M(c2));
  var f2 = c2 = null, e;
  for (e in b2)
    if (x.call(b2, e)) {
      var g = b2[e];
      if (null != g)
        switch (e) {
          case "children":
            c2 = g;
            break;
          case "dangerouslySetInnerHTML":
            f2 = g;
            break;
          default:
            J(a2, d, e, g);
        }
    }
  a2.push(K);
  L(a2, f2, c2);
  return "string" === typeof c2 ? (a2.push(u(C(c2))), null) : c2;
}
var Oa = w("\n"), Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Qa = /* @__PURE__ */ new Map();
function M(a2) {
  var b2 = Qa.get(a2);
  if (void 0 === b2) {
    if (!Pa.test(a2))
      throw Error(k(65, a2));
    b2 = w("<" + a2);
    Qa.set(a2, b2);
  }
  return b2;
}
var Ra = w("<!DOCTYPE html>");
function Sa(a2, b2, c2, d, f2) {
  switch (b2) {
    case "select":
      a2.push(M("select"));
      var e = null, g = null;
      for (r2 in c2)
        if (x.call(c2, r2)) {
          var h = c2[r2];
          if (null != h)
            switch (r2) {
              case "children":
                e = h;
                break;
              case "dangerouslySetInnerHTML":
                g = h;
                break;
              case "defaultValue":
              case "value":
                break;
              default:
                J(a2, d, r2, h);
            }
        }
      a2.push(K);
      L(a2, g, e);
      return e;
    case "option":
      g = f2.selectedValue;
      a2.push(M("option"));
      var m2 = h = null, q2 = null;
      var r2 = null;
      for (e in c2)
        if (x.call(c2, e)) {
          var v2 = c2[e];
          if (null != v2)
            switch (e) {
              case "children":
                h = v2;
                break;
              case "selected":
                q2 = v2;
                break;
              case "dangerouslySetInnerHTML":
                r2 = v2;
                break;
              case "value":
                m2 = v2;
              default:
                J(a2, d, e, v2);
            }
        }
      if (null != g)
        if (c2 = null !== m2 ? "" + m2 : La(h), ra(g))
          for (d = 0; d < g.length; d++) {
            if ("" + g[d] === c2) {
              a2.push(Ma);
              break;
            }
          }
        else
          "" + g === c2 && a2.push(Ma);
      else
        q2 && a2.push(Ma);
      a2.push(K);
      L(a2, r2, h);
      return h;
    case "textarea":
      a2.push(M("textarea"));
      r2 = g = e = null;
      for (h in c2)
        if (x.call(c2, h) && (m2 = c2[h], null != m2))
          switch (h) {
            case "children":
              r2 = m2;
              break;
            case "value":
              e = m2;
              break;
            case "defaultValue":
              g = m2;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(k(91));
            default:
              J(a2, d, h, m2);
          }
      null === e && null !== g && (e = g);
      a2.push(K);
      if (null != r2) {
        if (null != e)
          throw Error(k(92));
        if (ra(r2) && 1 < r2.length)
          throw Error(k(93));
        e = "" + r2;
      }
      "string" === typeof e && "\n" === e[0] && a2.push(Oa);
      null !== e && a2.push(u(C("" + e)));
      return null;
    case "input":
      a2.push(M("input"));
      m2 = r2 = h = e = null;
      for (g in c2)
        if (x.call(c2, g) && (q2 = c2[g], null != q2))
          switch (g) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(k(399, "input"));
            case "defaultChecked":
              m2 = q2;
              break;
            case "defaultValue":
              h = q2;
              break;
            case "checked":
              r2 = q2;
              break;
            case "value":
              e = q2;
              break;
            default:
              J(a2, d, g, q2);
          }
      null !== r2 ? J(
        a2,
        d,
        "checked",
        r2
      ) : null !== m2 && J(a2, d, "checked", m2);
      null !== e ? J(a2, d, "value", e) : null !== h && J(a2, d, "value", h);
      a2.push(Ka);
      return null;
    case "menuitem":
      a2.push(M("menuitem"));
      for (var A2 in c2)
        if (x.call(c2, A2) && (e = c2[A2], null != e))
          switch (A2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(k(400));
            default:
              J(a2, d, A2, e);
          }
      a2.push(K);
      return null;
    case "title":
      a2.push(M("title"));
      e = null;
      for (v2 in c2)
        if (x.call(c2, v2) && (g = c2[v2], null != g))
          switch (v2) {
            case "children":
              e = g;
              break;
            case "dangerouslySetInnerHTML":
              throw Error(k(434));
            default:
              J(a2, d, v2, g);
          }
      a2.push(K);
      return e;
    case "listing":
    case "pre":
      a2.push(M(b2));
      g = e = null;
      for (m2 in c2)
        if (x.call(c2, m2) && (h = c2[m2], null != h))
          switch (m2) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            default:
              J(a2, d, m2, h);
          }
      a2.push(K);
      if (null != g) {
        if (null != e)
          throw Error(k(60));
        if ("object" !== typeof g || !("__html" in g))
          throw Error(k(61));
        c2 = g.__html;
        null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push(Oa, u(c2)) : a2.push(u("" + c2)));
      }
      "string" === typeof e && "\n" === e[0] && a2.push(Oa);
      return e;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      a2.push(M(b2));
      for (var F2 in c2)
        if (x.call(c2, F2) && (e = c2[F2], null != e))
          switch (F2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(k(399, b2));
            default:
              J(a2, d, F2, e);
          }
      a2.push(Ka);
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return Na(a2, c2, b2, d);
    case "html":
      return 0 === f2.insertionMode && a2.push(Ra), Na(a2, c2, b2, d);
    default:
      if (-1 === b2.indexOf("-") && "string" !== typeof c2.is)
        return Na(a2, c2, b2, d);
      a2.push(M(b2));
      g = e = null;
      for (q2 in c2)
        if (x.call(c2, q2) && (h = c2[q2], null != h))
          switch (q2) {
            case "children":
              e = h;
              break;
            case "dangerouslySetInnerHTML":
              g = h;
              break;
            case "style":
              Ia(a2, d, h);
              break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
              break;
            default:
              ia(q2) && "function" !== typeof h && "symbol" !== typeof h && a2.push(H, u(q2), I, u(C(h)), E);
          }
      a2.push(K);
      L(a2, g, e);
      return e;
  }
}
var Ta = w("</"), Ua = w(">"), Va = w('<template id="'), Wa = w('"></template>'), Xa = w("<!--$-->"), Ya = w('<!--$?--><template id="'), Za = w('"></template>'), $a = w("<!--$!-->"), ab = w("<!--/$-->"), bb = w("<template"), cb = w('"'), db = w(' data-dgst="');
w(' data-msg="');
w(' data-stck="');
var eb = w("></template>");
function fb(a2, b2, c2) {
  p(a2, Ya);
  if (null === c2)
    throw Error(k(395));
  p(a2, c2);
  return t(a2, Za);
}
var gb = w('<div hidden id="'), hb = w('">'), ib = w("</div>"), jb = w('<svg aria-hidden="true" style="display:none" id="'), kb = w('">'), lb = w("</svg>"), mb = w('<math aria-hidden="true" style="display:none" id="'), nb = w('">'), ob = w("</math>"), pb = w('<table hidden id="'), qb = w('">'), rb = w("</table>"), sb = w('<table hidden><tbody id="'), tb = w('">'), ub = w("</tbody></table>"), vb = w('<table hidden><tr id="'), wb = w('">'), xb = w("</tr></table>"), yb = w('<table hidden><colgroup id="'), zb = w('">'), Ab = w("</colgroup></table>");
function Bb(a2, b2, c2, d) {
  switch (c2.insertionMode) {
    case 0:
    case 1:
      return p(a2, gb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, hb);
    case 2:
      return p(a2, jb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, kb);
    case 3:
      return p(a2, mb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, nb);
    case 4:
      return p(a2, pb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, qb);
    case 5:
      return p(a2, sb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, tb);
    case 6:
      return p(a2, vb), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, wb);
    case 7:
      return p(
        a2,
        yb
      ), p(a2, b2.segmentPrefix), p(a2, u(d.toString(16))), t(a2, zb);
    default:
      throw Error(k(397));
  }
}
function Cb(a2, b2) {
  switch (b2.insertionMode) {
    case 0:
    case 1:
      return t(a2, ib);
    case 2:
      return t(a2, lb);
    case 3:
      return t(a2, ob);
    case 4:
      return t(a2, rb);
    case 5:
      return t(a2, ub);
    case 6:
      return t(a2, xb);
    case 7:
      return t(a2, Ab);
    default:
      throw Error(k(397));
  }
}
var Db = w('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Eb = w('$RS("'), Gb = w('","'), Hb = w('")<\/script>'), Ib = w('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), Jb = w('$RC("'), Kb = w('","'), Lb = w('")<\/script>'), Mb = w('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Nb = w('$RX("'), Ob = w('"'), Pb = w(")<\/script>"), Qb = w(","), Rb = /[<\u2028\u2029]/g;
function Sb(a2) {
  return JSON.stringify(a2).replace(Rb, function(a3) {
    switch (a3) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var N = Object.assign, Tb = Symbol.for("react.element"), Ub = Symbol.for("react.portal"), Vb = Symbol.for("react.fragment"), Wb = Symbol.for("react.strict_mode"), Xb = Symbol.for("react.profiler"), Yb = Symbol.for("react.provider"), Zb = Symbol.for("react.context"), $b = Symbol.for("react.forward_ref"), ac = Symbol.for("react.suspense"), bc = Symbol.for("react.suspense_list"), cc = Symbol.for("react.memo"), dc = Symbol.for("react.lazy"), ec = Symbol.for("react.scope"), fc = Symbol.for("react.debug_trace_mode"), gc = Symbol.for("react.legacy_hidden"), hc = Symbol.for("react.default_value"), ic = Symbol.iterator;
function jc(a2) {
  if (null == a2)
    return null;
  if ("function" === typeof a2)
    return a2.displayName || a2.name || null;
  if ("string" === typeof a2)
    return a2;
  switch (a2) {
    case Vb:
      return "Fragment";
    case Ub:
      return "Portal";
    case Xb:
      return "Profiler";
    case Wb:
      return "StrictMode";
    case ac:
      return "Suspense";
    case bc:
      return "SuspenseList";
  }
  if ("object" === typeof a2)
    switch (a2.$$typeof) {
      case Zb:
        return (a2.displayName || "Context") + ".Consumer";
      case Yb:
        return (a2._context.displayName || "Context") + ".Provider";
      case $b:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case cc:
        return b2 = a2.displayName || null, null !== b2 ? b2 : jc(a2.type) || "Memo";
      case dc:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return jc(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
var kc = {};
function lc(a2, b2) {
  a2 = a2.contextTypes;
  if (!a2)
    return kc;
  var c2 = {}, d;
  for (d in a2)
    c2[d] = b2[d];
  return c2;
}
var O = null;
function P(a2, b2) {
  if (a2 !== b2) {
    a2.context._currentValue = a2.parentValue;
    a2 = a2.parent;
    var c2 = b2.parent;
    if (null === a2) {
      if (null !== c2)
        throw Error(k(401));
    } else {
      if (null === c2)
        throw Error(k(401));
      P(a2, c2);
    }
    b2.context._currentValue = b2.value;
  }
}
function mc(a2) {
  a2.context._currentValue = a2.parentValue;
  a2 = a2.parent;
  null !== a2 && mc(a2);
}
function nc(a2) {
  var b2 = a2.parent;
  null !== b2 && nc(b2);
  a2.context._currentValue = a2.value;
}
function oc(a2, b2) {
  a2.context._currentValue = a2.parentValue;
  a2 = a2.parent;
  if (null === a2)
    throw Error(k(402));
  a2.depth === b2.depth ? P(a2, b2) : oc(a2, b2);
}
function pc(a2, b2) {
  var c2 = b2.parent;
  if (null === c2)
    throw Error(k(402));
  a2.depth === c2.depth ? P(a2, c2) : pc(a2, c2);
  b2.context._currentValue = b2.value;
}
function Q(a2) {
  var b2 = O;
  b2 !== a2 && (null === b2 ? nc(a2) : null === a2 ? mc(b2) : b2.depth === a2.depth ? P(b2, a2) : b2.depth > a2.depth ? oc(b2, a2) : pc(b2, a2), O = a2);
}
var qc = { isMounted: function() {
  return false;
}, enqueueSetState: function(a2, b2) {
  a2 = a2._reactInternals;
  null !== a2.queue && a2.queue.push(b2);
}, enqueueReplaceState: function(a2, b2) {
  a2 = a2._reactInternals;
  a2.replace = true;
  a2.queue = [b2];
}, enqueueForceUpdate: function() {
} };
function rc(a2, b2, c2, d) {
  var f2 = void 0 !== a2.state ? a2.state : null;
  a2.updater = qc;
  a2.props = c2;
  a2.state = f2;
  var e = { queue: [], replace: false };
  a2._reactInternals = e;
  var g = b2.contextType;
  a2.context = "object" === typeof g && null !== g ? g._currentValue : d;
  g = b2.getDerivedStateFromProps;
  "function" === typeof g && (g = g(c2, f2), f2 = null === g || void 0 === g ? f2 : N({}, f2, g), a2.state = f2);
  if ("function" !== typeof b2.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount))
    if (b2 = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b2 !== a2.state && qc.enqueueReplaceState(a2, a2.state, null), null !== e.queue && 0 < e.queue.length)
      if (b2 = e.queue, g = e.replace, e.queue = null, e.replace = false, g && 1 === b2.length)
        a2.state = b2[0];
      else {
        e = g ? b2[0] : a2.state;
        f2 = true;
        for (g = g ? 1 : 0; g < b2.length; g++) {
          var h = b2[g];
          h = "function" === typeof h ? h.call(a2, e, c2, d) : h;
          null != h && (f2 ? (f2 = false, e = N({}, e, h)) : N(e, h));
        }
        a2.state = e;
      }
    else
      e.queue = null;
}
var sc = { id: 1, overflow: "" };
function tc(a2, b2, c2) {
  var d = a2.id;
  a2 = a2.overflow;
  var f2 = 32 - uc(d) - 1;
  d &= ~(1 << f2);
  c2 += 1;
  var e = 32 - uc(b2) + f2;
  if (30 < e) {
    var g = f2 - f2 % 5;
    e = (d & (1 << g) - 1).toString(32);
    d >>= g;
    f2 -= g;
    return { id: 1 << 32 - uc(b2) + f2 | c2 << f2 | d, overflow: e + a2 };
  }
  return { id: 1 << e | c2 << f2 | d, overflow: a2 };
}
var uc = Math.clz32 ? Math.clz32 : vc, wc = Math.log, xc = Math.LN2;
function vc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (wc(a2) / xc | 0) | 0;
}
function yc(a2, b2) {
  return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var zc = "function" === typeof Object.is ? Object.is : yc, R = null, Ac = null, Bc = null, S = null, T = false, Cc = false, U = 0, V = null, Dc = 0;
function W() {
  if (null === R)
    throw Error(k(321));
  return R;
}
function Ec() {
  if (0 < Dc)
    throw Error(k(312));
  return { memoizedState: null, queue: null, next: null };
}
function Fc() {
  null === S ? null === Bc ? (T = false, Bc = S = Ec()) : (T = true, S = Bc) : null === S.next ? (T = false, S = S.next = Ec()) : (T = true, S = S.next);
  return S;
}
function Gc() {
  Ac = R = null;
  Cc = false;
  Bc = null;
  Dc = 0;
  S = V = null;
}
function Hc(a2, b2) {
  return "function" === typeof b2 ? b2(a2) : b2;
}
function Ic(a2, b2, c2) {
  R = W();
  S = Fc();
  if (T) {
    var d = S.queue;
    b2 = d.dispatch;
    if (null !== V && (c2 = V.get(d), void 0 !== c2)) {
      V.delete(d);
      d = S.memoizedState;
      do
        d = a2(d, c2.action), c2 = c2.next;
      while (null !== c2);
      S.memoizedState = d;
      return [d, b2];
    }
    return [S.memoizedState, b2];
  }
  a2 = a2 === Hc ? "function" === typeof b2 ? b2() : b2 : void 0 !== c2 ? c2(b2) : b2;
  S.memoizedState = a2;
  a2 = S.queue = { last: null, dispatch: null };
  a2 = a2.dispatch = Jc.bind(null, R, a2);
  return [S.memoizedState, a2];
}
function Kc(a2, b2) {
  R = W();
  S = Fc();
  b2 = void 0 === b2 ? null : b2;
  if (null !== S) {
    var c2 = S.memoizedState;
    if (null !== c2 && null !== b2) {
      var d = c2[1];
      a:
        if (null === d)
          d = false;
        else {
          for (var f2 = 0; f2 < d.length && f2 < b2.length; f2++)
            if (!zc(b2[f2], d[f2])) {
              d = false;
              break a;
            }
          d = true;
        }
      if (d)
        return c2[0];
    }
  }
  a2 = a2();
  S.memoizedState = [a2, b2];
  return a2;
}
function Jc(a2, b2, c2) {
  if (25 <= Dc)
    throw Error(k(301));
  if (a2 === R)
    if (Cc = true, a2 = { action: c2, next: null }, null === V && (V = /* @__PURE__ */ new Map()), c2 = V.get(b2), void 0 === c2)
      V.set(b2, a2);
    else {
      for (b2 = c2; null !== b2.next; )
        b2 = b2.next;
      b2.next = a2;
    }
}
function Lc() {
  throw Error(k(394));
}
function Mc() {
}
var Oc = { readContext: function(a2) {
  return a2._currentValue;
}, useContext: function(a2) {
  W();
  return a2._currentValue;
}, useMemo: Kc, useReducer: Ic, useRef: function(a2) {
  R = W();
  S = Fc();
  var b2 = S.memoizedState;
  return null === b2 ? (a2 = { current: a2 }, S.memoizedState = a2) : b2;
}, useState: function(a2) {
  return Ic(Hc, a2);
}, useInsertionEffect: Mc, useLayoutEffect: function() {
}, useCallback: function(a2, b2) {
  return Kc(function() {
    return a2;
  }, b2);
}, useImperativeHandle: Mc, useEffect: Mc, useDebugValue: Mc, useDeferredValue: function(a2) {
  W();
  return a2;
}, useTransition: function() {
  W();
  return [false, Lc];
}, useId: function() {
  var a2 = Ac.treeContext;
  var b2 = a2.overflow;
  a2 = a2.id;
  a2 = (a2 & ~(1 << 32 - uc(a2) - 1)).toString(32) + b2;
  var c2 = Nc;
  if (null === c2)
    throw Error(k(404));
  b2 = U++;
  a2 = ":" + c2.idPrefix + "R" + a2;
  0 < b2 && (a2 += "H" + b2.toString(32));
  return a2 + ":";
}, useMutableSource: function(a2, b2) {
  W();
  return b2(a2._source);
}, useSyncExternalStore: function(a2, b2, c2) {
  if (void 0 === c2)
    throw Error(k(407));
  return c2();
} }, Nc = null, Pc = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function Qc(a2) {
  console.error(a2);
  return null;
}
function X() {
}
function Rc(a2, b2, c2, d, f2, e, g, h, m2) {
  var q2 = [], r2 = /* @__PURE__ */ new Set();
  b2 = { destination: null, responseState: b2, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: r2, pingedTasks: q2, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f2 ? Qc : f2, onAllReady: void 0 === e ? X : e, onShellReady: void 0 === g ? X : g, onShellError: void 0 === h ? X : h, onFatalError: void 0 === m2 ? X : m2 };
  c2 = Sc(b2, 0, null, c2, false, false);
  c2.parentFlushed = true;
  a2 = Tc(b2, a2, null, c2, r2, kc, null, sc);
  q2.push(a2);
  return b2;
}
function Tc(a2, b2, c2, d, f2, e, g, h) {
  a2.allPendingTasks++;
  null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
  var m2 = { node: b2, ping: function() {
    var b3 = a2.pingedTasks;
    b3.push(m2);
    1 === b3.length && Uc(a2);
  }, blockedBoundary: c2, blockedSegment: d, abortSet: f2, legacyContext: e, context: g, treeContext: h };
  f2.add(m2);
  return m2;
}
function Sc(a2, b2, c2, d, f2, e) {
  return { status: 0, id: -1, index: b2, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f2, textEmbedded: e };
}
function Y(a2, b2) {
  a2 = a2.onError(b2);
  if (null != a2 && "string" !== typeof a2)
    throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
  return a2;
}
function Vc(a2, b2) {
  var c2 = a2.onShellError;
  c2(b2);
  c2 = a2.onFatalError;
  c2(b2);
  null !== a2.destination ? (a2.status = 2, da(a2.destination, b2)) : (a2.status = 1, a2.fatalError = b2);
}
function Wc(a2, b2, c2, d, f2) {
  R = {};
  Ac = b2;
  U = 0;
  for (a2 = c2(d, f2); Cc; )
    Cc = false, U = 0, Dc += 1, S = null, a2 = c2(d, f2);
  Gc();
  return a2;
}
function Xc(a2, b2, c2, d) {
  var f2 = c2.render(), e = d.childContextTypes;
  if (null !== e && void 0 !== e) {
    var g = b2.legacyContext;
    if ("function" !== typeof c2.getChildContext)
      d = g;
    else {
      c2 = c2.getChildContext();
      for (var h in c2)
        if (!(h in e))
          throw Error(k(108, jc(d) || "Unknown", h));
      d = N({}, g, c2);
    }
    b2.legacyContext = d;
    Z(a2, b2, f2);
    b2.legacyContext = g;
  } else
    Z(a2, b2, f2);
}
function Yc(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = N({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      void 0 === b2[c2] && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
function Zc(a2, b2, c2, d, f2) {
  if ("function" === typeof c2)
    if (c2.prototype && c2.prototype.isReactComponent) {
      f2 = lc(c2, b2.legacyContext);
      var e = c2.contextType;
      e = new c2(d, "object" === typeof e && null !== e ? e._currentValue : f2);
      rc(e, c2, d, f2);
      Xc(a2, b2, e, c2);
    } else {
      e = lc(c2, b2.legacyContext);
      f2 = Wc(a2, b2, c2, d, e);
      var g = 0 !== U;
      if ("object" === typeof f2 && null !== f2 && "function" === typeof f2.render && void 0 === f2.$$typeof)
        rc(f2, c2, d, e), Xc(a2, b2, f2, c2);
      else if (g) {
        d = b2.treeContext;
        b2.treeContext = tc(d, 1, 0);
        try {
          Z(a2, b2, f2);
        } finally {
          b2.treeContext = d;
        }
      } else
        Z(a2, b2, f2);
    }
  else if ("string" === typeof c2) {
    f2 = b2.blockedSegment;
    e = Sa(f2.chunks, c2, d, a2.responseState, f2.formatContext);
    f2.lastPushedText = false;
    g = f2.formatContext;
    f2.formatContext = Ba(g, c2, d);
    $c(a2, b2, e);
    f2.formatContext = g;
    switch (c2) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        f2.chunks.push(Ta, u(c2), Ua);
    }
    f2.lastPushedText = false;
  } else {
    switch (c2) {
      case gc:
      case fc:
      case Wb:
      case Xb:
      case Vb:
        Z(a2, b2, d.children);
        return;
      case bc:
        Z(a2, b2, d.children);
        return;
      case ec:
        throw Error(k(343));
      case ac:
        a: {
          c2 = b2.blockedBoundary;
          f2 = b2.blockedSegment;
          e = d.fallback;
          d = d.children;
          g = /* @__PURE__ */ new Set();
          var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m2 = Sc(a2, f2.chunks.length, h, f2.formatContext, false, false);
          f2.children.push(m2);
          f2.lastPushedText = false;
          var q2 = Sc(a2, 0, null, f2.formatContext, false, false);
          q2.parentFlushed = true;
          b2.blockedBoundary = h;
          b2.blockedSegment = q2;
          try {
            if ($c(
              a2,
              b2,
              d
            ), q2.lastPushedText && q2.textEmbedded && q2.chunks.push(Ca), q2.status = 1, ad(h, q2), 0 === h.pendingTasks)
              break a;
          } catch (r2) {
            q2.status = 4, h.forceClientRender = true, h.errorDigest = Y(a2, r2);
          } finally {
            b2.blockedBoundary = c2, b2.blockedSegment = f2;
          }
          b2 = Tc(a2, e, c2, m2, g, b2.legacyContext, b2.context, b2.treeContext);
          a2.pingedTasks.push(b2);
        }
        return;
    }
    if ("object" === typeof c2 && null !== c2)
      switch (c2.$$typeof) {
        case $b:
          d = Wc(a2, b2, c2.render, d, f2);
          if (0 !== U) {
            c2 = b2.treeContext;
            b2.treeContext = tc(c2, 1, 0);
            try {
              Z(a2, b2, d);
            } finally {
              b2.treeContext = c2;
            }
          } else
            Z(a2, b2, d);
          return;
        case cc:
          c2 = c2.type;
          d = Yc(c2, d);
          Zc(a2, b2, c2, d, f2);
          return;
        case Yb:
          f2 = d.children;
          c2 = c2._context;
          d = d.value;
          e = c2._currentValue;
          c2._currentValue = d;
          g = O;
          O = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c2, parentValue: e, value: d };
          b2.context = d;
          Z(a2, b2, f2);
          a2 = O;
          if (null === a2)
            throw Error(k(403));
          d = a2.parentValue;
          a2.context._currentValue = d === hc ? a2.context._defaultValue : d;
          a2 = O = a2.parent;
          b2.context = a2;
          return;
        case Zb:
          d = d.children;
          d = d(c2._currentValue);
          Z(a2, b2, d);
          return;
        case dc:
          f2 = c2._init;
          c2 = f2(c2._payload);
          d = Yc(c2, d);
          Zc(a2, b2, c2, d, void 0);
          return;
      }
    throw Error(k(
      130,
      null == c2 ? c2 : typeof c2,
      ""
    ));
  }
}
function Z(a2, b2, c2) {
  b2.node = c2;
  if ("object" === typeof c2 && null !== c2) {
    switch (c2.$$typeof) {
      case Tb:
        Zc(a2, b2, c2.type, c2.props, c2.ref);
        return;
      case Ub:
        throw Error(k(257));
      case dc:
        var d = c2._init;
        c2 = d(c2._payload);
        Z(a2, b2, c2);
        return;
    }
    if (ra(c2)) {
      bd(a2, b2, c2);
      return;
    }
    null === c2 || "object" !== typeof c2 ? d = null : (d = ic && c2[ic] || c2["@@iterator"], d = "function" === typeof d ? d : null);
    if (d && (d = d.call(c2))) {
      c2 = d.next();
      if (!c2.done) {
        var f2 = [];
        do
          f2.push(c2.value), c2 = d.next();
        while (!c2.done);
        bd(a2, b2, f2);
      }
      return;
    }
    a2 = Object.prototype.toString.call(c2);
    throw Error(k(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
  }
  "string" === typeof c2 ? (d = b2.blockedSegment, d.lastPushedText = Da(b2.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b2.blockedSegment, d.lastPushedText = Da(b2.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
}
function bd(a2, b2, c2) {
  for (var d = c2.length, f2 = 0; f2 < d; f2++) {
    var e = b2.treeContext;
    b2.treeContext = tc(e, d, f2);
    try {
      $c(a2, b2, c2[f2]);
    } finally {
      b2.treeContext = e;
    }
  }
}
function $c(a2, b2, c2) {
  var d = b2.blockedSegment.formatContext, f2 = b2.legacyContext, e = b2.context;
  try {
    return Z(a2, b2, c2);
  } catch (m2) {
    if (Gc(), "object" === typeof m2 && null !== m2 && "function" === typeof m2.then) {
      c2 = m2;
      var g = b2.blockedSegment, h = Sc(a2, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
      g.children.push(h);
      g.lastPushedText = false;
      a2 = Tc(a2, b2.node, b2.blockedBoundary, h, b2.abortSet, b2.legacyContext, b2.context, b2.treeContext).ping;
      c2.then(a2, a2);
      b2.blockedSegment.formatContext = d;
      b2.legacyContext = f2;
      b2.context = e;
      Q(e);
    } else
      throw b2.blockedSegment.formatContext = d, b2.legacyContext = f2, b2.context = e, Q(e), m2;
  }
}
function cd(a2) {
  var b2 = a2.blockedBoundary;
  a2 = a2.blockedSegment;
  a2.status = 3;
  dd(this, b2, a2);
}
function ed(a2, b2, c2) {
  var d = a2.blockedBoundary;
  a2.blockedSegment.status = 3;
  null === d ? (b2.allPendingTasks--, 2 !== b2.status && (b2.status = 2, null !== b2.destination && b2.destination.close())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(k(432)) : c2, d.errorDigest = b2.onError(a2), d.parentFlushed && b2.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
    return ed(a3, b2, c2);
  }), d.fallbackAbortableTasks.clear(), b2.allPendingTasks--, 0 === b2.allPendingTasks && (d = b2.onAllReady, d()));
}
function ad(a2, b2) {
  if (0 === b2.chunks.length && 1 === b2.children.length && null === b2.children[0].boundary) {
    var c2 = b2.children[0];
    c2.id = b2.id;
    c2.parentFlushed = true;
    1 === c2.status && ad(a2, c2);
  } else
    a2.completedSegments.push(b2);
}
function dd(a2, b2, c2) {
  if (null === b2) {
    if (c2.parentFlushed) {
      if (null !== a2.completedRootSegment)
        throw Error(k(389));
      a2.completedRootSegment = c2;
    }
    a2.pendingRootTasks--;
    0 === a2.pendingRootTasks && (a2.onShellError = X, b2 = a2.onShellReady, b2());
  } else
    b2.pendingTasks--, b2.forceClientRender || (0 === b2.pendingTasks ? (c2.parentFlushed && 1 === c2.status && ad(b2, c2), b2.parentFlushed && a2.completedBoundaries.push(b2), b2.fallbackAbortableTasks.forEach(cd, a2), b2.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (ad(b2, c2), 1 === b2.completedSegments.length && b2.parentFlushed && a2.partialBoundaries.push(b2)));
  a2.allPendingTasks--;
  0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
}
function Uc(a2) {
  if (2 !== a2.status) {
    var b2 = O, c2 = Pc.current;
    Pc.current = Oc;
    var d = Nc;
    Nc = a2.responseState;
    try {
      var f2 = a2.pingedTasks, e;
      for (e = 0; e < f2.length; e++) {
        var g = f2[e];
        var h = a2, m2 = g.blockedSegment;
        if (0 === m2.status) {
          Q(g.context);
          try {
            Z(h, g, g.node), m2.lastPushedText && m2.textEmbedded && m2.chunks.push(Ca), g.abortSet.delete(g), m2.status = 1, dd(h, g.blockedBoundary, m2);
          } catch (G2) {
            if (Gc(), "object" === typeof G2 && null !== G2 && "function" === typeof G2.then) {
              var q2 = g.ping;
              G2.then(q2, q2);
            } else {
              g.abortSet.delete(g);
              m2.status = 4;
              var r2 = g.blockedBoundary, v2 = G2, A2 = Y(h, v2);
              null === r2 ? Vc(h, v2) : (r2.pendingTasks--, r2.forceClientRender || (r2.forceClientRender = true, r2.errorDigest = A2, r2.parentFlushed && h.clientRenderedBoundaries.push(r2)));
              h.allPendingTasks--;
              if (0 === h.allPendingTasks) {
                var F2 = h.onAllReady;
                F2();
              }
            }
          } finally {
          }
        }
      }
      f2.splice(0, e);
      null !== a2.destination && fd(a2, a2.destination);
    } catch (G2) {
      Y(a2, G2), Vc(a2, G2);
    } finally {
      Nc = d, Pc.current = c2, c2 === Oc && Q(b2);
    }
  }
}
function gd(a2, b2, c2) {
  c2.parentFlushed = true;
  switch (c2.status) {
    case 0:
      var d = c2.id = a2.nextSegmentId++;
      c2.lastPushedText = false;
      c2.textEmbedded = false;
      a2 = a2.responseState;
      p(b2, Va);
      p(b2, a2.placeholderPrefix);
      a2 = u(d.toString(16));
      p(b2, a2);
      return t(b2, Wa);
    case 1:
      c2.status = 2;
      var f2 = true;
      d = c2.chunks;
      var e = 0;
      c2 = c2.children;
      for (var g = 0; g < c2.length; g++) {
        for (f2 = c2[g]; e < f2.index; e++)
          p(b2, d[e]);
        f2 = hd(a2, b2, f2);
      }
      for (; e < d.length - 1; e++)
        p(b2, d[e]);
      e < d.length && (f2 = t(b2, d[e]));
      return f2;
    default:
      throw Error(k(390));
  }
}
function hd(a2, b2, c2) {
  var d = c2.boundary;
  if (null === d)
    return gd(a2, b2, c2);
  d.parentFlushed = true;
  if (d.forceClientRender)
    d = d.errorDigest, t(b2, $a), p(b2, bb), d && (p(b2, db), p(b2, u(C(d))), p(b2, cb)), t(b2, eb), gd(a2, b2, c2);
  else if (0 < d.pendingTasks) {
    d.rootSegmentID = a2.nextSegmentId++;
    0 < d.completedSegments.length && a2.partialBoundaries.push(d);
    var f2 = a2.responseState;
    var e = f2.nextSuspenseID++;
    f2 = w(f2.boundaryPrefix + e.toString(16));
    d = d.id = f2;
    fb(b2, a2.responseState, d);
    gd(a2, b2, c2);
  } else if (d.byteSize > a2.progressiveChunkSize)
    d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), fb(b2, a2.responseState, d.id), gd(a2, b2, c2);
  else {
    t(b2, Xa);
    c2 = d.completedSegments;
    if (1 !== c2.length)
      throw Error(k(391));
    hd(a2, b2, c2[0]);
  }
  return t(b2, ab);
}
function id(a2, b2, c2) {
  Bb(b2, a2.responseState, c2.formatContext, c2.id);
  hd(a2, b2, c2);
  return Cb(b2, c2.formatContext);
}
function jd(a2, b2, c2) {
  for (var d = c2.completedSegments, f2 = 0; f2 < d.length; f2++)
    kd(a2, b2, c2, d[f2]);
  d.length = 0;
  a2 = a2.responseState;
  d = c2.id;
  c2 = c2.rootSegmentID;
  p(b2, a2.startInlineScript);
  a2.sentCompleteBoundaryFunction ? p(b2, Jb) : (a2.sentCompleteBoundaryFunction = true, p(b2, Ib));
  if (null === d)
    throw Error(k(395));
  c2 = u(c2.toString(16));
  p(b2, d);
  p(b2, Kb);
  p(b2, a2.segmentPrefix);
  p(b2, c2);
  return t(b2, Lb);
}
function kd(a2, b2, c2, d) {
  if (2 === d.status)
    return true;
  var f2 = d.id;
  if (-1 === f2) {
    if (-1 === (d.id = c2.rootSegmentID))
      throw Error(k(392));
    return id(a2, b2, d);
  }
  id(a2, b2, d);
  a2 = a2.responseState;
  p(b2, a2.startInlineScript);
  a2.sentCompleteSegmentFunction ? p(b2, Eb) : (a2.sentCompleteSegmentFunction = true, p(b2, Db));
  p(b2, a2.segmentPrefix);
  f2 = u(f2.toString(16));
  p(b2, f2);
  p(b2, Gb);
  p(b2, a2.placeholderPrefix);
  p(b2, f2);
  return t(b2, Hb);
}
function fd(a2, b2) {
  l$1 = new Uint8Array(512);
  n = 0;
  try {
    var c2 = a2.completedRootSegment;
    if (null !== c2 && 0 === a2.pendingRootTasks) {
      hd(a2, b2, c2);
      a2.completedRootSegment = null;
      var d = a2.responseState.bootstrapChunks;
      for (c2 = 0; c2 < d.length - 1; c2++)
        p(b2, d[c2]);
      c2 < d.length && t(b2, d[c2]);
    }
    var f2 = a2.clientRenderedBoundaries, e;
    for (e = 0; e < f2.length; e++) {
      var g = f2[e];
      d = b2;
      var h = a2.responseState, m2 = g.id, q2 = g.errorDigest, r2 = g.errorMessage, v2 = g.errorComponentStack;
      p(d, h.startInlineScript);
      h.sentClientRenderFunction ? p(d, Nb) : (h.sentClientRenderFunction = true, p(
        d,
        Mb
      ));
      if (null === m2)
        throw Error(k(395));
      p(d, m2);
      p(d, Ob);
      if (q2 || r2 || v2)
        p(d, Qb), p(d, u(Sb(q2 || "")));
      if (r2 || v2)
        p(d, Qb), p(d, u(Sb(r2 || "")));
      v2 && (p(d, Qb), p(d, u(Sb(v2))));
      if (!t(d, Pb))
        ;
    }
    f2.splice(0, e);
    var A2 = a2.completedBoundaries;
    for (e = 0; e < A2.length; e++)
      if (!jd(a2, b2, A2[e]))
        ;
    A2.splice(0, e);
    ba(b2);
    l$1 = new Uint8Array(512);
    n = 0;
    var F2 = a2.partialBoundaries;
    for (e = 0; e < F2.length; e++) {
      var G2 = F2[e];
      a: {
        f2 = a2;
        g = b2;
        var ma2 = G2.completedSegments;
        for (h = 0; h < ma2.length; h++)
          if (!kd(
            f2,
            g,
            G2,
            ma2[h]
          )) {
            h++;
            ma2.splice(0, h);
            var Fb2 = false;
            break a;
          }
        ma2.splice(0, h);
        Fb2 = true;
      }
      if (!Fb2) {
        a2.destination = null;
        e++;
        F2.splice(0, e);
        return;
      }
    }
    F2.splice(0, e);
    var na2 = a2.completedBoundaries;
    for (e = 0; e < na2.length; e++)
      if (!jd(a2, b2, na2[e]))
        ;
    na2.splice(0, e);
  } finally {
    ba(b2), 0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b2.close();
  }
}
function ld(a2, b2) {
  try {
    var c2 = a2.abortableTasks;
    c2.forEach(function(c3) {
      return ed(c3, a2, b2);
    });
    c2.clear();
    null !== a2.destination && fd(a2, a2.destination);
  } catch (d) {
    Y(a2, d), Vc(a2, d);
  }
}
reactDomServer_browser_production_min.renderToReadableStream = function(a2, b2) {
  return new Promise(function(c2, d) {
    var f2, e, g = new Promise(function(a3, b3) {
      e = a3;
      f2 = b3;
    }), h = Rc(a2, za(b2 ? b2.identifierPrefix : void 0, b2 ? b2.nonce : void 0, b2 ? b2.bootstrapScriptContent : void 0, b2 ? b2.bootstrapScripts : void 0, b2 ? b2.bootstrapModules : void 0), Aa(b2 ? b2.namespaceURI : void 0), b2 ? b2.progressiveChunkSize : void 0, b2 ? b2.onError : void 0, e, function() {
      var a3 = new ReadableStream({ type: "bytes", pull: function(a4) {
        if (1 === h.status)
          h.status = 2, da(a4, h.fatalError);
        else if (2 !== h.status && null === h.destination) {
          h.destination = a4;
          try {
            fd(h, a4);
          } catch (A2) {
            Y(h, A2), Vc(h, A2);
          }
        }
      }, cancel: function() {
        ld(h);
      } }, { highWaterMark: 0 });
      a3.allReady = g;
      c2(a3);
    }, function(a3) {
      g.catch(function() {
      });
      d(a3);
    }, f2);
    if (b2 && b2.signal) {
      var m2 = b2.signal, q2 = function() {
        ld(h, m2.reason);
        m2.removeEventListener("abort", q2);
      };
      m2.addEventListener("abort", q2);
    }
    Uc(h);
  });
};
reactDomServer_browser_production_min.version = "18.2.0";
var l, s;
{
  l = reactDomServerLegacy_browser_production_min;
  s = reactDomServer_browser_production_min;
}
l.version;
l.renderToString;
var renderToStaticMarkup = l.renderToStaticMarkup;
l.renderToNodeStream;
l.renderToStaticNodeStream;
s.renderToReadableStream;
const kenobi = "/portfolio/assets/hello-there.bd34a6ef.jpeg";
function HelloThere() {
  return /* @__PURE__ */ jsx("div", {
    className: "",
    children: /* @__PURE__ */ jsx("img", {
      src: kenobi,
      alt: "kenobi saying hello there"
    })
  });
}
function Bg() {
  const svg = react.exports.useMemo(() => /* @__PURE__ */ jsxs("svg", {
    id: "visual",
    className: "relative inset-0 dark:filter dark:hue-rotate-15 h-screen",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      zIndex: -1
    },
    children: [/* @__PURE__ */ jsx("defs", {
      children: /* @__PURE__ */ jsxs("filter", {
        id: "blur1",
        x: "-10%",
        y: "-10%",
        width: "10vw",
        height: "10vh",
        children: [/* @__PURE__ */ jsx("feBlend", {
          mode: "normal",
          in: "SourceGraphic",
          in2: "BackgroundImageFix",
          result: "shape"
        }), /* @__PURE__ */ jsx("feGaussianBlur", {
          stdDeviation: "163",
          result: "effect1_foregroundBlur"
        })]
      })
    }), /* @__PURE__ */ jsx("rect", {
      className: "w-full h-full",
      width: "100vw",
      height: "100vh",
      fill: "#6600FF"
    }), /* @__PURE__ */ jsxs("g", {
      filter: "url(#blur1)",
      children: [/* @__PURE__ */ jsx("circle", {
        cx: "779",
        cy: "386",
        fill: "#000000",
        r: "363"
      }), /* @__PURE__ */ jsx("circle", {
        cx: "931",
        cy: "65",
        fill: "#6600FF",
        r: "363"
      }), /* @__PURE__ */ jsx("circle", {
        cx: "40",
        cy: "934",
        fill: "#000000",
        r: "363"
      })]
    })]
  }), []);
  return svg;
}
function About() {
  const svgString = encodeURIComponent(renderToStaticMarkup(/* @__PURE__ */ jsx(Bg, {})));
  return /* @__PURE__ */ jsxs("div", {
    className: "hero h-screen w-screen dark:filter dark:hue-rotate-30",
    style: {
      backgroundImage: `url("data:image/svg+xml,${svgString}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    },
    children: [/* @__PURE__ */ jsx("div", {
      className: "hero-overlay w-screen bg-opacity-70 filter contrast-125 dark:contrast-100 dark:bg-opacity-40 z-0"
    }), /* @__PURE__ */ jsx("div", {
      className: "hero-content flex-col lg:flex-row",
      children: /* @__PURE__ */ jsx("div", {
        className: "hero-content text-center text-neutral-content",
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-md",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "tooltip",
            children: [/* @__PURE__ */ jsx(motion.h1, {
              initial: {
                opacity: 0
              },
              viewport: {
                once: true
              },
              whileInView: {
                opacity: [0, 1],
                scale: [1.4, 1]
              },
              className: " mb-5 text-5xl font-bold animate-pulse ",
              children: "Hello there"
            }), /* @__PURE__ */ jsx(HelloThere, {})]
          }), /* @__PURE__ */ jsx(motion.p, {
            initial: {
              opacity: 0
            },
            whileInView: {
              opacity: [0, 1],
              scale: [0.4, 1]
            },
            viewport: {
              once: true
            },
            className: "mb-5",
            children: "I am a Fullstack Developer currently looking for a remote position."
          })]
        })
      })
    })]
  });
}
const excel = "/portfolio/assets/excel.cd9c6fa6.png";
const tp1 = "/portfolio/assets/tp1.7844be55.jpg";
const inventory = "/portfolio/assets/inventory.449c9fe0.png";
const video = "/portfolio/assets/video.44b374bf.webm";
const webProjects = [
  {
    name: "Inventory Manager CRUD",
    description: "Frontend: NextJS, ReactJS, TypeScript and MaterialUI. Backend: NodeJS, Express and MongoDB.",
    imageSrc: inventory,
    imageAlt: "Second project image.",
    href: "https://gabrielruizvarela.github.io/A-Photo-Tagging-App/",
    repo: "https://github.com/GabrielRuizVarela/Inventory-Frontend"
  },
  {
    name: "Excel Filters",
    description: "Build with React, Redux, TypeScript, Firebase, Tailwind.",
    imageSrc: excel,
    imageAlt: "First project image.",
    href: "https://gabrielruizvarela.github.io/Excel-Filters/",
    repo: "https://github.com/GabrielRuizVarela/Excel-Filters"
  }
];
const engineeringProjects = [
  {
    name: "Biomechanical sound source polar pattern measurement",
    description: "This document describes a method to measure the directivity of a biomechanical source.",
    imageSrc: tp1,
    imageAlt: "First Engineering project image.",
    href: "https://drive.google.com/file/d/1rOASwHCp-RMIGml1D_QBY2APR5RGlX6Q/view?usp=sharing"
  },
  {
    name: "Systematic study of the isotropy evolution in a decaying sound field inside reverberant room",
    description: "This document describes a study of the isotropy evolution in a decaying sound field inside a reverberant room.",
    imageSrc: video,
    video: true,
    imageAlt: "Second Engineering project image.",
    href: "https://drive.google.com/file/d/12xD_orI_FXxF6glyaHA1aQex5ILdyOxO/view?usp=sharing"
  }
];
function Projects$1() {
  return /* @__PURE__ */ jsx("div", {
    className: "h-min-screen bg-black dark:bg-purple-100  align-center justify-center sm:h-min min-h-screen w-screen",
    children: /* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid content-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 ",
        children: [/* @__PURE__ */ jsx(motion.h2, {
          viewport: {
            once: true
          },
          initial: {
            opacity: 0
          },
          whileInView: {
            opacity: 1
          },
          transition: {
            duration: 0.55,
            ease: "easeInOut",
            delay: 0.3
          },
          className: "text-2xl pb-6 font-bold text-gray-200 dark:text-gray-900 ",
          children: "Web Dev Projects"
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-6 pt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-16 xl:justify-evenly lg:space-y-0",
          children: webProjects.map((callout) => /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("div", {
              className: "group relative   hover:scale-105  transition-transform",
              children: [/* @__PURE__ */ jsxs("a", {
                href: callout.href,
                children: [/* @__PURE__ */ jsx(motion.div, {
                  viewport: {
                    once: true
                  },
                  initial: {
                    opacity: 0,
                    x: "100%"
                  },
                  whileInView: {
                    x: ["100%", "0%"],
                    opacity: 1
                  },
                  transition: {
                    duration: 0.4,
                    delay: 0.5
                  },
                  className: "relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1  lg:aspect-h-1  ",
                  children: /* @__PURE__ */ jsx("img", {
                    src: callout.imageSrc,
                    alt: callout.imageAlt,
                    className: "h-full w-full object-cover object-center"
                  })
                }), /* @__PURE__ */ jsxs(motion.h3, {
                  viewport: {
                    once: true
                  },
                  initial: {
                    opacity: 0,
                    x: "-100%"
                  },
                  whileInView: {
                    x: ["-100%", "0%"],
                    opacity: 1
                  },
                  className: "mt-6 text-sm text-gray-500",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "absolute inset-0"
                  }), callout.name]
                })]
              }), /* @__PURE__ */ jsx(motion.p, {
                viewport: {
                  once: true
                },
                initial: {
                  opacity: 0,
                  x: "-100%"
                },
                whileInView: {
                  x: ["-100%", "0%"],
                  opacity: 1
                },
                className: "text-base font-semibold dark:text-gray-900",
                children: callout.description
              })]
            }), /* @__PURE__ */ jsx(motion.button, {
              viewport: {
                once: true
              },
              initial: {
                opacity: 0
              },
              whileInView: {
                x: ["20%", "-30%", "40%", "-50%", "0%"],
                opacity: [0, 1]
              },
              type: "button",
              className: "btn btn-outline hover:scale-205 transition-transform m-2 text-2xl",
              children: /* @__PURE__ */ jsx("a", {
                href: callout.repo,
                children: /* @__PURE__ */ jsx("div", {
                  className: "text-gray-100 dark:text-gray-900 justify-center items-center flex m-2 hover:scale-110 transition-transform",
                  children: /* @__PURE__ */ jsx(Icon, {
                    icon: "mdi:github"
                  })
                })
              })
            })]
          }, callout.name))
        })]
      })
    })
  });
}
function Projects() {
  return /* @__PURE__ */ jsx("div", {
    className: "h-min-screen  bg-gray-900 dark:bg-gray-200 grid align-center justify-center sm:h-min min-h-screen w-screen",
    children: /* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px- grid content-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32",
        children: [/* @__PURE__ */ jsx(motion.h2, {
          initial: {
            opacity: 0,
            scale: 1.1
          },
          whileInView: {
            opacity: [0, 1],
            scale: [1.1, 1]
          },
          viewport: {
            once: true
          },
          transition: {
            duration: 0.35,
            ease: "easeInOut"
          },
          className: "text-2xl pb-16 font-bold text-gray-200 dark:text-gray-900",
          children: "Engineering Projects"
        }), /* @__PURE__ */ jsx(motion.div, {
          viewport: {
            once: true
          },
          initial: {
            opacity: 0,
            x: "-100%"
          },
          transition: {
            duration: 0.4
          },
          whileInView: {
            x: ["-100%", "0%"],
            opacity: [0, 1]
          },
          className: "mt-6 pt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0 ",
          children: engineeringProjects.map((callout) => /* @__PURE__ */ jsxs("div", {
            className: "group relative mx-16 hover:scale-105 transition-transform",
            children: [/* @__PURE__ */ jsx("div", {
              className: "relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1",
              children: callout.video ? /* @__PURE__ */ jsx("video", {
                autoPlay: true,
                muted: true,
                className: "group relative h-full w-full object-fit object-center",
                children: /* @__PURE__ */ jsx("source", {
                  src: video,
                  type: "video/webm"
                })
              }) : /* @__PURE__ */ jsx("img", {
                src: callout.imageSrc,
                alt: callout.imageAlt,
                className: "h-full w-full object-cover object-center"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-6 text-sm text-gray-500",
              children: /* @__PURE__ */ jsxs("a", {
                href: callout.href,
                children: [/* @__PURE__ */ jsx("span", {
                  className: "absolute inset-0"
                }), callout.name]
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "text-base font-semibold dark:text-gray-900",
              children: callout.description
            })]
          }, callout.name))
        })]
      })
    })
  });
}
const features = [{
  name: "Javascript",
  icon: "fa-brands:js-square"
}, {
  name: "Typescript",
  icon: "mdi:language-typescript"
}, {
  name: "React",
  icon: "akar-icons:react-fill"
}, {
  name: "NextJS",
  icon: "akar-icons:nextjs-fill"
}, {
  name: "Redux",
  icon: "tabler:brand-redux"
}, {
  name: "Node",
  icon: "fa6-brands:node"
}, {
  name: "Python ",
  icon: "akar-icons:python-fill"
}, {
  name: "Matlab",
  icon: "file-icons:matlab"
}, {
  name: "MongoDB",
  icon: "teenyicons:mongodb-outline"
}, {
  name: "Express",
  icon: "simple-icons:express"
}, {
  name: "Git",
  icon: "mdi:git"
}, {
  name: "HTML",
  icon: "mdi:language-html5"
}, {
  name: "CSS",
  icon: "mdi:language-css3"
}, {
  name: "Sass",
  icon: "mdi:sass"
}, {
  name: "Tailwind",
  icon: "mdi:tailwind"
}];
function Skills() {
  return /* @__PURE__ */ jsx("div", {
    className: "bg-zinc-900 dark:bg-indigo-300 py-12 min-h-screen grid content-center w-screen justify-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("div", {
        className: "text-center",
        children: /* @__PURE__ */ jsx(motion.p, {
          viewport: {
            once: true
          },
          initial: {
            opacity: 0,
            scale: 0
          },
          whileInView: {
            opacity: [0, 1],
            scale: [0, 1]
          },
          transition: {
            duration: 0.2
          },
          className: "text-3xl font-bold leading-8 tracking-tight text-gray-200 dark:text-black sm:text-4xl",
          children: "Skills"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 flex flex-wrap container mx-auto  justify-center",
        children: features.map((feature, index2) => /* @__PURE__ */ jsxs(motion.div, {
          viewport: {
            once: true
          },
          initial: {
            opacity: 0
          },
          whileInView: {
            opacity: [0, 1]
          },
          transition: {
            duration: 0.5,
            delay: index2 * 0.05
          },
          className: "drop-shadow-md",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex m-2 mb-1 h-12 w-12 items-center justify-center rounded-md bg-indigo-300 dark:bg-zinc-900 text-black dark:text-white",
            children: /* @__PURE__ */ jsx(Icon, {
              icon: feature.icon,
              className: "h-6 w-6",
              "aria-hidden": "true"
            })
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs leading-6 font-medium text-white dark:text-black",
            children: feature.name
          })]
        }, feature.name))
      })]
    })
  });
}
function Contact() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white gap-8 dark:bg-white dark:text-black",
    children: /* @__PURE__ */ jsx("div", {
      className: "hero min-h-screen",
      children: /* @__PURE__ */ jsxs("div", {
        className: "hero-content flex-col lg:flex-row-reverse m-8 lg:ml-16",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center lg:text-left",
          children: [/* @__PURE__ */ jsx(motion.h1, {
            viewport: {
              once: true
            },
            initial: {
              x: "100%"
            },
            whileInView: {
              x: ["100%", "0%"]
            },
            transition: {
              duration: 0.35,
              ease: "easeInOut"
            },
            className: "text-5xl font-bold",
            children: "Am I a good fit for your company or project?"
          }), /* @__PURE__ */ jsx(motion.p, {
            viewport: {
              once: true
            },
            initial: {
              y: "100%"
            },
            whileInView: {
              y: ["100%", "0%"]
            },
            transition: {
              duration: 0.35,
              ease: "easeInOut"
            },
            className: "py-6",
            children: "Let me know! I'm always looking for new opportunities to work with great people and fun projects."
          })]
        }), /* @__PURE__ */ jsxs(motion.div, {
          className: "flex flex-col items-center",
          children: [/* @__PURE__ */ jsx(motion.div, {
            initial: {
              x: "-100%"
            },
            viewport: {
              once: true
            },
            whileInView: {
              x: ["-100%", "0%"]
            },
            transition: {
              duration: 0.35,
              ease: "easeInOut"
            },
            className: "card flex-shrink-0 w-full max-w-sm shadow-2xl bg-violet-200 dark:bg-violet-400",
            children: /* @__PURE__ */ jsx("div", {
              className: "card-body",
              children: /* @__PURE__ */ jsxs("form", {
                action: "mailto:gabrielruizvarela@gmail.com",
                method: "get",
                encType: "text/plain",
                className: "flex flex-col gap-4",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "subject",
                  placeholder: "Subject",
                  className: "input input-bordered w-full bg-purple-300 placeholder-gray-800 dark:bg-purple-200"
                }), /* @__PURE__ */ jsx("textarea", {
                  className: "textarea input-bordered w-full bg-purple-300 placeholder-gray-800 dark:bg-purple-200",
                  name: "body",
                  placeholder: "Body"
                }), /* @__PURE__ */ jsx("div", {
                  className: "form-control mt-6",
                  children: /* @__PURE__ */ jsx("button", {
                    type: "submit",
                    name: "submit",
                    value: "Send",
                    className: "btn btn-primary bg-purple-800 dark:bg-pink-400 dark:text-black dark:hover:bg-cyan-100",
                    children: "Email me"
                  })
                })]
              })
            })
          }), /* @__PURE__ */ jsxs(motion.div, {
            viewport: {
              once: true
            },
            initial: {
              y: "100%"
            },
            whileInView: {
              y: ["100%", "0%"]
            },
            transition: {
              duration: 0.35,
              ease: "easeInOut"
            },
            className: "flex gap-4 m-4",
            children: [/* @__PURE__ */ jsx("a", {
              href: " https://www.linkedin.com/in/GabrielRuizVarela",
              children: /* @__PURE__ */ jsx(Icon, {
                icon: "akar-icons:linkedin-fill"
              })
            }), /* @__PURE__ */ jsx("a", {
              href: " https://www.github.com/GabrielRuizVarela",
              children: /* @__PURE__ */ jsx(Icon, {
                icon: "akar-icons:github-fill"
              })
            })]
          })]
        })]
      })
    })
  });
}
function Main() {
  const [activeSection, setActiveSection] = react.exports.useState(0);
  const sections = [{
    id: "about",
    title: "About Me",
    content: /* @__PURE__ */ jsx(About, {})
  }, {
    id: "projects",
    title: "Projects",
    content: /* @__PURE__ */ jsx(Projects$1, {})
  }, {
    id: "eng-projects",
    title: "Engineering Projects",
    content: /* @__PURE__ */ jsx(Projects, {})
  }, {
    id: "skills",
    title: "Skills",
    content: /* @__PURE__ */ jsx(Skills, {})
  }, {
    id: "contact",
    title: "Contact",
    content: /* @__PURE__ */ jsx(Contact, {})
  }];
  const [isScrolling, setIsScrolling] = react.exports.useState(false);
  let lastScrollTime = new Date();
  const handleWheel = (e) => {
    if (isScrolling)
      return;
    const date = new Date();
    if (Number(date) - Number(lastScrollTime) < 500)
      return;
    lastScrollTime = new Date();
    setIsScrolling(true);
    if (e.deltaY > 0) {
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      }
    } else if (activeSection > 0)
      setActiveSection(activeSection - 1);
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxs("div", {
    onWheel: (e) => handleWheel(e),
    className: "App w-screen min-h-screen flex flex-col",
    children: [/* @__PURE__ */ jsx(Navbar, {
      setActiveSection
    }), /* @__PURE__ */ jsx("div", {
      style: {
        zIndex: 10,
        right: "1%",
        bottom: "40%"
      },
      className: "absolute flex flex-col justify-center items-center z-10",
      children: sections.map((section, index2) => /* @__PURE__ */ jsx("div", {
        className: "flex flex-col-reverse",
        style: {
          marginRight: "1rem",
          alignItems: "center"
        },
        children: /* @__PURE__ */ jsx("button", {
          onClick: () => setActiveSection(index2),
          type: "button",
          children: /* @__PURE__ */ jsx(Icon, {
            icon: "ant-design:caret-down-outlined",
            style: {
              color: activeSection === index2 ? "#1E90FF" : "#fff"
            }
          })
        })
      }, section.id))
    }), /* @__PURE__ */ jsx("div", {
      className: "sections min-h-full",
      children: sections[activeSection].content
    })]
  });
}
function App() {
  return /* @__PURE__ */ jsx(HashRouter, {
    children: /* @__PURE__ */ jsx(Routes, {
      children: /* @__PURE__ */ jsx(Route, {
        path: "/",
        element: /* @__PURE__ */ jsx(Main, {})
      })
    })
  });
}
const index = "";
client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(App, {})
}));
