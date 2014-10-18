'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var VideoConstants = require('../constants/VideoConstants');
var VideoStore = require('../stores/MarkerStore');
var VideoRepository = require('../repositories/VideoRepository');
var MarkerActions = require('./MarkerActions');

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
  loadVideo: loadVideo,
  loadVideoWithMarkers: loadVideoWithMarkers
};
