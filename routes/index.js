var express = require('express');
var router = express.Router();
var http = require('http-request');
var options = {url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png'};
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  http.get(options, './savedImages/foo.png', function (error, result) {
      if (error) {
          console.error(error);
      } else {
          console.log('File downloaded at: ' + result.file);
      }
  });
});

router.get('/upload', function(req, res, next) {
  console.log(req.files.image.originalFilename);
  console.log(req.files.image.path);
  fs.readFile(req.files.image.path, function (err, data){
    var dirname = "./";
    var newPath = dirname + "/uploads/" + req.files.image.originalFilename;
    fs.writeFile(newPath, data, function (err) {
      if(err){
        res.json({'response':"Error"});
      }else {
        res.json({'response':"Saved"});
      }
    });
  });
});

router.get('/uploads/:file', function (req, res) {
  file = req.params.file;
  var dirname = "./";
  var img = fs.readFileSync(dirname + "/uploads/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

module.exports = router;
