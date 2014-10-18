'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MarkerConstants = require('../constants/MarkerConstants');
var MarkerRepository = require('../repositories/MarkerRepository');

function add(videoId, x, y, timestamp) {
  var marker = { x:x, y:y, timestamp: timestamp };
  var payload = {videoId: videoId, marker: marker};
  AppDispatcher.handleAction(MarkerConstants.ADD, payload);

  MarkerRepository.create(videoId, marker).then(console.log);
}

module.exports = {
  add: add
};
