/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
//var ReactTransitionGroup = React.addons.TransitionGroup;
var Button = require('react-bootstrap/Button');

var Player = require('./Player');
var MarkupLayer = require('./MarkupLayer');
var MarkersList = require('./MarkersList');
var VideoStore = require('../stores/VideoStore');
var Fluxable = require('../behaviors/Fluxable');

var screenfull = require('screenfull');

var VideoMarkup = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore],

  videoId: function () {
    return parseInt(this.props.params.videoId);
  },

  getStateFromStores: function() {
    var id = this.videoId();
    return {video: VideoStore.videoById(id)};
  },

  renderLoading: function() {
    return (<div>Loading ... </div>)
  },

  render: function() {
    var video = this.state.video;

    if(_.isUndefined(video)){return this.renderLoading();}

    return (
      <div>
        <div className='b_points-wrap' ref='main'>
          <Player video={video}/>
          <MarkupLayer video={video}/>
        </div>
        <MarkersList video={video}/>
        <Button onClick={this.fullScreen.bind(this)}>FullScreen</Button>
      </div>
    );
  },

  fullScreen: function() {
    if(screenfull.enabled) {
      screenfull.request(this.refs.main.getDOMNode());
    }
  }

});

module.exports = VideoMarkup;
