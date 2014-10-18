/**
 * @jsx React.DOM
 */

'use strict';

var Fluxable = require('../behaviors/Fluxable');
var React = require('react/addons');
var VideoStore = require('../stores/VideoStore');
var Link = require('react-router').Link;
var Player = require('./Player');
var MarkersLayer = require('./MarkersLayer');
var MarkersList = require('./MarkersList');

var VideoPage = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  getStateFromStores: function() {
    return {video: VideoStore.videoById(this.props.videoId)};
  },

  renderNoVideo: function() {
    return (<div className="b_points-wrap">Loading ... </div>)
  },

  render: function() {
    var video = this.state.video;

    if(_.isUndefined(video)){return this.renderNoVideo();}

    return (
      <div className="b_points-wrap">
        <div>
          <div className="b_player-wrap">
            <MarkersLayer video={video}/>
            <Player video={video}/>
          </div>
          <MarkersList video={video} />
        </div>
      </div>
    );
  },

});

module.exports = VideoPage;
