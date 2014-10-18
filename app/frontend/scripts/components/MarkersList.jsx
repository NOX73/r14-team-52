/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var React = require('react/addons');

var MarkerStore = require('../stores/MarkerStore');
var PlayerStore = require('../stores/PlayerStore');
var Fluxable = require('../behaviors/Fluxable');
var Marker = require('./Marker');

var MarkersList = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore, PlayerStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var timestamp = PlayerStore.getTimestamp(id);
    return { markers: MarkerStore.getMarkers(id), timestamp: timestamp  };
  },

  render: function() {
    return (
      <div className="b_markers-list">
        {this.renderMarkers()}
      </div>
    );
  },

  renderMarkers: function () {
    return _.map(this.state.markers, function(marker) {
      var opacity;

      switch(true) {
        case Math.abs(marker.timestamp - this.state.timestamp) > 10: opacity = 0; break;
        case Math.abs(marker.timestamp - this.state.timestamp) > 8: opacity = 1; break;
        case Math.abs(marker.timestamp - this.state.timestamp) > 6: opacity = 2; break;
        case Math.abs(marker.timestamp - this.state.timestamp) > 4: opacity = 3; break;
        case Math.abs(marker.timestamp - this.state.timestamp) > 2: opacity = 4; break;
        case Math.abs(marker.timestamp - this.state.timestamp) > 1: opacity = 5; break;
      }

      return (
        <Marker marker={marker} opacityNum={opacity}/>
      );
    }.bind(this));
  }

});

module.exports = MarkersList;
