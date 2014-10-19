'use strict';

var Store = require('../lib/Store');
var PlayerConstants = require('../constants/PlayerConstants');
var MarkerConstants = require('../constants/MarkerConstants');

var players = {};
var timestamps = {};

var PlayerStore = new Store({

  getTimestamp: function(videoId) {
    return timestamps[videoId];
  }

});

PlayerStore.registerHandler(PlayerConstants.SET_PLAYER, function(payload) {
  players[payload.videoId] = payload.player;
  this.emitChange();
});

PlayerStore.registerHandler(PlayerConstants.SET_TIMESTAMP, function(payload) {
  var id = payload.videoId;
  var timestamp = payload.timestamp;

  if(timestamps[id] === timestamp) return;

  timestamps[id] = timestamp;
  this.emitChange();
});

PlayerStore.registerHandler(PlayerConstants.PAUSE_PLAYERS, function() {
  _.forOwn(players, function(player){
    player.pauseVideo();
  });
});

PlayerStore.registerHandler(PlayerConstants.PAUSE_PLAYER, function(videoId) {
  players[videoId].pauseVideo();
});

PlayerStore.registerHandler(PlayerConstants.PLAY_PLAYER, function(videoId) {
  players[videoId].playVideo();
});

PlayerStore.registerHandler(PlayerConstants.SEEK_PLAYER_TO, function(payload) {
  var player = players[payload.videoId];
  player.seekTo(payload.timestamp, true);
});




module.exports = PlayerStore;
