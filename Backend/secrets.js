const username = process.env.DB_USERNAME
const pwd = process.env.DB_PASSWORD

const secrets = {
  'db_uri': 'mongodb://'+username+':'+pwd+'@ds119059.mlab.com:19059/nokia-reservation'
};

module.exports = {
  requestSecret: function(s){
      return secrets[s];
  }
}
