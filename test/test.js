var assert = require('assert');
var expect = require('chai').expect;
var request = require('request');

describe('Instagram login', function() {
  let code = '';
  it('can get the code', function() {
    const igClientId = '3df7472a20ef4925aaa42ac581d25524';
    const igPostback = encodeURI('https://social-manager.herokuapp.com/ig');
    request
    .get('https://www.instagram.com/oauth/authorize/?client_id=' + igClientId +
      '&redirect_uri=' + igPostback + '&response_type=code')
    .on('response', function(response) {
      console.log('res', response);
      expect(response.statusCode).to.equal('200');
      expect(response.error).to.be.undefined;
      code = response.query.code;
      expect(code).to.not.be.undefined;
    });
  });
  it('successfully log in', function(){
    var options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'POST',
      form: {
        client_id: '3df7472a20ef4925aaa42ac581d25524',
        client_secret: '8dfbb61a4a2b4e7090bc497a8ef7f3ff',
        grant_type: 'authorization_code',
        redirect_uri: 'https://social-manager.herokuapp.com/ig',
        code
      }
    };
    request(options, function (error, response, body) {
      expect(response.statusCode).to.equal('200');
      expect(body.user.username).to.not.be.undefined;
    });
  })
});

describe('Login module', function() {
  it('exists', function() {
    const module = require('../app/modules/login/login.js');
    expect(module).to.not.be.undefined;
  });
});

describe('Manager module', function() {
  it('exists', function() {
    const module = require('../app/modules/manager/manager.js');
    expect(module).to.not.be.undefined;
  });
});

describe('navBar module', function() {
  it('exists', function() {
    const module = require('../app/modules/navBar/navBar.js');
    expect(module).to.not.be.undefined;
  });
});
