var React = require('react');
var Radium = require('radium');
var ReviewActions = require('../actions/ReviewActions');

var SubmissionReview = React.createClass({
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

		return (
			<div className="row">
				<div className="col-md-12">

					<div className="row center-align">
						<div className="col-md-12">
							<h5>Feature Image</h5>
							<div className="lg-blank-divide"></div>
							<img src={submission.img_url} className="img-responsive center-block"> </img>
						</div>
					</div>

					<div className="row">
						<h5>Tagline</h5>
						<div className="lg-blank-divide"></div>
						<div className="input-field col-md-12">
							<textarea id="tagline" className="materialize-textarea flow-text" onChange={this._handleTaglineEdit} value={submission.tag_line}></textarea>
						</div>
					</div>

					<div className="row">
						<h5>Story</h5>
						<div className="lg-blank-divide"></div>
						<div className="input-field col-md-12">
							<textarea id="body" className="materialize-textarea flow-text" onChange={this._handleBodyEdit} value={submission.body_text}></textarea>
						</div>
					</div>

			{/* Medium Style */}
					<div className="row visible-md visible-lg center-align">
						<div className="col-md-4">
							<div className={btn.approve} onClick={this._submitReview}>Approve</div>
						</div>
						<div className="col-md-4">
							<div className={btn.reject} onClick={this._reject}>Reject</div>
						</div>
						<div className="col-md-4">
							<div className={btn.unassign} onClick={this._unassign}>Unassign</div>
						</div>
					</div>

					<div className="row visible-md visible-lg center-align">
						<div className="col-md-3">
						</div>
						<div className="col-md-2">
							<div className={approvalOneStyle}></div>
						</div>
						<div className="col-md-2">
							<div className={approvalTwoStyle}></div>
						</div>
						<div className="col-md-2">
							<div className={approvalThreeStyle}></div>
						</div>
					</div>

			{/* Small Style */}
					<div className="row visible-sm visible-xs center-align">
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

					<div className="row visible-sm visible-xs center-align">
						<div className="blank-divide"></div>
						<div className="row">
							<div className="col-sm-12">
								<div className={btn.approve} onClick={this._submitReview}>Approve</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<div className={btn.reject} onClick={this._reject}>Reject</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<div className={btn.unassign} onClick={this._unassign}>Unassign</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	_handleBodyEdit: function(event) {
		ReviewActions.handleBodyReview(event.target.value);
	},
	_handleTaglineEdit: function(event) {
		ReviewActions.handleTaglineReview(event.target.value);
	},
	_unassign: function() {
		ReviewActions.unassign(this.props.submission);
	},
	_submitReview: function() {
		ReviewActions.submitReview(this.props.submission);
	},
	_reject: function() {
		ReviewActions.reject(this.props.submission);
	}
});

var btn = {
	active: "btn-floating waves-effect waves-light btn",
	disabled: "btn-floating waves-effect waves-light btn disabled",
	red: "btn-floating waves-effect waves-light btn red",
	approve: "waves-effect waves-light btn",
	reject: "waves-effect waves-light btn red",
	unassign: "waves-effect waves-light btn disabled"
}

module.exports = SubmissionReview;