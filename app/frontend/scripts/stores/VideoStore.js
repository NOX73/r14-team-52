'use strict';

var Store = require('../lib/Store');
var VideoConstants = require('../constants/VideoConstants');
var _ = require('lodash');

var videos = [];

var VideoStore = new Store({
  videos: function() {
    return videos;
  },

  videoById: function (id) {
    return _.find(videos, {id: id})
  }
});


VideoStore.registerHandler(VideoConstants.LIST_LOADED, function(value) {
  if(value) videos = value;
  this.emitChange();
});


VideoStore.registerHandler(VideoConstants.VIDEO_LOADED, function(value) {
  this.emitChange();
});




module.exports = VideoStore;
