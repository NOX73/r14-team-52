/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var VideoList = require('./VideoList.jsx');
var VideoPage = require('./VideoPage.jsx');
var VideoMarkup = require('./VideoMarkup.jsx');

var { DefaultRoute, Route, Routes } = require('react-router');

var PoinsApp = {

  render: function(domElement) {
    React.renderComponent((
      <Routes location="history">
        <DefaultRoute name="video_list" path="/" handler={MainPage}></DefaultRoute>
        <Route name="video" path="/videos/:videoId" handler={VideoPage}></Route>
      </Routes>
    ), domElement);
  },

  renderDev: function(domElement) {
    React.renderComponent((
      <Routes location="history">
        <DefaultRoute name="video_list" path="/" handler={VideoList}></DefaultRoute>
        <Route name="video" path="/videos/:videoId" handler={VideoPage}></Route>
        <Route name="video_edit" path="/videos/:videoId/edit" handler={VideoMarkup}></Route>
      </Routes>
    ), domElement);
  }

}

module.exports = PoinsApp;
