var $ = require('jquery');
var _ = require('underscore');
var ItemCollection = require('./itemCollection');
var ItemModel = require('./itemModel');
var page = {
  init: function(){
    setInterval(function(){
      page.stylesInit();
    },1000);
    page.eventsInit();
  },
  stylesInit: function(){
    var itemCollection = new ItemCollection();
    itemCollection.fetch().then(function(data){
      $('.picContainer').html('');
      _.each(itemCollection.models, function(el){
        if(el.get('ups') > -10){
          $('.picContainer').append('<div class="postCont"><img src='
          + el.get('picture')
          + '><br/><h3>'
          + el.get('caption')
          + ' '
          + el.get('ups')
          + '</h3><br/><button class="upvote" data-id="'
          + el.get('_id')
          + '">Upvote</button><button class="downvote" data-id="'
          + el.get('_id')
          +'">Downvote :(</button></div>');
        }
        else{
          el.destroy();
        }
      });
    });
  },
  eventsInit: function(){
    $('.imagePost').on('submit', function(e){
      e.preventDefault();
      var item = new ItemModel({
        picture: $('input[name="picUrl"]').val(),
        caption: $('input[name="caption"]').val(),
      });
      item.save();
      $('input[name="picUrl"]').val('');
      $('input[name="caption"]').val('');
    });
    $('.picContainer').on('click', '.upvote', function(e){
      var id = $(this).data('id');
      var itemCollection = new ItemCollection();
      itemCollection.fetch().then(function(data){
        _.each(data, function(el){
          if(id === el._id){
            var item = new ItemModel({_id: el._id});
            el.ups = el.ups + 1;
            item.fetch();
            item.set({ups: el.ups, picture: el.picture, caption: el.caption});
            item.save();
          }
        });
      });
    });
    $('.picContainer').on('click', '.downvote', function(e){
      var id = $(this).data('id');
      var itemCollection = new ItemCollection();
      itemCollection.fetch().then(function(data){
        _.each(data, function(el){
          if(id === el._id){
            var item = new ItemModel({_id: el._id});
            el.ups = el.ups - 1;
            item.fetch();
            item.set({ups: el.ups, picture: el.picture, caption: el.caption});
            item.save();
          }
        });
      });
    });
    $('.deletebug').on('click', function(e){
      window.itemCollection = new ItemCollection();
      itemCollection.fetch();
      var item2 = itemCollection.models[0];
    });
  },
};
$(document).ready(function(){
  page.init();
});
