/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Point = React.createClass({

  render: function() {
    return <div className="marker-point" style={this.getStyles()} ></div>;
  },

  getStyles: function() {
    return {
      left: this.props.marker.x,
      top: this.props.marker.y,
    }
  }

});

module.exports = Point;
