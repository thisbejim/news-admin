var React = require('react');
var Radium = require('radium');
var AppActions = require('../actions/AppActions');

var ArticleSelect = React.createClass({
  propTypes: {
      articleType: React.PropTypes.string
    },
  render () {
    var standard = this.props.articleType == "Standard" ? btn.active : btn.disabled
    var listicle = this.props.articleType == "Listicle" ? btn.active : btn.disabled
    var video = this.props.articleType == "Video" ? btn.active : btn.disabled
    
    return (
      <div className="row">
        <div className="row">
          <div className="col-md-12"> <h4>Article Type</h4></div>  
        </div>
        <div className="row">
          <div className="col-md-4"> 
            <a className={standard} onClick={this._standard}>Standard</a>
          </div>
        <div className="col-md-4"> 
          <a className={listicle} onClick={this._listicle}>Listicle</a>
        </div> 
        <div className="col-md-4"> 
          <a className={video} onClick={this._video}>Video</a>
        </div>
      </div>
    </div>
    );
  },
  _standard: function(){
    if (this.props.articleType != "Standard"){
      AppActions.changeArticleType("Standard");
    }
  },
  _listicle: function(){
    if (this.props.articleType != "Listicle"){
      AppActions.changeArticleType("Listicle");
    }
  },
  _video: function(){
    if (this.props.articleType != "Video"){
      AppActions.changeArticleType("Video");
    }
  },
});

var btn = {
  active: "waves-effect waves-light btn",
  disabled: "waves-effect waves-light btn disabled",
  red: "waves-effect waves-light btn red" 
}
  

module.exports = ArticleSelect;