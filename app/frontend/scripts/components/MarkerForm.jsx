/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Input = require('react-bootstrap/Input');
var MarkerActions = require('../actions/MarkerActions');
var MarkerStore = require('../stores/MarkerStore');
var Button = require('react-bootstrap/Button');

function bsStyle(name) {
  return MarkerStore.isErrorField(name) ? "error" : ""
}

var MarkerForm = React.createClass({

  render: function() {
    var marker = this.props.marker;

    return (
      <div className="form-horizontal">
        <Input type="number" hasFeedback bsStyle={bsStyle("start_at")} defaultValue={marker.start_at} onChange={this.changeStartAt}/>
        <Input type="text" placeholder="Name" defaultValue={marker.name} onChange={this.changeName}/>
        <Input type="text" placeholder="Link" defaultValue={marker.link} onChange={this.changeLink}/>
        <Input type="textarea" placeholder="Description" defaultValue={marker.description} onChange={this.changeDescription}/>
        <Input type="select" defaultValue={marker.type_of_marker} onChange={this.changeTypeOfMarker}>
          <option value={1}>Link</option>
          <option value={2}>Info</option>
        </Input>

        <Button bsStyle="danger" onClick={this.onDelete}>Delete</Button>

        <form enctype="multipart/form-data">
          <Input type="file" onChange={this.chageFile} name="video_marker[image]"/>
        </form>

      </div>
    )

  },

  chageFile: function (e) {
    var formData = new FormData(e.target.form);
    MarkerActions.uploadFile(this.props.marker, formData);
  },

  changeDescription: function(e){
    var val = e.target.value;
    MarkerActions.updateMarker(this.props.marker, {description: val});
  },

  changeTypeOfMarker: function(e) {
    var val = e.target.value;
    MarkerActions.updateMarker(this.props.marker, {type_of_marker: val});
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
  },

  changeStartAt: function (e) {
    var val = e.target.value;
    MarkerActions.updateMarker(this.props.marker, {start_at: val});
  }

});

module.exports = MarkerForm;
