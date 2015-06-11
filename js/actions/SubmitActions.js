var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var SubmitActions = {

  /**
   * @param  {string} text
   */
  toggleReadyToSubmit: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.READY_SUBMIT,
    });
  },
  changeArticleType: function(type) {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_ARTICLE_TYPE,
      type: type
    });
  },
  handleBodyText: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.HANDLE_BODY_TEXT,
      text: text
    });
  },
  handleTaglineText: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.HANDLE_TAGLINE_TEXT,
      text: text
    });
  },
  submitArticle: function(bodytext, tagline, image) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SUBMIT_ARTICLE,
      bodyText: bodytext,
      tagline: tagline,
      image: image
    });
  },
  handleImageUpload: function(accepted) {
    AppDispatcher.dispatch({
      actionType: AppConstants.IMAGE_UPLOADED,
      accepted: accepted
    });
  },
  displayImage: function(img) {
    AppDispatcher.dispatch({
      actionType: AppConstants.DISPLAY_IMG,
      img: img
    });
  },
};

module.exports = SubmitActions;