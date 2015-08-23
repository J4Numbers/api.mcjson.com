define(['backbone'],function(Backbone){
	return Backbone.Collection.extend({
		url: '/v1/versions'
	});
});