/** @jsx React.DOM */

var React = require('react');
var PointsApp = require('./PointsApp.jsx');
var topEl = (window !== window.top ? window.top : window);

// Export React so the devtools can find it
topEl.React = React;
topEl.PointsApp = PointsApp;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/bootstrap.min.css');

