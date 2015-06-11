var React = require('react');
var Radium = require('radium');
var ReviewStore =  require('../stores/ReviewStore.js');

// Components
var SubmissionList = require('./SubmissionList');


function getState(){
  return ReviewStore.getState();
}

var Review = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function() {
    ReviewStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ReviewStore.removeChangeListener(this._onChange);
  },  
  render () {
    return (
      
    <div className="row">
      <SubmissionList submissionList={this.state.submissionList}/>
    </div>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = Review;