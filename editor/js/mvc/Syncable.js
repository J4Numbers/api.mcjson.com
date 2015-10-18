import * as _ from "./Util";
import EventEmitter from "./EventEmitter";

/**
* Wrapper for an object that can be synced with a remote server using fetch()
*/
export default class Syncable extends EventEmitter {

  constructor(){
    super();
  }

  url(getQueryAddress){
    return this.urlRoot;
  }

  isNew(){
    return false;
  }

  fetch(headers){
    if(!this.url()){throw new Error('url() returned invalid value');}
    headers = headers || {};
    return fetch(this.url(),
      {
        method: 'GET',
        headers: headers
      }).then(function(resp){
        if(!resp.ok){
          return Promise.reject(resp);
        }
        return resp.json();
      });
  }

  save(body, headers){
    if(!this.url()){throw new Error('url() returned invalid value');}
    headers = headers || {};
    headers.contentType="application/json";
    return fetch(this.url(),
      {
        method: this.isNew() ? 'POST' : 'PUT',
        headers: headers,
        body: JSON.stringify(body)
      }).then(function(resp){
        if(!resp.ok){
          return Promise.reject(resp);
        }
        return resp.json();
      });
  }

  destroy(headers){
    if(!this.url()){throw new Error('url() returned invalid value');}
    headers = headers || {};
    return fetch(this.url(),
      {
        method: 'DELETE',
        headers: headers
      }).then(function(resp){
        if(!resp.ok){
          return Promise.reject(resp);
        }
        return resp;
      });
  }
}