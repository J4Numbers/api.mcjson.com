define(['backbone','underscore'],function(Backbone, _){
  return Backbone.Collection.extend({
    initialize: function(atrr,opts){
        console.log("ENTRY",arguments);
        this.realModel = opts.realModel;
        this.url = opts.url;
      },
    model: Backbone.Model.extend({
      
      getModel: function(){
        var newModel = new this.collection.realModel({mod: this.get('mod'), id: this.get('id')})
        return newModel.fetch(arguments).then(function(){return newModel;});
      }
    })
  });

});