'use strict';

var Q = require('q');
var Request = require('qajax');

module.exports = {
  findById: function(id) {
    var url = '/api/videos/' + id + '.json';
    var req = Request({ url: url }).then(Request.toJSON);

    return req;
  }
};
