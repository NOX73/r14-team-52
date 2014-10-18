'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MarkerConstants = require('../constants/MarkerConstants');

function saveToLocalStorage(payload) {
  var markers = JSON.parse(localStorage.markers || "{}");

  if(!markers[payload.videoId]) 
    markers[payload.videoId] = [];
  markers[payload.videoId].push(payload.marker);

  console.log(JSON.stringify(markers))
  localStorage.markers = JSON.stringify(markers);
}

function add(videoId, x, y, timestamp) {
  var marker = {x:x, y:y, timestamp: timestamp};
  var payload = {videoId: videoId, marker: marker};
  AppDispatcher.handleAction(MarkerConstants.ADD, payload);

  saveToLocalStorage(payload);
}

module.exports = {
  add: add
};
