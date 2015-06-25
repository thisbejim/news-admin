var React = require('react');
var Radium = require('radium');
var Router = require('react-router');
var LoginActions = require('../actions/LoginActions');

var LoginForm = require('./LoginForm');
var RegisterForm = require('./RegisterForm');

var LoginRegisterSelect = React.createClass({
  mixins : [Router.Navigation],
  propTypes: {
      username: React.PropTypes.string,
      password: React.PropTypes.string,
      selected: React.PropTypes.string
  },
  render () {
    var selected = this.props.selected == "Login" ? <LoginForm username={this.props.username} password={this.props.password}/> : <RegisterForm username={this.props.username} password={this.props.password}/>;
    var selectBtnText = this.props.selected == "Login" ? "New to news thing? Sign up!" : "Already have an account? Sign in.";
    var loginBtn = btn.active;
    
    console.log(this.props.selected);
    return (
    <div className="row">
      <div className="col-md-12">
    
        <div className="row">
          <div className="col-md-12">
            {selected}
        </div>
      </div>
      
      <div className="row center-align">
          <div className="col-md-12">
            <div className={loginBtn} onClick={this._handleLoginSelect}>{selectBtnText}</div>
        </div>
      </div>
      
      </div>
    </div>
    
    );
  },
  _handleLoginSelect: function(){
    LoginActions.handleLoginSelect();
  },
});

var btn = {
  active: "waves-effect waves-light btn-small btn-margin",
  disabled: "waves-effect waves-light btn-small disabled btn-margin",
  red: "waves-effect waves-light btn red"
}

module.exports = LoginRegisterSelect;