var React = require('react');
var Radium = require('radium');
var Router = require('react-router');
var SubmitActions = require('../actions/SubmitActions');

var Standard = React.createClass({
  mixins : [Router.Navigation],
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
    
    var imgBtnStyle = this.props.imgAccepted == false ? btn.imgRed : btn.imgActive;
    var imgBtnAnimate = this.props.imgAccepted == false ? animate.pulse : animate.none;
    var imgBtnIcon = this.props.imgAccepted == false ? "add" : "done";
    
    var imageText = this.props.imgText == "" ? "" : <div className="row center-align">
                                                      <div className="lg-blank-divide"></div>
                                                      <div className="col-md-12">
                                                        <p>{this.props.imgText}</p>
                                                      </div>
                                                    </div>;
    return (
    <div className="row">
    <div className="col-md-12">
      
      <div className="row center-align">
          <div className="col-md-12">
            <div className={imgBtnStyle} style={imgBtnAnimate} onClick={this._openUpload}><i className="material-icons">{imgBtnIcon}</i></div>
           </div>
      </div>
      
      
      {imageText}
      
      {/* Medium Image Style */}
      <div className="row visible-md visible-lg">
        <div className="col-md-12">
        <img src={this.props.imgDisplay} className="img-responsive center-block"> </img>
        </div>
      </div>
      
      {/* Small Image Style */}
      
      <div className="row visible-sm visible-xs">
        <div className="col-xs-12">
          <img src={this.props.imgDisplay} className="img-responsive center-block"> </img>
        </div>
      </div>
      
      <div className="row">
      <div className="col-md-4">
      </div>
      <div className="center-block col-md-4">
        <select onChange={this._handleCategorySelect} className="browser-default">
          <option value="News">News</option>
          <option value="Movies">Movies</option>
          <option value="Gaming">Gaming</option>
          <option value="Culture">Culture</option>
          <option value="Politics">Politics</option>
        </select>
      
      </div>
      </div>
  
      <div className="row center-align">
        <div className="lg-blank-divide"></div>
          <h5>Tagline</h5>
          <div className="input-field col-md-12">
            <textarea id="tagline" className="materialize-textarea" onChange={this._handleTaglineText} value={this.props.taglineText}></textarea>
          </div>
        </div>

      <div className="row center-align">
        <div className="lg-blank-divide"></div>
          <h5>Story</h5>
          <div className="input-field col-md-12">
            <textarea id="body" className="materialize-textarea" onChange={this._handleBodyText} value={this.props.articleBodyText}></textarea>
          </div>
        </div>
    </div>
      
      {/* Medium Style */}
      
      <div className="visible-md visible-lg row">
      <div className="col-md-6">
      </div>
      <div className="col-md-3">
      <div className={readyStyle} onClick={this._ready}>{ready}</div>
      </div>
      <div className="col-md-3">
      <div className={submitStyle} onClick={this._submit}>Submit</div>
      </div>
      </div>
      
      {/* Small Style */}
      
      <div className="visible-sm visible-xs row center-align">
        <div className="row">
          <div className="col-sm-12">
            <div className={readyStyle} onClick={this._ready}>{ready}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className={submitStyle} onClick={this._submit}>Submit</div>
          </div>
        </div>
      </div>
      
      
      
      <div className="row">
        <div className="col-md-12">
          <input id="fileUpload" onChange={this._handlePhoto} style={styles.fileUpload} type="file"/>
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
          if (this.width >= 600 & this.height >= 600){
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
      SubmitActions.submitArticle(this.props.articleBodyText, this.props.taglineText, this.props.imgDisplay, this.props.articleCategory);
    }
  },
  _handleCategorySelect: function(event) {
    SubmitActions.handleCategorySelect(event.target.value);
  },
  _ready: function(){
    SubmitActions.toggleReadyToSubmit();
  },
  _openUpload: function(){
    document.getElementById('fileUpload').click()
  }
});

var btn = {
  active: "waves-effect waves-light btn",
  disabled: "waves-effect waves-light btn disabled",
  red: "waves-effect waves-light btn red",
  imgRed: "btn-floating red",
  imgActive: "btn-floating",
}
var styles = {
  fileUpload: {
    opacity:"0"
  }
}

var pulseKeyframes = Radium.keyframes({
  '0%': {transform: 'scale(1,1)'},
  '50%': {transform: 'scale(1.2,1.2)'},
  '100%': {transform: 'scale(1,1)'},
});

var animate = {
  pulse: {
    animation: pulseKeyframes + ' 3s ease 0s infinite',
  },
  none: {
  }
};
  


module.exports = Standard;