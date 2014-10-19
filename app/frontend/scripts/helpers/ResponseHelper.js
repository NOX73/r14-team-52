var _ = require('lodash');

function BadResponseError(response) {
  this.message = "BadResponse received."
  this.response = response;
  this.name = "BadResponseError";
}

function check() {
  var goodResp = arguments;
  return function(resp) {
    if(_.indexOf(goodResp, resp.status) < 0) throw (new BadResponseError(resp))
    return resp
  }
}

module.exports = {
  check: check
};
