//Use dotenv for API Key
require("dotenv").config();

//user input into command line
const selection = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

const keys = require("./keys");
const Spotify = require("node-spotify-api");
const request = require("request");
const spotify = new Spotify(keys.spotify);

//OMDB
OMDB = movie => {
  const ombdKEY = "7b740ff8";

  request(
    `http://www.omdbapi.com/?apikey=${ombdKEY}&t=${movie}&plot=short&tomatoes=true`,
    function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        var body = JSON.parse(body);
        console.log(`Title: ${body.Title}`);
        console.log(`Year of release: ${body.Year}`);
        console.log(`IMBD Rating: ${body.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${body.tomatoRating}`);
        console.log(`Country produced: ${body.Country}`);
        console.log(`Language: ${body.Language}`);
        console.log(`Plot: ${body.Plot}`);
        console.log(`Actors: ${body.Actors}`);
      } else {
        console.log(err);
      }
    }
  );
};

//Spotify
spotifySong = song => {
  spotify.search({type: "track", query: song}, function(err, data) {
    if (!err) {
      let songs = data.tracks.items[0];
        console.log("----------------------------------");
        console.log(`Artist(s): ${songs.artists[0].name}`);
        console.log(`Song Title: ${songs.name}`);
        console.log(`Preview Link: ${songs.preview_url}`);
        console.log(`Album: ${songs.album.name}`);
        console.log("----------------------------------");
      } else {
      console.log(`${song} does not have information in Sportify`)
    }
  });
};

// //Bands in Town
// request(
//   `https://rest.bandsintown.com/artists/Cher/events?app_id=codingbootcamp`,
//   function(err, resp, body) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(JSON.parse(body)[0].venue.name);
//   }
// );

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
    spotifySong("The Sign Ace of Base")
  }
    break;
  case "concert-this":
  case "do-what-it-says":
  default:
  console.log(`${selection} is not valid, please select from: movie-this, spotify-this-song, concert-this or do-what-it-says.`)
}