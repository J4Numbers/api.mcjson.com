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

	require(['PageRouter', 'jquery', 'page/TablePage'], function (PageRouter, $, TablePage) {

		var router = new PageRouter({ region: '#main' });

		router.add('/:table', new TablePage());
		router.on('route', function (route, params) {
			$(".navbar-nav>li").removeClass("active");
			$("ul.navbar-nav>li>a[href='" + location.hash + "']").closest("li").addClass("active");
		});
		router.start(true);
		console.log("App started.");
	});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInBhZ2UvVGFibGVQYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFFBQU8sQ0FBQyxDQUNQLFlBQVksRUFDWixRQUFRLEVBQ1IsZ0JBQWdCLENBQ2YsRUFDRixVQUFTLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFDOztBQUVqQyxNQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDOztBQUU5QyxRQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDdkMsUUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUMsVUFBUyxLQUFLLEVBQUMsTUFBTSxFQUFDO0FBQ3BDLElBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxJQUFDLENBQUMsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQzFGLENBQUMsQ0FBQztBQUNILFFBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztFQUU1QixDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUNoQm1CLFNBQVM7Y0FBVCxTQUFTOztBQUNqQixhQURRLFNBQVMsR0FDZjs7OzRCQURNLFNBQVM7O0FBRTFCLGlDQUZpQixTQUFTLDZDQUVsQjtBQUNSLFVBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2YsVUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsVUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDcEIsVUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRztBQUNoQyxjQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUM5QixJQUFJLENBQUMsWUFBSTtBQUFDLGdCQUFLLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQUMsQ0FBQyxDQUFBO09BRWxDLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyxFQUFFLENBQUMsU0FBUywwU0FhUixDQUFDO0FBQ1YsVUFBSSxDQUFDLGNBQWMsQ0FBQztBQUNsQix1QkFBZSxFQUFDLHVCQUFJO0FBQ2xCLGdCQUFLLE1BQU0sR0FBRyxNQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDdkMsZ0JBQUssTUFBTSxFQUFFLENBQUM7U0FDZjtPQUNGLENBQUMsQ0FBQTtLQUNIOztpQkEvQmtCLFNBQVM7O2FBaUNwQixrQkFBQyxLQUFLLEVBQUM7OztBQUNiLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGVBQU8sS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FDMUIsSUFBSSxDQUFDLFVBQUMsSUFBSTtpQkFBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQUEsQ0FBQyxDQUMzQixJQUFJLENBQUMsVUFBQyxJQUFJO2lCQUFLLE9BQUssSUFBSSxHQUFHLElBQUk7U0FBQSxDQUFDLENBQUE7T0FDbEM7OzthQUVLLGtCQUFFOzs7QUFDTixZQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLFlBQVUsSUFBSSxDQUFDLEtBQUssc0JBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxpQkFBYyxDQUFDO0FBQy9HLFlBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7aUJBQUksT0FBSyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO3NDQUMzSixDQUFDLENBQUMsR0FBRyx5QkFDTCxDQUFDLENBQUMsRUFBRSxpREFDbUIsQ0FBQyxDQUFDLGFBQWEscURBQ2YsQ0FBQyxDQUFDLFVBQVU7U0FFckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNwQjs7O1dBakRrQixTQUFTOzs7bUJBQVQsU0FBUyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShbXHJcblx0J1BhZ2VSb3V0ZXInLFxyXG5cdCdqcXVlcnknLFxyXG5cdCdwYWdlL1RhYmxlUGFnZSdcclxuXHRdLFxyXG5mdW5jdGlvbihQYWdlUm91dGVyLCAkLCBUYWJsZVBhZ2Upe1xyXG5cclxuXHR2YXIgcm91dGVyID0gbmV3IFBhZ2VSb3V0ZXIoe3JlZ2lvbjonI21haW4nfSk7XHJcblxyXG5cdHJvdXRlci5hZGQoJy86dGFibGUnLCBuZXcgVGFibGVQYWdlKCkpO1xyXG5cdHJvdXRlci5vbigncm91dGUnLGZ1bmN0aW9uKHJvdXRlLHBhcmFtcyl7XHJcblx0ICAgICQoXCIubmF2YmFyLW5hdj5saVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHQgICAgJChcInVsLm5hdmJhci1uYXY+bGk+YVtocmVmPSdcIiArIGxvY2F0aW9uLmhhc2ggKyBcIiddXCIpLmNsb3Nlc3QoXCJsaVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHR9KTtcclxuXHRyb3V0ZXIuc3RhcnQodHJ1ZSk7XHJcblx0Y29uc29sZS5sb2coXCJBcHAgc3RhcnRlZC5cIik7XHJcblxyXG59KSIsImltcG9ydCAqIGFzIFZpZXcgZnJvbSAnVmlldyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlUGFnZSBleHRlbmRzIFZpZXd7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmRhdGEgPSBbXTtcclxuICAgIHRoaXMuZmlsdGVyID0gXCJcIjtcclxuICAgIHRoaXMudGFibGUgPSBcIk5PTkVcIjtcclxuICAgIHRoaXMub24oJ2xvYWQnLChjdHgsIGRvbmUsIG5leHQpPT57XHJcbiAgICAgIHRoaXMubG9hZERhdGEoY3R4LnBhcmFtcy50YWJsZSlcclxuICAgICAgLnRoZW4oKCk9Pnt0aGlzLnJlbmRlcigpO2RvbmUoKX0pXHJcbiAgICAgIFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVsLmlubmVySFRNTCA9IGA8ZGl2IGlkPVwiaGVhZGluZ1wiPjwvZGl2PlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaWx0ZXJcIi8+XHJcbiAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxyXG4gICAgPHRoZWFkPlxyXG4gICAgPHRyPlxyXG4gICAgPHRoPk1vZDwvdGg+XHJcbiAgICA8dGg+SWQ8L3RoPlxyXG4gICAgPHRoPlJlbGVhc2VkPC90aD5cclxuICAgIDx0aD5VcGRhdGVkPC90aD5cclxuICAgIDx0aD5FZGl0PC90aD5cclxuICAgIDwvdHI+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5IGlkPVwiZW50cmllc1wiPjwvdGJvZHlcclxuICAgIDwvdGFibGU+YDtcclxuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoe1xyXG4gICAgICBcImtleXVwICNmaWx0ZXJcIjooKT0+e1xyXG4gICAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5xcygnI2ZpbHRlcicpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBsb2FkRGF0YSh0YWJsZSl7XHJcbiAgICB0aGlzLnRhYmxlID0gdGFibGU7XHJcbiAgICByZXR1cm4gZmV0Y2goJ3YxLycgKyB0YWJsZSlcclxuICAgIC50aGVuKChyZXNwKSA9PiByZXNwLmpzb24oKSlcclxuICAgIC50aGVuKChkYXRhKSA9PiB0aGlzLmRhdGEgPSBkYXRhKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJyNoZWFkaW5nJykuaW5uZXJIVE1MID0gYDxoMT4ke3RoaXMudGFibGV9PC9oMT48cD5Gb3VuZCAke3RoaXMuZGF0YS5sZW5ndGh9IGVudHJpZXM8L3A+YDtcclxuICAgIHRoaXMuZWwucXVlcnlTZWxlY3RvcignI2VudHJpZXMnKS5pbm5lckhUTUwgPSB0aGlzLmRhdGEuZmlsdGVyKChlKT0+IHRoaXMuZmlsdGVyLmxlbmd0aCA9PSAwIHx8IGUuaWQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuZmlsdGVyLnRvTG93ZXJDYXNlKCkpICE9IC0xKS5tYXAoKGUpPT5gPHRyPlxyXG4gICAgICA8dGQ+JHtlLm1vZH08L3RkPlxyXG4gICAgICA8dGQ+JHtlLmlkfTwvdGQ+XHJcbiAgICAgIDx0ZD48dmVyc2lvbi1zZWxlY3QgdmFsdWU9XCIke2UuaW50cm9kdWNlZF9hdH1cIi8+PC90ZD5cclxuICAgICAgPHRkPjx2ZXJzaW9uLXNlbGVjdCB2YWx1ZT1cIiR7ZS5jaGFuZ2VkX2F0fVwiLz48L3RkPlxyXG4gICAgICA8dGQ+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBlZGl0XCI+RWRpdDwvYnV0dG9uPjwvdGQ+XHJcbiAgICA8L3RyPmApLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
