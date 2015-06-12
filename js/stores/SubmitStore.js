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

var aws_access_key_id = "AKIAI3BOZTS6TEOBUPAA";
var aws_secret_access_key = "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";
var AWS_Bucket = 'newsadmintestbucket'
var AWS_REGION = 'us-west-2';
var AWS = require('aws-sdk'); 
AWS.config.update({
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: AWS_REGION
});
var s3 = new AWS.S3({params: {Bucket: AWS_Bucket}}); 
 

// standard functions


// create random key
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}



// STATES

// Options
var readyToSubmit = false;
var articleType = "Standard";
var imgAccepted = false;

// Content
var taglineText = ""
var articleBodyText = "";
var imgText = "Please upload an image with 300x300 dimensions."
var imgDisplay = "";

// dispatch functions                                   
function toggleReadyToSubmit() {
  readyToSubmit = readyToSubmit == true ? false : true;
}

function editBodyText(new_text){
  articleBodyText = new_text;
}

function editTaglineText(new_text){
  taglineText = new_text;
}

function changeArticleType(type){
  articleType = type;
}

function submitArticle(bodyText, tagline, image){
  
var key = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
var data = image.replace(/^data:image\/\w+;base64,/, "");
var buf = new Buffer(data, 'base64');
  
var params = {Key: key, Body: buf, ContentType: 'image/jpeg'};

s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                console.log("Successfully uploaded data to myBucket/myKey");
            }
        });
    
  var postsRef = ref.child("articles");
  postsRef.push({
    tag_line: tagline,
    body_text: bodyText,
    img_url: 'https://s3-us-west-2.amazonaws.com/'+AWS_Bucket+'/'+key,
    approved: false,
    timeSubmitted: new Date().getTime(),
    timeOfApproval: 0,
    approvalOne: "standby",
    approvalTwo: "standby",
    approvalThree: "standby",
    underReview: false
  });
}

function setImageAccepted(i){
  imgAccepted = i;
  imgText = i == false ? "Image was not the correct dimensions" : "";
}

function displayImage(i){
  imgDisplay = i;
}


// state fetchers
var AppStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return {
      readyToSubmit: readyToSubmit,
      articleType: articleType,
      imgAccepted: imgAccepted,
      articleBodyText: articleBodyText,
      taglineText: taglineText,
      imgText: imgText,
      imgDisplay: imgDisplay,
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
    case AppConstants.READY_SUBMIT:
      toggleReadyToSubmit();
      AppStore.emitChange();
      break;
    case AppConstants.HANDLE_BODY_TEXT:
      editBodyText(action.text);
      AppStore.emitChange();
      break;
    case AppConstants.HANDLE_TAGLINE_TEXT:
      editTaglineText(action.text);
      AppStore.emitChange();
      break;
    case AppConstants.CHANGE_ARTICLE_TYPE:
      changeArticleType(action.type);
      AppStore.emitChange();
      break;
    case AppConstants.SUBMIT_ARTICLE:
      submitArticle(action.bodyText, action.tagline, action.image);
      AppStore.emitChange();
      break;
    case AppConstants.IMAGE_UPLOADED:
      setImageAccepted(action.accepted);
      AppStore.emitChange();
      break;
    case AppConstants.DISPLAY_IMG:
      displayImage(action.img);
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;