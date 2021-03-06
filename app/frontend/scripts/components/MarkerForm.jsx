/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var MarkerActions = require('../actions/MarkerActions');
var MarkerStore = require('../stores/MarkerStore');
var {Button, Input, ButtonGroup, ButtonToolbar} = require('react-bootstrap');

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

        <ButtonToolbar className="form-group">
          <ButtonGroup>
            <Button onClick={this.changeTypeOfMarker.bind(this,1)} active={marker.type_of_marker == 1}>Link</Button>
            <Button onClick={this.changeTypeOfMarker.bind(this,2)} active={marker.type_of_marker == 2}>Info</Button>
          </ButtonGroup>
        </ButtonToolbar>

        <form enctype="multipart/form-data">
          <div className="b_marker-image-upload">
            <div className="b_marker-image-upload-src">
              {marker.image && marker.image.url ? <img className="b_upload-form-image" src={marker.image.url} /> : null}
            </div>
            <div className="b_marker-image-upload-field">
              <Input type="file" onChange={this.chageFile} name="video_marker[image]"/>
            </div>
          </div>
        </form>

        <Button className="pull-right" bsStyle="danger" onClick={this.onDelete}>Delete</Button>

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

  changeTypeOfMarker: function(val) {
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
