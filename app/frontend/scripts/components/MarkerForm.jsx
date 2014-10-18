/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Input = require('react-bootstrap/Input');
var MarkerActions = require('../actions/MarkerActions');
var Button = require('react-bootstrap/Button');

var MarkerForm = React.createClass({

  render: function() {
    var marker = this.props.marker

    return (
      <form className="form-horizontal">
        <Input type="text" placeholder="Name" defaultValue={marker.name} onChange={this.changeName}/>
        <Input type="text" placeholder="Link" defaultValue={marker.link} onChange={this.changeLink}/>
        <Input type="textarea" placeholder="Description" defaultValue={marker.description}/>
        <Input type="file"/>
        <Button bsStyle="danger" onClick={this.onDelete}>Delete</Button>
      </form>
    )

  },

  onDelete: function() {
    MarkerActions.deleteMarker(this.props.marker);
  },

  changeLink: function(e) {
    var val = e.target.value;
    MarkerActions.updateMarker(this.props.marker, {link: val});
  },

  changeName: function(e) {
    var val = e.target.value;
    MarkerActions.updateMarker(this.props.marker, {name: val});
  }

});

module.exports = MarkerForm;
