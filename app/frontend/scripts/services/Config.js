var config = {
  host: ""
}

module.exports = {

  init: function(val) {
    config = val
  },

  config: function () {
    return config;
  }
};
