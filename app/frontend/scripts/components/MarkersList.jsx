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

var MarkersList = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore, PlayerStore],

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

      // Info marker
      //if(marker.type_of_marker == 2) {
        //var popover = <Popover title={marker.name}>
          //{marker.description ? <p>{marker.description}</p> : null}
          //<a src={marker.url}>Link</a>
        //</Popover>
        //markerElement = (
          //<OverlayTrigger trigger="manual" defaultOverlayShown placement="left" overlay={popover}>
            //{markerElement}
          //</OverlayTrigger>);
      //}

      if(marker.name) {
        var tooltip = <Tooltip><strong>{marker.name}</strong></Tooltip>; 

        return (
          <OverlayTrigger trigger="hover" placement="bottom" overlay={tooltip}>
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
    switch(marker.type_of_marker) {
      case 1:
        MarkerActions.selectMarker(marker);
        window.open(marker.link,'_blank'); break;
      case 2:
        MarkerActions.selectMarker(marker);
        break;
      default:
        console.warn("Undefined marker type: ", marker);
    }
  }

});

module.exports = MarkersList;
