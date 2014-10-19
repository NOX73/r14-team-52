'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerConstants = require('../constants/PlayerConstants');
var PlayerStore = require('../stores/PlayerStore');

function setPlayer(videoId, player) {
  var payload = {videoId: videoId, player: player};
  AppDispatcher.handleAction(PlayerConstants.SET_PLAYER, payload);
}

function setTimestamp(videoId, timestamp) {
  var payload = {videoId: videoId, timestamp: timestamp};
  AppDispatcher.handleAction(PlayerConstants.SET_TIMESTAMP, payload);
}

function seekToMarker(marker) {
  var payload = {videoId: marker.video_id, timestamp: marker.start_at}
  AppDispatcher.handleAction(PlayerConstants.SEEK_PLAYER_TO, payload);
}

function pausePlayer(videoId) {
  AppDispatcher.handleAction(PlayerConstants.PAUSE_PLAYER, videoId);
}

function playPlayer(videoId) {
  AppDispatcher.handleAction(PlayerConstants.PLAY_PLAYER, videoId);
}


module.exports = {
  setPlayer: setPlayer,
  setTimestamp: setTimestamp,
  seekToMarker: seekToMarker,
  pausePlayer: pausePlayer,
  playPlayer: playPlayer
};
