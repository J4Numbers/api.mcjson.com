import Collection from './Collection.js';

function Query(model){
  this.model = model;
  this.predicates = [];
  this.filters = {};
}
["addAscending",
"addDescending",
"ascending",
"containedIn",
"contains",
"containsAll",
"descending",
"doesNotExist",
"doesNotMatchKeyInQuery",
"doesNotMatchQuery",
"endsWith",
"equalTo",
"greaterThan",
"greaterThanOrEqualTo",
"include",
"lessThan",
"lessThanOrEqualTo",
"limit",
"matches",
"matchesKeyInQuery",
"matchesQuery",
"near",
"notContainedIn",
"notEqualTo",
"select",
"skip",
"startsWith"
].forEach(o => Query.prototype[o] = op(o))

Query.prototype.toJSON = function(){
  return {
    model: this.model.name,
    predicates: this.predicates
  }
}

Query.prototype.count = function(){
  this.filters.countOnly = true;
  return this.find();
}

Query.prototype.exists = function(){
  return this.count().then((e)=>e > 0);
}


Query.prototype.find = function(){
  return fetch(this.model.url(true),
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

Query.prototype.first = function(){
  this.filters.start = 0;
  this.filters.limit = 1;
  return this.find();
}

Query.prototype.collection = function(Col, options){
  var ColInst = Col || Collection;
  return this.find().then((models) =>{
    return new ColInst(models, options);
  })
}


Query.or = function(...queries){
  //Return a query containing all subqueries
  var q = new Query(queries[0].model);
  q.predicates.push( queries.map((e)=>{op:'query',e}));
}

export default Query;