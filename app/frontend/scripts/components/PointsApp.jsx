/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var Video = require('./Video.jsx');
var VideoEdit = require('./VideoEdit.jsx');
var MainPage = require('./MainPage.jsx');
var Config = require('../services/Config');

var { DefaultRoute, Route, Routes } = require('react-router');

var Video = require('./Video.jsx');

var PoinsApp = {

  render: function(domElement) {
    React.renderComponent((
      <Routes location="history">
        <DefaultRoute name="video_list" path="/" handler={MainPage}></DefaultRoute>
        <Route name="video" path="/videos/:videoId" handler={Video}></Route>
        <Route name="video_edit" path="/videos/:videoId/edit" handler={VideoEdit}></Route>
      </Routes>
    ), domElement);
  },

  renderDev: function(domElement) {
    Config.init({ host: "http://localhost:3000" });
    console.log("Render DEV");
    React.renderComponent((
      <VideoEdit videoId={1} />
    ), domElement);
  }

}

module.exports = PoinsApp;
