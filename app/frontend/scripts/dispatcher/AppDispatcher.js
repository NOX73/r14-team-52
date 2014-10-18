'use strict';

var Dispatcher = require('../lib/Dispatcher.js');
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {

  handleAction: function(name, params) {
    if(!name) console.error("Action unknown: ", name);
    try {
      this.dispatch({ actionType: name, params: params || {} });
    } catch (e){
      console.log(e, e.stack)
    }
  },

}, Dispatcher);

module.exports = AppDispatcher;
