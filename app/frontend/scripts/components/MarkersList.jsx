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
      <div className="b_markers-list-wrap">
        <div className="b_markers-list">
          {this.renderMarkers()}
        </div>
      </div>
    );
  },

  renderMarkers: function () {
    var id = this.props.video.id;
    var timestamp = this.state.timestamp;

    return _.map(this.state.markers, function(marker) {
      var active = MarkerStore.isActive(marker, timestamp);
      var inActive = MarkerStore.isInActive(marker, timestamp);

      return (
        <Marker marker={marker} active={active} inActive={inActive}/>
      );
    }.bind(this));
  }

});

module.exports = MarkersList;
