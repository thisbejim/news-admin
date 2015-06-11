var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ReviewActions = {

  /**
   * @param  {string} text
   */
  get: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.READY_SUBMIT,
    });
  }
};

module.exports = ReviewActions;