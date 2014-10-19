/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

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
        <div className={React.addons.classSet(cx)}></div>
      </div>
    );
  }

});

module.exports = Marker;
