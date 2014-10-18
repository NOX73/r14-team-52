'use strict';

var Q = require('q');
var Request = require('qajax');
var Config = require('../services/Config');

module.exports = {
  create: function(videoId, marker) {
    var url = Config.config().host + '/api/videos/' + videoId + '/markers.json';
    var req = Request({ url: url,  method: "POST", data: marker }).then(Request.toJSON).fail(console.log);

    return req;
  }
};
