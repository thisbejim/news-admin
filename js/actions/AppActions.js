var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

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
  handleText: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.HANDLE_TEXT,
      text: text
    });
  },
  submitArticle: function(text, image) {
    AppDispatcher.dispatch({
      actionType: AppConstants.SUBMIT_ARTICLE,
      text: text,
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

module.exports = AppActions;