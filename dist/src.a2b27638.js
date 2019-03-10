// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttributes = setAttributes;
exports.setEventListeners = setEventListeners;
exports.render = render;
exports.getRenderableComponent = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  @param descriptor.tag {string} 
  @param descriptor.attributes {object}
  @param descriptor.textContent {string}
  @param descriptor.children {array}
  @param descriptor.eventListeners {object}
  @param descriptor.eventListeners.[$] {function}, $ - name of the event to listen to

  @returns Node
*/
var getRenderableComponent = function getRenderableComponent(descriptor) {
  var tag = descriptor.tag,
      attributes = descriptor.attributes,
      textContent = descriptor.textContent,
      children = descriptor.children,
      eventListeners = descriptor.eventListeners;
  var element = document.createElement(tag);

  if (_typeof(attributes) === "object") {
    setAttributes(element, attributes);
  }

  if (_typeof(eventListeners) === "object") {
    setEventListeners(element, eventListeners);
  }

  if (typeof textContent === "string") {
    element.textContent = textContent;
  } else if (Array.isArray(children)) {
    children.forEach(function (childDescriptor) {
      var childNode = getRenderableComponent(childDescriptor);
      element.append(childNode);
    });
  }

  return element;
};

exports.getRenderableComponent = getRenderableComponent;

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function setEventListeners(el, listeners) {
  for (var eventName in listeners) {
    el.addEventListener(eventName, listeners[eventName]);
  }
}

function render(container, renderer) {
  container.innerHTML = "";
  container.append(renderer());
}
},{}],"src/models/Collection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Collection =
/*#__PURE__*/
function () {
  function Collection(name) {
    _classCallCheck(this, Collection);

    this._name = name;
    this._items = [];
  }

  _createClass(Collection, [{
    key: "_generateId",
    value: function _generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
  }, {
    key: "insert",
    value: function insert(item) {
      var _id = this._generateId();

      this._items.push(_objectSpread({
        _id: _id
      }, item));
    }
  }, {
    key: "find",
    value: function find(predicate) {
      return this._items.find(predicate);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      this._items.filter(function (_ref) {
        var _id = _ref._id;
        return _id !== id;
      });
    }
  }, {
    key: "update",
    value: function update(id, newItem) {
      this._items = this._items.map(function (item) {
        if (item._id === id) return _objectSpread({}, newItem, {
          _id: id
        });
        return item;
      });
    }
  }, {
    key: "items",
    get: function get() {
      return this._items;
    }
  }]);

  return Collection;
}();

var _default = Collection;
exports.default = _default;
},{}],"src/models/TodoModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoModel =
/*#__PURE__*/
function () {
  function TodoModel() {
    _classCallCheck(this, TodoModel);
  }

  _createClass(TodoModel, [{
    key: "init",
    value: function init(todo) {
      return _objectSpread({}, todo, {
        _isOpen: true,
        _createdAt: Date()
      });
    }
  }, {
    key: "complete",
    value: function complete(todo) {
      todo._isOpen = false;
      return todo;
    }
  }, {
    key: "reopen",
    value: function reopen(todo) {
      todo._isOpen = true;
      return todo;
    }
  }, {
    key: "isOpen",
    value: function isOpen(todo) {
      return todo._isOpen;
    }
  }]);

  return TodoModel;
}();

var _default = new TodoModel();

exports.default = _default;
},{}],"src/collections/todos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Collection = _interopRequireDefault(require("../models/Collection"));

var _TodoModel = _interopRequireDefault(require("../models/TodoModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todosCollection = new _Collection.default("todos");
todosCollection.insert(_TodoModel.default.init({
  message: "First To do"
}));
todosCollection.insert(_TodoModel.default.init({
  message: "Second To do"
}));
todosCollection.insert(_TodoModel.default.init({
  message: "Third To do"
}));
var _default = todosCollection;
exports.default = _default;
},{"../models/Collection":"src/models/Collection.js","../models/TodoModel":"src/models/TodoModel.js"}],"src/views/ToDoItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _todos = _interopRequireDefault(require("../collections/todos"));

