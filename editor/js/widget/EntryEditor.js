define([
	'underscore',
	'backbone',
	'text!./EntryEditor.html'
	],function(_,Backbone,tmpl){
	return Backbone.View.extend({
		initialize: function(attr){
			var self = this;
			this.model = attr.model;
			this.$el.html(_.template(tmpl)({e:this.model}));
		},
		render: function(){
			
			return this;
		},
		setVersion: function(v){
			this.$el.val(v);
			this.v = v;
		}
	});
})