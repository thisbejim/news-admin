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
var submissionList = [];
var submissionSelected;
// Options

// Displatch functions
function getSubmissionList(data){
  submissionList.push(data);
}

function setReviewItem(data){
  submissionSelected = data;
  var usersRef = ref.child("articles/"+data.id);
  usersRef.update({
  "underReview": true
  });
}

function unassign(data){
  submissionSelected = undefined;
  var usersRef = ref.child("articles/"+data.id);
  usersRef.update({
  "underReview": false
  });
}

function submitReview(data){
  submissionSelected = undefined;
  if(data.approvalOne == "standby"){
    data.approvalOne = true;
  } else if (data.approvalTwo == "standby"){
    data.approvalTwo = true;
    if (data.approvalOne == true){
      data.approved = true;
      data.timeOfApproval = new Date().getTime();
    }
  } else if (data.approvalThree == "standby"){
    data.approvalThree = true;
    if (data.approvalOne || data.approvalTwo == true){
      data.approved = true;
      data.timeOfApproval = new Date().getTime();
    }
  }
  
  var usersRef = ref.child("articles/"+data.id);
  usersRef.update({
  "tag_line": data.tag_line,
  "body_text": data.body_text,
  "underReview": false,
  "approvalOne": data.approvalOne,
  "approvalTwo": data.approvalTwo,
  "approvalThree": data.approvalThree,
  "approved": data.approved,
  "timeOfApproval": data.timeOfApproval,
  });
}

function reject(data){
  submissionSelected = undefined;
  if(data.approvalOne == "standby"){
    data.approvalOne = "rejected";
  } else if (data.approvalTwo == "standby"){
    data.approvalTwo = "rejected";
    if (data.approvalOne == "rejected"){
      data.approved = "rejected";
    }
  } else if (data.approvalThree == "standby"){
    data.approvalThree = "rejected";
    if (data.approvalOne || data.approvalTwo == "rejected"){
      data.approved = "rejected";
    }
  }
  
  var usersRef = ref.child("articles/"+data.id);
  usersRef.update({
  "underReview": false,
  "approvalOne": data.approvalOne,
  "approvalTwo": data.approvalTwo,
  "approvalThree": data.approvalThree,
  "approved": data.approved
  });
}

function handleBodyReview(data){
  submissionSelected.body_text = data;
}
function handleTaglineReview(data){
  submissionSelected.tag_line = data;
}

// state fetchers
var ReviewStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return {
      submissionList: submissionList,
      submissionSelected: submissionSelected
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
    case AppConstants.GET_SUBMISSION_LIST:
      getSubmissionList(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.REVIEW_SUBMISSION:
      setReviewItem(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.HANDLE_BODY_REVIEW:
      handleBodyReview(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.HANDLE_TAGLINE_REVIEW:
      handleTaglineReview(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.UNASSIGN:
      unassign(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.SUBMIT_REVIEW:
      submitReview(action.data);
      ReviewStore.emitChange();
      break;
    case AppConstants.REJECT:
      reject(action.data);
      ReviewStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = ReviewStore;