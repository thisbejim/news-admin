var React = require('react');
var Radium = require('radium');
var LoginStore =  require('../stores/LoginStore');
var Server = require('../actions/ServerActions');

// Components
var LoginForm = require('../LoginComponents/LoginForm.js');
var LoginRegisterSelect = require('../LoginComponents/LoginRegisterSelect.js');

function getState(){
  return LoginStore.getState();
}

var LoginComponent = React.createClass({
  getInitialState: function(){
    return getState();
  },
  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },
  render () {
    return (
    <div className="container">
      <div className="lg-blank-divide"></div>
      <LoginRegisterSelect selected={this.state.LogRegSelect} username={this.state.username} password={this.state.password}/>
    </div>
    );
  },
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = LoginComponent;
