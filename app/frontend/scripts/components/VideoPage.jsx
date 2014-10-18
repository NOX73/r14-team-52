/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var VideoActions = require('../actions/VideoActions');
var Video = require('./Video.jsx');
var VideoItem = require('./VideoItem.jsx');

var VideoPage = React.createClass({

  videoId: function () {
    return parseInt(this.props.params.videoId);
  },

  componentDidMount: function() {
    var id = this.videoId();
    VideoActions.loadVideo(id);
  },

  render: function() {
    return (
      <div className="b_points-wrap">

        <div>
          <div>ID: {video.id}</div>
          <div>NAME: {video.name}</div>
          <Link to={"/videos/"+video.id+"/edit"}>Edit</Link>
        </div>

        <VideoItem video={video}/>
      </div>
    );
  },

});

module.exports = VideoPage;
