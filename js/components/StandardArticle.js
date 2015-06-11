var React = require('react');
var Radium = require('radium');
var AppActions = require('../actions/AppActions');

var Standard = React.createClass({
  propTypes: {
      readyToSubmit: React.PropTypes.bool,
      text: React.PropTypes.string,
      imgAccepted: React.PropTypes.bool,
      imgText: React.PropTypes.string,
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
        <div className="col-md-3">
          <div className="file-field">
            <div className={imgBtnStyle}>
              <span>Image</span>
            <input onChange={this._handlePhoto} type="file"/>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          {this.props.imgText}
        <img src={this.props.imgDisplay} alt="Smiley face" height="300" width="300"> </img>
        </div>
      </div>
      
      </div>

        <div className="row">
          <div className="input-field col-md-12">
            <textarea id="textarea1" className="materialize-textarea" onChange={this._handleText} value={this.props.text}></textarea>
          </div>
        </div>
    </form>
      <div className="row">
      <div className="col-md-8">
      </div>
      <div className="col-md-2">
      <a className={readyStyle} onClick={this._ready}>{ready}</a>
      </div>
      <div className="col-md-2">
      <a className={submitStyle} onClick={this._submit}>Submit</a>
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
            AppActions.handleImageUpload(true);
            var reader = new FileReader();
            reader.onload = function (e) {
              AppActions.displayImage(e.target.result);
            }
            reader.readAsDataURL(file);
            } else {
              AppActions.handleImageUpload(false);
            }
          }; 
    
        image.src = _URL.createObjectURL(file);
    }
  },
  _handleText: function(event){
    AppActions.handleText(event.target.value);
  },
  _submit: function(){
    if (this.props.readyToSubmit == true){
      console.log(this.props.imgDisplay);
      AppActions.submitArticle(this.props.text, this.props.imgDisplay);
    }
  },
  _ready: function(){
    AppActions.toggleReadyToSubmit();
  }
});

var btn = {
  active: "waves-effect waves-light btn",
  disabled: "waves-effect waves-light btn disabled",
  red: "waves-effect waves-light btn red" 
}
  


module.exports = Standard;