var _TodoModel = _interopRequireDefault(require("../models/TodoModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToDoItemViewDescriptor = function ToDoItemViewDescriptor(_ref) {
  var todo = _ref.todo;
  return {
    tag: "li",
    children: [{
      tag: "input",
      eventListeners: {
        click: onCheck
      },
      attributes: {
        type: "checkbox",
        id: todo._id
      }
    }, {
      tag: "label",
      attributes: {
        for: todo._id
      },
      textContent: todo.message
    }]
  };
};

var onCheck = function onCheck(e) {
  var todoCheckbox = e.currentTarget;

  var todo = _todos.default.find(function (el) {
    return el._id === todoCheckbox.id;
  });

  if (todoCheckbox.checked) {
    _TodoModel.default.complete(todo);
  } else {
    _TodoModel.default.reopen(todo);
  }

  _todos.default.update(todo.id, todo);

  console.log(_todos.default.items);
};

var _default = ToDoItemViewDescriptor;
exports.default = _default;
},{"../collections/todos":"src/collections/todos.js","../models/TodoModel":"src/models/TodoModel.js"}],"src/views/ToDoList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ToDoItem = _interopRequireDefault(require("./ToDoItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToDoListViewDescriptor = function ToDoListViewDescriptor(_ref) {
  var items = _ref.items;
  return {
    tag: "ul",
    attributes: {},
    children: items.map(function (todo) {
      return (0, _ToDoItem.default)({
        todo: todo
      });
    })
  };
};

var _default = ToDoListViewDescriptor;
exports.default = _default;
},{"./ToDoItem":"src/views/ToDoItem.js"}],"src/views/ToDoForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _todos = _interopRequireDefault(require("../collections/todos"));

var _TodoModel = _interopRequireDefault(require("../models/TodoModel"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  <form>
    <input type="text" id="message" name="message" placeholder="..." />
    <button type="submit">
      Add +
    </button>
  <form>
*/
var onSubmit = function onSubmit(e) {
  e.preventDefault();
  var form = e.currentTarget;
  window.form = form; // const message = document.getElementById("message").value;

  var message = form.message.value;

  if (message.length < 3) {
    alert("Message should have at least 3 characters");
    return;
  }

  var formData = {
    message: message
  };

  var todo = _TodoModel.default.init(formData);

  _todos.default.insert(todo);

  console.log(_todos.default.items);
  form.message.value = "";
  (0, _index.default)();
};

var ToDoFormViewDescriptor = function ToDoFormViewDescriptor() {
  return {
    tag: "form",
    eventListeners: {
      submit: onSubmit
    },
    children: [{
      tag: "input",
      attributes: {
        required: true,
        type: "text",
        name: "message",
        placeholder: "Add Todo"
      }
    }, {
      tag: "button",
      attributes: {
        type: "submit"
      },
      textContent: "Add"
    }]
  };
};

var _default = ToDoFormViewDescriptor;
exports.default = _default;
},{"../collections/todos":"src/collections/todos.js","../models/TodoModel":"src/models/TodoModel.js","../index":"src/index.js"}],"src/pages/Main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _todos = _interopRequireDefault(require("../collections/todos"));

var _render = require("../lib/render");

var _ToDoList = _interopRequireDefault(require("../views/ToDoList"));

var _ToDoForm = _interopRequireDefault(require("../views/ToDoForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var items = _todos.default.items;
  var todoListElement = (0, _render.getRenderableComponent)({
    tag: "div",
    children: [(0, _ToDoForm.default)(), (0, _ToDoList.default)({
      items: items
    })]
  });
  return todoListElement;
};

exports.default = _default;
},{"../collections/todos":"src/collections/todos.js","../lib/render":"src/lib/render.js","../views/ToDoList":"src/views/ToDoList.js","../views/ToDoForm":"src/views/ToDoForm.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./styles.css");

var _render = require("./lib/render");

var _Main = _interopRequireDefault(require("./pages/Main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderApp = function renderApp() {
  var root = document.getElementById("app");
  (0, _render.render)(root, _Main.default);
};

renderApp();
var _default = renderApp;
exports.default = _default;
},{"./styles.css":"src/styles.css","./lib/render":"src/lib/render.js","./pages/Main":"src/pages/Main.js"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45905" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map