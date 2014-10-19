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

function updateMarker(marker, payload) {
  return MarkerRepository.updateMarker(marker, payload).then(function(marker) {
    AppDispatcher.handleAction(MarkerConstants.VIDEO_MARKER_UPDATED, marker);
  });
}

function markerHover(marker) {
  AppDispatcher.handleAction(MarkerConstants.MARKER_HOVER, marker);
}

function deleteMarker(marker) {
  return MarkerRepository.deleteMarker(marker).then(function() {
    AppDispatcher.handleAction(MarkerConstants.MARKER_DELETED, marker);
  });
}

function selectMarker(marker) {
  AppDispatcher.handleAction(MarkerConstants.MARKER_SELECT, marker);
}

function hideSelected() {
  AppDispatcher.handleAction(MarkerConstants.MARKER_UNSELECT);
}

module.exports = {
  add: add,
  loadForVideo: loadForVideo,
  updateMarker: updateMarker,
  markerHover: markerHover,
  deleteMarker: deleteMarker,
  selectMarker: selectMarker,
  hideSelected: hideSelected
};
