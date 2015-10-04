(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define('app', ['exports'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.app = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	require(['PageRouter', 'jquery', 'page/TablePage', 'page/EntryPage', 'page/editors/ItemEditor'], function (PageRouter, $, TablePage, EntryPage, ItemEditor) {

		var router = new PageRouter({ region: '#main' });

		router.add('/items/:mod/:id', new EntryPage(new ItemEditor()));
		router.add('/blocks/:mod/:id', new EntryPage(new ItemEditor()));

		router.add('/:table', new TablePage());

		router.add;
		router.on('route', function (route, params) {
			$(".navbar-nav>li").removeClass("active");
			$("ul.navbar-nav>li>a[href='" + location.hash + "']").closest("li").addClass("active");
		});
		router.start(true);
		console.log("App started.");
	});
});
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define('page/EntryPage', ['exports', 'module', 'View'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('View'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.View);
		global.pageEntryPage = mod.exports;
	}
})(this, function (exports, module, _View2) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EntryPage = (function (_View) {
		_inherits(EntryPage, _View);

		function EntryPage(subEditor) {
			var _this = this;

			_classCallCheck(this, EntryPage);

			_get(Object.getPrototypeOf(EntryPage.prototype), 'constructor', this).call(this);
			if (!subEditor) {
				throw new Error("No sub editor provided.");
			}
			this.subEditor = subEditor;
			this.on('load', function (ctx, done, next) {
				_this.render();
				done();
			});
			this.el.innerHTML = '<div id="general" class="row">\n\t\t<form class="form col-md-4">\n\t\t\t<div class="form-group">\n\t\t\t\t<label for="mod">Mod</label>\n\t\t\t\t<input class="form-control" type="text" name="mod">\n\t\t\t</div>\n\t\t\t<div class="form-group">\n\t\t\t\t<label for="id">Id</label>\n\t\t\t\t<input class="form-control" type="text" name="id">\n\t\t\t</div>\n\t\t</div>\n\t\t<hr/>\n\t\t<div id="sub-editor">\n\t\t</div>';
			this.qs('#sub-editor').appendChild(this.subEditor.el);
		}

		_createClass(EntryPage, [{
			key: 'render',
			value: function render() {}
		}]);

		return EntryPage;
	})(_View2);

	module.exports = EntryPage;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("page/TablePage", ["exports", "module", "View"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module, require("View"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.View);
    global.pageTablePage = mod.exports;
  }
})(this, function (exports, module, _View2) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var TablePage = (function (_View) {
    _inherits(TablePage, _View);

    function TablePage() {
      var _this = this;

      _classCallCheck(this, TablePage);

      _get(Object.getPrototypeOf(TablePage.prototype), "constructor", this).call(this);
      this.data = [];
      this.filter = "";
      this.table = "NONE";
      this.on('load', function (ctx, done, next) {
        _this.loadData(ctx.params.table).then(function () {
          _this.render();done();
        });
      });
      this.el.innerHTML = "<div id=\"heading\"></div>\n    <input type=\"text\" id=\"filter\"/>\n    <table class=\"table\">\n    <thead>\n    <tr>\n    <th>Mod</th>\n    <th>Id</th>\n    <th>Released</th>\n    <th>Updated</th>\n    <th>Edit</th>\n    </tr>\n    </thead>\n    <tbody id=\"entries\"></tbody\n    </table>";
      this.delegateEvents({
        "keyup #filter": function keyupFilter() {
          _this.filter = _this.qs('#filter').value;
          _this.render();
        }
      });
    }

    _createClass(TablePage, [{
      key: "loadData",
      value: function loadData(table) {
        var _this2 = this;

        this.table = table;
        return fetch('v1/' + table).then(function (resp) {
          return resp.json();
        }).then(function (data) {
          return _this2.data = data;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        this.el.querySelector('#heading').innerHTML = "<h1>" + this.table + "</h1><p>Found " + this.data.length + " entries</p>";
        this.el.querySelector('#entries').innerHTML = this.data.filter(function (e) {
          return _this3.filter.length == 0 || e.id.toLowerCase().indexOf(_this3.filter.toLowerCase()) != -1;
        }).map(function (e) {
          return "<tr>\n      <td>" + e.mod + "</td>\n      <td>" + e.id + "</td>\n      <td><version-select value=\"" + e.introduced_at + "\"/></td>\n      <td><version-select value=\"" + e.changed_at + "\"/></td>\n      <td><button class=\"btn btn-primary edit\">Edit</button></td>\n    </tr>";
        }).join('\n');
      }
    }]);

    return TablePage;
  })(_View2);

  module.exports = TablePage;
});
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define('page/editors/ItemEditor', ['exports', 'module', 'View'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('View'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.View);
		global.pageEditorsItemEditor = mod.exports;
	}
})(this, function (exports, module, _View2) {
	'use strict';

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ItemEditor = (function (_View) {
		_inherits(ItemEditor, _View);

		function ItemEditor() {
			_classCallCheck(this, ItemEditor);

			_get(Object.getPrototypeOf(ItemEditor.prototype), 'constructor', this).call(this);
			this.el.innerHTML = 'Item editor goes here.';
		}

		return ItemEditor;
	})(_View2);

	module.exports = ItemEditor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInBhZ2UvRW50cnlQYWdlLmpzIiwicGFnZS9UYWJsZVBhZ2UuanMiLCJwYWdlL2VkaXRvcnMvSXRlbUVkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxRQUFPLENBQUMsQ0FDUCxZQUFZLEVBQ1osUUFBUSxFQUNSLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIseUJBQXlCLENBQ3hCLEVBQ0YsVUFBUyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDOztBQUV4RCxNQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDOztBQUU5QyxRQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksU0FBUyxDQUFFLElBQUksVUFBVSxFQUFFLENBQUUsQ0FBQyxDQUFDO0FBQ2pFLFFBQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxTQUFTLENBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBRSxDQUFDLENBQUM7O0FBR2xFLFFBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQzs7QUFJdkMsUUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNWLFFBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDLFVBQVMsS0FBSyxFQUFDLE1BQU0sRUFBQztBQUNwQyxJQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsSUFBQyxDQUFDLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUMxRixDQUFDLENBQUM7QUFDSCxRQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25C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LE9BQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7c0NBQzNKLENBQUMsQ0FBQyxHQUFHLHlCQUNMLENBQUMsQ0FBQyxFQUFFLGlEQUNtQixDQUFDLENBQUMsYUFBYSxxREFDZixDQUFDLENBQUMsVUFBVTtTQUVyQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3BCOzs7V0FqRGtCLFNBQVM7OzttQkFBVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQ0FULFVBQVU7WUFBVixVQUFVOztBQUNuQixXQURTLFVBQVUsR0FDakI7eUJBRE8sVUFBVTs7QUFFN0IsOEJBRm1CLFVBQVUsNkNBRXRCO0FBQ1AsT0FBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLENBQUM7R0FDN0M7O1NBSm1CLFVBQVU7OztrQkFBVixVQUFVIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFtcclxuXHQnUGFnZVJvdXRlcicsXHJcblx0J2pxdWVyeScsXHJcblx0J3BhZ2UvVGFibGVQYWdlJyxcclxuXHQncGFnZS9FbnRyeVBhZ2UnLFxyXG5cdCdwYWdlL2VkaXRvcnMvSXRlbUVkaXRvcidcclxuXHRdLFxyXG5mdW5jdGlvbihQYWdlUm91dGVyLCAkLCBUYWJsZVBhZ2UsIEVudHJ5UGFnZSwgSXRlbUVkaXRvcil7XHJcblxyXG5cdHZhciByb3V0ZXIgPSBuZXcgUGFnZVJvdXRlcih7cmVnaW9uOicjbWFpbid9KTtcclxuXHJcblx0cm91dGVyLmFkZCgnL2l0ZW1zLzptb2QvOmlkJywgbmV3IEVudHJ5UGFnZSggbmV3IEl0ZW1FZGl0b3IoKSApKTtcclxuXHRyb3V0ZXIuYWRkKCcvYmxvY2tzLzptb2QvOmlkJywgbmV3IEVudHJ5UGFnZSggbmV3IEl0ZW1FZGl0b3IoKSApKTtcclxuXHJcblx0XHJcblx0cm91dGVyLmFkZCgnLzp0YWJsZScsIG5ldyBUYWJsZVBhZ2UoKSk7XHJcblx0XHJcblx0XHJcblxyXG5cdHJvdXRlci5hZGRcclxuXHRyb3V0ZXIub24oJ3JvdXRlJyxmdW5jdGlvbihyb3V0ZSxwYXJhbXMpe1xyXG5cdCAgICAkKFwiLm5hdmJhci1uYXY+bGlcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0ICAgICQoXCJ1bC5uYXZiYXItbmF2PmxpPmFbaHJlZj0nXCIgKyBsb2NhdGlvbi5oYXNoICsgXCInXVwiKS5jbG9zZXN0KFwibGlcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0fSk7XHJcblx0cm91dGVyLnN0YXJ0KHRydWUpO1xyXG5cdGNvbnNvbGUubG9nKFwiQXBwIHN0YXJ0ZWQuXCIpO1xyXG5cclxufSkiLCJpbXBvcnQgKiBhcyBWaWV3IGZyb20gJ1ZpZXcnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeVBhZ2UgZXh0ZW5kcyBWaWV3IHtcclxuXHRjb25zdHJ1Y3RvcihzdWJFZGl0b3Ipe1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmKCFzdWJFZGl0b3Ipe3Rocm93IG5ldyBFcnJvcihcIk5vIHN1YiBlZGl0b3IgcHJvdmlkZWQuXCIpfVxyXG5cdFx0dGhpcy5zdWJFZGl0b3IgPSBzdWJFZGl0b3I7XHJcblx0XHR0aGlzLm9uKCdsb2FkJywoY3R4LCBkb25lLCBuZXh0KT0+e1xyXG5cdFx0XHR0aGlzLnJlbmRlcigpO1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuZWwuaW5uZXJIVE1MID0gYDxkaXYgaWQ9XCJnZW5lcmFsXCIgY2xhc3M9XCJyb3dcIj5cclxuXHRcdDxmb3JtIGNsYXNzPVwiZm9ybSBjb2wtbWQtNFwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdDxsYWJlbCBmb3I9XCJtb2RcIj5Nb2Q8L2xhYmVsPlxyXG5cdFx0XHRcdDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1vZFwiPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwiaWRcIj5JZDwvbGFiZWw+XHJcblx0XHRcdFx0PGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDxoci8+XHJcblx0XHQ8ZGl2IGlkPVwic3ViLWVkaXRvclwiPlxyXG5cdFx0PC9kaXY+YDtcclxuXHRcdHRoaXMucXMoJyNzdWItZWRpdG9yJykuYXBwZW5kQ2hpbGQodGhpcy5zdWJFZGl0b3IuZWwpO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblxyXG5cdH1cclxufSIsImltcG9ydCAqIGFzIFZpZXcgZnJvbSAnVmlldyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlUGFnZSBleHRlbmRzIFZpZXd7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmRhdGEgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVyID0gXCJcIjtcclxuICAgIHRoaXMudGFibGUgPSBcIk5PTkVcIjtcclxuICAgIHRoaXMub24oJ2xvYWQnLChjdHgsIGRvbmUsIG5leHQpPT57XHJcbiAgICAgIHRoaXMubG9hZERhdGEoY3R4LnBhcmFtcy50YWJsZSlcclxuICAgICAgLnRoZW4oKCk9Pnt0aGlzLnJlbmRlcigpO2RvbmUoKX0pXHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGA8ZGl2IGlkPVwiaGVhZGluZ1wiPjwvZGl2PlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaWx0ZXJcIi8+XHJcbiAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxyXG4gICAgPHRoZWFkPlxyXG4gICAgPHRyPlxyXG4gICAgPHRoPk1vZDwvdGg+XHJcbiAgICA8dGg+SWQ8L3RoPlxyXG4gICAgPHRoPlJlbGVhc2VkPC90aD5cclxuICAgIDx0aD5VcGRhdGVkPC90aD5cclxuICAgIDx0aD5FZGl0PC90aD5cclxuICAgIDwvdHI+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5IGlkPVwiZW50cmllc1wiPjwvdGJvZHlcclxuICAgIDwvdGFibGU+YDtcclxuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoe1xyXG4gICAgICBcImtleXVwICNmaWx0ZXJcIjooKT0+e1xyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5xcygnI2ZpbHRlcicpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YSh0YWJsZSl7XHJcbiAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICByZXR1cm4gZmV0Y2goJ3YxLycgKyB0YWJsZSlcclxuICAgIC50aGVuKChyZXNwKSA9PiByZXNwLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB0aGlzLmRhdGEgPSBkYXRhKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNoZWFkaW5nJykuaW5uZXJIVE1MID0gYDxoMT4ke3RoaXMudGFibGV9PC9oMT48cD5Gb3VuZCAke3RoaXMuZGF0YS5sZW5ndGh9IGVudHJpZXM8L3A+YDtcclxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignI2VudHJpZXMnKS5pbm5lckhUTUwgPSB0aGlzLmRhdGEuZmlsdGVyKChlKT0+IHRoaXMuZmlsdGVyLmxlbmd0aCA9PSAwIHx8IGUuaWQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9IC0xKS5tYXAoKGUpPT5gPHRyPlxyXG4gICAgICA8dGQ+JHtlLm1vZH08L3RkPlxyXG4gICAgICA8dGQ+JHtlLmlkfTwvdGQ+XHJcbiAgICAgIDx0ZD48dmVyc2lvbi1zZWxlY3QgdmFsdWU9XCIke2UuaW50cm9kdWNlZF9hdH1cIi8+PC90ZD5cclxuICAgICAgPHRkPjx2ZXJzaW9uLXNlbGVjdCB2YWx1ZT1cIiR7ZS5jaGFuZ2VkX2F0fVwiLz48L3RkPlxyXG4gICAgICA8dGQ+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBlZGl0XCI+RWRpdDwvYnV0dG9uPjwvdGQ+XHJcbiAgICA8L3RyPmApLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgKiBhcyBWaWV3IGZyb20gJ1ZpZXcnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWRpdG9yIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKClcclxuXHRcdHRoaXMuZWwuaW5uZXJIVE1MID0gJ0l0ZW0gZWRpdG9yIGdvZXMgaGVyZS4nO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
