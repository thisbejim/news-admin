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

// Options

// Content
var submissionList = "WOOHOOHOHOHOH";


// dispatch functions                                   
function getSubmissions() {
 
}

// state fetchers
var ReviewStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return {
      submissionList: submissionList,
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
    case AppConstants.HANDLE_BUTTS:
      editBodyText(action.text);
      AppStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = ReviewStore;