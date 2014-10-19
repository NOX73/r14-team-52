/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var MarkerStore = require('../stores/MarkerStore');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        <ReactCSSTransitionGroup transitionName="point-animation">
          {this.renderPoints()}
        </ReactCSSTransitionGroup>
      </div>
    )
  },

  renderPoints: function() {
    return _.map(this.state.markers, function (marker) {
      return <Point marker={marker} key={marker.id}/>
    });
  }


});

module.exports = MarkupLayer;
