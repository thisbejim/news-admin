var React = require('react');
var Radium = require('radium');
var ReviewActions = require('../actions/ReviewActions');

var SubmissionComponent = React.createClass({
	propTypes: {
		submission: React.PropTypes.object
	},
	render () {
		var submission = this.props.submission;

		function checkApproval(approval){
			switch(approval){
				case true:
					return btn.active;
					break;
				case "rejected":
					return btn.red;
					break;
				case "standby":
					return btn.disabled
					break;
			}
		}

		var approvalOneStyle = checkApproval(submission.approvalOne);
		var approvalTwoStyle = checkApproval(submission.approvalTwo);
		var approvalThreeStyle = checkApproval(submission.approvalThree);

		var reviewButton = submission.underReview == true ?
			<div className={btn.reviewRed}>Under Review</div> :
			<div className={btn.reviewBlue} onClick={this._handleClick}>Review</div>;

		return (
			<div className="row" style={style.component}>
				<div className="col-md-12">

					{/* Medium Style */}
					<div className="row visible-lg">
						<div className="col-md-12">
							<h6>{submission.tag_line}</h6>
						</div>
					</div>

					<div className="row visible-lg">
						<div className="col-md-2">
							<div className={approvalOneStyle}></div>
						</div>
						<div className="col-md-2">
							<div className={approvalTwoStyle}></div>
						</div>
						<div className="col-md-2">
							<div className={approvalThreeStyle}></div>
						</div>
						<div className="col-md-6 right-align">
							{reviewButton}
						</div>
					</div>

					{/* Small Style */}
					<div className="row visible-sm visible-xs visible-md center-align">
						<div className="col-xs-12">
							<h5>{submission.tag_line}</h5>
						</div>
					</div>

					<div className="row visible-sm visible-xs visible-md center-align">
						<div className="row">
							<div className="col-xs-4">
								<div className={approvalOneStyle}></div>
							</div>
							<div className="col-xs-4">
								<div className={approvalTwoStyle}></div>
							</div>
							<div className="col-xs-4">
								<div className={approvalThreeStyle}></div>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								{reviewButton}
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	},
	_handleClick: function(i){
		ReviewActions.reviewSubmission(this.props.submission);
	}
});

var btn = {
	active: "btn-floating waves-effect waves-light btn",
	disabled: "btn-floating waves-effect waves-light btn disabled",
	red: "btn-floating waves-effect waves-light btn red",
	reviewBlue: "waves-effect waves-light btn blue",
	reviewRed: "waves-effect waves-light btn red"
}

var style = {
	component: {
		backgroundColor: "#ffffff"
	}
}

module.exports = SubmissionComponent;