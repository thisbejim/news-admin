var React = require('react');
var Radium = require('radium');
var Router = require('react-router');
var LoginActions = require('../actions/LoginActions');

var LoginForm = React.createClass({
	mixins: [Router.Navigation],
	propTypes: {
		email: React.PropTypes.string,
		password: React.PropTypes.string,
	},
	render () {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="lg-blank-divide"></div>
						<div className="col-md-6 col-md-offset-3" style={style.component}>

							<div className="row center-align">
								<div className="col-md-12">
									<h5 style={style.titleFont}>Sign in</h5>
									<hr className="remove-bottom-margin"/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12">
									<span style={style.font}>Email</span>
									<div className="input-field remove-margin">
										<input id="username" type="text" onChange={this._handleEmail} value={this.props.email} />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12">
									<span style={style.font}>Password</span>
									<div className="input-field remove-margin">
										<input id="password" type="text" onChange={this._handlePassword} value={this.props.password} />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-12 right-align">
									<div className="waves-effect waves-light btn" onClick={this._handleLogin}>Login</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	},
	_handleEmail: function(event) {
		LoginActions.handleEmail(event.target.value);
	},
	_handlePassword: function(event) {
		LoginActions.handlePassword(event.target.value);
	},
	_handleLogin: function() {
		LoginActions.login(this.props.email, this.props.password);
	}
});

var style = {
	component: {
		backgroundColor: "#fff",
		borderRadius: "2px",
		boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)",
	},
	font: {
		fontSize: "12px",
	},
	titleFont: {
		fontWeight: "200",
	},
}

module.exports = LoginForm;