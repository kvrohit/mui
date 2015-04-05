var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;
var RouteHandler  = Router.RouteHandler;

var About         = require('./src/jsx/about.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="main">
        <h1>Hello World</h1>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <Route name="about" handler={About} path="/about" />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
