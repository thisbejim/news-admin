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
var AWS = require('aws-sdk');
var AWSRef = ref.child("AWS/AWS");
var aws_access_key_id;
var aws_secret_access_key;
var s3;
var AWS_Bucket = 'newsadmintestbucket'
var AWS_REGION = 'us-west-2';
 

AWSRef.once("value", function(data) {
  var results = data.val();
  aws_access_key_id = results.key;
  aws_secret_access_key = results.access;
  AWS.config.update({
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: AWS_REGION
  });
  s3 = new AWS.S3({params: {Bucket: AWS_Bucket}}); 
});



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
var articleCategory = "News";

// Content
var taglineText = ""
var articleBodyText = "";
var imgText = "Please upload an image with dimensions of 600x600 or more."
var imgDisplay = "";

// user

var uid;
var username;


// dispatch functions
function toggleReadyToSubmit() {
  readyToSubmit = readyToSubmit == true ? false : true;
}

function editBodyText(new_text){
  articleBodyText = new_text;
}

function editTaglineText(new_text){
  console.log(new_text.length);
  if(new_text.length >= 80){
    var text = new_text.slice(-1);
    taglineText = taglineText.slice(0,-1);
    taglineText = taglineText+text
  } else {
    taglineText = new_text;
  }
}

function handleCategory(value){
  console.log(value)
  articleCategory = value;
}

function changeArticleType(type){
  articleType = type;
}

function submitArticle(bodyText, tagline, image, articleCategory){
  
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
    underReview: false,
    clicks: 0,
    articleCategory: articleCategory,
    authorId: uid,
    author: username
  });
}

function setImageAccepted(i){
  imgAccepted = i;
  imgText = i == false ? "Image dimensions not over 600x600" : "";
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
      articleCategory: articleCategory,
    }
  },
  checkAuth: function(){
    var authData = ref.getAuth();
    if (authData) {
      var getRef = ref.child("users");
      getRef.child(authData.uid).once("value", function(dataSnapshot) {
        var data = dataSnapshot.val();
        username = data['username'];
        uid = authData.uid;
      });
    } else {
      window.location.href ="#/";
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
      submitArticle(action.bodyText, action.tagline, action.image, action.articleCategory);
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
    case AppConstants.HANDLE_CATEGORY_SELECT:
      handleCategory(action.value);
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;