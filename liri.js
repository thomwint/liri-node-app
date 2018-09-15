//Use dotenv for API Key
require("dotenv").config();

//user input into command line
const selection = process.argv[2];
const userInput = process.argv.slice(3).join(" ");
const moment = require("moment");
const fs = require("fs")
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const request = require("request");
const spotify = new Spotify(keys.spotify);

//OMDB
const OMDB = movie => {
  const ombdKEY = "7b740ff8";

  request(
    `https://www.omdbapi.com/?apikey=${ombdKEY}&t=${movie}&plot=short&tomatoes=true`,
    function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        var body = JSON.parse(body);
        console.log("----------------------------------");
        console.log(`Title: ${body.Title}`);
        console.log(`Year of release: ${body.Year}`);
        console.log(`IMBD Rating: ${body.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${body.tomatoRating}`);
        console.log(`Country produced: ${body.Country}`);
        console.log(`Language: ${body.Language}`);
        console.log(`Plot: ${body.Plot}`);
        console.log(`Actors: ${body.Actors}`);
        console.log("----------------------------------");
      } else {
        console.log(err);
      }
    }
  );
};

//Spotify
spotifySong = song => {
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (!err) {
      let songs = data.tracks.items[0];
      console.log("----------------------------------");
      console.log(`Artist(s): ${songs.artists[0].name}`);
      console.log(`Song Title: ${songs.name}`);
      console.log(`Preview Link: ${songs.preview_url}`);
      console.log(`Album: ${songs.album.name}`);
      console.log("----------------------------------");
    } else {
      console.log(`${song} does not have information in Sportify`);
    }
  });
};

//Bands in Town
const bandsInTown = concert => {
  request(
    `https://rest.bandsintown.com/artists/${concert}/events?app_id=codingbootcamp`,
    function(err, resp, body) {
      if (err) {
        console.log(err);
      }
      if (!err && resp.statusCode === 200) {
        for (let i = 0; i < body.length; i++) {
          var data = JSON.parse(body)[i];
          if (!data) {
            console.log("End of Information to display.");
            process.exit(1);
          } else {
            console.log(
              "-----------------------------------------------------"
            );
            console.log(data.venue.name);
            console.log(data.venue.city + ", " + data.venue.country);
            console.log(moment(data.datetime).format("L"));
            console.log(
              "-----------------------------------------------------"
            );
          }
        }
      }
    }
  );
};

//Do What it says
const doWhatItSays = () => {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) { 
      console.log(err);
    }

    var arg = data.split(',');
    switch(arg[0]) {
      case "spotify-this-song":
        spotifySong(arg[1]);
        break;
    }
  });
};

// switch statement for command line
switch (selection) {
  case "movie-this":
    if (userInput) {
      OMDB(userInput);
    } else {
      OMDB("Mr. Nobody");
    }
    break;
  case "spotify-this-song":
    if (userInput) {
      spotifySong(userInput);
    } else {
      spotifySong("The Sign Ace of Base");
    }
    break;
  case "concert-this":
    bandsInTown(userInput);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log(
      `${selection} is not valid, please select from: movie-this, spotify-this-song, concert-this or do-what-it-says.`
    );
}
