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

router.get('/getbyuid/:uid', (req, res) => {
  console.log(req.params)
  Users.find({uid: req.params.uid}, (err, user) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(user)
    }
  });
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
