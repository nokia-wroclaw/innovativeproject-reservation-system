const secrets = {
  'db_uri': 'mongodb://root:qwerty@ds119059.mlab.com:19059/nokia-reservation'
};

module.exports = {
  requestSecret: function(s){
      return secrets[s];
  }
}
