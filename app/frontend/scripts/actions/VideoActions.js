'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VideoConstants = require('../constants/VideoConstants');
var VideoStore = require('../stores/MarkerStore');

function tm(fn) {
  setTimeout(fn, 1000);
}

function loadList() {
  tm(function() {
    AppDispatcher.handleAction(VideoConstants.LIST_LOADED, JSON.parse(localStorage.videos));
  });
}

function loadVideo(id) {
  var video = { id: id, name: "ID:"+id }

  tm(function() {
    AppDispatcher.handleAction(VideoConstants.VIDEO_LOADED, video);
  });
}

module.exports = {
  loadList: loadList,
  loadVideo: loadVideo
};
