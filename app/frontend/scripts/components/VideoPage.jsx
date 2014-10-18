/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var VideoActions = require('../actions/VideoActions');
var Video = require('./Video.jsx');

var VideoPage = React.createClass({

  videoId: function () {
    return parseInt(this.props.params.videoId);
  },

  componentDidMount: function() {
    var id = this.videoId();
    VideoActions.loadVideo(id);
  },

  render: function() {
    return <Video videoId={this.videoId()}/>
  },

});

module.exports = VideoPage;
