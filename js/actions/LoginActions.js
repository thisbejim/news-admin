var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var LoginActions = {
	handleEmail: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_EMAIL,
			data: data
		});
	},
	handleUsername: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_USERNAME,
			data: data
		});
	},
	handlePassword: function(data) {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_PASSWORD,
			data: data
		});
	},
	handleLoginSelect: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_LOGIN_SELECT
		});
	},
	handleRegisterSelect: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.HANDLE_REGISTER_SELECT
		});
	},
	login: function(email, password) {
		AppDispatcher.dispatch({
			actionType: AppConstants.LOGIN,
			email: email,
			password: password
		});
	},
	register: function(email, password, username) {
		AppDispatcher.dispatch({
			actionType: AppConstants.REGISTER,
			email: email,
			password: password,
			username: username
		});
	}
};

module.exports = LoginActions;