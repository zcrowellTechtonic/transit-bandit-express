const express = require('express');
const bodyParser = require('body-parser');
const Trips = require('../models/Trips');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());
// POST ROUTE FOR ADDING NEW STOPS
router.post('/', (req, res) => {
  Trips.insertMany(req.body, (err, trips) => {
    if (err) {
      return res.status(500).send(errorMsgs.postBad);
    } else {
      return res.status(200).send(trips);
    }
  })
});

// RETRIEVES ALL STOPS FROM DB
router.get('/', (req, res) => {
  Trips.find({}, function (err, trips) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllBad);
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
      return res.status(500).send(errorMsgs.getAllBad);
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
// GETS RANDOM STOP FROM DB
router.get('/random', (req, res) => {
   Trips.aggregate([{
      $sample: {size: 1}},
      {$match: {'trip_id': {$exists: true}}}],
      (err, trip) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllStopsBad)
        } else {
        res.status(200).send(trip[0]);
      }
    });
});



router.get('/showallheadsigns', (req, res) => {
   Trips.find({}).distinct("trip_headsign", (err, trips) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllStopsBad)
       } else {
       res.status(200).send(trips);
     }
   });
});

router.get('/showallroutenames', (req, res) => {
  Trips.find({}).distinct("route_id", (err, trips) => {
      if (err) {
      console.log(err);
      res.status(500).send(errorMsgs.getShowAllStopsBad)
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
      res.status(500).send(errorMsgs.getShowAllStopsBad)
      } else {
      res.status(200).send(trips);
    }
  });
});

router.get('/headsign/getbyheadsign', (req, res) => {
  console.log(req.body)
  let id = req.body.route_id
  let headsign = req.body.headsign
  Trips.find({
    route_id: req.params.route_id,
    trip_headsign: req.params.headsign
  }, (err, trips) => {
      if (err) {
      console.log(err);
      res.status(500).send(errorMsgs.getShowAllStopsBad)
      } else {
      res.status(200).send(trips);
    }
  });
});

router.get('/tripheadsign/:trip_headsign', (req, res) => {
   Trips.find({trip_headsign: req.params.trip_headsign}, (err, trips) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllStopsBad)
       } else {
       res.status(200).send(trips);
     }
   });
});


// GETS STOP BY MONGOOSE ID
router.get('/:id', (req, res) => {
  Trips.findById({_id: req.params.id}, (err, trip) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(trip)
    }
  });
});

// GETS STOP BY LATITUDE
router.get('/getbystoplat/:stop_lat', (req, res) => {
  console.log(req.params)
  Trips.find({stop_lat: req.params.trip_lat}, (err, tripByLon) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(tripByLon);
    }
  });
});
// GETS STOP BY SPECIFIC STOP ID
router.get('/getbystopid/:stop_id', (req, res) => {
  console.log(req.params)
  Trips.find({stop_id: req.params.stop_id}, (err, stopById) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stopById);
    }
  });
});
// GETS STOP BY SPECIFIC STOP NAME
router.get('/getbystopname/:stop_name', (req, res) => {
  console.log(req.params)
  Trips.find({stop_name: req.params.stop_name}, (err, stopByName) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stopByName);
    }
  });
});
// GETS ALL STOPS BY DIRECTION EX. EAST, WEST...
router.get('/getstopsbydirection/:stop_desc', (req, res) => {
  
  console.log(req.params)
  Trips.find({stop_desc: req.params.stop_desc}, (err, stopByName) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stopByName);
    }
  });
});
// DELETES A STOP BY STOP NAME
router.delete('/deletebystopname/:stop_name', (req, res) => {
  console.log(req.params)
  Trips.remove({stop_name: req.params.stop_name}, (err, stop) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stop + errorMsgs.deleteByIdGood);
    }
  });
});
// DELETES STOPS BY STOP DIRECTION EX. ALL EAST, WEST...
router.delete('/deletebytitle/:stop_desc', (req, res) => {
  console.log(req.params)
  Trips.remove({stop_desc: req.params.stop_desc}, (err, stop) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stop + errorMsgs.deleteByIdGood);
    }
  });
});
// UPDATES A STOP BY SPECIFIC MONGO ID
router.put('/:id', function (req, res){
  Trips.findByIdAndUpdate(req.params.id, req.body,
 {new: true},
 (err, stop) => {
   if(err) {
     return res.status(500).send(errorMsgs.putByIdBad);
 } else {
   return res.status(200).send(stop);
 }
})
});

// ROUTE USED TO CLEAR ENTIRE DB. FOR EMERGENCY USE ONLY!

// router.delete('/removeAll', (req, res) => {
//   Stops.deleteMany({}, (err, books) => {
//     if (err) {
//       res.status(500).send(errorMsgs.deleteRemoveAllBad);
//     } else {
//       res.status(200).send(errorMsgs.deleteRemoveAll);
//     };
//   });
// });



module.exports = router;
