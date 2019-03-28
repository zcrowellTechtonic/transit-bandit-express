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


// // RETRIEVES ALL Users FROM DB
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
      {$match: {'uid': {$exists: true}}}],
      (err, user) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllStopsBad)
        } else {
        res.status(200).send(user[0]);
      }
    });
});

// GETS USER BY MONGOOSE ID
router.get('/getbyuid/:_id', (req, res) => {
  console.log(req.params)
  Users.findOne({_id: req.params._id}, (err, user) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(user)
    }
  });
});


// UPDATES A STOP BY SPECIFIC MONGO ID
router.put('/:id', function (req, res){
  console.log(req.body)
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
