# [node-spotify-api](https://lamontblack1.github.io/node-spotify-api/)
My first command line node app that takes in parameters and gives you back data.
The app is solving the problem of using a terminal to make and view api calls. NPM libraries are used to simplify this process. This was also an opportunity to learn how to protect private or proprietary information from becoming available to the public at large accessing my project.
My role in this project is creator. I was provided help with DotEnv from the instructions for the project.

# Why the project is useful
For the user, this app puts a large variety of information about current popular entertainment at the user's fingertips.

For the beginning coder, this project demonstrates use of various npm libraries and api calls.

* [DotEnv](https://www.npmjs.com/package/dotenv) package is used to set environment variables to the global `process.env` object in node. We are gitignoring this file which stores api keys, so it won't be pushed to github &mdash; keeping our API key information private. Like this: 
        inside the keys.js file is

        ```js
        console.log('this is loaded');

        exports.spotify = {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
        };
        ```
        Inside my local .env file is:

        ```js
        # Spotify API keys

        SPOTIFY_ID=your-spotify-id
        SPOTIFY_SECRET=your-spotify-secret

        ```

* [Axios](https://www.npmjs.com/package/axios) npm library is used to make api calls
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) is used to make calls to the Spotify api
* [Moment](https://www.npmjs.com/package/moment) npm library is used to format dates

# Overview of how this project is organized
This project simply takes 2 parameters in the command line. 
A Switch/Case is used to decide what to do with the second parameter based on the 'command' in the first parameter. The exception is the use of readFileSync() first to economize the use of the first parameter by formatting it correctly in the beginning. Then functions are called for each 'command.'

# How users can get started with this project
This is a command line app that is run in Node. It can be run entering the following in the terminal:

node liri.js param1 param2

- param1: (required: "concert-this"/"spotify-this-song"/"movie-this"/ or "do-what-it-says")
- param2: (song name/artist/movie title)

# Screen Shots of the Working App

### Here is an example of "concert-this" command:
![Image of concertThis](https://lamontblack1.github.io/node-spotify-api/images/concertThis.jpg)

### Here is an example of "spotify-this-song" command:
![Image of spotifyThisSong](https://lamontblack1.github.io/node-spotify-api/images/spotifyThisSong.jpg)

### Here is an example of "movie-this" command:
![Image of movie-this](https://lamontblack1.github.io/node-spotify-api/images/movieThis.jpg)

### Here is an example of "do-what-it-says" command. This command reads from the 'random.txt', which will include a command and the song/movie/artist parameter:
![Image of doWhatItSays](https://lamontblack1.github.io/node-spotify-api/images/doWhatItSays.jpg)