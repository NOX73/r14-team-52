/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var React = require('react/addons');

var MarkerHelper = require('../helpers/MarkerHelper');
var PlayerStore = require('../stores/PlayerStore');
var Fluxable = require('../behaviors/Fluxable');
var Marker = require('./Marker');
var MarkerActions = require('../actions/MarkerActions');
var MarkerStore = require('../stores/MarkerStore');
var {OverlayTrigger, Tooltip} = require('react-bootstrap');
var $ = require('jquery');

var MarkersList = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore, PlayerStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var timestamp = PlayerStore.getTimestamp(id);
    return { timestamp: timestamp  };
  },
  
  render: function() {
    this.scroll();

    return (
      <div className="b_markers-list-wrap">
        <div className="b_markers-list" ref="scroll" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {this.renderMarkers()}
        </div>
      </div>
    );
  },

  onMouseEnter: function () {
    this.autoScroll = false;
  },

  onMouseLeave: function() {
    this.autoScroll = true;
  },

  scroll: function() {
    if(this.refs.scroll && this.autoScroll) {
      $(this.refs.scroll.getDOMNode()).animate({scrollTop: this.scrollPosition()}, {queue: false});
    }
  },

  scrollPosition: function() {
    if(this.props.markers.length === 0) return 0;

    var timestamp = this.state.timestamp;
    var sorterd = _.sortBy(this.props.markers, 'start_at');

    var idx = _.findLastIndex(sorterd, function(marker){
      return !MarkerHelper.isInActive(marker, timestamp);
    });

    if(idx < 0) return 0;

    return idx * 44
  },

  renderMarkers: function () {
    var id = this.props.video.id;
    var timestamp = this.state.timestamp;
    var sorterd = _.sortBy(this.props.markers, 'start_at');

    return _.map(sorterd, function(marker) {
      var styleFlags = {
        active: MarkerHelper.isActive(marker, timestamp),
        inactive: MarkerHelper.isInActive(marker, timestamp),
        hover: MarkerStore.isHover(marker)
      }

      var markerElement = <Marker
          key={marker.id}
          marker={marker}
          styleFlags={styleFlags}
          onMouseOver={this.onOverMarker.bind(this, marker)}
          onClick={this.onClickMarker.bind(this, marker)}
      />

      if(marker.name) {
        var tooltip = <Tooltip><strong>{marker.name}</strong></Tooltip>; 

        return (
          <OverlayTrigger key={"overlay_" + marker.id} trigger="hover" placement="bottom" overlay={tooltip}>
            <div>{markerElement}</div>
          </OverlayTrigger>
        );

      } else {
        return markerElement;
      }
    }.bind(this));
  },

  onOverMarker: function(marker) {
    MarkerActions.markerHover(marker);
  },

  onClickMarker: function(marker) {
    if(this.props.onClickMarker)
      this.props.onClickMarker(marker);
  }

});

module.exports = MarkersList;
