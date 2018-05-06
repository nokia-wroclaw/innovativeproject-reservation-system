var DeviceItem = require('./models/device.js');
var ReservationItem = require('./models/reservations.js');
var UserItem = require('./models/users')
var Users = require('./models/users.js')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
const saltRounds = 10;

  //mongoose.connection.db.dropDataBase();

  var seedDevices = [{
    name: "3d printer",
    numLeft: 5,
    description: "This is a 3d printer"
  },{
    name: "Deep learning machine",
    numLeft: 10
  },{
    name: "Rasperry Pi Zero",
    numLeft: 10
  },{
    name: "Arduino MRK1000 WiFi",
    numLeft: 10
  },{
    name: "Oscilloscope",
    numLeft: 10
  }];

  var seedReservations = [{
    startDate: '2018-04-24T10:00:05.000Z',
    endDate: '2018-04-24T12:00:05.000Z',
    numOfPeople: 3,
    option: 'WholeSpace',
    personName: 'Smith'
  },{
    startDate: '2018-04-23T08:00:00.000Z',
    endDate: '2018-04-23T13:00:00.000Z',
    numOfPeople: 10,
    option: 'MakerSpace',
    personName: 'Miller'
  },{
    startDate: '2018-04-25T08:00:00.000Z',
    endDate: '2018-04-25T15:00:00.000Z',
    numOfPeople: 5,
    option: 'OpenSpace',
    personName: 'Adam'
  }];

  const testUser1 = {
      name: 'Test user 1',
      email: 'test1@domain.com',
      password: 'qwerty123',
      isAdmin: false
  };

  const admin = {
      name: 'Admin',
      email: 'admin@domain.com',
      password: 'qwerty123',
      isAdmin: true
  };

  DeviceItem.remove({}, ()=>{
    seedDevices.forEach(function(item){
      new DeviceItem(item).save();
    })
  })

  ReservationItem.remove({}, ()=>{
    seedReservations.forEach(function(item){
      new ReservationItem(item).save();
    })
  })

  UserItem.remove({}, (err)=>{
    if(err) throw err;
    var a = new UserItem()
    var u = new UserItem()
    a.local.name = admin.name;
    a.local.email = admin.email;
    a.local.isAdmin = admin.isAdmin
    u.local.name = testUser1.name;
    u.local.email = testUser1.email;
    u.local.isAdmin = testUser1.isAdmin
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(admin.password, salt, function(err, hash) {
        a.local.password = hash;
        a.save(err=>{if(err) throw err});
      })
    })
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(testUser1.password, salt, function(err, hash) {
        u.local.password = hash;
        u.save(err=>{if(err) throw err});
      })
    })
  })
