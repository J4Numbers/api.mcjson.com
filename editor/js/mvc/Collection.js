import * as _ from "./Util";
import Syncable from "./Syncable";

export default class Collection extends Syncable {
  constructor(models, options){
    super();
    options = options || {};
    if(!options.model){
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
    this.cid = _.uniqueId('c');
    this.urlRoot = options.urlRoot || '/' + this.constructor.name;
    this.add(models, options);
  }

  getAll(){
    return this.models.concat([]);
  }

  clear(){
    this.models.forEach(e => e.collection = null)
    this.models = [];
  }

  add(models, options){
    options = options || {};
    if(models == null){return this;}

    if(!Array.isArray(models)){
      models = [models];
    }

    models.forEach(m => {
      if(this.models.indexOf(m) === -1){
        if(options.parse){ m = new this.model(m);}
        m.collection = this;
        !options.silent && this.emit("add", m, this);
        this.models.push(m);
      }
    });

    !options.silent && this.emit("change", this);

  }

  remove(models, options){
    options = options || {};
    if(models == null){return this;}

    if(!Array.isArray(models)){
      models = [models];
    }

    models.forEach(m => {
      var idx = this.models.indexOf(m);
      if(idx !== -1){
        this.models.splice(idx);
        !options.silent && this.emit("remove", m, this);
      }
    });

    !options.silent && this.emit("change", this);

  }
  
  sort(){
    this.models.sort(this.comparator || this.model.comparator);
  }

  toJSON(){
    return this.models.map(e => e.toJSON());
  }

  fetch(){
    return super.fetch().then(json =>{this.models = json;return this;})
  }

  save(){
    return super.save(this.toJSON()).then(() => this)
  }
}