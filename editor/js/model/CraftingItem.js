define(['backbone','underscore'],function(Backbone,_){

    return Backbone.Model.extend({
        getBlockStateString: function(){
            return _.map(this.get('meta') ,function(v,k){
                return {k:k,v:v}
            }).sort(function(a,b){
                return a.k.localeCompare(b.k);
            }).map(function(state){
                return state.k + ":" + state.v
            }).join(";");
        }
    });
});