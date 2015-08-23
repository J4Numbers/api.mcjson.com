define(['backbone','underscore'],function(Backbone,_){
	return Backbone.Model.extend({
		urlRoot: '/v1/entities',
		isNew: function(){
			return this._isNew;
		},
		url: function(){
			return this.urlRoot + "/" + this.get('mod') + "/"  + this.get('id') + '.json';
		}
	});
});