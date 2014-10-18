/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var PlayerActions = require('../actions/PlayerActions');

var Player = React.createClass({

  playerDivID: function (){
    return "youtubePlayerContainer_" + this.props.video.id;
  },

  componentDidMount: function () {
    var video = this.props.video;

    YT.ready(function(){

      var player = new YT.Player(this.playerDivID(), {
        height: '390', width: '640',
        autoplay: 1, fs: 0,
        videoId: video.videoId
      });

      PlayerActions.setPlayer(video.id, player);

      this.timer = setInterval(function(){
        if(player.getCurrentTime) 
          PlayerActions.setTimestamp(video.id, player.getCurrentTime());
      }.bind(this), 100);

    }.bind(this));
  },

  componentWillUnmount: function() {
    if(this.timer) clearInterval(this.timer);
  },

  render: function() {
    return (
      <div className="player-container" id={this.playerDivID()}></div>
    );
  }
});

module.exports = Player;
