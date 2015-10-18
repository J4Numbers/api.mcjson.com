import * as _ from "./Util";
import Syncable from "./Syncable";

function _validate(self, newAttr){
  var attrs = _.extend({}, self.attributes, newAttr);
  return self.validate(attrs);
}
/**
* Represents a model of a resource
*/
export default class Model extends Syncable {
  /**
  * Available options
  * @param
  * Collection: Set Collection object this belongs to
  * idAttribute: Set attribute to use as the id
  * urlRoot: set base URL to use for this resource
  */
  constructor(attr, options){
    super();
    options = options || {};
    Object.defineProperty(this, "attributes", {
      enumerable: false,
      value: {}
    });
    Object.defineProperty(this, "changed", {
      enumerable: false,
      writable: true,
      value: {}
    });
    this.cid = _.uniqueId('m');
    this.id = null;
    Object.defineProperty(this, "idAttribute", {
      enumerable: false,
      value: options.idAttribute || 'id'
    });
    this.urlRoot =  options.urlRoot ? options.urlRoot : '/' + this.constructor.name;
    if(options.collection){this.collection = options.collection;}

    this.set(attr);
  }

  /**
  * Set a value on the model
  *
  *
  */
  set(key, val, options){
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
    

    if(!_validate(this, attrs)){ return false;}
    for(var k in attrs){
      !options.silent && !_.isEqual(this.attributes[k], attrs[k]) && this.emit("change:" + k, attrs[k], this);
      this.attributes[k] = attrs[k];
      this.changed[k] = attrs[k];
    }

    this.id = this.get(this.idAttribute);
    
    this.emit("change",this, options);

  }

  get(key){
    return this.attributes[key];
  }

  url(){
    return super.url() + (this.id ? '/' + this.id : '');
  }

  validate(attr){
    return true;
  }

  parse(attr){
    return attr;
  }

  toJSON(){
    return _.clone(this.attributes);
  }

  fetch(){
    return super.fetch().then( (json) =>{console.log("JSON",json);this.set(json);this.changed = {};return this;})
  }

  save(){
    return super.save(this.toJSON()).then(() =>{this.changed = {}; return this})
  }
}