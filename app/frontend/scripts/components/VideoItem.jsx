/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var MarkersList = require('./MarkersList');
var Player = require('./Player');
var MarkersLayer = require('./MarkersLayer');

var VideoItem = React.createClass({

  render: function() {
    var video = this.props.video;
    return (
      <div>
        <div className="b_player-wrap">
          <MarkersLayer video={video}/>
          <Player video={video}/>
        </div>
        <MarkersList video={video} />
      </div>
    );
  }

});

module.exports = VideoItem;
