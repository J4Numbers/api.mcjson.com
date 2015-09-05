define(['backbone','widget/QuickTable','model/Item','model/EntryCollection'], function(Backbone,QuickTable,Item, EntryCollection){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new EntryCollection([],{realModel:Item,url:'/v1/items'});
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