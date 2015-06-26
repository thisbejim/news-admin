var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var SubmitActions = {
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
	submitArticle: function(bodytext, tagline, image, articleCategory) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUBMIT_ARTICLE,
			bodyText: bodytext,
			tagline: tagline,
			image: image,
			articleCategory: articleCategory,
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
	handleCategorySelect: function(value) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_CATEGORY_SELECT,
			value: value
		});
	}
};

module.exports = SubmitActions;