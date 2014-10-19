/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var MarkerStore = require('../stores/MarkerStore');
var Fluxable = require('../behaviors/Fluxable');
var {Popover} = require('react-bootstrap');
var MarkerActions = require('../actions/MarkerActions');

var MarkerInfo = React.createClass({
  mixins: [Fluxable],
  watchStores: [MarkerStore],

  getStateFromStores: function() {
    return { marker: MarkerStore.selectedMarker() };
  },

  render: function() {
    var marker = this.state.marker;

    if(!marker || marker.type_of_marker != 2) return (<div className="b_marker-info-wrap"></div>);

    return (
      <div onClick={this.hideInfo} className="b_marker-info-wrap b_marker-info-wrap-expand">
        <Popover title={marker.name || "No title."} placement="left">
          {marker.description || "No Description."}
        </Popover>
      </div>
    )
  },

  hideInfo: function() {
    MarkerActions.hideSelected();
  }

});

module.exports = MarkerInfo;
