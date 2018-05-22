var DeviceItem = require('./models/device.js');
var ReservationItem = require('./models/reservations.js');
var UserItem = require('./models/users')
var Users = require('./models/users.js')
var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
const saltRounds = 10;

  //mongoose.connection.db.dropDataBase();

  var seedDevices = [{
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

  var printer3d = new DeviceItem({
    name: "3d printer",
    numLeft: 5,
    description: "This is a 3d printer"
  })

  printer3d.save(err=>{
    if(err) return res.send(err)
  })

  DeviceItem.remove({}, ()=>{
    seedDevices.forEach(function(item){
      new DeviceItem(item).save();
    })
  })

  var seedReservations = [{
    startDate: '2018-05-09T10:00:05.000Z',
    endDate: '2018-05-09T12:00:05.000Z',
    numOfPeople: 3,
    option: 'WholeSpace',
    personName: 'Smith'
  },{
    startDate: '2018-05-10T08:00:00.000Z',
    endDate: '2018-05-10T13:00:00.000Z',
    numOfPeople: 10,
    option: 'MakerSpace',
    personName: 'Miller',
    deviceList: [{
      quantity: 4,
      usedDevices: printer3d._id
    }]
  },{
    startDate: '2018-05-10T08:00:00.000Z',
    endDate: '2018-05-10T15:00:00.000Z',
    numOfPeople: 5,
    option: 'CreativeSpace',
    personName: 'Adam'
  }];

  const testUser1 = {
    local: {
      name: 'Test user 1',
      email: 'test1@domain.com',
      password: 'qwerty123',
      phonenumber: "123123123",
      organization: "None",
      origin: "individual",
      isAdmin: false,
      confirmed: true
    }
  };

  const admin = {
    local: {
      name: 'Admin',
      phonenumber: "000000000",
      organization: "Nokia Garage",
      origin: "company",
      confirmed: true,
      email: 'admin@domain.com',
      password: 'qwerty123',
      isAdmin: true
    }
  };

  ReservationItem.remove({}, ()=>{
    seedReservations.forEach(function(item){
      new ReservationItem(item).save();
    })
  })

  UserItem.remove({}, (err)=>{
    if(err) throw err;
    var a = new UserItem(admin)
    var u = new UserItem(testUser1)
    //a = admin;
    //u = testUser1;
    /*
    a.local.name = admin.name;

    a.local.email = admin.email;
    a.local.isAdmin = admin.isAdmin
    a.local.confirmed = admin.confirmed;
    a.local.password = admin.password;
    u.local.name = testUser1.name;
    u.local.email = testUser1.email;
    u.local.password = testUser1.password;
    u.local.isAdmin = testUser1.isAdmin
    u.local.confirmed = testUser1.confirmed*/
    a.save(err=>{if(err) throw err});
    u.save(err=>{if(err) throw err});
  })
