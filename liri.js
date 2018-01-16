
// Grab all of the modules that are needed to run the appliction.
require("dotenv").config(); // Code to read and set any environment variables with the dotenv package.
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const liriArg = process.argv[2];



// Use switch statement to determine which action to take based on the action.
switch(liriArg) {
  case "my-tweets":
    grabTweets();
    break;
  case "spotify-this-song":
    grabSong();
    break;
}



// Function to request tweets from Twitter.

function grabTweets() {
  let client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_tokey_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });

  let params = {screen_name: "CoodyMac"}

  client.get('statuses/user_timeline/', params, (error, tweets, response) => {
    if(error) {
      console.log(error);
    }

    console.log(tweets)
  })
}

function grabSong() {
  let song = process.argv[3];

  // Check to see if a song was passed with the command and set the song variable if it was not.
  if (!song) {
    song = "I Want it Like This";
  }

  let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify.search({type: "track", query: song })
    .then((data) => {
      let track = data.tracks.items[0];
      console.log(track)
      let trackInfo = `
        Artist: ${track.artists[0].name}
        Song Name: ${track.name}
        Preview: ${track.external_urls.spotify}
      `;
      console.log(trackInfo)
    })
    .catch((err) => {
      console.log(err);
    })


 }
