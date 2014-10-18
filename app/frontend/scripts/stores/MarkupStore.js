'use strict';

var Store = require('../lib/Store');
var MarkupConstants = require('../constants/MarkupConstants');

var marker = null;

var MarkupStore = new Store({

  newMarker: function() {
    return marker;
  },

  isNewMarker: function () {
    return !!marker;
  }

});

MarkupStore.registerHandler(MarkupConstants.UPDATE_MARKUP_MARKER, function(payload) {
  marker = payload;
  this.emitChange();
});

MarkupStore.registerHandler(MarkupConstants.DELETE_MARKUP_MARKER, function(payload) {
  marker = null;
  this.emitChange();
});


module.exports = MarkupStore;
