const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/Users');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());


// POST ROUTE FOR ADDING NEW USERS
router.post('/', (req, res) => {
        console.log('From the backend', req.body)
      Users.create(req.body, (err, user) => {
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

//************EDIT USER INFO */
// router.put('/:id', function (req, res){
//   console.log(req.body)
//   Users.findByIdAndUpdate(req.params.id, {
//     email: req.body.email
//   }, 
//     {new: true}, (err, users) => {
//     if (err) {
//       return res.status(500).send(errorMsgs.putByIdBad);
//     }else{
//     return res.status(200).send(users);
//      }
//    });
// });

router.put('/:id', function (req, res){
  console.log(req.body)

  Users.findByIdAndUpdate(req.params.id, req.body, 
    {new: true}, (err, users) => {
    if (err) {
      return res.status(500).send(errorMsgs.putByIdBad);
    }else{
    return res.status(200).send(users);
     }
   });
});



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
