const express = require('express');
const bodyParser = require('body-parser');
const Trips = require('../models/Trips');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());
// POST ROUTE FOR ADDING NEW TRIPS
router.post('/', (req, res) => {
  Trips.insertMany(req.body, (err, trips) => {
    if (err) {
      return res.status(500).send(errorMsgs.postBad);
    } else {
      return res.status(200).send(trips);
    }
  })
});

// RETRIEVES ALL TRIPS FROM DB
router.get('/', (req, res) => {
  Trips.find({}, function (err, trips) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllTripsBad);
    } else {
      return res.status(200).send(trips);
    }
  }).sort({_id: 'asc'});
});
// BRINGS FIRST 5 RESULTS AT A TIME FOR TESTING
router.get('/firstfive', (req, res) => {
  Trips.find({})
  .skip((1-1)*5)
  .limit(5)
  .exec(function (err, trips) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllTripsBad);
    } else {
      return res.status(200).send(trips);
    }
  })
});
// BRINGS ONE PAGE OF FIVE  RESULTS FROM THE DB AT A TIME
router.get('/paginate/:page/:numResults',(req,res)=>{
  console.log(req.params)
  if (req.params.page) {
    req.params.page = parseInt(req.params.page)
  }
  if (req.params.numResults) {
    req.params.numResults = parseInt(req.params.numResults)
  }
  let myResponseObj = {};
  Trips.find({}).limit(req.params.numResults).skip((req.params.page*req.params.numResults) - req.params.numResults).sort({_id: 'asc'}).exec((err,trips)=>{
    Trips.count().exec(function (err, count) {
      myResponseObj.trips = trips;
      myResponseObj.count = count;
      return res.status(200).send(myResponseObj);
    })
  })
})
// GETS RANDOM TRIP FROM DB
router.get('/random', (req, res) => {
   Trips.aggregate([{
      $sample: {size: 1}},
      {$match: {'trip_id': {$exists: true}}}],
      (err, trip) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllTripsBad)
        } else {
        res.status(200).send(trip[0]);
      }
    });
});


router.get('/showallheadsigns', (req, res) => {
   Trips.find({}).distinct("trip_headsign", (err, trips) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllTripsBad)
       } else {
       res.status(200).send(trips);
     }
   });
});

router.get('/showallroutenames', (req, res) => {
  Trips.find({}).distinct("route_id", (err, trips) => {
      if (err) {
      console.log(err);
      res.status(500).send(errorMsgs.getShowAllTripsBad)
      } else {
        const tripStrings = trips.map(items => String(items));
      res.status(200).send(tripStrings);
    }
  });
});

router.get('/tripid/:trip_id', (req, res) => {
  console.log(req.params)
  Trips.find({trip_id: req.params.trip_id}, (err, trips) => {
      if (err) {
      console.log(err);
      res.status(500).send(errorMsgs.getShowAllTripsBad)
      } else {
      res.status(200).send(trips);
    }
  });
});


router.get('/tripheadsign/:trip_headsign', (req, res) => {
   Trips.find({trip_headsign: req.params.trip_headsign}, (err, trips) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllTripsBad)
       } else {
       res.status(200).send(trips);
     }
   });
});


// GETS TRIP BY MONGOOSE ID
router.get('/:id', (req, res) => {
  Trips.findById({_id: req.params.id}, (err, trip) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByTripIdBad);
    } else {
      res.status(200).send(trip)
    }
  });
});

// GETS TRIP BY LATITUDE
router.get('/getbytriplat/:trip_lat', (req, res) => {
  console.log(req.params)
  Trips.find({stop_lat: req.params.trip_lat}, (err, tripByLon) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(tripByLon);
    }
  });
});
// GETS TRIP BY SPECIFIC STOP ID
router.get('/getbytripid/:trip_id', (req, res) => {
  console.log(req.params)
  Trips.find({stop_id: req.params.stop_id}, (err, tripById) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(tripById);
    }
  });
});
// GETS TRIP BY SPECIFIC STOP NAME
router.get('/getbytripname/:trip_name', (req, res) => {
  console.log(req.params)
  Trips.find({stop_name: req.params.stop_name}, (err, tripByName) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(tripByName);
    }
  });
});
// GETS ALL TRIPS BY DIRECTION EX. EAST, WEST...
router.get('/gettripsbydirection/:trip_desc', (req, res) => {
  
  console.log(req.params)
  Trips.find({stop_desc: req.params.stop_desc}, (err, tripByName) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(tripByName);
    }
  });
});
// DELETES A TRIP BY STOP NAME
router.delete('/deletebytripname/:trip_name', (req, res) => {
  console.log(req.params)
  Trips.remove({stop_name: req.params.stop_name}, (err, trip) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(trip + errorMsgs.deleteByTripIdGood);
    }
  });
});
// DELETES TRIPS BY STOP DIRECTION EX. ALL EAST, WEST...
router.delete('/deletebytitle/:trip_desc', (req, res) => {
  console.log(req.params)
  Trips.remove({stop_desc: req.params.stop_desc}, (err, trip) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByTripBad);
     } else {
      res.status(200).send(trip + errorMsgs.deleteByTripIdGood);
    }
  });
});
// UPDATES A TRIP BY SPECIFIC MONGO ID
router.put('/:id', function (req, res){
  Trips.findByIdAndUpdate(req.params.id, req.body,
 {new: true},
 (err, trip) => {
   if(err) {
     return res.status(500).send(errorMsgs.putByTripIdBad);
 } else {
   return res.status(200).send(trip);
 }
})
});

// ROUTE USED TO CLEAR ENTIRE DB. FOR EMERGENCY USE ONLY!

// router.delete('/removeAll', (req, res) => {
//   Trips.deleteMany({}, (err, trips) => {
//     if (err) {
//       res.status(500).send(errorMsgs.deleteRemoveAllBad);
//     } else {
//       res.status(200).send(errorMsgs.deleteRemoveAll);
//     };
//   });
// });



module.exports = router;
