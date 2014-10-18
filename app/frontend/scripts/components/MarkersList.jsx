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

var MarkersList = React.createClass({
  mixins: [Fluxable],
  watchStores: [PlayerStore],

  getStateFromStores: function() {
    var id = this.props.video.id;
    var timestamp = PlayerStore.getTimestamp(id);
    return { timestamp: timestamp  };
  },

  render: function() {
    return (
      <div className="b_markers-list-wrap">
        <div className="b_markers-list">
          {this.renderMarkers()}
        </div>
      </div>
    );
  },

  renderMarkers: function () {
    var id = this.props.video.id;
    var timestamp = this.state.timestamp;
    var sorterd = _.sortBy(this.props.markers, 'start_at');

    return _.map(sorterd, function(marker) {
      var active = MarkerHelper.isActive(marker, timestamp);
      var inactive = MarkerHelper.isInActive(marker, timestamp);

      return (
        <Marker marker={marker} active={active} inactive={inactive}/>
      );
    }.bind(this));
  }

});

module.exports = MarkersList;
