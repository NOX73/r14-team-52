/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var MarkerActions = require('../actions/MarkerActions');

var Fluxable = require('../behaviors/Fluxable');

var PlayerStore = require('../stores/PlayerStore');
var MarkerStore = require('../stores/MarkerStore');

var Point = require('./Point.jsx');

var MarkupLayer = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore, PlayerStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var timestamp = PlayerStore.getTimestamp(id);
    var markers = MarkerStore.getCurrentMarkers(id);
    return { markers: markers, timestamp: timestamp };
  },

  render: function() {
    return (
      <div className="markup-layer" onClick={this.handleNewMarker}>
        {this.renderPoints()}
      </div>
    )
  },

  handleNewMarker: function(event) {
    MarkerActions.add(this.props.video.id, event.clientX, event.clientY, this.state.timestamp);
  },

  renderPoints: function() {
    return _.map(this.state.markers, function (marker) {
      return <Point marker={marker}/>
    });
  }


});

module.exports = MarkupLayer;
