require("dotenv").config();
const axios = require('axios')
const Spotify = require('node-spotify-api');
const fs = require("fs");   //to read random.txt
const keys = require("./keys.js");
const moment = require('moment');
moment().format();

let spotify = new Spotify(keys.spotify);
let action = ""
let info = ""

//get and format the arguments
// if the first argument is 'do what it says' it must take the arguments from random.txt
if (process.argv[2] === "do-what-it-says") {
    const Data = fs.readFileSync('random.txt', 
        { encoding: 'utf8', flag: 'r' });
     var output = Data.split(",");
         action = output[0]
         info = output[1]   
         console.log(action)
}
else {
    action = process.argv[2];
    info = process.argv[3];
};


//put the string input in format for api call
let infoForCall = info  // if it is one word the next if will not be executed
if ((info.indexOf(" ")) !== -1) {
    infoForCall = info.replace(/ /gi, "+");
};

switch (action) {
case "concert-this":
  concertThis(infoForCall);
  break;

    case "spotify-this-song":
        if (infoForCall === "") {
            infoForCall = "the sign"   //default if no parameter inputted
        }
        spotifyThisSong(infoForCall);
    break;

    case "movie-this":
        if (infoForCall === "") {
            infoForCall = "mr. nobody"    //default if no parameter inputted
        }
        movieThis(infoForCall);
    break;

    default:
        console.log(action + " is not a valid command. Try again.")
    break;
    

};

function concertThis(artist) {
    let apiUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // Then run a request with axios to the OMDB API with the movie specified
axios.get(apiUrl).then(
    function (response) {
        console.log("Events for " + info)
        console.log("----------------------------------------------")
        for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            
            console.log("Venue Name : " + element.venue.name);
            console.log("Venue Location : " + element.venue.location);
            let eventDate = moment(element.datetime)
            console.log("The event date is " + eventDate.format("MM/DD/YYYY"))
            console.log("----------------------------------------------")

        }
    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Track Name: " + info)
        for (let i = 0; i < data.tracks.items.length; i++) {
            const element = data.tracks.items[i];
            for (let j = 0; j < element.artists.length; j++) {
                console.log("_______________________________________________")
                console.log("Artist(s):")
                console.log(element.artists[j].name);
                console.log("Album name: " + element.album.name)
                console.log("Preview URL: " + data.tracks.items[j].uri)
            }
        }
        // console.log(data.tracks.items[0]); 
    });
};

function movieThis(movie) {
        let apiUrl = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy"

    // Then run a request with axios to the OMDB API with the movie specified
axios.get(apiUrl).then(
    function (response) {
        console.log("----------------------------------------------")
        console.log(response.data.Title)
        console.log("Year released: " + response.data.Year)
        for (let i = 0; i < response.data.Ratings.length; i++) {
            const element = response.data.Ratings[i];
            if (element.Source === "Internet Movie Database" || element.Source === "Rotten Tomatoes") {
                console.log(element.Source + " rating: " + element.Value)
            };
            
        }
        console.log("Produced in: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};
