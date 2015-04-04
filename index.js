var React = require('react');
var Router = require('react-router');

var App = React.createClass({
    render: function() {
        return (
            <div className="main">
                <h1>Application Component</h1>
            </div>
        );
    }
});

React.render(<App />, document.body);
