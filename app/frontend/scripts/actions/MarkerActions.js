'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MarkerConstants = require('../constants/MarkerConstants');
var MarkerRepository = require('../repositories/MarkerRepository');

function add(videoId, x, y, timestamp) {
  var marker = { x: x, y: y, start_at: timestamp };

  MarkerRepository.create(videoId, marker).then(function(marker){
    var payload = {videoId: videoId, marker: marker};
    AppDispatcher.handleAction(MarkerConstants.ADD, payload);
  });
}

function loadForVideo(videoId) {
  return MarkerRepository.byVideoId(videoId).then(function(markers) {
    var payload = {videoId: videoId, markers: markers};
    AppDispatcher.handleAction(MarkerConstants.VIDEO_MARKERS_LOADED, payload);
  });
}

module.exports = {
  add: add,
  loadForVideo: loadForVideo
};
