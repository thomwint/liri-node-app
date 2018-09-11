require("dotenv").config();

const keys = require("./keys");
const Spotify = require("node-spotify-api");
const request = require("request");
const spotify = new Spotify(keys.spotify);

//Spotify
spotify.search(
  { type: "track", query: "All the Small Things", limit: 1 },
  function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data.tracks.items[0].artists[0].name);
  }
);

//OMDB
const ombdKEY = "7b740ff8";

request(`http://www.omdbapi.com/?apikey=${ombdKEY}&t=Frozen`, function(
  err,
  resp,
  body
) {
  if (err) {
    console.log(err);
  }
  console.log(body);
});

//Bands in Town
request(
  `https://rest.bandsintown.com/artists/Cher/events?app_id=codingbootcamp`,
  function(err, resp, body) {
    if (err) {
      console.log(err);
    }
    console.log(JSON.parse(body)[0].venue.name);
  }
);
