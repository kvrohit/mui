var React = require('react');

var Timer = React.createClass({
  msToTime: function(time) {
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return minutes + ":" + seconds;
  },
  render: function() {
    return (
      <span className={this.props.className}>{this.msToTime(this.props.value)}</span>
    );
  }
});

var Seekbar = React.createClass({
  render: function() {
    return (
      <input type="range" className={this.props.className} value={this.props.pos} min="0" max={this.props.duration} />
    );
  }
});

var AudioPlayer = React.createClass({
  getInitialState: function() {
    return {
      playing: false,
      duration: 0,
      currentPos: 0
    };
  },
  componentDidMount: function() {
    this.player     = new window.Audio();
    this.player.addEventListener('loadedmetadata', function() {
      this.setState({duration: this.player.duration});
    }.bind(this));
  },
  play: function() {
    if (this.state.playing) {
      this.player.pause();
      this.setState({playing: false});
      clearInterval(this.timer);
    } else {
      this.player.play();
      this.setState({playing: true});
      this.timer = setInterval(this.tick, 1000);
    }
  },
  stop: function() {
    clearInterval(this.timer);
    this.setState({playing: false, currentPos: 0, duration: 0});
  },
  tick: function() {
    this.setState({currentPos: this.player.currentTime});
    if (this.state.currentPos === this.state.duration) {
      this.stop();
    }
  },
  render: function() {
    var clazz = "fa fa-play";
    if (this.state.playing) {
      clazz = "fa fa-pause";
    }
    return (
      <div id="mui-audio-player">
        <div className="mui-player-controls">
          <a id="prev-button" href="#"><i className="fa fa-fast-backward"></i></a>
          <a id="play-button" onClick={this.play} href="#"><i className={clazz}></i></a>
          <a id="next-button" href="#"><i className="fa fa-fast-forward"></i></a>
        </div>
        <div className="mui-slider-controls">
          <Timer value={this.state.currentPos} />
          <Seekbar className="mui-slider" pos={this.state.currentPos} duration={this.state.duration} />
          <Timer value={this.state.duration} />
        </div>
      </div>
    );
  }
});

module.exports = AudioPlayer;
