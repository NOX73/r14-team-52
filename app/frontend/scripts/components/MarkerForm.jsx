/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Input = require('react-bootstrap/Input');

var MarkerForm = React.createClass({

  render: function() {

    return (
      <form className="form-horizontal">
        <Input type="text" placeholder="Name"/>
        <Input type="file"/>
      </form>
    )

  }

});

module.exports = MarkerForm;
