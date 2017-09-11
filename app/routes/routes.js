var request = require('request');

var parseScores = function(scores) {
  var attachmentArray = [];

  Object.keys(scores.scores[0]).forEach(function(key){

    var awayTeamArray = scores.scores[0][key][0].awayTeam.split('\n')
    var homeTeamArray = scores.scores[0][key][0].homeTeam.split('\n')

    var awayTeam = {
      "title": parseName(awayTeamArray[0]),
      "value": awayTeamArray[2],
      "short": true,
    };

    var homeTeam = {
      "title": parseName(homeTeamArray[0]),
      "value": homeTeamArray[2],
      "short": true,
    };

    var attachment = {
      "fallback": "Plain text summary, fuck you.",
      "color": "#000000",
      "fields": [ awayTeam, homeTeam ],
    };

    attachmentArray.push(attachment)

  })

  var message = {
    "response_type": 'in_channel',
    "text": 'Scores for <' + scores.week_url + '|Week ' + scores.week + '>:',
    "attachments": attachmentArray
  }

  return message;
};

var parseName = function(name) {

  var userNames = {
    Midget: 'Ten Foot Midget',
    Proper: 'Proper Football',
    Towelie: 'Terrible Towelie',
    Tantrums: 'The Tantrums',
    BOOYAHH: 'BOOYAAHH',
    BuddyDangr: 'Buddy Danger',
    HiDecibels: 'High Decibels',
    Blitzed: 'Blitzed',
    AOL4Life: 'AOL 4 Life',
    Bapes: 'Bapes',
    Coheeds: 'Connecticut Coheeds'
  }

  if (name === '4th9in') {
    return '4th and 9 inches';
  } else {
    return userNames[name];
  }

}

// frontend routes =========================================================
module.exports = function(app) {

  app.get('/', function(req, res) {
    console.log("root")
  });

  // post from Slack command
  app.post('/scores', function(req, res) {
    console.log("Command received")

    var scoreMessage;

    request({
      uri: 'https://www.parsehub.com/api/v2/projects/tJTvzoTq6MRU/last_ready_run/data',
      method: 'GET',
      gzip: true,
      qs: {
        api_key: "twj65AfT0gyk",
        format: "json"
      }
    }, function(err, resp, body) {
      scoreMessage = parseScores(JSON.parse(body))
    });

    //check request token
    if(req.body.token == process.env.SLACK_COMMAND_TOKEN){

      res.send(scoreMessage)

    }
    else{
      console.log("Incorrect Slack Command token: " + req.body.token)
      res.sendStatus(500)
    }

  });

}
