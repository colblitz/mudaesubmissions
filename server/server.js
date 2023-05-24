require("dotenv").config();

const express  = require("express");
const path     = require("path");
const session  = require("express-session");
const cors     = require("cors");
const passport = require("passport");
const mongoose = require("mongoose").set('debug', true);
const fs       = require("fs");
const http     = require("http");
// const https    = require("https");

const DiscordStrategy = require("passport-discord").Strategy;

// Passport configuration
passport.use(new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: "/auth/discord/callback",
    scope: ["identify", "guilds.members.read"],
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("passport discord strategy - got stuff");
    console.log(accessToken, refreshToken, profile);
    done(null, { profile });
  }
));

passport.serializeUser((user, done) => { done(null, user); });
// TODO: do lookup of User here? https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser((user, done) => { done(null, user); });

// Set up Express
const app = express();

// log requests
app.use(function (req, res, next) {
  console.log("Request: " + req.url);
  next();
});
app.use(express.static(path.join(__dirname, "../client/build")));

// set up sessions
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(passport.session());
app.use(passport.initialize());
app.use(express.json());

// set up routes
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Mongo Configuration
mongoose.connect(process.env.DB_URI);
console.log("DB Connected at: " + process.env.DB_URI);

// start server
app.set("port", process.env.PORT || 5000);

// var options = {
//   key  : fs.readFileSync(CONFIG.keyPath),
//   cert : fs.readFileSync(CONFIG.certPath),
//   ca   : fs.readFileSync(CONFIG.chainPath),
// };

// https.createServer(options, app).listen(app.get('port'), function() {
//   console.log('--------------------------------------------------------');
//   console.log('Express server listening on https port ' + app.get('port'));
//   console.log('--------------------------------------------------------');
// });

http.createServer(app).listen(app.get("port"), () => {
  console.log("Express http server running on port " + app.get("port"));
});