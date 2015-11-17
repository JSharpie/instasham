var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'http://tiny-tiny.herokuapp.com/collections/instasham',
  idAttribute: '_id',
  defaults:{
    picture: 'url',
    caption: 'urlCaption',
    ups: 0,
  },
  initialize: function(){

  }
});
