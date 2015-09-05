define(['backbone','widget/QuickTable','model/Block','model/EntryCollection'],function(Backbone,QuickTable,Block,EntryCollection){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new EntryCollection([],{realModel:Block,url:'/v1/blocks'});
				
				this.on("page.load", function(f){
					m.fetch().then(function(){
						console.log("load completed")
						self.$el.append(new QuickTable({model:m}).render().$el);
						f();
					});
					
					
				});
				}
		});
	})