/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Marker= React.createClass({

  render: function() {
    var cx = { "marker": true, };
    cx["marker-opacity-"+this.props.opacityNum] = true;

    return (
      <div className={React.addons.classSet(cx)}>
        <div className="marker-name">{this.getName()}</div>
      </div>
    );
  },


  getName: function () {
    return this.props.marker.name || "Default Name";
  }
});

module.exports = Marker;
