(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Collection", ["exports", "module", "./Util", "./Syncable"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./Util"), require("./Syncable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global._, global.Syncable);
    global.Collection = mod.exports;
  }
})(this, function (exports, module, _Util, _Syncable2) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _Syncable3 = _interopRequireDefault(_Syncable2);

  var Collection = (function (_Syncable) {
    _inherits(Collection, _Syncable);

    function Collection(models, options) {
      _classCallCheck(this, Collection);

      _get(Object.getPrototypeOf(Collection.prototype), "constructor", this).call(this);
      options = options || {};
      if (!options.model) {
        throw new Error("Must provide a model for collection to instantiate.");
      }
      Object.defineProperty(this, "models", {
        enumerable: false,
        value: []
      });
      Object.defineProperty(this, "model", {
        enumerable: false,
        value: options.model
      });
      this.cid = _Util.uniqueId('c');
      this.urlRoot = options.urlRoot || '/' + this.constructor.name;
      this.add(models, options);
    }

    _createClass(Collection, [{
      key: "getAll",
      value: function getAll() {
        return this.models.concat([]);
      }
    }, {
      key: "clear",
      value: function clear() {
        this.models.forEach(function (e) {
          return e.collection = null;
        });
        this.models = [];
      }
    }, {
      key: "add",
      value: function add(models, options) {
        var _this = this;

        options = options || {};
        if (models == null) {
          return this;
        }

        if (!Array.isArray(models)) {
          models = [models];
        }

        models.forEach(function (m) {
          if (_this.models.indexOf(m) === -1) {
            if (options.parse) {
              m = new _this.model(m);
            }
            m.collection = _this;
            !options.silent && _this.emit("add", m, _this);
            _this.models.push(m);
          }
        });

        !options.silent && this.emit("change", this);
      }
    }, {
      key: "remove",
      value: function remove(models, options) {
        var _this2 = this;

        options = options || {};
        if (models == null) {
          return this;
        }

        if (!Array.isArray(models)) {
          models = [models];
        }

        models.forEach(function (m) {
          var idx = _this2.models.indexOf(m);
          if (idx !== -1) {
            _this2.models.splice(idx);
            !options.silent && _this2.emit("remove", m, _this2);
          }
        });

        !options.silent && this.emit("change", this);
      }
    }, {
      key: "sort",
      value: function sort() {
        this.models.sort(this.comparator || this.model.comparator);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.models.map(function (e) {
          return e.toJSON();
        });
      }
    }, {
      key: "fetch",
      value: function fetch() {
        var _this3 = this;

        return _get(Object.getPrototypeOf(Collection.prototype), "fetch", this).call(this).then(function (json) {
          _this3.models = json;return _this3;
        });
      }
    }, {
      key: "save",
      value: function save() {
        var _this4 = this;

        return _get(Object.getPrototypeOf(Collection.prototype), "save", this).call(this, this.toJSON()).then(function () {
          return _this4;
        });
      }
    }]);

    return Collection;
  })(_Syncable3["default"]);

  module.exports = Collection;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("EventEmitter", ["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.EventEmitter = mod.exports;
  }
})(this, function (exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var DEFAULT_MAX_LISTENERS = 12;

  function error(message) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    console.error.apply(console, [message].concat(args));
    console.trace();
  }

  var EventEmitter = (function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      Object.defineProperty(this, "_maxListeners", {
        enumerable: false,
        value: DEFAULT_MAX_LISTENERS
      });
      Object.defineProperty(this, "_events", {
        enumerable: false,
        value: {}
      });
    }

    _createClass(EventEmitter, [{
      key: "on",
      value: function on(type, listener) {
        if (typeof listener != "function") {
          throw new TypeError();
        }
        var listeners = this._events[type] || (this._events[type] = []);
        if (listeners.indexOf(listener) != -1) {
          return this;
        }
        listeners.push(listener);
        if (listeners.length > this._maxListeners) {
          error("possible memory leak, added %i %s listeners, " + "use EventEmitter#setMaxListeners(number) if you " + "want to increase the limit (%i now)", listeners.length, type, this._maxListeners);
        }
        return this;
      }
    }, {
      key: "once",
      value: function once(type, listener) {
        var eventsInstance = this;
        function onceCallback() {
          eventsInstance.off(type, onceCallback);
          listener.apply(null, arguments);
        }
        return this.on(type, onceCallback);
      }
    }, {
      key: "off",
      value: function off(type) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (args.length == 0) {
          this._events[type] = null;
        }
        var listener = args[0];
        if (typeof listener != "function") {
          throw new TypeError();
        }
        var listeners = this._events[type];
        if (!listeners || !listeners.length) {
          return this;
        }
        var indexOfListener = listeners.indexOf(listener);
        if (indexOfListener == -1) {
          return this;
        }
        listeners.splice(indexOfListener, 1);
        return this;
      }
    }, {
      key: "emit",
      value: function emit(type) {
        var _this = this;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        var listeners = this._events[type];
        if (!listeners || !listeners.length) {
          return false;
        }
        listeners.forEach(function (fn) {
          return fn.apply(_this, args);
        });
        return true;
      }
    }, {
      key: "setMaxListeners",
      value: function setMaxListeners(newMaxListeners) {
        if (parseInt(newMaxListeners) !== newMaxListeners) {
          throw new TypeError();
        }
        this._maxListeners = newMaxListeners;
      }
    }]);

    return EventEmitter;
  })();

  module.exports = EventEmitter;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Model", ["exports", "module", "./Util", "./Syncable"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./Util"), require("./Syncable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global._, global.Syncable);
    global.Model = mod.exports;
  }
})(this, function (exports, module, _Util, _Syncable2) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _Syncable3 = _interopRequireDefault(_Syncable2);

  function _validate(self, newAttr) {
    var attrs = _Util.extend({}, self.attributes, newAttr);
    return self.validate(attrs);
  }
  /**
  * Represents a model of a resource
  */

  var Model = (function (_Syncable) {
    _inherits(Model, _Syncable);

    /**
    * Available options
    * @param
    * Collection: Set Collection object this belongs to
    * idAttribute: Set attribute to use as the id
    * urlRoot: set base URL to use for this resource
    */

    function Model(attr, options) {
      _classCallCheck(this, Model);

      _get(Object.getPrototypeOf(Model.prototype), "constructor", this).call(this);
      options = options || {};
      Object.defineProperty(this, "attributes", {
        enumerable: false,
        value: {}
      });
      Object.defineProperty(this, "changed", {
        enumerable: false,
        value: {}
      });
      this.cid = _Util.uniqueId('m');
      this.id = null;
      Object.defineProperty(this, "idAttribute", {
        enumerable: false,
        value: options.idAttribute || 'id'
      });
      this.urlRoot = options.urlRoot ? options.urlRoot : '/' + this.constructor.name;
      if (options.collection) {
        this.collection = options.collection;
      }

      this.set(attr);
    }

    /**
    * Set a value on the model
    *
    *
    */

    _createClass(Model, [{
      key: "set",
      value: function set(key, val, options) {
        if (key == null) return this;

        var attrs;
        if (typeof key === 'object') {
          attrs = key;
          options = val;
        } else {
          (attrs = {})[key] = val;
        }
        options || (options = {});
        var changes = [];

        attrs = this.parse(attrs);

        if (!_validate(this, attrs)) {
          return false;
        }
        for (var k in attrs) {
          !options.silent && !_Util.isEqual(this.attributes[k], attrs[k]) && this.emit("change:" + k, attrs[k], this);
          this.attributes[k] = attrs[k];
          this.changed[k] = attrs[k];
        }

        this.id = this.get(this.idAttribute);

        this.emit("change", this, options);
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.attributes[key];
      }
    }, {
      key: "url",
      value: function url() {
        return _get(Object.getPrototypeOf(Model.prototype), "url", this).call(this) + (this.id ? '/' + this.id : '');
      }
    }, {
      key: "validate",
      value: function validate(attr) {
        return true;
      }
    }, {
      key: "parse",
      value: function parse(attr) {
        return attr;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _Util.clone(this.attributes);
      }
    }, {
      key: "fetch",
      value: function fetch() {
        var _this = this;

        return _get(Object.getPrototypeOf(Model.prototype), "fetch", this).call(this).then(function (json) {
          _this.set(json);_this.changed = {};return _this;
        });
      }
    }, {
      key: "save",
      value: function save() {
        var _this2 = this;

        return _get(Object.getPrototypeOf(Model.prototype), "save", this).call(this, this.toJSON()).then(function () {
          _this2.changed = {};return _this2;
        });
      }
    }]);

    return Model;
  })(_Syncable3["default"]);

  module.exports = Model;
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('MVC', ['exports', 'module', './Model', './Collection', './View', './Router', './PageRouter'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('./Model'), require('./Collection'), require('./View'), require('./Router'), require('./PageRouter'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.Model, global.Collection, global.View, global.Router, global.PageRouter);
        global.MVC = mod.exports;
    }
})(this, function (exports, module, _Model, _Collection, _View, _Router, _PageRouter) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _Model2 = _interopRequireDefault(_Model);

    var _Collection2 = _interopRequireDefault(_Collection);

    var _View2 = _interopRequireDefault(_View);

    var _Router2 = _interopRequireDefault(_Router);

    var _PageRouter2 = _interopRequireDefault(_PageRouter);

    module.exports = {
        Model: _Model2['default'],
        Collection: _Collection2['default'],
        View: _View2['default'],
        Router: _Router2['default'],
        PageRouter: _PageRouter2['default']
    };
});
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('PageRouter', ['exports', 'module', './Router', './View'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./Router'), require('./View'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Router, global.View);
    global.PageRouter = mod.exports;
  }
})(this, function (exports, module, _Router2, _View) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _Router3 = _interopRequireDefault(_Router2);

  var _View2 = _interopRequireDefault(_View);

  var PageRouter = (function (_Router) {
    _inherits(PageRouter, _Router);

    function PageRouter(opts) {
      _classCallCheck(this, PageRouter);

      _get(Object.getPrototypeOf(PageRouter.prototype), 'constructor', this).call(this, opts);
      if (!opts.region) {
        throw new Error("Must supply a region");
      }
      this.region = opts.region instanceof HTMLElement ? opts.region : document.querySelector(opts.region);
      if (!this.region) {
        throw new Error("Region not found, called before page load?");
      }
      this.currentView = null;
    }

    _createClass(PageRouter, [{
      key: 'add',
      value: function add(route, page) {
        var _this = this;

        if (page instanceof _Router3['default']) {
          _get(Object.getPrototypeOf(PageRouter.prototype), 'add', this).call(this, route, page);
          return;
        }
        if (!(page instanceof _View2['default']) && typeof page != 'function') {
          throw new Error('Must supply a View instance or a function');
        }
        var pageInst = page instanceof _View2['default'] ? page : null;
        _get(Object.getPrototypeOf(PageRouter.prototype), 'add', this).call(this, route, function (ctx, next) {
          //Lazy load page first time
          if (pageInst == null) {
            pageInst = page();
          }
          //Unload current page
          if (_this.currentView) {
            _this.currentView.emit("unload");
            _this.region.removeChild(_this.currentView.el);
          }
          //emit load to the page so it can re-render if needed
          //Passed context, done() (render to DOM), and next() to continue
          //Processing PageRouter
          pageInst.emit("load", ctx, function () {
            _this.currentView = pageInst;
            _this.region.appendChild(_this.currentView.el);
          }, next);
        });
      }
    }, {
      key: 'use',
      value: function use(route, fn) {
        _get(Object.getPrototypeOf(PageRouter.prototype), 'add', this).call(this, route, fn);
      }
    }]);

    return PageRouter;
  })(_Router3['default']);

  module.exports = PageRouter;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Query", ["exports", "module", "./Collection.js"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./Collection.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Collection);
    global.Query = mod.exports;
  }
})(this, function (exports, module, _CollectionJs) {
  "use strict";

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var _Collection = _interopRequireDefault(_CollectionJs);

  function Query(model) {
    this.model = model;
    this.predicates = [];
    this.filters = {};
  }
  ["addAscending", "addDescending", "ascending", "containedIn", "contains", "containsAll", "descending", "doesNotExist", "doesNotMatchKeyInQuery", "doesNotMatchQuery", "endsWith", "equalTo", "greaterThan", "greaterThanOrEqualTo", "include", "lessThan", "lessThanOrEqualTo", "limit", "matches", "matchesKeyInQuery", "matchesQuery", "near", "notContainedIn", "notEqualTo", "select", "skip", "startsWith"].forEach(function (o) {
    return Query.prototype[o] = op(o);
  });

  Query.prototype.toJSON = function () {
    return {
      model: this.model.name,
      predicates: this.predicates
    };
  };

  Query.prototype.count = function () {
    this.filters.countOnly = true;
    return this.find();
  };

  Query.prototype.exists = function () {
    return this.count().then(function (e) {
      return e > 0;
    });
  };

  Query.prototype.find = function () {
    return fetch(this.model.url(true), {
      method: 'GET',
      headers: headers
    }).then(function (resp) {
      if (!resp.ok) {
        return Promise.reject(resp);
      }
      return resp.json();
    });
  };

  Query.prototype.first = function () {
    this.filters.start = 0;
    this.filters.limit = 1;
    return this.find();
  };

  Query.prototype.collection = function (Col, options) {
    var ColInst = Col || _Collection["default"];
    return this.find().then(function (models) {
      return new ColInst(models, options);
    });
  };

  Query.or = function () {
    for (var _len = arguments.length, queries = Array(_len), _key = 0; _key < _len; _key++) {
      queries[_key] = arguments[_key];
    }

    //Return a query containing all subqueries
    var q = new Query(queries[0].model);
    q.predicates.push(queries.map(function (e) {
      op: 'query', e;
    }));
  };

  module.exports = Query;
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('Router', ['exports', 'module', './EventEmitter'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('./EventEmitter'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.EventEmitter);
        global.Router = mod.exports;
    }
})(this, function (exports, module, _EventEmitter2) {
    /**
    * Express inspired client router
    * Supports named parameters, 
    * nested routers and middleware.
    */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:(\w+)/g;
    var splatParam = /\*(\w+)/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function _routeRegex(route) {
        if (route instanceof RegExp) {
            return [route];
        };
        var names = [null];
        route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional, name) {
            names.push(name);
            return optional ? match : '([^/?]+)';
        }).replace(splatParam, function (match, name) {
            names.push(name);
            return '([^?]*)';
        });
        names[0] = new RegExp('^' + route + '(?:\\?([\\s\\S]*)$)?');
        return names;
    }

    function _routeParse(route, path, ctx) {
        console.log("Parsing route parameters");
        var names = route.slice(1);
        var res = route[0].exec(path).slice(1);
        ctx.raw = res;
        for (var i = 0; i < names.length; i++) {
            ctx.params[names[i]] = res[i];
        }
    }

    var Router = (function (_EventEmitter) {
        _inherits(Router, _EventEmitter);

        function Router(opts) {
            _classCallCheck(this, Router);

            _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this);
            this.routes = [];
            this.noSlash = typeof opts == "object" ? opts.noSlash == true : Router.opts.noSlash;
            this.forceNext = typeof opts == "object" ? opts.forceNext == true : Router.opts.forceNext;
            this._listener = null;
        }

        _createClass(Router, [{
            key: 'start',
            value: function start(run) {
                var self = this;
                if (!this._listener) {
                    this._listener = function () {
                        self.exec(location.hash.slice(1));
                    };
                    window.addEventListener("hashchange", this._listener);
                    run && self.exec(location.hash.slice(1));
                }
            }
        }, {
            key: 'stop',
            value: function stop() {
                if (this._listener) {
                    window.removeEventListener("hashchange", this._listener);
                    this._listener = null;
                }
            }
        }, {
            key: 'add',
            value: function add(route, cb) {
                if (typeof route == "function" && !cb) {
                    this.routes.push({
                        route: [/.*/],
                        cb: cb
                    });
                } else {
                    var r = route + (cb instanceof Router ? "/*_spine_route" : "");
                    if (r.indexOf("/") === 0 && this.noSlash) {
                        r = r.slice(1);
                    }
                    this.routes.push({
                        route: _routeRegex(r),
                        cb: cb
                    });
                }
                return this;
            }
        }, {
            key: 'exec',
            value: function exec(path, ctx) {
                var _this = this;

                var _path = path;
                if (_path.indexOf("/") === 0 && this.noSlash) {
                    _path = _path.slice(1);
                }
                var _ctx = ctx || { params: {} };
                var i = -1;
                var routes = this.routes;
                console.group("Begin routing ", path);
                var _nested = false;
                var _exec = function _exec() {
                    while (i < routes.length - 1) {
                        i++;
                        var route = routes[i];
                        var idxChk = i;
                        if (route.route[0].test(_path)) {
                            _nested && console.groupEnd();
                            console.group("route found", route);
                            _routeParse(route.route, _path, _ctx);
                            _nested = true;
                            if (route.cb instanceof Router) {
                                console.log("Subrouting ", _ctx, "/" + _ctx.params._spine_route);
                                route.cb.exec("/" + _ctx.params._spine_route, _ctx);
                                _this.emit('route', route, _ctx.params);
                            } else {
                                console.log("Calling route");
                                route.cb(_ctx, _exec);
                                _this.emit('route', route, _ctx.params);
                            }
                            console.groupEnd();
                            _nested = false;
                            if (!_this.forceNext) {
                                console.groupEnd();return;
                            }
                        }
                    }
                    console.log("Routing ended, fell out of loop.");
                    console.groupEnd();
                };
                _exec();
            }
        }]);

        return Router;
    })(_EventEmitter3['default']);

    module.exports = Router;

    Router.opts = {
        noSlash: true,
        forceNext: false
    };
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Syncable", ["exports", "module", "./Util", "./EventEmitter"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./Util"), require("./EventEmitter"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global._, global.EventEmitter);
    global.Syncable = mod.exports;
  }
})(this, function (exports, module, _Util, _EventEmitter2) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

  /**
  * Wrapper for an object that can be synced with a remote server using fetch()
  */

  var Syncable = (function (_EventEmitter) {
    _inherits(Syncable, _EventEmitter);

    function Syncable() {
      _classCallCheck(this, Syncable);

      _get(Object.getPrototypeOf(Syncable.prototype), "constructor", this).call(this);
    }

    _createClass(Syncable, [{
      key: "url",
      value: function url(getQueryAddress) {
        return this.urlRoot;
      }
    }, {
      key: "isNew",
      value: function isNew() {
        return false;
      }
    }, {
      key: "fetch",
      value: (function (_fetch) {
        function fetch(_x) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      })(function (headers) {
        if (!this.url()) {
          throw new Error('url() returned invalid value');
        }
        headers = headers || {};
        return fetch(this.url(), {
          method: 'GET',
          headers: headers
        }).then(function (resp) {
          if (!resp.ok) {
            return Promise.reject(resp);
          }
          return resp.json();
        });
      })
    }, {
      key: "save",
      value: function save(body, headers) {
        if (!this.url()) {
          throw new Error('url() returned invalid value');
        }
        headers = headers || {};
        headers.contentType = "application/json";
        return fetch(this.url(), {
          method: this.isNew() ? 'POST' : 'PUT',
          headers: headers,
          body: JSON.stringify(body)
        }).then(function (resp) {
          if (!resp.ok) {
            return Promise.reject(resp);
          }
          return resp.json();
        });
      }
    }, {
      key: "destroy",
      value: function destroy(headers) {
        if (!this.url()) {
          throw new Error('url() returned invalid value');
        }
        headers = headers || {};
        return fetch(this.url(), {
          method: 'DELETE',
          headers: headers
        }).then(function (resp) {
          if (!resp.ok) {
            return Promise.reject(resp);
          }
          return resp;
        });
      }
    }]);

    return Syncable;
  })(_EventEmitter3["default"]);

  module.exports = Syncable;
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("Util", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Util = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.uniqueId = uniqueId;
    exports.extend = extend;
    exports.clone = clone;
    exports.isEqual = isEqual;
    var _unique = 1;

    function uniqueId(prefix) {
        return (prefix || "") + _unique++;
    }

    function extend() {
        var extended = {};
        for (var key in arguments) {
            var argument = arguments[key];
            for (var prop in argument) {
                if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                    extended[prop] = argument[prop];
                }
            }
        }

        return extended;
    }

    ;

    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = clone(obj[key]);
        }

        return temp;
    }

    function isEqual(x, y) {
        if (x === null || x === undefined || y === null || y === undefined) {
            return x === y;
        }
        // after this just checking type of one would be enough
        if (x.constructor !== y.constructor) {
            return false;
        }
        // if they are functions, they should exactly refer to same one (because of closures)
        if (x instanceof Function) {
            return x === y;
        }
        // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
        if (x instanceof RegExp) {
            return x === y;
        }
        if (x === y || x.valueOf() === y.valueOf()) {
            return true;
        }
        if (Array.isArray(x) && x.length !== y.length) {
            return false;
        }

        // if they are dates, they must had equal valueOf
        if (x instanceof Date) {
            return false;
        }

        // if they are strictly equal, they both need to be object at least
        if (!(x instanceof Object)) {
            return false;
        }
        if (!(y instanceof Object)) {
            return false;
        }

        // recursive object equality check
        var p = Object.keys(x);
        return Object.keys(y).every(function (i) {
            return p.indexOf(i) !== -1;
        }) && p.every(function (i) {
            return objectEquals(x[i], y[i]);
        });
    }
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("View", ["exports", "module", "./Util", "./EventEmitter"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("./Util"), require("./EventEmitter"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global._, global.EventEmitter);
    global.View = mod.exports;
  }
})(this, function (exports, module, _Util, _EventEmitter2) {
  "use strict";

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

  function _wrapCb(target, cb) {
    return function (e) {
      if (e.target && e.target.matches(target)) {
        return cb.apply(this, arguments);
      }
    };
  }

  var View = (function (_EventEmitter) {
    _inherits(View, _EventEmitter);

    function View(options) {
      _classCallCheck(this, View);

      _get(Object.getPrototypeOf(View.prototype), "constructor", this).call(this);
      options = options || {};
      Object.defineProperty(this, "_dom_events", {
        enumerable: false,
        value: []
      });
      this.cid = _Util.uniqueId('v');
      this.el = options.el ? options.el instanceof HTMLElement ? options.el : document.querySelector(options.el) : document.createElement(options.tagName || 'div');
      if (options.events) {
        this.delegateEvents(options.events);
      }
    }

    _createClass(View, [{
      key: "delegateEvents",
      value: function delegateEvents(events) {
        for (var i in events) {
          var _i$split = i.split(' ', 2);

          var _i$split2 = _slicedToArray(_i$split, 2);

          var event = _i$split2[0];
          var target = _i$split2[1];

          var entry = {
            event: event,
            target: target,
            cb: _wrapCb(target, events[i])
          };
          this._dom_events.push(entry);
          this.el.addEventListener(entry.event, entry.cb);
        }
      }
    }, {
      key: "render",
      value: function render() {
        throw new Error("Render not defined for view " + this.constructor.name + "[" + this.cid + "]");
      }
    }, {
      key: "pageTitle",
      value: function pageTitle(title) {
        if (title) {
          document.querySelector("title").innerText = title;
        } else {
          return document.querySelector("title").innerText;
        }
      }
    }, {
      key: "qs",
      value: function qs(el) {
        return this.el.querySelector(el);
      }
    }, {
      key: "qsa",
      value: function qsa(el) {
        return this.el.querySelectorAll(el);
      }
    }]);

    return View;
  })(_EventEmitter3["default"]);

  module.exports = View;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbGxlY3Rpb24uanMiLCJFdmVudEVtaXR0ZXIuanMiLCJNb2RlbC5qcyIsIk1WQy5qcyIsIlBhZ2VSb3V0ZXIuanMiLCJRdWVyeS5qcyIsIlJvdXRlci5qcyIsIlN5bmNhYmxlLmpzIiwiVXRpbC5qcyIsIlZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BR3FCLFVBQVU7Y0FBVixVQUFVOztBQUNsQixhQURRLFVBQVUsQ0FDakIsTUFBTSxFQUFFLE9BQU8sRUFBQzs0QkFEVCxVQUFVOztBQUUzQixpQ0FGaUIsVUFBVSw2Q0FFbkI7QUFDUixhQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUN4QixVQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQztBQUNoQixjQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7T0FDeEU7QUFDRCxZQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDcEMsa0JBQVUsRUFBRSxLQUFLO0FBQ2pCLGFBQUssRUFBRSxFQUFFO09BQ1YsQ0FBQyxDQUFDO0FBQ0gsWUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGtCQUFVLEVBQUUsS0FBSztBQUNqQixhQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7T0FDckIsQ0FBQyxDQUFDO0FBQ0gsVUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixVQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzlELFVBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNCOztpQkFsQmtCLFVBQVU7O2FBb0J2QixrQkFBRTtBQUNOLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFN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QUMsSUFBSSxHQUFHLEdBQUcsR0FBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO09BQy9GOzs7YUFFUSxtQkFBQyxLQUFLLEVBQUM7QUFDZCxZQUFHLEtBQUssRUFBQztBQUNQLGtCQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDbkQsTUFBSTtBQUNILGlCQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ2xEO09BRUY7OzthQUVDLFlBQUMsRUFBRSxFQUFDO0FBQ0osZUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNsQzs7O2FBRUUsYUFBQyxFQUFFLEVBQUM7QUFDTCxlQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDckM7OztXQS9Da0IsSUFBSTs7O21CQUFKLElBQUkiLCJmaWxlIjoiZXM2bXZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwiLi9VdGlsXCI7XHJcbmltcG9ydCBTeW5jYWJsZSBmcm9tIFwiLi9TeW5jYWJsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIFN5bmNhYmxlIHtcclxuICBjb25zdHJ1Y3Rvcihtb2RlbHMsIG9wdGlvbnMpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgaWYoIW9wdGlvbnMubW9kZWwpe1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBtb2RlbCBmb3IgY29sbGVjdGlvbiB0byBpbnN0YW50aWF0ZS5cIik7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJtb2RlbHNcIiwge1xyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IFtdXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1vZGVsXCIsIHtcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBvcHRpb25zLm1vZGVsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2lkID0gXy51bmlxdWVJZCgnYycpO1xyXG4gICAgdGhpcy51cmxSb290ID0gb3B0aW9ucy51cmxSb290IHx8ICcvJyArIHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuICAgIHRoaXMuYWRkKG1vZGVscywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKXtcclxuICAgIHJldHVybiB0aGlzLm1vZGVscy5jb25jYXQoW10pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKXtcclxuICAgIHRoaXMubW9kZWxzLmZvckVhY2goZSA9PiBlLmNvbGxlY3Rpb24gPSBudWxsKVxyXG4gICAgdGhpcy5tb2RlbHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGFkZChtb2RlbHMsIG9wdGlvbnMpe1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZihtb2RlbHMgPT0gbnVsbCl7cmV0dXJuIHRoaXM7fVxyXG5cclxuICAgIGlmKCFBcnJheS5pc0FycmF5KG1vZGVscykpe1xyXG4gICAgICBtb2RlbHMgPSBbbW9kZWxzXTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RlbHMuZm9yRWFjaChtID0+IHtcclxuICAgICAgaWYodGhpcy5tb2RlbHMuaW5kZXhPZihtKSA9PT0gLTEpe1xyXG4gICAgICAgIGlmKG9wdGlvbnMucGFyc2UpeyBtID0gbmV3IHRoaXMubW9kZWwobSk7fVxyXG4gICAgICAgIG0uY29sbGVjdGlvbiA9IHRoaXM7XHJcbiAgICAgICAgIW9wdGlvbnMuc2lsZW50ICYmIHRoaXMuZW1pdChcImFkZFwiLCBtLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGVscy5wdXNoKG0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAhb3B0aW9ucy5zaWxlbnQgJiYgdGhpcy5lbWl0KFwiY2hhbmdlXCIsIHRoaXMpO1xyXG5cclxuICB9XHJcblxyXG4gIHJlbW92ZShtb2RlbHMsIG9wdGlvbnMpe1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZihtb2RlbHMgPT0gbnVsbCl7cmV0dXJuIHRoaXM7fVxyXG5cclxuICAgIGlmKCFBcnJheS5pc0FycmF5KG1vZGVscykpe1xyXG4gICAgICBtb2RlbHMgPSBbbW9kZWxzXTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RlbHMuZm9yRWFjaChtID0+IHtcclxuICAgICAgdmFyIGlkeCA9IHRoaXMubW9kZWxzLmluZGV4T2YobSk7XHJcbiAgICAgIGlmKGlkeCAhPT0gLTEpe1xyXG4gICAgICAgIHRoaXMubW9kZWxzLnNwbGljZShpZHgpO1xyXG4gICAgICAgICFvcHRpb25zLnNpbGVudCAmJiB0aGlzLmVtaXQoXCJyZW1vdmVcIiwgbSwgdGhpcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICFvcHRpb25zLnNpbGVudCAmJiB0aGlzLmVtaXQoXCJjaGFuZ2VcIiwgdGhpcyk7XHJcblxyXG4gIH1cclxuICBcclxuICBzb3J0KCl7XHJcbiAgICB0aGlzLm1vZGVscy5zb3J0KHRoaXMuY29tcGFyYXRvciB8fCB0aGlzLm1vZGVsLmNvbXBhcmF0b3IpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCl7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbHMubWFwKGUgPT4gZS50b0pTT04oKSk7XHJcbiAgfVxyXG5cclxuICBmZXRjaCgpe1xyXG4gICAgcmV0dXJuIHN1cGVyLmZldGNoKCkudGhlbihqc29uID0+e3RoaXMubW9kZWxzID0ganNvbjtyZXR1cm4gdGhpczt9KVxyXG4gIH1cclxuXHJcbiAgc2F2ZSgpe1xyXG4gICAgcmV0dXJuIHN1cGVyLnNhdmUodGhpcy50b0pTT04oKSkudGhlbigoKSA9PiB0aGlzKVxyXG4gIH1cclxufSIsInZhciBERUZBVUxUX01BWF9MSVNURU5FUlMgPSAxMlxyXG5cclxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XHJcbiAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBbbWVzc2FnZV0uY29uY2F0KGFyZ3MpKVxyXG4gIGNvbnNvbGUudHJhY2UoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJfbWF4TGlzdGVuZXJzXCIsIHtcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBERUZBVUxUX01BWF9MSVNURU5FUlNcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2V2ZW50c1wiLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICB2YWx1ZToge31cclxuICAgIH0pO1xyXG4gIH1cclxuICBvbih0eXBlLCBsaXN0ZW5lcikge1xyXG4gICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcclxuICAgIH1cclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXHJcbiAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxyXG4gICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xyXG4gICAgICBlcnJvcihcclxuICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xyXG4gICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xyXG4gICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcclxuICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXHJcbiAgICAgIClcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG4gIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcclxuICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcclxuICAgIGZ1bmN0aW9uIG9uY2VDYWxsYmFjaygpe1xyXG4gICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxyXG4gICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXHJcbiAgfVxyXG4gIG9mZih0eXBlLCAuLi5hcmdzKSB7XHJcbiAgICBpZihhcmdzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcclxuICAgIH1cclxuICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMF1cclxuICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXHJcbiAgICB9XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXHJcbiAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzXHJcbiAgICB9XHJcbiAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXHJcbiAgICBpZihpbmRleE9mTGlzdGVuZXIgPT0gLTEpIHtcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH1cclxuICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXhPZkxpc3RlbmVyLCAxKVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbiAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcclxuICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cclxuICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseSh0aGlzLCBhcmdzKSlcclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIHNldE1heExpc3RlbmVycyhuZXdNYXhMaXN0ZW5lcnMpe1xyXG4gICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxyXG4gICAgfVxyXG4gICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXHJcbiAgfVxyXG59IiwiaW1wb3J0ICogYXMgXyBmcm9tIFwiLi9VdGlsXCI7XHJcbmltcG9ydCBTeW5jYWJsZSBmcm9tIFwiLi9TeW5jYWJsZVwiO1xyXG5cclxuZnVuY3Rpb24gX3ZhbGlkYXRlKHNlbGYsIG5ld0F0dHIpe1xyXG4gIHZhciBhdHRycyA9IF8uZXh0ZW5kKHt9LCBzZWxmLmF0dHJpYnV0ZXMsIG5ld0F0dHIpO1xyXG4gIHJldHVybiBzZWxmLnZhbGlkYXRlKGF0dHJzKTtcclxufVxyXG4vKipcclxuKiBSZXByZXNlbnRzIGEgbW9kZWwgb2YgYSByZXNvdXJjZVxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbCBleHRlbmRzIFN5bmNhYmxlIHtcclxuICAvKipcclxuICAqIEF2YWlsYWJsZSBvcHRpb25zXHJcbiAgKiBAcGFyYW1cclxuICAqIENvbGxlY3Rpb246IFNldCBDb2xsZWN0aW9uIG9iamVjdCB0aGlzIGJlbG9uZ3MgdG9cclxuICAqIGlkQXR0cmlidXRlOiBTZXQgYXR0cmlidXRlIHRvIHVzZSBhcyB0aGUgaWRcclxuICAqIHVybFJvb3Q6IHNldCBiYXNlIFVSTCB0byB1c2UgZm9yIHRoaXMgcmVzb3VyY2VcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKGF0dHIsIG9wdGlvbnMpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiYXR0cmlidXRlc1wiLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICB2YWx1ZToge31cclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiY2hhbmdlZFwiLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICB2YWx1ZToge31cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jaWQgPSBfLnVuaXF1ZUlkKCdtJyk7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImlkQXR0cmlidXRlXCIsIHtcclxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBvcHRpb25zLmlkQXR0cmlidXRlIHx8ICdpZCdcclxuICAgIH0pO1xyXG4gICAgdGhpcy51cmxSb290ID0gIG9wdGlvbnMudXJsUm9vdCA/IG9wdGlvbnMudXJsUm9vdCA6ICcvJyArIHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuICAgIGlmKG9wdGlvbnMuY29sbGVjdGlvbil7dGhpcy5jb2xsZWN0aW9uID0gb3B0aW9ucy5jb2xsZWN0aW9uO31cclxuXHJcbiAgICB0aGlzLnNldChhdHRyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogU2V0IGEgdmFsdWUgb24gdGhlIG1vZGVsXHJcbiAgKlxyXG4gICpcclxuICAqL1xyXG4gIHNldChrZXksIHZhbCwgb3B0aW9ucyl7XHJcbiAgICBpZiAoa2V5ID09IG51bGwpIHJldHVybiB0aGlzO1xyXG5cclxuICAgIHZhciBhdHRycztcclxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBhdHRycyA9IGtleTtcclxuICAgICAgb3B0aW9ucyA9IHZhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIChhdHRycyA9IHt9KVtrZXldID0gdmFsO1xyXG4gICAgfVxyXG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcclxuICAgIHZhciBjaGFuZ2VzID0gW107XHJcblxyXG4gICAgYXR0cnMgPSB0aGlzLnBhcnNlKGF0dHJzKTtcclxuICAgIFxyXG5cclxuICAgIGlmKCFfdmFsaWRhdGUodGhpcywgYXR0cnMpKXsgcmV0dXJuIGZhbHNlO31cclxuICAgIGZvcih2YXIgayBpbiBhdHRycyl7XHJcbiAgICAgICFvcHRpb25zLnNpbGVudCAmJiAhXy5pc0VxdWFsKHRoaXMuYXR0cmlidXRlc1trXSwgYXR0cnNba10pICYmIHRoaXMuZW1pdChcImNoYW5nZTpcIiArIGssIGF0dHJzW2tdLCB0aGlzKTtcclxuICAgICAgdGhpcy5hdHRyaWJ1dGVzW2tdID0gYXR0cnNba107XHJcbiAgICAgIHRoaXMuY2hhbmdlZFtrXSA9IGF0dHJzW2tdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaWQgPSB0aGlzLmdldCh0aGlzLmlkQXR0cmlidXRlKTtcclxuICAgIFxyXG4gICAgdGhpcy5lbWl0KFwiY2hhbmdlXCIsdGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0KGtleSl7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW2tleV07XHJcbiAgfVxyXG5cclxuICB1cmwoKXtcclxuICAgIHJldHVybiBzdXBlci51cmwoKSArICh0aGlzLmlkID8gJy8nICsgdGhpcy5pZCA6ICcnKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGF0dHIpe1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwYXJzZShhdHRyKXtcclxuICAgIHJldHVybiBhdHRyO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCl7XHJcbiAgICByZXR1cm4gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xyXG4gIH1cclxuXHJcbiAgZmV0Y2goKXtcclxuICAgIHJldHVybiBzdXBlci5mZXRjaCgpLnRoZW4oanNvbiA9Pnt0aGlzLnNldChqc29uKTt0aGlzLmNoYW5nZWQgPSB7fTtyZXR1cm4gdGhpczt9KVxyXG4gIH1cclxuXHJcbiAgc2F2ZSgpe1xyXG4gICAgcmV0dXJuIHN1cGVyLnNhdmUodGhpcy50b0pTT04oKSkudGhlbigoKSA9Pnt0aGlzLmNoYW5nZWQgPSB7fTsgcmV0dXJuIHRoaXN9KVxyXG4gIH1cclxufSIsImltcG9ydCBNb2RlbCBmcm9tICcuL01vZGVsJztcclxuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9Db2xsZWN0aW9uJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi9WaWV3JztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuL1JvdXRlcic7XHJcbmltcG9ydCBQYWdlUm91dGVyIGZyb20gJy4vUGFnZVJvdXRlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBNb2RlbCxcclxuICAgIENvbGxlY3Rpb24sXHJcbiAgICBWaWV3LFxyXG4gICAgUm91dGVyLFxyXG4gICAgUGFnZVJvdXRlclxyXG59IiwiaW1wb3J0IFJvdXRlciBmcm9tICcuL1JvdXRlcic7XHJcbmltcG9ydCBWaWV3IGZyb20gJy4vVmlldyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlUm91dGVyIGV4dGVuZHMgUm91dGVyIHtcclxuICBjb25zdHJ1Y3RvcihvcHRzKXtcclxuICAgIHN1cGVyKG9wdHMpO1xyXG4gICAgaWYoIW9wdHMucmVnaW9uKXt0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHN1cHBseSBhIHJlZ2lvblwiKTt9XHJcbiAgICB0aGlzLnJlZ2lvbiA9IG9wdHMucmVnaW9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBvcHRzLnJlZ2lvbiA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy5yZWdpb24pO1xyXG4gICAgaWYoIXRoaXMucmVnaW9uKXt0aHJvdyBuZXcgRXJyb3IoXCJSZWdpb24gbm90IGZvdW5kLCBjYWxsZWQgYmVmb3JlIHBhZ2UgbG9hZD9cIik7fVxyXG4gICAgdGhpcy5jdXJyZW50VmlldyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBhZGQocm91dGUsIHBhZ2Upe1xyXG4gICAgaWYocGFnZSBpbnN0YW5jZW9mIFJvdXRlcil7XHJcbiAgICAgIHN1cGVyLmFkZChyb3V0ZSxwYWdlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYoXHJcbiAgICAgICAgIShwYWdlIGluc3RhbmNlb2YgVmlldykgJiZcclxuICAgICAgICAodHlwZW9mIHBhZ2UgIT0gJ2Z1bmN0aW9uJylcclxuICAgICAgKXtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHN1cHBseSBhIFZpZXcgaW5zdGFuY2Ugb3IgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIHBhZ2VJbnN0ID0gKHBhZ2UgaW5zdGFuY2VvZiBWaWV3KSA/IHBhZ2UgOiBudWxsO1xyXG4gICAgc3VwZXIuYWRkKHJvdXRlLCAoY3R4LCBuZXh0KSA9PiB7XHJcbiAgICAgIC8vTGF6eSBsb2FkIHBhZ2UgZmlyc3QgdGltZVxyXG4gICAgICBpZihwYWdlSW5zdCA9PSBudWxsKXtcclxuICAgICAgICBwYWdlSW5zdCA9IHBhZ2UoKTtcclxuICAgICAgfVxyXG4gICAgICAvL1VubG9hZCBjdXJyZW50IHBhZ2VcclxuICAgICAgaWYodGhpcy5jdXJyZW50Vmlldyl7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Vmlldy5lbWl0KFwidW5sb2FkXCIpO1xyXG4gICAgICAgIHRoaXMucmVnaW9uLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudFZpZXcuZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vZW1pdCBsb2FkIHRvIHRoZSBwYWdlIHNvIGl0IGNhbiByZS1yZW5kZXIgaWYgbmVlZGVkXHJcbiAgICAgIC8vUGFzc2VkIGNvbnRleHQsIGRvbmUoKSAocmVuZGVyIHRvIERPTSksIGFuZCBuZXh0KCkgdG8gY29udGludWUgXHJcbiAgICAgIC8vUHJvY2Vzc2luZyBQYWdlUm91dGVyXHJcbiAgICAgIHBhZ2VJbnN0LmVtaXQoXCJsb2FkXCIsY3R4LCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHBhZ2VJbnN0O1xyXG4gICAgICAgIHRoaXMucmVnaW9uLmFwcGVuZENoaWxkKHRoaXMuY3VycmVudFZpZXcuZWwpO1xyXG4gICAgICB9LG5leHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1c2Uocm91dGUsIGZuKXtcclxuICAgICAgc3VwZXIuYWRkKHJvdXRlLGZuKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vQ29sbGVjdGlvbi5qcyc7XHJcblxyXG5mdW5jdGlvbiBRdWVyeShtb2RlbCl7XHJcbiAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gIHRoaXMucHJlZGljYXRlcyA9IFtdO1xyXG4gIHRoaXMuZmlsdGVycyA9IHt9O1xyXG59XHJcbltcImFkZEFzY2VuZGluZ1wiLFxyXG5cImFkZERlc2NlbmRpbmdcIixcclxuXCJhc2NlbmRpbmdcIixcclxuXCJjb250YWluZWRJblwiLFxyXG5cImNvbnRhaW5zXCIsXHJcblwiY29udGFpbnNBbGxcIixcclxuXCJkZXNjZW5kaW5nXCIsXHJcblwiZG9lc05vdEV4aXN0XCIsXHJcblwiZG9lc05vdE1hdGNoS2V5SW5RdWVyeVwiLFxyXG5cImRvZXNOb3RNYXRjaFF1ZXJ5XCIsXHJcblwiZW5kc1dpdGhcIixcclxuXCJlcXVhbFRvXCIsXHJcblwiZ3JlYXRlclRoYW5cIixcclxuXCJncmVhdGVyVGhhbk9yRXF1YWxUb1wiLFxyXG5cImluY2x1ZGVcIixcclxuXCJsZXNzVGhhblwiLFxyXG5cImxlc3NUaGFuT3JFcXVhbFRvXCIsXHJcblwibGltaXRcIixcclxuXCJtYXRjaGVzXCIsXHJcblwibWF0Y2hlc0tleUluUXVlcnlcIixcclxuXCJtYXRjaGVzUXVlcnlcIixcclxuXCJuZWFyXCIsXHJcblwibm90Q29udGFpbmVkSW5cIixcclxuXCJub3RFcXVhbFRvXCIsXHJcblwic2VsZWN0XCIsXHJcblwic2tpcFwiLFxyXG5cInN0YXJ0c1dpdGhcIlxyXG5dLmZvckVhY2gobyA9PiBRdWVyeS5wcm90b3R5cGVbb10gPSBvcChvKSlcclxuXHJcblF1ZXJ5LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB7XHJcbiAgICBtb2RlbDogdGhpcy5tb2RlbC5uYW1lLFxyXG4gICAgcHJlZGljYXRlczogdGhpcy5wcmVkaWNhdGVzXHJcbiAgfVxyXG59XHJcblxyXG5RdWVyeS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZmlsdGVycy5jb3VudE9ubHkgPSB0cnVlO1xyXG4gIHJldHVybiB0aGlzLmZpbmQoKTtcclxufVxyXG5cclxuUXVlcnkucHJvdG90eXBlLmV4aXN0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY291bnQoKS50aGVuKChlKT0+ZSA+IDApO1xyXG59XHJcblxyXG5cclxuUXVlcnkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiBmZXRjaCh0aGlzLm1vZGVsLnVybCh0cnVlKSxcclxuICAgICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczogaGVhZGVyc1xyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3Ape1xyXG4gICAgICAgIGlmKCFyZXNwLm9rKXtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3AuanNvbigpO1xyXG4gICAgICB9KTtcclxufVxyXG5cclxuUXVlcnkucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmZpbHRlcnMuc3RhcnQgPSAwO1xyXG4gIHRoaXMuZmlsdGVycy5saW1pdCA9IDE7XHJcbiAgcmV0dXJuIHRoaXMuZmluZCgpO1xyXG59XHJcblxyXG5RdWVyeS5wcm90b3R5cGUuY29sbGVjdGlvbiA9IGZ1bmN0aW9uKENvbCwgb3B0aW9ucyl7XHJcbiAgdmFyIENvbEluc3QgPSBDb2wgfHwgQ29sbGVjdGlvbjtcclxuICByZXR1cm4gdGhpcy5maW5kKCkudGhlbigobW9kZWxzKSA9PntcclxuICAgIHJldHVybiBuZXcgQ29sSW5zdChtb2RlbHMsIG9wdGlvbnMpO1xyXG4gIH0pXHJcbn1cclxuXHJcblxyXG5RdWVyeS5vciA9IGZ1bmN0aW9uKC4uLnF1ZXJpZXMpe1xyXG4gIC8vUmV0dXJuIGEgcXVlcnkgY29udGFpbmluZyBhbGwgc3VicXVlcmllc1xyXG4gIHZhciBxID0gbmV3IFF1ZXJ5KHF1ZXJpZXNbMF0ubW9kZWwpO1xyXG4gIHEucHJlZGljYXRlcy5wdXNoKCBxdWVyaWVzLm1hcCgoZSk9PntvcDoncXVlcnknLGV9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFF1ZXJ5OyIsIi8qKlxyXG4qIEV4cHJlc3MgaW5zcGlyZWQgY2xpZW50IHJvdXRlclxyXG4qIFN1cHBvcnRzIG5hbWVkIHBhcmFtZXRlcnMsIFxyXG4qIG5lc3RlZCByb3V0ZXJzIGFuZCBtaWRkbGV3YXJlLlxyXG4qL1xyXG52YXIgb3B0aW9uYWxQYXJhbSA9IC9cXCgoLio/KVxcKS9nO1xyXG52YXIgbmFtZWRQYXJhbSAgICA9IC8oXFwoXFw/KT86KFxcdyspL2c7XHJcbnZhciBzcGxhdFBhcmFtICAgID0gL1xcKihcXHcrKS9nO1xyXG52YXIgZXNjYXBlUmVnRXhwICA9IC9bXFwte31cXFtcXF0rPy4sXFxcXFxcXiR8I1xcc10vZztcclxuXHJcbiAgICBmdW5jdGlvbiBfcm91dGVSZWdleChyb3V0ZSkge1xyXG4gICAgICBpZihyb3V0ZSBpbnN0YW5jZW9mIFJlZ0V4cCl7cmV0dXJuIFtyb3V0ZV19O1xyXG4gICAgICB2YXIgbmFtZXMgPSBbbnVsbF07XHJcbiAgICAgIHJvdXRlID0gcm91dGUucmVwbGFjZShlc2NhcGVSZWdFeHAsICdcXFxcJCYnKVxyXG4gICAgICAucmVwbGFjZShvcHRpb25hbFBhcmFtLCAnKD86JDEpPycpXHJcbiAgICAgIC5yZXBsYWNlKG5hbWVkUGFyYW0sIGZ1bmN0aW9uKG1hdGNoLCBvcHRpb25hbCwgbmFtZSkge1xyXG4gICAgICAgIG5hbWVzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbmFsID8gbWF0Y2ggOiAnKFteLz9dKyknO1xyXG4gICAgfSlcclxuICAgICAgLnJlcGxhY2Uoc3BsYXRQYXJhbSwgZnVuY3Rpb24obWF0Y2gsIG5hbWUpe1xyXG4gICAgICAgICAgbmFtZXMucHVzaChuYW1lKTtcclxuICAgICAgICAgIHJldHVybiAnKFteP10qKSc7XHJcbiAgICAgIH0pO1xyXG4gICAgICBuYW1lc1swXSA9IG5ldyBSZWdFeHAoJ14nICsgcm91dGUgKyAnKD86XFxcXD8oW1xcXFxzXFxcXFNdKikkKT8nKTtcclxuICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX3JvdXRlUGFyc2Uocm91dGUsIHBhdGgsIGN0eCl7XHJcbiAgICBjb25zb2xlLmxvZyhcIlBhcnNpbmcgcm91dGUgcGFyYW1ldGVyc1wiKVxyXG4gICAgdmFyIG5hbWVzID0gcm91dGUuc2xpY2UoMSk7XHJcbiAgICB2YXIgcmVzID0gcm91dGVbMF0uZXhlYyhwYXRoKS5zbGljZSgxKTtcclxuICAgIGN0eC5yYXcgPSByZXM7XHJcbiAgICBmb3IodmFyIGkgPSAwO2k8IG5hbWVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBjdHgucGFyYW1zW25hbWVzW2ldXSA9IHJlc1tpXTtcclxuICAgIH1cclxufVxyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVye1xyXG4gICAgY29uc3RydWN0b3Iob3B0cyl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5yb3V0ZXMgPSBbXTtcclxuICAgIHRoaXMubm9TbGFzaCA9IHR5cGVvZiBvcHRzID09IFwib2JqZWN0XCIgPyBvcHRzLm5vU2xhc2g9PXRydWUgOiBSb3V0ZXIub3B0cy5ub1NsYXNoO1xyXG4gICAgdGhpcy5mb3JjZU5leHQgPSB0eXBlb2Ygb3B0cyA9PSBcIm9iamVjdFwiID8gb3B0cy5mb3JjZU5leHQ9PXRydWUgOiBSb3V0ZXIub3B0cy5mb3JjZU5leHQ7XHJcbiAgICB0aGlzLl9saXN0ZW5lciA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQocnVuKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYoIXRoaXMuX2xpc3RlbmVyKXtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5leGVjKGxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX2xpc3RlbmVyKVxyXG4gICAgICAgICAgICBydW4gJiYgc2VsZi5leGVjKGxvY2F0aW9uLmhhc2guc2xpY2UoMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0b3AoKXtcclxuICAgICAgICBpZih0aGlzLl9saXN0ZW5lcil7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX2xpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGQocm91dGUsIGNiKXtcclxuICAgICAgICBpZih0eXBlb2Ygcm91dGUgPT0gXCJmdW5jdGlvblwiICYmICFjYil7XHJcbiAgICAgICAgICAgdGhpcy5yb3V0ZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJvdXRlOiBbLy4qL10sXHJcbiAgICAgICAgICAgIGNiOiBjYlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgIH1lbHNle1xyXG4gICAgICAgIHZhciByID0gcm91dGUgKyAoY2IgaW5zdGFuY2VvZiBSb3V0ZXIgPyBcIi8qX3NwaW5lX3JvdXRlXCIgOiBcIlwiKTtcclxuICAgICAgICBpZihyLmluZGV4T2YoXCIvXCIpPT09MCAmJiB0aGlzLm5vU2xhc2gpe1xyXG4gICAgICAgICAgICByID0gci5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHJvdXRlOiBfcm91dGVSZWdleChyKSxcclxuICAgICAgICAgICAgY2I6IGNiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBleGVjKHBhdGgsIGN0eCl7XHJcbiAgICAgICAgdmFyIF9wYXRoID0gcGF0aDtcclxuICAgICAgICBpZihfcGF0aC5pbmRleE9mKFwiL1wiKT09PTAgJiYgdGhpcy5ub1NsYXNoKXtcclxuICAgICAgICAgICAgX3BhdGggPSBfcGF0aC5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9jdHggPSBjdHggfHwge3BhcmFtczp7fX07XHJcbiAgICAgICAgdmFyIGkgPSAtMTtcclxuICAgICAgICB2YXIgcm91dGVzID0gdGhpcy5yb3V0ZXM7XHJcbiAgICAgICAgY29uc29sZS5ncm91cChcIkJlZ2luIHJvdXRpbmcgXCIsIHBhdGgpO1xyXG4gICAgICAgIHZhciBfbmVzdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9leGVjID0gKCk9PiB7XHJcbiAgICAgICAgICAgIHdoaWxlKGkgPCByb3V0ZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkeENoayA9IGk7XHJcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZVswXS50ZXN0KF9wYXRoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX25lc3RlZCAmJiBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChcInJvdXRlIGZvdW5kXCIsIHJvdXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBfcm91dGVQYXJzZShyb3V0ZS5yb3V0ZSwgX3BhdGgsIF9jdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9uZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLmNiIGluc3RhbmNlb2YgUm91dGVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJyb3V0aW5nIFwiLF9jdHgsIFwiL1wiICsgX2N0eC5wYXJhbXMuX3NwaW5lX3JvdXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuY2IuZXhlYyhcIi9cIiArIF9jdHgucGFyYW1zLl9zcGluZV9yb3V0ZSwgX2N0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncm91dGUnLHJvdXRlLF9jdHgucGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYWxsaW5nIHJvdXRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLmNiKF9jdHgsX2V4ZWMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JvdXRlJyxyb3V0ZSxfY3R4LnBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICBfbmVzdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuZm9yY2VOZXh0KXtjb25zb2xlLmdyb3VwRW5kKCk7cmV0dXJuO31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJvdXRpbmcgZW5kZWQsIGZlbGwgb3V0IG9mIGxvb3AuXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9leGVjKCk7XHJcbiAgICB9XHJcbn1cclxuUm91dGVyLm9wdHMgPSB7XHJcbiAgICBub1NsYXNoOiB0cnVlLFxyXG4gICAgZm9yY2VOZXh0OiBmYWxzZVxyXG59XHJcblxyXG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gXCIuL1V0aWxcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcclxuXHJcbi8qKlxyXG4qIFdyYXBwZXIgZm9yIGFuIG9iamVjdCB0aGF0IGNhbiBiZSBzeW5jZWQgd2l0aCBhIHJlbW90ZSBzZXJ2ZXIgdXNpbmcgZmV0Y2goKVxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeW5jYWJsZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgdXJsKGdldFF1ZXJ5QWRkcmVzcyl7XHJcbiAgICByZXR1cm4gdGhpcy51cmxSb290O1xyXG4gIH1cclxuXHJcbiAgaXNOZXcoKXtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZldGNoKGhlYWRlcnMpe1xyXG4gICAgaWYoIXRoaXMudXJsKCkpe3Rocm93IG5ldyBFcnJvcigndXJsKCkgcmV0dXJuZWQgaW52YWxpZCB2YWx1ZScpO31cclxuICAgIGhlYWRlcnMgPSBoZWFkZXJzIHx8IHt9O1xyXG4gICAgcmV0dXJuIGZldGNoKHRoaXMudXJsKCksXHJcbiAgICAgIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcclxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwKXtcclxuICAgICAgICBpZighcmVzcC5vayl7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNwLmpzb24oKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGJvZHksIGhlYWRlcnMpe1xyXG4gICAgaWYoIXRoaXMudXJsKCkpe3Rocm93IG5ldyBFcnJvcigndXJsKCkgcmV0dXJuZWQgaW52YWxpZCB2YWx1ZScpO31cclxuICAgIGhlYWRlcnMgPSBoZWFkZXJzIHx8IHt9O1xyXG4gICAgaGVhZGVycy5jb250ZW50VHlwZT1cImFwcGxpY2F0aW9uL2pzb25cIjtcclxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgbWV0aG9kOiB0aGlzLmlzTmV3KCkgPyAnUE9TVCcgOiAnUFVUJyxcclxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgaWYoIXJlc3Aub2spe1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcC5qc29uKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveShoZWFkZXJzKXtcclxuICAgIGlmKCF0aGlzLnVybCgpKXt0aHJvdyBuZXcgRXJyb3IoJ3VybCgpIHJldHVybmVkIGludmFsaWQgdmFsdWUnKTt9XHJcbiAgICBoZWFkZXJzID0gaGVhZGVycyB8fCB7fTtcclxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCgpLFxyXG4gICAgICB7XHJcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcCl7XHJcbiAgICAgICAgaWYoIXJlc3Aub2spe1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59IiwidmFyIF91bmlxdWUgPSAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCl7XHJcbiAgICByZXR1cm4gKHByZWZpeCB8fCBcIlwiKSArIF91bmlxdWUrKztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCgpe1xyXG4gIHZhciBleHRlbmRlZCA9IHt9O1xyXG4gIGZvcih2YXIga2V5IGluIGFyZ3VtZW50cykge1xyXG4gICAgdmFyIGFyZ3VtZW50ID0gYXJndW1lbnRzW2tleV07XHJcbiAgICBmb3IgKHZhciBwcm9wIGluIGFyZ3VtZW50KSB7XHJcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnQsIHByb3ApKSB7XHJcbiAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBhcmd1bWVudFtwcm9wXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGV4dGVuZGVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiBcclxuICAgIHZhciB0ZW1wID0gb2JqLmNvbnN0cnVjdG9yKCk7IC8vIGdpdmUgdGVtcCB0aGUgb3JpZ2luYWwgb2JqJ3MgY29uc3RydWN0b3JcclxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICB0ZW1wW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB0ZW1wO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsKHgsIHkpe1xyXG4gICBpZiAoeCA9PT0gbnVsbCB8fCB4ID09PSB1bmRlZmluZWQgfHwgeSA9PT0gbnVsbCB8fCB5ID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHggPT09IHk7IH1cclxuICAgIC8vIGFmdGVyIHRoaXMganVzdCBjaGVja2luZyB0eXBlIG9mIG9uZSB3b3VsZCBiZSBlbm91Z2hcclxuICAgIGlmICh4LmNvbnN0cnVjdG9yICE9PSB5LmNvbnN0cnVjdG9yKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgLy8gaWYgdGhleSBhcmUgZnVuY3Rpb25zLCB0aGV5IHNob3VsZCBleGFjdGx5IHJlZmVyIHRvIHNhbWUgb25lIChiZWNhdXNlIG9mIGNsb3N1cmVzKVxyXG4gICAgaWYgKHggaW5zdGFuY2VvZiBGdW5jdGlvbikgeyByZXR1cm4geCA9PT0geTsgfVxyXG4gICAgLy8gaWYgdGhleSBhcmUgcmVnZXhwcywgdGhleSBzaG91bGQgZXhhY3RseSByZWZlciB0byBzYW1lIG9uZSAoaXQgaXMgaGFyZCB0byBiZXR0ZXIgZXF1YWxpdHkgY2hlY2sgb24gY3VycmVudCBFUylcclxuICAgIGlmICh4IGluc3RhbmNlb2YgUmVnRXhwKSB7IHJldHVybiB4ID09PSB5OyB9XHJcbiAgICBpZiAoeCA9PT0geSB8fCB4LnZhbHVlT2YoKSA9PT0geS52YWx1ZU9mKCkpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHgpICYmIHgubGVuZ3RoICE9PSB5Lmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAvLyBpZiB0aGV5IGFyZSBkYXRlcywgdGhleSBtdXN0IGhhZCBlcXVhbCB2YWx1ZU9mXHJcbiAgICBpZiAoeCBpbnN0YW5jZW9mIERhdGUpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgLy8gaWYgdGhleSBhcmUgc3RyaWN0bHkgZXF1YWwsIHRoZXkgYm90aCBuZWVkIHRvIGJlIG9iamVjdCBhdCBsZWFzdFxyXG4gICAgaWYgKCEoeCBpbnN0YW5jZW9mIE9iamVjdCkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBpZiAoISh5IGluc3RhbmNlb2YgT2JqZWN0KSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAvLyByZWN1cnNpdmUgb2JqZWN0IGVxdWFsaXR5IGNoZWNrXHJcbiAgICB2YXIgcCA9IE9iamVjdC5rZXlzKHgpO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHkpLmV2ZXJ5KGZ1bmN0aW9uIChpKSB7IHJldHVybiBwLmluZGV4T2YoaSkgIT09IC0xOyB9KSAmJlxyXG4gICAgICAgIHAuZXZlcnkoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIG9iamVjdEVxdWFscyh4W2ldLCB5W2ldKTsgfSk7XHJcbn0iLCJpbXBvcnQgKiBhcyBfIGZyb20gXCIuL1V0aWxcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcclxuXHJcbmZ1bmN0aW9uIF93cmFwQ2IodGFyZ2V0LCBjYil7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubWF0Y2hlcyh0YXJnZXQpKXtcclxuICAgICAgcmV0dXJuIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVye1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2RvbV9ldmVudHNcIiwge1xyXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgdmFsdWU6IFtdXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2lkID0gXy51bmlxdWVJZCgndicpO1xyXG4gICAgdGhpcy5lbCA9IG9wdGlvbnMuZWwgPyAob3B0aW9ucy5lbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gb3B0aW9ucy5lbCA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5lbCkpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChvcHRpb25zLnRhZ05hbWUgfHwgJ2RpdicpO1xyXG4gICAgaWYob3B0aW9ucy5ldmVudHMpe1xyXG4gICAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKG9wdGlvbnMuZXZlbnRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGVnYXRlRXZlbnRzKGV2ZW50cyl7XHJcbiAgICBmb3IodmFyIGkgaW4gZXZlbnRzKXtcclxuICAgICAgICB2YXIgW2V2ZW50LCB0YXJnZXRdID0gaS5zcGxpdCgnICcsMik7XHJcbiAgICAgICAgdmFyIGVudHJ5ID0ge1xyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgICBjYjogX3dyYXBDYih0YXJnZXQsIGV2ZW50c1tpXSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2RvbV9ldmVudHMucHVzaChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKGVudHJ5LmV2ZW50LCBlbnRyeS5jYik7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVuZGVyIG5vdCBkZWZpbmVkIGZvciB2aWV3IFwiICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgXCJbXCIrIHRoaXMuY2lkICsgXCJdXCIpO1xyXG4gIH1cclxuXHJcbiAgcGFnZVRpdGxlKHRpdGxlKXtcclxuICAgIGlmKHRpdGxlKXtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpLmlubmVyVGV4dCA9IHRpdGxlO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGl0bGVcIikuaW5uZXJUZXh0O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHFzKGVsKXtcclxuICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG4gIH1cclxuXHJcbiAgcXNhKGVsKXtcclxuICAgIHJldHVybiB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoZWwpO1xyXG4gIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
