/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
//var ReactTransitionGroup = React.addons.TransitionGroup;
var Fluxable = require('../behaviors/Fluxable');

var Player = require('./Player');
var MarkupLayer = require('./MarkupLayer');
var MarkersList = require('./MarkersList');
var MarkerForm = require('./MarkerForm');
var Button = require('react-bootstrap/Button');

var VideoStore = require('../stores/VideoStore');
var MarkerStore = require('../stores/MarkerStore');
var VideoActions = require('../actions/VideoActions');

var screenfull = require('screenfull');

var VideoEdit = React.createClass({
  mixins: [Fluxable],
  watchStores: [VideoStore, MarkerStore],

  videoId: function () {
    return this.props.videoId || parseInt(this.props.params.videoId);
  },

  didMount: function() {
    var id = this.videoId();
    VideoActions.loadVideoWithMarkers(id);
  },

  getStateFromStores: function() {
    var id = this.videoId();
    return { video: VideoStore.videoById(id) };
  },

  renderLoading: function() {
    return (<div>Loading ... </div>)
  },

  render: function() {
    var video = this.state.video;

    if(_.isUndefined(video)){ return this.renderLoading(); }

    var markers = MarkerStore.getMarkers(video.id);

    return (
      <div>
        <div className='b_points-wrap' ref='main'>
          <Player video={video}/>
          <MarkupLayer video={video}/>
        </div>

        <MarkersList video={video} markers={markers}/>

        <Button onClick={this.fullScreen}>FullScreen</Button>

        {this.renderMarkerForm()}

      </div>
    );
  },

  renderMarkerForm: function() {
    var id = this.videoId();

    var markers = MarkerStore.getMarkers(id);
    if(markers.length === 0) return null;

    return (<MarkerForm marker={markers[0]}/>);
  },

  fullScreen: function() {
    if(screenfull.enabled) {
      screenfull.request(this.refs.main.getDOMNode());
    }
  }

});

module.exports = VideoEdit;
