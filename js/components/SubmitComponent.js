var React = require('react');
var Radium = require('radium');
var AppStore =  require('../stores/AppStore');

// Components
var Standard = require('./StandardArticle');
var ArticleSelect = require('./ArticleSelect');

function getState(){
  return AppStore.getState();
}

var Submit = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },  
  render () {
    var articleForm;  
    
    switch(this.state.articleType){
      case "Standard":
        articleForm = <Standard readyToSubmit={this.state.readyToSubmit} text={this.state.text} imgAccepted={this.state.imgAccepted}
        imgText={this.state.imgText} imgDisplay={this.state.imgDisplay}/>
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