var React = require('react');
var Radium = require('radium');
var SubmitActions = require('../actions/SubmitActions');

var Standard = React.createClass({
  propTypes: {
      readyToSubmit: React.PropTypes.bool,
      text: React.PropTypes.string,
      imgAccepted: React.PropTypes.bool,
      articleBodyText: React.PropTypes.string,
      taglineText: React.PropTypes.string,
      imgDisplay: React.PropTypes.any
    },
  getDefaultProps: function(){
    return {
      readyToSubmit: false
    };
  },
  render () {
    var ready = this.props.readyToSubmit == false ? "Finished" : "Edit";
    var submitStyle = this.props.readyToSubmit == false ? btn.disabled : btn.active;
    var readyStyle = this.props.readyToSubmit == false ? btn.active : btn.red;
    var imgBtnStyle = this.props.imgAccepted == false ? btn.red : btn.active;

    return (
    <div className="row">
    <form className="col-md-12">
      
      <div className="row">
        <div className="col-md-2">
          <div className="file-field">
            <div className={imgBtnStyle}>
              <span>Image</span>
            <input onChange={this._handlePhoto} type="file"/>
          </div>
        </div>
      </div>
      <div className="col-md-6 valign-wrapper">
          <p className="valign">{this.props.imgText}</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
        <img src={this.props.imgDisplay}> </img>
        </div>
      </div>
  
        <div className="row">
           <div className="lg-blank-divide"></div>
          <div className="input-field col-md-12">
            
            <textarea id="tagline" className="materialize-textarea" onChange={this._handleTaglineText} value={this.props.taglineText}></textarea>
      <label htmlFor="tagline"><h5>Tagline</h5></label>
          </div>
        </div>

        <div className="row">
          <div className="lg-blank-divide"></div>
          <div className="input-field col-md-12">
            <textarea id="body" className="materialize-textarea" onChange={this._handleBodyText} value={this.props.articleBodyText}></textarea>
            <label htmlFor="tagline"><h5>Story</h5></label>
          </div>
        </div>
    </form>
      <div className="row">
      <div className="col-md-8">
      </div>
      <div className="col-md-2">
      <div className={readyStyle} onClick={this._ready}>{ready}</div>
      </div>
      <div className="col-md-2">
      <div className={submitStyle} onClick={this._submit}>Submit</div>
      </div>
      </div>
  </div>
    );
  },
  _handlePhoto: function(event){
    
    var _URL = window.URL || window.webkitURL;
    var image, file;

    if ((file = event.target.files[0])) {
       
        image = new Image();
        
        image.onload = function() { 
          if (this.width == 300 & this.height == 300){
            SubmitActions.handleImageUpload(true);
            var reader = new FileReader();
            reader.onload = function (e) {
              SubmitActions.displayImage(e.target.result);
            }
            reader.readAsDataURL(file);
            } else {
              SubmitActions.handleImageUpload(false);
            }
          }; 
    
        image.src = _URL.createObjectURL(file);
    }
  },
  _handleBodyText: function(event){
    SubmitActions.handleBodyText(event.target.value);
  },
  _handleTaglineText: function(event){
    SubmitActions.handleTaglineText(event.target.value);
  },
  _submit: function(){
    if (this.props.readyToSubmit == true){
      console.log(this.props.imgDisplay);
      SubmitActions.submitArticle(this.props.articleBodyText, this.props.taglineText, this.props.imgDisplay);
    }
  },
  _ready: function(){
    SubmitActions.toggleReadyToSubmit();
  }
});

var btn = {
  active: "waves-effect waves-light btn",
  disabled: "waves-effect waves-light btn disabled",
  red: "waves-effect waves-light btn red" 
}
  


module.exports = Standard;