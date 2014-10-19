/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Point = React.createClass({

  render: function() {
    return (
      <div className="b_marker-point" style={this.getStyles()}>
        <div className="b_marker-point-circle b_marker-point-circle-small"></div>
        <div className="b_marker-point-circle b_marker-point-circle-normal"></div>
        <div className="b_marker-point-circle b_marker-point-circle-big"></div>
      </div>
    );
  },

  getStyles: function() {
    return {
      left: this.props.marker.x,
      top: this.props.marker.y,
    }
  }

});

module.exports = Point;
