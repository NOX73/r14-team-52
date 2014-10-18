/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Link = require('react-router').Link;

var Item = React.createClass({
  render: function () {
    var video = this.props.video;
    return (
      <div>
        <Link to={"/videos/"+ video.id}>
          {video.name || "noName"}
        </Link>
      </div>
    );
  }
});

module.exports = Item;
