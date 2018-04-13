var express = require('express');
var router = express.Router();

var Image = require('../models/image');

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
   return filename;
 },
}))

app.post('/api/photo',function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = 'image/png';
 newItem.save();
});
