'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MarkupConstants = require('../constants/MarkupConstants');

function updateNewMarker(payload) {
  AppDispatcher.handleAction(MarkupConstants.UPDATE_MARKUP_MARKER, payload);
}

function destroyNewMarker() {
  AppDispatcher.handleAction(MarkupConstants.DELETE_MARKUP_MARKER);
}


module.exports = {
  updateNewMarker: updateNewMarker,
  destroyNewMarker: destroyNewMarker
}
