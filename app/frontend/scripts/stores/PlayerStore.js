'use strict';

var Store = require('../lib/Store');
var PlayerConstants = require('../constants/PlayerConstants.js');

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



module.exports = PlayerStore;
