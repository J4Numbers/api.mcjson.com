/**
* Minimal Backbone view that supports sub views
*/
define(['underscore', 'backbone'], function(_, Backbone){
	return Backbone.View.extend({
		subviews:[],
		addSubView: function(view){
			this.subviews.push(view);
			return view;
		},
		removeSubView: function(view){
			this.subviews.splice(this.subviews.indexOf(view),1);
			return view;
		},
		renderSubviews: function(){
			_.each(this.subviews, _.method('render'));
		},
		remove: function(){
			_.each(this.subviews, _.method('remove')); //Clean up subviews
			this.trigger('remove'); //Fire a remove event
			Backbone.View.prototype.remove.apply(this, arguments);
		}
	});
});