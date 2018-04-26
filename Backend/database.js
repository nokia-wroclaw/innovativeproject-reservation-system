var DeviceItem = require('./models/device.js');
var ReservationItem = require('./models/reservations.js');
var Users = require('./models/users.js')
var bcrypt = require('bcrypt')
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
    option: 'Lab',
    personName: 'Adam'
  }];

  var seedUsers = [
    {
      email: 'ex@gmail.com',
      password: 'qwerty123'
    },
    {
      email: 'asd@gmail.com',
      password: 'qwerty123'
    }
  ];

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

  Users.remove({}, ()=>{
    seedUsers.forEach(function(item){
      bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(item.password, salt, function(err, hash) {
         item.password = hash;
          new Users(item).save()
        })
      })
    })
  })
