define(['backbone'],function(Backbone){

    return Backbone.Router.extend({
        initialize: function(attr){
            this.pages = {};
            this.current = null;
            this.region = attr.region;
        },
        loadPage: function(viewCtr, name, args){
            var self = this;
            if(!name){
                throw new Error("Could not uniquely identify page, provide a name or name the function.");
            }
            if(this.current){
                this.current.trigger("page.unload");
                this.current.$el.detach();
            }
            self.region.html("<h3>Loading</h3>");

            console.log("Loading page with id",name);
            if(!this.pages[name]){
                this.pages[name] = Object.create(viewCtr.prototype);
                viewCtr.apply(this.pages[name], args);
            }
                self.pages[name].trigger("page.load", function(){
                    self.current = self.pages[name];
                    self.region.empty().append(self.current.$el);
                });
        },
        navigate: function(fragment, options){
        	Backbone.Router.prototype.navigate.apply(this, arguments);
        }
    },{
        loadPage: function(viewCtr, name, args){
            return function(){
                this.loadPage(viewCtr, name, args);
            }
        }
    });
});

