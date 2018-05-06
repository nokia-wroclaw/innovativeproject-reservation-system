module.exports = {
  'JWT_SECRET': 'reservation-system',
  'facebookAuth':{
    'clientID': '422510151528330',
    'clientSecret': '8f36ef0436dbe3bca9283be7d87aabe7',
    'callbackURL': 'http://localhost:3001/api/auth/facebook/callback',
    'profileFields': ['id', 'email', 'name'],
  },
  'twitterAuth':{
    'consumerKey': 'XpZxEmGwyJ8gTibCh26M1lDPb',
    'consumerSecret': 'MskGzI6LDWRWsKXtCPXuipiyXQEYFE8DNeTVgjqqbSfWz21sSb',
    'callbackURL': "http://127.0.0.1:3001/api/auth/twitter/callback"
  }
}
