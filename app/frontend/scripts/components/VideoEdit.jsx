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
var MarkerInfo = require('./MarkerInfo');

var VideoStore = require('../stores/VideoStore');
var MarkerStore = require('../stores/MarkerStore');
var VideoActions = require('../actions/VideoActions');
var MarkerActions = require('../actions/MarkerActions');
var PlayerActions = require('../actions/PlayerActions');

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
      <div className="row">
        <div className="col-md-9" ref='main'>
          <div className='b_points-wrap'>
            <Player video={video}/>
            <MarkupLayer video={video}/>
            <MarkerInfo onClick={this.onClickInfo}/>
          </div>

          <MarkersList video={video} markers={markers} onClickMarker={this.onClickMarker}/>
        </div>

        <div className="col-md-3">
          <Button onClick={this.fullScreen}>FullScreen</Button>
          <br/>
          <br/>
          {this.renderMarkerForm()}
        </div>
      </div>
    );
  },

  renderMarkerForm: function() {
    var marker = MarkerStore.selectedMarker();
    if(!marker) return null;

    return (<MarkerForm key={marker.id} marker={marker}/>);
  },

  fullScreen: function() {
    if(screenfull.enabled) {
      screenfull.request(this.refs.main.getDOMNode());
    }
  },

  onClickInfo: function() {
    MarkerActions.hideInfo();
  },

  onClickMarker: function(marker) {
    MarkerActions.selectMarker(marker);
    PlayerActions.seekToMarker(marker);
  }

});

module.exports = VideoEdit;
