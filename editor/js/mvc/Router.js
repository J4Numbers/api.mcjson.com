/**
* Express inspired client router
* Supports named parameters, 
* nested routers and middleware.
*/
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:(\w+)/g;
var splatParam    = /\*(\w+)/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function _routeRegex(route) {
      if(route instanceof RegExp){return [route]};
      var names = [null];
      route = route.replace(escapeRegExp, '\\$&')
      .replace(optionalParam, '(?:$1)?')
      .replace(namedParam, function(match, optional, name) {
        names.push(name);
        return optional ? match : '([^/?]+)';
    })
      .replace(splatParam, function(match, name){
          names.push(name);
          return '([^?]*)';
      });
      names[0] = new RegExp('^' + route + '(?:\\?([\\s\\S]*)$)?');
      return names;
  }

  function _routeParse(route, path, ctx){
    console.log("Parsing route parameters")
    var names = route.slice(1);
    var res = route[0].exec(path).slice(1);
    ctx.raw = res;
    for(var i = 0;i< names.length; i++){
        ctx.params[names[i]] = res[i];
    }
}
import EventEmitter from "./EventEmitter";

export default class Router extends EventEmitter{
    constructor(opts){
    super();
    this.routes = [];
    this.noSlash = typeof opts == "object" ? opts.noSlash==true : Router.opts.noSlash;
    this.forceNext = typeof opts == "object" ? opts.forceNext==true : Router.opts.forceNext;
    this._listener = null;
    }

    start(run){
        var self = this;
        if(!this._listener){
            this._listener = function(){
                self.exec(location.hash.slice(1));
            }
            window.addEventListener("hashchange",this._listener)
            run && self.exec(location.hash.slice(1));
        }
    }
    stop(){
        if(this._listener){
            window.removeEventListener("hashchange",this._listener);
            this._listener = null;
        }
    }

    add(route, cb){
        if(typeof route == "function" && !cb){
           this.routes.push({
            route: [/.*/],
            cb: cb
        });

       }else{
        var r = route + (cb instanceof Router ? "/*_spine_route" : "");
        if(r.indexOf("/")===0 && this.noSlash){
            r = r.slice(1);
        }
        this.routes.push({
            route: _routeRegex(r),
            cb: cb
        });
    }
    return this;
    }

    exec(path, ctx){
        var _path = path;
        if(_path.indexOf("/")===0 && this.noSlash){
            _path = _path.slice(1);
        }
        var _ctx = ctx || {params:{}};
        var i = -1;
        var routes = this.routes;
        console.group("Begin routing ", path);
        var _nested = false;
        var _exec = ()=> {
            while(i < routes.length-1){
                i++;
                var route = routes[i];
                var idxChk = i;
                if(route.route[0].test(_path)){
                    _nested && console.groupEnd();
                    console.group("route found", route);
                    _routeParse(route.route, _path, _ctx);
                    _nested = true;
                    if(route.cb instanceof Router){
                        console.log("Subrouting ",_ctx, "/" + _ctx.params._spine_route);
                        route.cb.exec("/" + _ctx.params._spine_route, _ctx);
                        this.emit('route',route,_ctx.params);
                    }else{
                        console.log("Calling route")
                        route.cb(_ctx,_exec);
                        this.emit('route',route,_ctx.params);
                    }
                    console.groupEnd();
                    _nested = false;
                    if(!this.forceNext){console.groupEnd();return;}
                }
            }
            console.log("Routing ended, fell out of loop.");
            console.groupEnd();
        }
        _exec();
    }
}
Router.opts = {
    noSlash: true,
    forceNext: false
}

