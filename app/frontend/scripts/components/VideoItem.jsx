/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var MarkersList = require('./MarkersList');
var Player = require('./Player');
var MarkersLayer = require('./MarkersLayer');
var MarkerInfo = require('./MarkerInfo');
var MarkerActions = require('../actions/MarkerActions');
var PlayerActions = require('../actions/PlayerActions');

var VideoItem = React.createClass({

  render: function() {
    var video = this.props.video;
    var markers = this.props.markers;
    return (
      <div>
        <div className="b_player-wrap">
          <MarkersLayer video={video}/>
          <MarkerInfo onClick={this.onClickInfo} />
          <Player video={video}/>
        </div>
        <MarkersList video={video} markers={markers} onClickMarker={this.onClickMarker}/>
      </div>
    );
  },

  onClickInfo: function() {
    MarkerActions.unselectMarker();
    PlayerActions.playPlayer(this.props.video.id);
  },

  onClickMarker: function(marker) {
    MarkerActions.markerClick(marker);
  }
});

module.exports = VideoItem;
