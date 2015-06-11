var React = require('react');
var Radium = require('radium');
var AppActions = require('../actions/SubmitActions');

var SubmissionList = React.createClass({
  propTypes: {
      submissionList: React.PropTypes.string,
  },
  render () {

    return (
    <div className="row">
    <div className="col-md-12">
      {this.props.submissionList}
    </div>
    </div>
    );
  }
});

var btn = {
  active: "waves-effect waves-light btn",
  disabled: "waves-effect waves-light btn disabled",
  red: "waves-effect waves-light btn red" 
}
  


module.exports = SubmissionList;