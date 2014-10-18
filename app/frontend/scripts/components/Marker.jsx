/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Marker= React.createClass({

  render: function() {
    var cx = {
      "b_marker": true,
      "b_marker-active": this.props.acitve,
      "b_marker-inactive": this.props.inActive
    };

    return (
      <div>
        <div className={React.addons.classSet(cx)} title={this.getName()}></div>
      </div>
    );
  },

  getName: function () {
    return this.props.marker.name || "Default Name";
  }
});

module.exports = Marker;
