var MARKER_BOUND = 0.2

module.exports = {

  isActive: function(marker, timestamp) {
      return marker.timestamp >= timestamp - MARKER_BOUND && marker.timestamp <= timestamp + MARKER_BOUND
  },

  isInActive: function(marker, timestamp) {
    return marker.timestamp > timestamp - MARKER_BOUND;
  }

}
