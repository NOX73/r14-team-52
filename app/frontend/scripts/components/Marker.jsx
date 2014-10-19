/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PlayerActions = require('../actions/PlayerActions');

var Marker= React.createClass({

  render: function() {
    var styleFlags = this.props.styleFlags;

    var cx = {
      "b_marker": true,
      "b_marker__type-active": styleFlags.active,
      "b_marker__type-inactive": styleFlags.inactive,
      "b_marker__type-hover": styleFlags.hover
    };

    return (
      <div onMouseOver={this.props.onMouseOver} onClick={this.props.onClick}>
        <div className={React.addons.classSet(cx)}>
          <img className="b_marker-image" src="http://lorempixel.com/28/28"/>
          <span className="b_marker-icon" title="Jump to marker" onClick={this.playMarker}>▶</span>
        </div>
      </div>
    );
  },

  playMarker: function(e) {
    e.stopPropagation();
    PlayerActions.seekToMarker(this.props.marker);
  }

});

module.exports = Marker;
