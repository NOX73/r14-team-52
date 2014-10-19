'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MarkerConstants = require('../constants/MarkerConstants');
var MarkerRepository = require('../repositories/MarkerRepository');
var PlayerConstants =require('../constants/PlayerConstants');

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
  }).fail(function(e){
    AppDispatcher.handleAction(MarkerConstants.VIDEO_MARKER_UPDATED_FAILED, payload);
    return e;
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
  AppDispatcher.handleAction(PlayerConstants.PAUSE_PLAYERS);
}

function unselectMarker() {
  AppDispatcher.handleAction(MarkerConstants.MARKER_UNSELECT);
}

function markerClick(marker) {
  switch(marker.type_of_marker) {
    case 1:
      selectMarker(marker);
      window.open(marker.link, '_blank');
      break;
    case 2:
      selectMarker(marker);
      break;
    default:
      console.warn("Undefined marker type: ", marker);
  }
}

function hideInfo() {
  AppDispatcher.handleAction(MarkerConstants.HIDE_INFO);
}

module.exports = {
  add: add,
  loadForVideo: loadForVideo,
  updateMarker: updateMarker,
  markerHover: markerHover,
  deleteMarker: deleteMarker,
  selectMarker: selectMarker,
  unselectMarker: unselectMarker,
  markerClick: markerClick,
  hideInfo: hideInfo
};
