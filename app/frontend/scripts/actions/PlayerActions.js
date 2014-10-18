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

module.exports = {
  setPlayer: setPlayer,
  setTimestamp: setTimestamp
};
