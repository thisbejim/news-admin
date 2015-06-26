var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Submission = require("./SubmitComponents/SubmitComponent");
var Review = require("./ReviewComponents/ReviewComponent");
var Login = require("./LoginComponents/LoginComponent");

// Login Controller
var Login = React.createClass({
	render () {
		return (
			<Login />
		);
	}
});

// Submission Controller
var SubmissionPage = React.createClass({
	render () {
		return (
			<Submission />
		);
	}
});

// Review Controller
var ReviewPage = React.createClass({
	render () {
		return (
			<Review />
		);
	}
});

var routes = (
	<Route handler={App}>
		<Route path="/" handler={Login}/>
		<Route path="/submit" handler={SubmissionPage}/>
		<Route path="/review" handler={ReviewPage}/>
	</Route>
);

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render () {
		return (
			<div>
				<h1>App</h1>
				<RouteHandler/>
			</div>
		)
	}
});

Router.run(routes, Router.HashLocation, (Root) => {
	React.render(<Root/>, document.getElementById('content'));
});