var Request   = require('request');

// frontend routes =========================================================
module.exports = function(app) {

  app.get('/', function(req, res) {
    console.log("root")
  });

  // post from Slack command
  app.post('/scores', function(req, res) {
    console.log("Command received")
    console.log(req.body)

    //check request token
    if(req.body.token == process.env.SLACK_COMMAND_TOKEN){
      var team_name = req.body.team_domain
      var team_id = req.body.team_id
      var user_name = req.body.user_name
      var user_id = req.body.user_id

      var text = req.body.text
      console.log(text)
      var blocks = text.split(" ")


    }
    else{
      console.log("Incorrect Slack Command token: " + req.body.token)
      res.sendStatus(500)
    }

  //   { token: 'lF0cLK0GTSr5kTjfNXyLhfvy',
  // team_id: 'T0FEV82UE',
  // team_domain: 'articial-client',
  // channel_id: 'C0FEPJ7FW',
  // channel_name: 'general',
  // user_id: 'U0FESCLRH',
  // user_name: 'aurelie',
  // command: '/intro',
  // text: 'test',
  // response_url: 'https://hooks.slack.com/commands/T0FEV82UE/19407880118/Po47PwtwjSKR4hSlXSORn5fR' }
  });

}
