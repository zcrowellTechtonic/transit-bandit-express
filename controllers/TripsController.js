const express = require('express');
const bodyParser = require('body-parser');
const Stops = require('../models/Trips');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());
// POST ROUTE FOR ADDING NEW STOPS
router.post('/', (req, res) => {
  Stops.insertMany(req.body.stops, (err, stops) => {
    if (err) {
      return res.status(500).send(errorMsgs.postBad);
    } else {
      return res.status(200).send(stops);
    }
  })
});

// RETRIEVES ALL STOPS FROM DB
router.get('/', (req, res) => {
  Stops.find({}, function (err, stops) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllBad);
    } else {
      return res.status(200).send(stops);
    }
  }).sort({_id: 'asc'});
});
// BRINGS FIRST 5 RESULTS AT A TIME FOR TESTING
router.get('/firstfive', (req, res) => {
  Stops.find({})
  .skip((1-1)*5)
  .limit(5)
  .exec(function (err, stops) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllBad);
    } else {
      return res.status(200).send(stops);
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
  Stops.find({}).limit(req.params.numResults).skip((req.params.page*req.params.numResults) - req.params.numResults).sort({_id: 'asc'}).exec((err,stops)=>{
    Stops.count().exec(function (err, count) {
      myResponseObj.stops = stops;
      myResponseObj.count = count;
      return res.status(200).send(myResponseObj);
    })
  })
})
// GETS RANDOM STOP FROM DB
router.get('/random', (req, res) => {
   Stops.aggregate([{
      $sample: {size: 1}},
      {$match: {'stop_id': {$exists: true}}}],
      (err, stop) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllStopsBad)
        } else {
        res.status(200).send(stop[0]);
      }
    });
});
// SHOWS ALL STOPS WITH A UNIQUE NAME
router.get('/showallstopnames', (req, res) => {
   Stops.find({}).distinct("stop_name", (err, authors) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllStopsBad)
       } else {
       res.status(200).send(authors);
     }
   });
});
// GETS STOP BY MONGOOSE ID
router.get('/:id', (req, res) => {
  Stops.findById({_id: req.params.id}, (err, book) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(book)
    }
  });
});

// GETS STOP BY LATITUDE
router.get('/getbystoplat/:stop_lat', (req, res) => {
  console.log(req.params)
  Stops.find({stop_lat: req.params.stop_lat}, (err, stopByLon) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stopByLon);
    }
  });
});
// GETS STOP BY SPECIFIC STOP ID
router.get('/getbystopid/:stop_id', (req, res) => {
  console.log(req.params)
  Stops.find({stop_id: req.params.stop_id}, (err, stopById) => {
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
  Stops.find({stop_name: req.params.stop_name}, (err, stopByName) => {
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
  Stops.find({stop_desc: req.params.stop_desc}, (err, stopByName) => {
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
  Stops.remove({stop_name: req.params.stop_name}, (err, stop) => {
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
  Stops.remove({stop_desc: req.params.stop_desc}, (err, stop) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(stop + errorMsgs.deleteByIdGood);
    }
  });
});
// UPDATES A STOP BY SPECIFIC MONGO ID
router.put('/:id', function (req, res){
  Stops.findByIdAndUpdate(req.params.id, req.body,
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
