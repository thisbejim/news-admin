var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var AppActions = require("./actions/AppActions");
var AppStore = require("./stores/AppStore");
var Submission = require("./components/SubmitComponent")


// Home Controller
var Home = React.createClass({
  render () {
    return ( 
      <h3>Home</h3> 
    );
  }
});

// Home Controller
var SubmissionPage = React.createClass({
  render () {
    return <Submission />;
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={Home}/>
    <Route path="/submit" handler={SubmissionPage}/>
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