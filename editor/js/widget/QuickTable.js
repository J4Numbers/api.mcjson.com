define([
	'backbone',
	'types/Subview',
	'underscore',
	'jquery',
	'text!./QuickTable.html',
	'text!./QuickRow.html'
	],function(Backbone,Subview,_,$,html,htmlRow){
	rowTmpl = _.template(htmlRow,{variable:'row'});
	QuickRow = Backbone.View.extend({
		tagName:'tr',
		initialize: function() {
			var self = this;
			this.$el.html(rowTmpl(this.model));
			this.$el.find(".introduced_at > version-select").change(function(ev){
				self.model.set('introduced_at', this.getAttribute("version"));
				self.model.save();
			});
			this.$el.find(".changed_at > version-select").change(function(ev){
				self.model.set('changed_at', this.getAttribute("version"));
				self.model.save();
			})

			return this;
		}
	});
	QuickTable = Subview.extend({
		initialize: function(attr) {
			var self = this;
			console.log(attr.model);
			this.$el.html(html);
			attr.model.each(function(e){
				var row = new QuickRow({model: e});
				self.$el.find("tbody").append(row.$el);
				self.addSubView(row);
				row.render();
			});
			attr.model.on('add',function(e){
				var row = new QuickRow({model: e});
				self.$el.find("tbody").append(row.$el);
				self.addSubView(row);
				row.render();
			});
		},
		events:{
			"keyup .filter":"onFilter"
		},
		render: function() {
			this.renderSubviews();
			return this;
		},
		onFilter: function(){
			var filter = this.$el.find('.filter').val();
			_.each(this.subviews,function(e){
				//console.log(e);
				if( !filter ||
					e.model.get('id').indexOf(filter) !== -1 ||
					e.model.get('name').indexOf(filter) !== -1
					){
					e.$el.show();
				}else{
					e.$el.hide();
				}
			})
			
		}

	});
	return QuickTable;
});