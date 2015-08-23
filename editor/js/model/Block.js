define(['backbone','underscore'],function(Backbone,_){
	return Backbone.Model.extend({
		urlRoot: '/v1/blocks',
		isNew: function(){
			return this._isNew;
		},
		url: function(){
			return this.urlRoot + "/" + this.get('mod') + "/"  + this.get('id') + '.json';
		},
		parse: function(attr){
			attr._parsedMeta = new Backbone.Collection();
			attr._parsedMeta.model = MetaModel;
			for(x in attr.meta){
				attr._parsedMeta.add({label:x, fields:attr.meta[x]});
			}
			return attr;
		},
		toJSON: function(){
			var attr = _.clone(this.attributes);
			attr.meta = {};
			this.get('_parsedMeta').each(function(e){
				attr.meta[e.get('label')] = e.get('fields');
			});

			delete attr._parsedMeta;
			return attr;
		}
	});
});