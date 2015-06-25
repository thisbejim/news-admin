var React = require('react');
var Radium = require('radium');
var SubmitActions = require('../actions/SubmitActions');
var SubmissionComponent = require('./SubmissionComponent');

var SubmissionList = React.createClass({
  propTypes: {
      submissionList: React.PropTypes.array
  },
  render () {
    var submissions = []
    for(var i in this.props.submissionList){
      if (this.props.submissionList[i].approved == false){
      submissions.push(
        <SubmissionComponent key={this.props.submissionList[i].id} submission={this.props.submissionList[i]} />
      );
      }
    }
    return (
    <div className="row">
    <div className="col-md-6">
    </div>
    <div className="col-md-6">
      {submissions}
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