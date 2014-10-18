/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Fluxable = require('../behaviors/Fluxable');
var VideoActions = require('../actions/VideoActions');
var VideoItem = require('./VideoItem.jsx');
var VideoStore = require('../stores/VideoStore');

var Video = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  getStateFromStores: function() {
    return {video: VideoStore.videoById(this.videoId())};
  },

  videoId: function () {
    return this.props.videoId || parseInt(this.props.params.videoId);
  },

  componentDidMount: function() {
    var id = this.videoId();
    VideoActions.loadVideo(id);
  },

  renderNoVideo: function() {
    return (<div className="b_points-wrap">Loading ... </div>)
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

module.exports = Video;
