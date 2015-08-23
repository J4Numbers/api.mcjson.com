define(['backbone','widget/QuickTable','model/Block'],function(Backbone,QuickTable,Block){
		return Backbone.View.extend({
			initialize: function(){
				var self = this;
				var m = new Backbone.Collection();
				m.model = Block;
				m.url = '/v1/blocks';
				
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