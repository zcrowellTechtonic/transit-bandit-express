# Library Project: Phase 3 of 4 (ReST Integration)

## Getting Started

Recall that you already have both a local and a remote repository for your Library project.  In Phase 1, you built the engine that will drive your application using JavaScript, in Phase 2 you explored the pre-built User Interface for your digital library application and you connected your engine to your UI with the help of jQuery, ```init()```, ```bindEvents()``` and ```eventHandlers()```.

Your task now is to set up a database and create a node/express ReST layer to interact with the database.  You have already set-up an account with mLabs, Robo 3T and postman, now we will just be integrating a new database into your Library.

## Set Up
* Click on the GitHub classroom link we've provided
* Navigate to your newly cloned repo using the terminal.
* Within the Library phase 3 project in Atom, open up the db.js file
* Paste the connection string from mLab into the ```mongoose.connect()``` method parentheses, like so: ```mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds153948.mlab.com:53948/practice_db');```
* Replace the ```<dbuser>``` with your username and ```<dbpassword>``` with your password.
* Save these changes
* Go back to the terminal and from the root of your project run ```npm install```

You will need to install the npm package the first time you want to run the server.  If you don’t remember if you’ve already installed it, you can check to see if the project contains a node_modules folder.  If so, the necessary dependencies have already been installed and you can just navigate to the folder you want to run your app from.  Then execute either ```npm start```, ```node app.js``` or ```node app``` to start your server.  You should see: ```"Express server listening on port 3001"``` in the output of your terminal. 



## Requirements

Create endpoints that will implement each CRUD route by following the instructions below.  We have provided all endpoints, status codes and what data will be sent from each endpoint.  

You will want to create “catch all” ```GET``` request within **app.js** to send a **404** (not found) status to any route that does not match one of your routes in **LibraryController.js.**


### Create a ```POST``` request

* Creates new book entries.  You may create test entries from Postman.  If you have modified your schema to reflect changes to your model, you may need to add additional keys and values.
* The ```POST``` method will take an object with a property called books.  The books property will hold an array of book objects. See example object below

```
{
  books: [
    {
      author: "George R. R. Martin",
      numberOfPages: "694",
      publishDate: "1997-03-17",
      rating: "3",
      synopsis: "Author sets out to create the world's most complicated family tree.",
      title: "A Song of Ice and Fire"
    },
    {
      author: "Stephen King",
      numberOfPages: "500",
      publishDate: "1989-03-17",
      rating: "5",
      synopsis: "Basically Beethoven but with more rabies.",
      title: "Cujo"
    }
  ]
}
```
* If no books are provided in the books array a **500** error should be sent back down with the text 'Books array could not be found'


### Create a ```GET``` request
* You need to stand up and create your ```GET``` request in **libraryController.js** first.  After writing your ```GET``` request, you can then test it using Postman.
* This ```GET``` request should have should be reached by the url shown below ```http://localhost:3001/library/```
* A successful ```GET``` request will send a **200** status and all the books in the database as an array of objects.
* If the database is empty an empty array should be sent.


### Create a ```GET/:id``` request
* id will be a parameter on the url.  It can be accessed by ```req.params.id```
* This should send a **200** status and a single book object matching the mongo id provided.
* If no books match send a **500** status and text “Could not get book from the database."


### Create a ```DELETE/:id``` request.
* Remove a book from your library database by sending it’s id as a parameter.
* This should send a **200** status and text “BOOKBEINGREMOVEDTITLE has been removed from the Library."
* If there is no match with the id a **500** status and text "Could not delete book from the database." should be sent.


### Create a ```PUT/:id``` request for updating entries
* Successfully updating a book should send a **200** status and the updated object
* If an incorrect id is given a **500** status should be sent with the text “Could not update book.”


### Create a ```GET``` request that returns a distinct list of authors from the library database
* The url should be ```http://localhost:3001/library/showAllAuthors```
* This request will send an array of strings of all distinct authors and a status of **200**.  
* If no books are present in the database a **200** status should be sent with an empty array.


### Create a ```GET``` method using route ```/random``` that gets a random book from your library database
* The url should be ```http://localhost:3001/library/random```
* The response should have a single book object and **200** status.


## What to Do

* Review the requirements
* Plan out how you think you can best accomplish these targets and determine various approaches you can try
* Start writing your routing code in **libraryController.js**
* Discuss issues with your peers and ask for help early and often!
* Slack the instructional team if you have a pressing issue that you cannot solve
* Commit and push every time a new module is completed and functional



## Helpful Materials
* [API Reference](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82)
* [Intro to API's](https://www.upwork.com/hiring/development/intro-to-apis-what-is-an-api/)
* [Understanding Async](https://medium.freecodecamp.org/understanding-asynchronous-javascript-callbacks-through-household-chores-e3de9a1dbd04)
* [More on Callbacks](https://medium.freecodecamp.org/javascript-callbacks-explained-using-minions-da272f4d9bcd)
* [Callback Hell](http://callbackhell.com/)
* [ReSTful API's](https://restfulapi.net/)
* [Understanding ReST API's](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)
* [HTTP Status Codes](https://http.cat/)


