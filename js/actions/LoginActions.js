var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var LoginActions = {

  /**
   * @param  {string} text
   */
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
};

module.exports = LoginActions;