define(['backbone','widget/QuickTable','model/Entity'], function(Backbone,QuickTable,Entity){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new Backbone.Collection();
				m.model = Entity;
				m.url = '/v1/entities';
				m.fetch().then(function(){
					console.log("load completed")
					self.$el.append(new QuickTable({model:m}).render().$el);
				});
				this.on("page.load", function(f){
					f();
				});
			}
		});
	})