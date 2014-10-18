'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VideoConstants = require('../constants/VideoConstants');
var VideoStore = require('../stores/MarkerStore');
var VideoRepository = require('../repositories/VideoRepository');
var MarkerActions = require('./MarkerActions');

function tm(fn) {
  setTimeout(fn, 1000);
}

function loadList() {
  tm(function() {
    AppDispatcher.handleAction(VideoConstants.LIST_LOADED, JSON.parse(localStorage.videos));
  });
}

function loadVideo(id) {
  return VideoRepository.findById(id).then(function(video) {
    AppDispatcher.handleAction(VideoConstants.VIDEO_LOADED, video);
  });
}

function loadVideoWithMarkers(id) {
  loadVideo(id);
  MarkerActions.loadForVideo(id);
}

module.exports = {
  loadList: loadList,
  loadVideo: loadVideo,
  loadVideoWithMarkers: loadVideoWithMarkers
};
