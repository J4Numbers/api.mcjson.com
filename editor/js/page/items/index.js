define(['backbone','widget/QuickTable','model/Item'], function(Backbone,QuickTable,Item){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new Backbone.Collection();
				m.model = Item;
				m.url = '/v1/items';
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