define(['backbone','text!./index.html'], function(Backbone,tmpl){
		return Backbone.View.extend({
			initialize: function(){
				this.$el.html(tmpl);
				this.on("page.load", function(f){
					f();
				});
			}
		});
	})