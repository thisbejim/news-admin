var React = require('react');
var Radium = require('radium');
var ReviewStore =  require('../stores/ReviewStore.js');
var Server = require('../actions/ServerActions');

// Components
var SubmissionList = require('./SubmissionList');
var SubmissionReview = require('./SubmissionReview');

function getState(){
  return ReviewStore.getState();
}

var Review = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function() {
    ReviewStore.addChangeListener(this._onChange);
    Server.getSubmissions();
  },
  componentWillUnmount: function() {
    ReviewStore.removeChangeListener(this._onChange);
  },  
  render () {
    var display;
    if (this.state.submissionSelected == undefined){
      display = <SubmissionList submissionList={this.state.submissionList}/>
    } else {
      display = <SubmissionReview key={this.state.submissionSelected.id+2} submission={this.state.submissionSelected}/>
    }
    return (
    <div className="container">
      <div className="lg-blank-divide"></div>
      {display}
    </div>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = Review;
