/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Marker= React.createClass({

  render: function() {
    var cx = { "marker": true, };

    return (
      <div className={React.addons.classSet(cx)}>
        <div className="b_marker" title={this.getName()}></div>
      </div>
    );
  },


  getName: function () {
    return this.props.marker.name || "Default Name";
  }
});

module.exports = Marker;
