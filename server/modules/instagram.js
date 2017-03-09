'use strict';

const isProduction = process.env.APP_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

const instagram = function() {
  const request = require('request');
  const fullUrl = (req) => 'http://' + req.hostname + ':' + (process.env.PORT || 3000);
  const shortUrl = (req) => 'https://' + req.hostname;
  const clientId = process.env.CLIENT_ID;
  const secret = process.env.SECRET;
  let mediaCount = 0;
  return {
    authenticate: function (req, res) {
      if (req.query.error) {
        res.redirect('/login?error=1');
      }
      if (req.query.code) {
        var options = {
          url: 'https://api.instagram.com/oauth/access_token',
          method: 'POST',
          form: {
            'client_id': clientId,
            'client_secret': secret,
            'grant_type': 'authorization_code',
            'redirect_uri': (isProduction ? shortUrl(req) : fullUrl(req)) + '/api/authenticate',
            'code': req.query.code
          }
        };
        console.log('Options:', options);
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log('Logged in successfully. Received token: ' + JSON.parse(body).access_token);
            res.redirect('/manager?token=' + JSON.parse(body).access_token);
          } else {
            console.error('Response:', response.statusCode, 'Error:', error, 'Body:', body);
            res.redirect('/login?error=2');
          }
        });
      }
    },
    userInfo: function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      if (req.query.error) {
        res.status(500).send('An error occured: ' + req.query.error_reason + ', ' + req.query.error_description);
      }
      if (req.query.access_token) {
        const options = {
          url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.query.access_token,
          method: 'GET'
        }
        request(options, function (error, response, body) {
          if (!error) {
            mediaCount = JSON.parse(body).data.counts.media;
            res.send(body);
          } else {
            res.status(500).send(error);
          }
        });
      }
    },
    allMedia: function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      if (req.query.error) {
        res.status(500).send('An error occured: ' + req.query.error_reason + ', ' + req.query.error_description);
      }
      if (req.query.access_token) {
        const options = {
          url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' +
            req.query.access_token + '&count=' + mediaCount,
          method: 'GET'
        }
        request(options, function (error, response, body) {
          if (!error) {
            res.send(body);
          } else {
            res.status(500).send(error);
          }
        });
      }
    }
  }
};

module.exports = instagram();
