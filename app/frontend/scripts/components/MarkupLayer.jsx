/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var MarkerActions = require('../actions/MarkerActions');
var MarkupActions =require('../actions/MarkupActions');

var Fluxable = require('../behaviors/Fluxable');

var PlayerStore = require('../stores/PlayerStore');
var MarkerStore = require('../stores/MarkerStore');
var MarkupStore = require('../stores/MarkupStore');

var Point = require('./Point.jsx');

var MarkupLayer = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore, PlayerStore, MarkupStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var timestamp = PlayerStore.getTimestamp(id);
    var markers = MarkerStore.getCurrentMarkers(id);
    return { markers: markers, timestamp: timestamp };
  },

  render: function() {
    return (
      <div ref="layer" className="markup-layer" onClick={this.handleNewMarker} onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
        {this.renderPoints()}
        {this.renderNewPoints()}
      </div>
    )
  },

  onMouseMove: function(event) {
    var target = this.refs.layer.getDOMNode();
    var rect = target.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var maxX = this.refs.layer.getDOMNode().offsetWidth;
    var maxY = this.refs.layer.getDOMNode().offsetHeight;

    if(maxX > x && maxY > y) {
      MarkupActions.updateNewMarker({ x: x, y: y });
    }else {
      MarkupActions.destroyNewMarker();
    }
  },

  onMouseLeave: function() {
    MarkupActions.destroyNewMarker();
  },

  renderNewPoints: function() {
    var marker = MarkupStore.newMarker();
    return marker ? <Point marker={marker} /> : null
  },

  handleNewMarker: function(event) {
    var target = this.refs.layer.getDOMNode();
    var rect = target.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    MarkerActions.add(this.props.video.id, x, y, this.state.timestamp);
  },

  renderPoints: function() {
    return _.map(this.state.markers, function (marker) {
      return <Point marker={marker}/>
    });
  }


});

module.exports = MarkupLayer;
