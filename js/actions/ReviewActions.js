var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ReviewActions = {
	getSubmissionList: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.GET_SUBMISSION_LIST,
			data: data
		});
	},
	reviewSubmission: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REVIEW_SUBMISSION,
			data: data
		});
	},
	handleBodyReview: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_BODY_REVIEW,
			data: data
		});
	},
	handleTaglineReview: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_TAGLINE_REVIEW,
			data: data
		});
	},
	unassign: function(data)  {
		AppDispatcher.dispatch({
			actionType: AppConstants.UNASSIGN,
			data: data
		});
	},
	submitReview: function(data)  {
		AppDispatcher.dispatch({
			actionType: AppConstants.SUBMIT_REVIEW,
			data: data
		});
	},
	reject: function(data)  {
		AppDispatcher.dispatch({
			actionType: AppConstants.REJECT,
			data: data
		});
	},
};

module.exports = ReviewActions;