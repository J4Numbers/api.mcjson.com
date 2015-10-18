import Router from './Router';
import View from './View';

export default class PageRouter extends Router {
  constructor(opts){
    super(opts);
    if(!opts.region){throw new Error("Must supply a region");}
    this.region = opts.region instanceof HTMLElement ? opts.region : document.querySelector(opts.region);
    if(!this.region){throw new Error("Region not found, called before page load?");}
    this.currentView = null;
  }

  add(route, page){
    if(page instanceof Router){
      super.add(route,page);
      return;
    }
    if(
        !(page instanceof View) &&
        (typeof page != 'function')
      ){
      throw new Error('Must supply a View instance or a function');
    }
    var pageInst = (page instanceof View) ? page : null;
    super.add(route, (ctx, next) => {
      //Lazy load page first time
      if(pageInst == null){
        pageInst = page();
      }
      //Unload current page
      if(this.currentView){
        this.currentView.emit("unload");
        this.region.removeChild(this.currentView.el);
      }
      //emit load to the page so it can re-render if needed
      //Passed context, done() (render to DOM), and next() to continue 
      //Processing PageRouter
      pageInst.emit("load",ctx, () => {
        this.currentView = pageInst;
        this.region.appendChild(this.currentView.el);
      },next);
    });
  }

  use(route, fn){
      super.add(route,fn);
    }
}