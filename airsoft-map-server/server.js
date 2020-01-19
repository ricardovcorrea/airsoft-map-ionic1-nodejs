// RQEUIRES
var mongoose = require("mongoose");
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var q = require('q');
//

// EXPRESS INIT
var app = express();
app.use(bodyParser.json());
//

// MONGO INIT AND CONNECT
mongoose.connect('mongodb://localhost/test');
var mongoSchema = mongoose.Schema;
var mongoObjectId = mongoose.Types.ObjectId;
//

// ALL ROUTE INTERCEPTOR
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('hit!');
  next();
});
//

// UTILS
function generateMap(propertyName, array) {
  return array.map(function (element) {
    return element[propertyName];
  });
}
//

// MAP TILES
  app.use('/mapTiles', express.static('mapTiles'));
//

// NETWORK
app.get('/testConnection', function (req, res) {
  res.send('Server IP is valid!');
});
//

// GAMES

// MODEL
var GameSchema = new mongoSchema({
  name: String,
  image: String,
  dateTime : String,
  description: String,
  available : Boolean
});
mongoose.model('GameModel', GameSchema);

var GameTeamSchema = new mongoSchema({
  gameId: String,
  teamId: String
});
mongoose.model('GameTeamModel', GameTeamSchema);

var Games = mongoose.model("GameModel");
var GameTeam = mongoose.model("GameTeamModel");

//

// GET ALL GAMES
app.get('/games', function (req, res) {
  Games.find({}, function (err, response) {
    res.send(response);
  });
});
//

// NEW GAME
app.post('/games/new', function (req, res) {
  var newGame = new Games(req.body);
  newGame.save({}, function (err, response) {
    Games.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//

// REMOVE GAME
app.post('/games/remove', function (req, res, next) {
  Games.findByIdAndRemove(new mongoObjectId(req.body._id), function (err, response) {
    Games.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//

// SET TEAM TO GAME
app.post('/games/setTeamToGame', function (req, res) {
  var response = [];
  setTeamToGame(req.body.gameId, req.body.teamId).then(function (teamsFromGame) {
    response = teamsFromGame;
  })
    .finally(function () {
      res.send(response);
    });
});
//

// GET ALL TEAMS FROM GAME
app.post('/games/teams', function (req, res) {
  var response = [];
  getTeamsFromGame(req.body._id).then(function (teamsFromGame) {
    response = teamsFromGame;
  })
    .finally(function () {
      res.send(response);
    });
});

// PRIVATES
function setTeamToGame(_gameId, _teamId) {
  var setTeamToGame = q.defer();
  var teamsInGame = [];

  async.series([
    function (callback) {
      var newGameTeam = new GameTeam({gameId: _gameId, teamId: _teamId});
      newGameTeam.save({}, function (err, savedGameTeam) {
        callback();
      });
    },
    function (callback) {
      getTeamsFromGame(_gameId).then(function (teamsFromGame) {
        teamsInGame = teamsFromGame;
      })
        .finally(function () {
          callback();
        });
    }
  ], function () {
    setTeamToGame.resolve(teamsInGame);
  });

  return setTeamToGame.promise;
}

function getTeamsFromGame(gameId) {
  var getTeamsFromGame = q.defer();

  var gameTeams = [];

  async.series([
    function (callback) {
      GameTeam.find({ 'gameId': gameId }, function (err, foundGameTeams) {
        gameTeams = foundGameTeams;
        callback();
      });
    },
    function (callback) {
      Teams.find({ _id: { $in: generateMap('teamId', gameTeams) } }, function (err, foundTeams) {
        if (foundTeams && foundTeams.length > 0)
          getTeamsFromGame.resolve(foundTeams);
      });
    }
  ]);

  return getTeamsFromGame.promise;
}
//
//

// TEAMS

//MODEL
var TeamShema = new mongoSchema({
  name: String
});
mongoose.model('TeamModel', TeamShema);
var Teams = mongoose.model("TeamModel");
//

// GET ALL TEAMS
app.get('/teams', function (req, res) {
  Teams.find({}, function (err, response) {
    res.send(response);
  });
});
//

// NEW TEAM
app.post('/teams/new', function (req, res) {
  var newTeam = new Teams(req.body);
  newTeam.save({}, function (err, response) {
    Teams.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//

// REMOVE GAME
app.post('/teams/remove', function (req, res, next) {
  Teams.findByIdAndRemove(new mongoObjectId(req.body._id), function (err, response) {
    Teams.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//

// PRIVATES
//

//

// PLAYERS
//MODEL
var PlayerSchema = new mongoSchema({
  name: String,
  isAlive: Boolean,
  latitude: String,
  longitude: String
});
mongoose.model('PlayerModel', PlayerSchema);
var Players = mongoose.model("PlayerModel");
//

// GET ALL PLAYERS
app.get('/players', function (req, res) {
  Players.find({}, function (err, response) {
    res.send(response);
  });
});
//

// NEW GAME
app.post('/players/new', function (req, res) {
  var newPlayer = new Players(req.body);
  newPlayer.save({}, function (err, response) {
    Players.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//

// REMOVE GAME
app.post('/players/remove', function (req, res, next) {
  Players.findByIdAndRemove(new mongoObjectId(req.body._id), function (err, response) {
    Players.find({}, function (err, response) {
      res.send(response);
    });
  });
});
//
//

//RUN SERVER
app.listen(9000);
//