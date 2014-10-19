'use strict';

var Q = require('q');
var Request = require('qajax');
var Config = require('../services/Config');
var check = require('../helpers/ResponseHelper').check;

module.exports = {
  create: function(videoId, marker) {
    var url = Config.config().host + '/api/videos/' + videoId + '/markers.json';
    var req = Request({ url: url,  method: "POST", data: {video_marker: marker} }).then(Request.toJSON)

    return req;
  },

  byVideoId: function(videoId) {
    var url = Config.config().host + '/api/videos/' + videoId + '/markers.json';
    var req = Request({ url: url }).then(Request.toJSON).fail(console.log);

    return req;
  },

  updateMarker: function(marker, payload) {
    var url = Config.config().host + '/api/videos/' + marker.video_id + '/markers/'+marker.id+'.json';
    var req = Request({ url: url, method: "PUT", data: {video_marker: payload} }).then(check(200)).then(Request.toJSON);

    return req;
  },

  deleteMarker: function(marker) {
    var url = Config.config().host + '/api/videos/' + marker.video_id + '/markers/'+marker.id+'.json';
    var req = Request({ url: url, method: "DELETE"}).fail(console.log);

    return req;
  }
};
