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

	require(['PageRouter', 'jquery', 'page/TablePage', 'page/EntryPage'], function (PageRouter, $, TablePage, EntryPage) {

		var router = new PageRouter({ region: '#main' });

		router.add('/items/:mod/:id', new EntryPage());
		router.add('/blocks/:mod/:id', new EntryPage());

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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EntryPage = (function (_View) {
		_inherits(EntryPage, _View);

		function EntryPage() {
			var _this = this;

			_classCallCheck(this, EntryPage);

			_get(Object.getPrototypeOf(EntryPage.prototype), 'constructor', this).call(this);
			this.on('load', function (ctx, done, next) {
				_this.render();
				done();
			});
		}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInBhZ2UvRW50cnlQYWdlLmpzIiwicGFnZS9UYWJsZVBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsUUFBTyxDQUFDLENBQ1AsWUFBWSxFQUNaLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsZ0JBQWdCLENBQ2YsRUFDRixVQUFTLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQzs7QUFFNUMsTUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQzs7QUFFOUMsUUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDL0MsUUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7O0FBR2hELFFBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQzs7QUFJdkMsUUFBTSxDQUFDLEdBQUcsQ0FBQTtBQUNWLFFBQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDLFVBQVMsS0FBSyxFQUFDLE1BQU0sRUFBQztBQUNwQyxJQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUMsSUFBQyxDQUFDLDJCQUEyQixHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUMxRixDQUFDLENBQUM7QUFDSCxRQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLFNBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7RUFFNUIsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQ3pCbUIsU0FBUztZQUFULFNBQVM7O0FBQ2xCLFdBRFMsU0FBUyxHQUNoQjs7O3lCQURPLFNBQVM7O0FBRTVCLDhCQUZtQixTQUFTLDZDQUVwQjtBQUNSLE9BQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUc7QUFDakMsVUFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLFFBQUksRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0dBRUg7O1NBUm1CLFNBQVM7OztrQkFBVCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01DQVQsU0FBUztjQUFULFNBQVM7O0FBQ2pCLGFBRFEsU0FBUyxHQUNmOzs7NEJBRE0sU0FBUzs7QUFFMUIsaUNBRmlCLFNBQVMsNkNBRWxCO0FBQ1IsVUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZixVQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixVQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUNwQixVQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFHO0FBQ2hDLGNBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQzlCLElBQUksQ0FBQyxZQUFJO0FBQUMsZ0JBQUssTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUE7U0FBQyxDQUFDLENBQUE7T0FFbEMsQ0FBQyxDQUFDO0FBQ0gsVUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLDBTQWFSLENBQUM7QUFDVixVQUFJLENBQUMsY0FBYyxDQUFDO0FBQ2xCLHVCQUFlLEVBQUMsdUJBQUk7QUFDbEIsZ0JBQUssTUFBTSxHQUFHLE1BQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN2QyxnQkFBSyxNQUFNLEVBQUUsQ0FBQztTQUNmO09BQ0YsQ0FBQyxDQUFBO0tBQ0g7O2lCQS9Ca0IsU0FBUzs7YUFpQ3BCLGtCQUFDLEtBQUssRUFBQzs7O0FBQ2IsWUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsZUFBTyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUMxQixJQUFJLENBQUMsVUFBQyxJQUFJO2lCQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FBQSxDQUFDLENBQzNCLElBQUksQ0FBQyxVQUFDLElBQUk7aUJBQUssT0FBSyxJQUFJLEdBQUcsSUFBSTtTQUFBLENBQUMsQ0FBQTtPQUNsQzs7O2FBRUssa0JBQUU7OztBQUNOLFlBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsWUFBVSxJQUFJLENBQUMsS0FBSyxzQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLGlCQUFjLENBQUM7QUFDL0csWUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQztpQkFBSSxPQUFLLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7c0NBQzNKLENBQUMsQ0FBQyxHQUFHLHlCQUNMLENBQUMsQ0FBQyxFQUFFLGlEQUNtQixDQUFDLENBQUMsYUFBYSxxREFDZixDQUFDLENBQUMsVUFBVTtTQUVyQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3BCOzs7V0FqRGtCLFNBQVM7OzttQkFBVCxTQUFTIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKFtcclxuXHQnUGFnZVJvdXRlcicsXHJcblx0J2pxdWVyeScsXHJcblx0J3BhZ2UvVGFibGVQYWdlJyxcclxuXHQncGFnZS9FbnRyeVBhZ2UnXHJcblx0XSxcclxuZnVuY3Rpb24oUGFnZVJvdXRlciwgJCwgVGFibGVQYWdlLCBFbnRyeVBhZ2Upe1xyXG5cclxuXHR2YXIgcm91dGVyID0gbmV3IFBhZ2VSb3V0ZXIoe3JlZ2lvbjonI21haW4nfSk7XHJcblxyXG5cdHJvdXRlci5hZGQoJy9pdGVtcy86bW9kLzppZCcsIG5ldyBFbnRyeVBhZ2UoKSk7XHJcblx0cm91dGVyLmFkZCgnL2Jsb2Nrcy86bW9kLzppZCcsIG5ldyBFbnRyeVBhZ2UoKSk7XHJcblxyXG5cdFxyXG5cdHJvdXRlci5hZGQoJy86dGFibGUnLCBuZXcgVGFibGVQYWdlKCkpO1xyXG5cdFxyXG5cdFxyXG5cclxuXHRyb3V0ZXIuYWRkXHJcblx0cm91dGVyLm9uKCdyb3V0ZScsZnVuY3Rpb24ocm91dGUscGFyYW1zKXtcclxuXHQgICAgJChcIi5uYXZiYXItbmF2PmxpXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdCAgICAkKFwidWwubmF2YmFyLW5hdj5saT5hW2hyZWY9J1wiICsgbG9jYXRpb24uaGFzaCArIFwiJ11cIikuY2xvc2VzdChcImxpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdH0pO1xyXG5cdHJvdXRlci5zdGFydCh0cnVlKTtcclxuXHRjb25zb2xlLmxvZyhcIkFwcCBzdGFydGVkLlwiKTtcclxuXHJcbn0pIiwiaW1wb3J0ICogYXMgVmlldyBmcm9tICdWaWV3JztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlQYWdlIGV4dGVuZHMgVmlldyB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKCk7XHJcblx0XHR0aGlzLm9uKCdsb2FkJywoY3R4LCBkb25lLCBuZXh0KT0+e1xyXG5cdFx0XHR0aGlzLnJlbmRlcigpO1xyXG5cdFx0XHRkb25lKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fVx0XHJcbn0iLCJpbXBvcnQgKiBhcyBWaWV3IGZyb20gJ1ZpZXcnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZVBhZ2UgZXh0ZW5kcyBWaWV3e1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5kYXRhID0gW107XHJcbiAgICB0aGlzLmZpbHRlciA9IFwiXCI7XHJcbiAgICB0aGlzLnRhYmxlID0gXCJOT05FXCI7XHJcbiAgICB0aGlzLm9uKCdsb2FkJywoY3R4LCBkb25lLCBuZXh0KT0+e1xyXG4gICAgICB0aGlzLmxvYWREYXRhKGN0eC5wYXJhbXMudGFibGUpXHJcbiAgICAgIC50aGVuKCgpPT57dGhpcy5yZW5kZXIoKTtkb25lKCl9KVxyXG4gICAgICBcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBgPGRpdiBpZD1cImhlYWRpbmdcIj48L2Rpdj5cclxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZmlsdGVyXCIvPlxyXG4gICAgPHRhYmxlIGNsYXNzPVwidGFibGVcIj5cclxuICAgIDx0aGVhZD5cclxuICAgIDx0cj5cclxuICAgIDx0aD5Nb2Q8L3RoPlxyXG4gICAgPHRoPklkPC90aD5cclxuICAgIDx0aD5SZWxlYXNlZDwvdGg+XHJcbiAgICA8dGg+VXBkYXRlZDwvdGg+XHJcbiAgICA8dGg+RWRpdDwvdGg+XHJcbiAgICA8L3RyPlxyXG4gICAgPC90aGVhZD5cclxuICAgIDx0Ym9keSBpZD1cImVudHJpZXNcIj48L3Rib2R5XHJcbiAgICA8L3RhYmxlPmA7XHJcbiAgICB0aGlzLmRlbGVnYXRlRXZlbnRzKHtcclxuICAgICAgXCJrZXl1cCAjZmlsdGVyXCI6KCk9PntcclxuICAgICAgICB0aGlzLmZpbHRlciA9IHRoaXMucXMoJyNmaWx0ZXInKS52YWx1ZTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgbG9hZERhdGEodGFibGUpe1xyXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xyXG4gICAgcmV0dXJuIGZldGNoKCd2MS8nICsgdGFibGUpXHJcbiAgICAudGhlbigocmVzcCkgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAudGhlbigoZGF0YSkgPT4gdGhpcy5kYXRhID0gZGF0YSlcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcjaGVhZGluZycpLmlubmVySFRNTCA9IGA8aDE+JHt0aGlzLnRhYmxlfTwvaDE+PHA+Rm91bmQgJHt0aGlzLmRhdGEubGVuZ3RofSBlbnRyaWVzPC9wPmA7XHJcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNlbnRyaWVzJykuaW5uZXJIVE1MID0gdGhpcy5kYXRhLmZpbHRlcigoZSk9PiB0aGlzLmZpbHRlci5sZW5ndGggPT0gMCB8fCBlLmlkLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSAhPSAtMSkubWFwKChlKT0+YDx0cj5cclxuICAgICAgPHRkPiR7ZS5tb2R9PC90ZD5cclxuICAgICAgPHRkPiR7ZS5pZH08L3RkPlxyXG4gICAgICA8dGQ+PHZlcnNpb24tc2VsZWN0IHZhbHVlPVwiJHtlLmludHJvZHVjZWRfYXR9XCIvPjwvdGQ+XHJcbiAgICAgIDx0ZD48dmVyc2lvbi1zZWxlY3QgdmFsdWU9XCIke2UuY2hhbmdlZF9hdH1cIi8+PC90ZD5cclxuICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgZWRpdFwiPkVkaXQ8L2J1dHRvbj48L3RkPlxyXG4gICAgPC90cj5gKS5qb2luKCdcXG4nKTtcclxuICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
