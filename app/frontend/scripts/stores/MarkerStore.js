'use strict';

var Store = require('../lib/Store');
var MarkerConstants = require('../constants/MarkerConstants.js');
var PlayerConstants = require('../constants/PlayerConstants.js');

var markers = JSON.parse(localStorage.markers || "{}");
var currentMarkers = {};
var _ = require('lodash');
var MARKER_BOUND = 0.2

var MarkerStore = new Store({

  getMarkersForAllVideo: function() {
    return markers;
  },

  getMarkers: function (videoId) {
    return markers[videoId] || [];
  },

  getMarkersByTimestamp: function(videoId, timestamp) {
    return _.filter(this.getMarkers(videoId), this.isActive);
  },

  getCurrentMarkers: function(videoId) {
    return currentMarkers[videoId] || [];
  },

  isActive: function(marker, timestamp) {
      return marker.timestamp >= timestamp - MARKER_BOUND && marker.timestamp <= timestamp + MARKER_BOUND
  },

  isInActive: function(marker, timestamp) {
    return marker.timestamp < timestamp - MARKER_BOUND;
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

module.exports = MarkerStore;
