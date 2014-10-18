/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Marker= React.createClass({

  render: function() {
    var cx = {
      "b_marker": true,
      "b_marker__type-active": this.props.active,
      "b_marker__type-inactive": this.props.inactive
    };

    return (
      <div onMouseOver={this.props.onMouseOver}>
        <div className={React.addons.classSet(cx)} title={this.getName()}></div>
      </div>
    );
  },

  getName: function () {
    return this.props.marker.name || "Default Name";
  }
});

module.exports = Marker;
