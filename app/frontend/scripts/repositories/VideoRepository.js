'use strict';

var Q = require('q');
var Request = require('qajax');
var Config = require('../services/Config');

module.exports = {
  findById: function(id) {
    var url = Config.config().host + 'api/videos/' + id + '.json';
    var req = Request({ url: url }).then(Request.toJSON);

    return req;
  }
};
