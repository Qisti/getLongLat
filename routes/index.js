var express = require('express');
var router = express.Router();
var NodeGeocoder = require('node-geocoder');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getLocation(address, result) {
  var latitude, longitude;
// ---------- geoCode---------------
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyDiqOTgTni_N3mFb2kqjvXTyfxQECFq7GA ', 
  formatter: null 
};
var geocoder = NodeGeocoder(options);

geocoder.geocode({ 'address': address })
.then(function(res) {
  latitude = res[0].latitude;
  longitude = res[0].longitude;
  result.render('index', {address: address, lat: latitude, lng: longitude});
})
.catch(function(err) {
  console.log(err);
});

// -----------------------------------
}

router.post('/', function(req, res) {
  var address = req.body.address;
  getLocation(address, res);
})


module.exports = router;
