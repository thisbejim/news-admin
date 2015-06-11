var React = require('react');
var Radium = require('radium');
var SubmitStore =  require('../stores/SubmitStore.js');

// Components
var Standard = require('./StandardArticle');
var ArticleSelect = require('./ArticleSelect');

function getState(){
  return SubmitStore.getState();
}

var Submit = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function() {
    SubmitStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SubmitStore.removeChangeListener(this._onChange);
  },  
  render () {
    var articleForm;  
    
    switch(this.state.articleType){
      case "Standard":
        articleForm = <Standard readyToSubmit={this.state.readyToSubmit} articleBodyText={this.state.articleBodyText} 
        imgAccepted={this.state.imgAccepted} imgText={this.state.imgText} imgDisplay={this.state.imgDisplay} 
        taglineText={this.state.taglineText}/>
    }
    return (
      
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12"> <h3>Submit an article</h3></div>  
        </div>
        
      <ArticleSelect articleType={this.state.articleType}/>
      
      {articleForm}
      
  </div>
</div>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = Submit;