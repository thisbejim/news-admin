// essentials
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

// app
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('underscore');

// additions
var Firebase = require('firebase')
var _ = require('underscore');


// config
var ref = new Firebase("https://newstestapp.firebaseio.com/");

// standard functions

// STATES
var username;
var password;
var LogRegSelect = "Login";

// Options

// Displatch functions
function handleUsername(data){
  username = data;
}

function handlePassword(data){
  password = data;
}

function handleLoginSelect(){
 LogRegSelect = LogRegSelect == "Login" ? "Register" : "Login";
}

// state fetchers
var LoginStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return {
      username: username,
      password: password,
      LogRegSelect: LogRegSelect,
    }
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// dispatcher
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case AppConstants.HANDLE_USERNAME:
      handleUsername(action.data);
      LoginStore.emitChange();
      break;
    case AppConstants.HANDLE_PASSWORD:
      handlePassword(action.data);
      LoginStore.emitChange();
      break;
    case AppConstants.HANDLE_LOGIN_SELECT:
      handleLoginSelect();
      LoginStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = LoginStore;