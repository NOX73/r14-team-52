/** @jsx React.DOM */

var React = require('react');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var {DefaultRoute, Route, Routes} = require('react-router');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

require('../../styles/bootstrap.min.css');

var VideoList = require('./VideoList.jsx');
var Video = require('./Video.jsx');
var VideoMarkup = require('./VideoMarkup.jsx');

React.renderComponent((
  <Routes location="history">
    <DefaultRoute name="video_list" path="/" handler={VideoList}></DefaultRoute>
    <Route name="video" path="/video/:videoId" handler={Video}></Route>
    <Route name="video_edit" path="/video/:videoId/edit" handler={VideoMarkup}></Route>
  </Routes>

), document.getElementById('content'));
