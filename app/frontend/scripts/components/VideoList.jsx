/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var VideoActions = require('../actions/VideoActions');
var VideoStore = require('../stores/VideoStore');
var Fluxable = require('../behaviors/Fluxable');
var Item = require('./VideoList/Item');

var VideoList = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  componentDidMount: function() {
    VideoActions.loadList();
  },

  getStateFromStores: function() {
    return {videos: VideoStore.videos()};
  },

  render: function() {
    return (
      <div className="b_points-wrap">
        {this.renderVideos()}
      </div>
    );
  },

  renderVideos: function() {
    return _.map(this.state.videos, function(video) {
      return <Item key={video.id} video={video}/>
    });
  }

});

module.exports = VideoList;
