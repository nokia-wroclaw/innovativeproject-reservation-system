require('dotenv').config()

module.exports = {
  'JWT_SECRET': process.env.JWT_SECRET,
  'facebookAuth':{
    'clientID': process.env.FB_CLIENT_ID,
    'clientSecret': process.env.FB_CLIENT_SECRET,
    'callbackURL': 'http://localhost:3001/api/auth/facebook/callback',
    'profileFields': ['id', 'email', 'name'],
  },
  'twitterAuth':{
    'consumerKey': process.env.TWITTER_CONSUMER_KEY,
    'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
    'callbackURL': "http://127.0.0.1:3001/api/auth/twitter/callback"
  }
}
