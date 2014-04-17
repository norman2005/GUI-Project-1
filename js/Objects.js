define(['Object'], function(Object){
  var Objects = Backbone.Collection.extend({
    model: Object
  });
  return new Objects();
});