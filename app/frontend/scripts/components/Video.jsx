/**
 * @jsx React.DOM
 */

'use strict';

var Fluxable = require('../behaviors/Fluxable');
var React = require('react/addons');
var VideoStore = require('../stores/VideoStore');
var VideoActions = require('../actions/VideoActions');
var VideoItem = require('./VideoItem.jsx');

var VideoPage = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  getStateFromStores: function() {
    return {video: VideoStore.videoById(this.props.videoId)};
  },

  renderNoVideo: function() {
    return (<div className="b_points-wrap">Loading ... </div>)
  },

  componentDidMount: function() {
    VideoActions.loadVideo(this.props.videoId);
  },

  render: function() {
    var video = this.state.video;

    if(_.isUndefined(video)){return this.renderNoVideo();}

    return (
      <div className="b_points-wrap">
        <VideoItem video={video}/>
      </div>
    );
  },

});

module.exports = VideoPage;
