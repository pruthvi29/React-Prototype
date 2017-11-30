var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serverport = 3002;
//Follwing modules required for SAML
var passport = require("passport");
const SamlStrategy = require('passport-saml').Strategy;
var session = require('express-session');

// Node will look for any undeclared resource path in public folder first then C:/tempUser location to find the static content/resource
app.use(bodyParser.urlencoded());
//following needed for SAML
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

var redirectLogin = function (req, res, next) {
   if (!req.isAuthenticated()) {
       res.redirect("/login");
   }
   next();
}

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new SamlStrategy({
    entryPoint: 'https://identity.cloud.wso2.com/identity/t/capgeminiameric',
    issuer: 'JMF',
    path: '/myapp/saml',
  },
  function(profile, done) {
  	console.log('Profile:', profile)
    var myUser = {
      email : profile.nameID
    }
    done(null, myUser);
  }, function(err) {
    console.log(err)
  }));
    
app.get('/login',
  passport.authenticate('saml', {
    successRedirect: "/",
    failureRedirect: "/login",
  }));
    
    
app.post('/myapp/saml', passport.authenticate('saml', {
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {
  	res.redirect("/");
  }
);

app.use('/static', express.static(__dirname + '/build/static'));

app.use('/service-worker.js', express.static(__dirname + '/build/service-worker.js'));

//app.use('/index.html',  express.static(__dirname + '/build/index.html'))

app.get('/', redirectLogin, function(req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(serverport);