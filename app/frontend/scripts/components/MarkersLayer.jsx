/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MarkerStore = require('../stores/MarkerStore');

var Point = require('./Point.jsx');

var MarkupLayer = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var markers = MarkerStore.getCurrentMarkers(id);
    return { markers: markers };
  },

  render: function() {
    return (
      <div className="markers-layer">
        {this.renderPoints()}
      </div>
    )
  },

  renderPoints: function() {
    return _.map(this.state.markers, function (marker) {
      return <Point marker={marker}/>
    });
  }


});

module.exports = MarkupLayer;
