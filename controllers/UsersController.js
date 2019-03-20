const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/Users');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());


// POST ROUTE FOR ADDING NEW USERS
router.post('/', (req, res) => {
        // console.log(req.body)
      Users.insertMany(req.body, (err, user) => {
        if (err) {
          return res.status(500).send(errorMsgs.postBad);
        } else {
          return res.status(200).send(user);
        }
      })
    });

// RETRIEVES ALL Users FROM DB
router.get('/', (req, res) => {
  Users.find({}, function (err, users) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllBad);
    } else {
      return res.status(200).send(users);
    }
  }).sort({_id: 'asc'});
});
// // BRINGS FIRST 5 RESULTS AT A TIME FOR TESTING
// router.get('/firstfive', (req, res) => {
//   Users.find({})
//   .skip((1-1)*5)
//   .limit(5)
//   .exec(function (err, users) {
//     if (err) {
//       return res.status(500).send(errorMsgs.getAllBad);
//     } else {
//       return res.status(200).send(users);
//     }
//   })
// });
// // BRINGS ONE PAGE OF FIVE  RESULTS FROM THE DB AT A TIME
// router.get('/paginate/:page/:numResults',(req,res)=>{
//   console.log(req.params)
//   if (req.params.page) {
//     req.params.page = parseInt(req.params.page)
//   }
//   if (req.params.numResults) {
//     req.params.numResults = parseInt(req.params.numResults)
//   }
//   let myResponseObj = {};
//   Users.find({}).limit(req.params.numResults).skip((req.params.page*req.params.numResults) - req.params.numResults).sort({_id: 'asc'}).exec((err,stops)=>{
//     Users.count().exec(function (err, count) {
//       myResponseObj.stops = stops;
//       myResponseObj.count = count;
//       return res.status(200).send(myResponseObj);
//     })
//   })
// })
// GETS RANDOM User FROM DB
router.get('/random', (req, res) => {
   Users.aggregate([{
      $sample: {size: 1}},
      {$match: {'stop_id': {$exists: true}}}],
      (err, user) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllStopsBad)
        } else {
        res.status(200).send(user[0]);
      }
    });
});
// SHOWS ALL STOPS WITH A UNIQUE NAME
// router.get('/showallstopnames', (req, res) => {
//    Users.find({}).distinct("stop_name", (err, authors) => {
//        if (err) {
//        console.log(err);
//        res.status(500).send(errorMsgs.getShowAllStopsBad)
//        } else {
//        res.status(200).send(authors);
//      }
//    });
// });
// GETS USER BY MONGOOSE ID
router.get('/:id', (req, res) => {
  Users.findById({_id: req.params.id}, (err, user) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(user)
    }
  });
});

// GETS STOP BY LATITUDE
// router.get('/getbystoplat/:stop_lat', (req, res) => {
//   console.log(req.params)
//   Users.find({stop_lat: req.params.stop_lat}, (err, stopByLon) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stopByLon);
//     }
//   });
// });
// GETS STOP BY SPECIFIC STOP ID
// router.get('/getbystopid/:stop_id', (req, res) => {
//   console.log(req.params)
//   Users.find({stop_id: req.params.stop_id}, (err, stopById) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stopById);
//     }
//   });
// });
// GETS STOP BY SPECIFIC STOP NAME
// router.get('/getbystopname/:stop_name', (req, res) => {
//   console.log(req.params)
//   Users.find({stop_name: req.params.stop_name}, (err, stopByName) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stopByName);
//     }
//   });
// });
// GETS ALL STOPS BY DIRECTION EX. EAST, WEST...
// router.get('/getstopsbydirection/:stop_desc', (req, res) => {
  
//   console.log(req.params)
//   Users.find({stop_desc: req.params.stop_desc}, (err, stopByName) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stopByName);
//     }
//   });
// });
// DELETES A STOP BY STOP NAME
// router.delete('/deletebystopname/:stop_name', (req, res) => {
//   console.log(req.params)
//   Users.remove({stop_name: req.params.stop_name}, (err, stop) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stop + errorMsgs.deleteByIdGood);
//     }
//   });
// });
// DELETES STOPS BY STOP DIRECTION EX. ALL EAST, WEST...
// router.delete('/deletebytitle/:stop_desc', (req, res) => {
//   console.log(req.params)
//   Users.remove({stop_desc: req.params.stop_desc}, (err, stop) => {
//      if (err) {
//        return res.status(500).send(errorMsgs.deleteByIdBad);
//      } else {
//       res.status(200).send(stop + errorMsgs.deleteByIdGood);
//     }
//   });
// });
// UPDATES A STOP BY SPECIFIC MONGO ID
router.put('/:id', function (req, res){
  Users.findByIdAndUpdate(req.params.id, req.body,
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
