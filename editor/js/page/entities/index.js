define(['backbone','widget/QuickTable','model/Entity','model/EntryCollection'], function(Backbone,QuickTable,Entity,EntryCollection){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new EntryCollection([],{realModel:Entity,url:'/v1/entities'});
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