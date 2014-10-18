'use strict';

var Store = require('../lib/Store');
var MarkerConstants = require('../constants/MarkerConstants.js');
var PlayerConstants = require('../constants/PlayerConstants.js');

var markers = {};
var currentMarkers = {};
var _ = require('lodash');
var hoverMarker = null;

var MarkerHelper = require('../helpers/MarkerHelper');

var MarkerStore = new Store({

  getMarkersForAllVideo: function() {
    return markers;
  },

  getMarkers: function (videoId) {
    return markers[videoId] || [];
  },

  getMarkersByTimestamp: function(videoId, timestamp) {
    return _.filter(this.getMarkers(videoId), function (marker) {
      return MarkerHelper.isActive(marker, timestamp);
    });
  },

  getCurrentMarkers: function(videoId) {
    return currentMarkers[videoId] || [];
  },

  hoverMarker: function() {
    return hoverMarker;
  }

});


MarkerStore.registerHandler(MarkerConstants.ADD, function(payload) {
  var id = payload.videoId;
  if(!markers[id]) markers[id] = [];

  markers[id].push(payload.marker);
  this.emitChange();
});

MarkerStore.registerHandler(PlayerConstants.SET_TIMESTAMP, function(payload) {
  var id = payload.videoId;
  var timestamp = payload.timestamp;

  var newM = MarkerStore.getMarkersByTimestamp(id, timestamp);
  var curM = MarkerStore.getCurrentMarkers(id);

  if (newM.length != curM.length || _.union(newM, curM).length != curM.length) {
    currentMarkers[id] = newM;
    this.emitChange();
  }
});


MarkerStore.registerHandler(MarkerConstants.VIDEO_MARKERS_LOADED, function(payload) {
  var id = payload.videoId;
  markers[id] = payload.markers;

  this.emitChange();
});

MarkerStore.registerHandler(MarkerConstants.VIDEO_MARKER_UPDATED, function(marker) {
  var id = marker.video_id;

  markers[id] = _.filter(markers[id], function(m){return m.id != marker.id});

  markers[id].push(marker);

  this.emitChange();
});

MarkerStore.registerHandler(MarkerConstants.MARKER_HOVER, function(marker) {
  hoverMarker = marker;

  this.emitChange();
});

MarkerStore.registerHandler(MarkerConstants.MARKER_DELETED, function(marker) {
  var id = marker.video_id;
  markers[id] = _.filter(markers[id], function(m){return m.id != marker.id});

  if(hoverMarker.id === marker.id) hoverMarker = null;

  this.emitChange();
});

module.exports = MarkerStore;
