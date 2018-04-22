var DeviceItem = require('./models/device.js');
var ReservationItem = require('./models/reservations.js');


  //mongoose.connection.db.dropDataBase();

  var seedDevices = [{
    name: "3d printer",
    numLeft: 5
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
    startDate: '2018-04-15T10:00:05.000Z',
    endDate: '2018-04-15T12:00:05.000Z',
    numOfPeople: 3,
    option: 'WholeSpace',
    personName: 'Smith'
  },{
    startDate: '2018-04-16T08:00:00.000Z',
    endDate: '2018-04-16T13:00:00.000Z',
    numOfPeople: 10,
    option: 'MakerSpace',
    personName: 'Miller'
  }];

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
