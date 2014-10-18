/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var VideoActions = require('../actions/VideoActions');
var VideoStore = require('../stores/VideoStore');
var Fluxable = require('../behaviors/Fluxable');
var Link = require('react-router').Link;
var Player = require('./Player');
var MarkersLayer = require('./MarkersLayer');
var MarkersList = require('./MarkersList');

var Video = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  videoId: function () {
    return parseInt(this.props.params.videoId);
  },
  
  getStateFromStores: function() {
    var id = this.videoId();
    return {video: VideoStore.videoById(id)};
  },

  componentDidMount: function() {
    var id = this.videoId();
    VideoActions.loadVideo(id);
  },

  renderNoVideo: function() {
    return (<div>NO VIDEO</div>)
  },

  render: function() {
    var video = this.state.video;

    if(_.isUndefined(video)){return this.renderNoVideo();}

    return (
      <div className="main">
        <div>
          <div>ID: {video.id}</div>
          <div>NAME: {video.name}</div>
          <Link to={"/video/"+video.id+"/edit"}>Edit</Link>
        </div>

        <div>
          <div>
            <MarkersLayer video={video}/>
            <Player video={video}/>
          </div>
          <MarkersList video={video} />
        </div>
      </div>
    );
  },

});

module.exports = Video;
