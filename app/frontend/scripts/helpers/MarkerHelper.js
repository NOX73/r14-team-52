var MARKER_BOUND = 0.2

module.exports = {

  isActive: function(marker, timestamp) {
    return marker.start_at >= timestamp - MARKER_BOUND && marker.start_at <= timestamp + MARKER_BOUND
  },

  isInActive: function(marker, timestamp) {
    return marker.start_at > timestamp;
  }

}
