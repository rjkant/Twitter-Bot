require('dotenv').config()
const Twitter = require('twitter');
const express = require('express');
const path=require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
 
 
var client = new Twitter({
  consumer_key: process.env.Twitter_consumer_key,
  consumer_secret: process.env.Twitter_consumer_secret,
  access_token_key:process.env.Twitter_access_token_key,
  access_token_secret:process.env.Twitter_access_token_secret
});


var params = {screen_name: 'rj_kant'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
 


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'./index.html'));
});

app.post('/twitter',(req,res)=>{
    const tweet=req.body.tweet;
  var params={
    status:tweet
  };
  client.post('statuses/update', params,  function(error, tweet, response) {
    if(error)
    {
      res.status(500).json({
        message:'We are not able to tweet this for you'
      })
      return;
    }
    res.status(200).json({
      message:'tweet successfully tweeted'
    })
  });
});

app.listen(3000,console.log('server is running in port',3000));

