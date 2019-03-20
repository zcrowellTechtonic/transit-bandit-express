const express = require('express');
const bodyParser = require('body-parser');
const Library = require('../models/Stops');
const router = express.Router();


import errorMsgs from '../private.js';

 router.use(bodyParser.json());

router.post('/', (req, res) => {
  // May need to remove later
  console.log(req.body)
  for(let i = 0; i < req.body.books.length; i++){
    req.body.books[i].userID = req.user._doc._id;
  }
  // const request = req.body.books || req.body;
  Library.insertMany(req.body.books, (err, books) => {
    if (err) {
      return res.status(500).send(errorMsgs.postBad);
    } else {
      return res.status(200).send(books);
    }
  })
});

router.get('/', (req, res) => {
  
  Library.find({}, function (err, books) {
    if (err) {
      return res.status(500).send(errorMsgs.getAllBad);
    } else {
      return res.status(200).send({books:books});
    }
  }).sort({_id: 'asc'});
});

router.get('/paginate/:page/:numResults',(req,res)=>{
  
  console.log(req.params)
 
  if (req.params.page) {
    req.params.page = parseInt(req.params.page)
  }
  if (req.params.numResults) {
    req.params.numResults = parseInt(req.params.numResults)
  }

  let myResponseObj = {};
  
  Library.find({}).limit(req.params.numResults).skip((req.params.page*req.params.numResults) - req.params.numResults).sort({_id: 'asc'}).exec((err,books)=>{
    Library.count().exec(function (err, count) {
      myResponseObj.books = books;
      myResponseObj.count = count;
      return res.status(200).send(myResponseObj);
    })
  })
})

router.get('/random', (req, res) => {
  
   Library.aggregate([{
      $sample: {size: 1}},
      {$match: {'title': {$exists: true}}}],
      (err, book) => {
        if (err) {
        console.log(err);
        res.status(500).send(errorMsgs.getShowAllAuthorsBad)
        } else {
        res.status(200).send(book[0]);
      }
    });
});
 
router.get('/showAllAuthors', (req, res) => {
  
   Library.find({}).distinct("author", (err, authors) => {
       if (err) {
       console.log(err);
       res.status(500).send(errorMsgs.getShowAllAuthorsBad)
       } else {
       res.status(200).send(authors);
     }
   });
});

router.get('/:id', (req, res) => {
 
  Library.findById({_id: req.params.id}, (err, book) => {
    if (err) {
      if (err) return res.status(500).send(errorMsgs.getByIdBad);
    } else {
      res.status(200).send(book)
    }
  });
});

router.delete('/removeAll', (req, res) => {
  Library.deleteMany({}, (err, books) => {
    if (err) {
      res.status(500).send(errorMsgs.deleteRemoveAllBad);
    } else {
      res.status(200).send(errorMsgs.deleteRemoveAll);
    };
  });
});

router.delete('/deletebyauthor/:author', (req, res) => {
  
  console.log(req.params)
  Library.remove({author: req.params.author}, (err, book) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(book.title + errorMsgs.deleteByIdGood);
    }
  });
});

router.delete('/deletebytitle/:title', (req, res) => {
 
  console.log(req.params)
  Library.remove({title: req.params.title}, (err, book) => {
     if (err) {
       return res.status(500).send(errorMsgs.deleteByIdBad);
     } else {
      res.status(200).send(book.title + errorMsgs.deleteByIdGood);
    }
  });
});


router.put('/:id', function (req, res){
 
  Library.findByIdAndUpdate(req.params.id, req.body,
 {new: true},
 (err, book) => {
   if(err) {
     return res.status(500).send(errorMsgs.putByIdBad);
 } else {
   return res.status(200).send(book);
 }
})
});



module.exports = router;
