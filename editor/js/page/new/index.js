define(['backbone','text!./index.html'], function(Backbone,tmpl){
		return Backbone.View.extend({
			initialize: function(attr){
				this.m = attr.m;
				this.$el.html(tmpl);
				this.$el.find("#add-new").html("Add " + attr.txt);
				this.on("page.load", function(f){
					f();
				});
			},
			events:{
				"submit form":"onSubmit"
			},
			onSubmit: function(ev){
				ev.preventDefault();
				var model = new this.m({
					mod: this.$el.find("[name=mod]").val(),
					id: this.$el.find("[name=id]").val(),
					meta:{}
				},{parse:true});
				model._isNew = true;
				model.save()
				.then(function(){
					console.log("Created");
				},function(){
					console.error("failed");
				})
				
				
			}
		});
	})
