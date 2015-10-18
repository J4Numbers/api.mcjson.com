import * as _ from "./Util";
import EventEmitter from "./EventEmitter";

function _wrapCb(target, cb){
  return function(e){
    if(e.target && e.target.matches(target)){
      return cb.apply(this, arguments);
    }
  }
}

export default class View extends EventEmitter{
  constructor(options){
    super();
    options = options || {};
    Object.defineProperty(this, "_dom_events", {
      enumerable: false,
      value: []
    });
    this.cid = _.uniqueId('v');
    this.el = options.el ? (options.el instanceof HTMLElement ? options.el : document.querySelector(options.el)) : document.createElement(options.tagName || 'div');
    if(options.events){
      this.delegateEvents(options.events);
    }
  }

  delegateEvents(events){
    for(var i in events){
        var [event, target] = i.split(' ',2);
        var entry = {
          event,
          target,
          cb: _wrapCb(target, events[i])
        };
        this._dom_events.push(entry);
        this.el.addEventListener(entry.event, entry.cb);
      }
  }

  render(){
    throw new Error("Render not defined for view " + this.constructor.name + "["+ this.cid + "]");
  }

  pageTitle(title){
    if(title){
      document.querySelector("title").innerText = title;
    }else{
      return document.querySelector("title").innerText;
    }

  }

  qs(el){
    return this.el.querySelector(el);
  }

  qsa(el){
    return this.el.querySelectorAll(el);
  }

}