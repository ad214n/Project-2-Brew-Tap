var express = require('express');
var router = express.Router();

// Need to require the necessary DB items
const Schema = require("../db/schema.js");
const UserModel = Schema.UserModel;

// INDEX ROUTE

router.get('/', (request, response) => {
    // This will list all the users in the database
    UserModel.find({})
      .then((users) => {
        response.render('user/index', {
            users: users
      })
    })
      .catch((error) => {
        console.log(error)
      })
});

// NEW ROUTE
// This route will take you to a page with a new user form
router.get('/new', (request, response) => {
  response.render('user/new')
});

// CREATE ROUTE
// This will take the form from the New route parse it with body parser
// And push it into the database
router.post('/', (request, response) => {
    const newUser = request.body

    UserModel.create(newUser)
        .then(() => {
        // This will have accomplished saving and now redirect to the index
          response.redirect('/users')
      })
        .catch((error) => {
          console.log(error)
        })
})


// EDIT ROUTE
// This route will render an edit form for the specified user
router.get('/:userId/edit', (request, response) => {
      const userId = request.params.userId

      // This will find the Id from the parameters and render
      // the form with the already exsisting info
      UserModel.findById(userId)
          .then((user) => {
            response.render('user/edit', {
              user: user
            })
          })
          .catch((error) => {
            console.log(error)
          })
})


// UPDATE ROUTE
// This route is going to put the edited form back into
// the database at the ID specified will all the new info
router.put('/:userId', (request, response) => {
    //Grabbing the ID and the request body to change
    const userId = request.params.userId
    const updatedUser = request.body

    UserModel.findByIdAndUpdate(userId, updatedUser, { new: true})
          .then(() => {
            response.redirect(`/users/${userId}`)
          })
          .catch((error) => {
            console.log(error)
          })
})

// SHOW ROUTE

router.get('/:userId', (request, response) => {
  // this sets the user id from the parameters
  const userId = request.params.userId
    // Use the UserId to pull and show 1 user and render it through hbs
  UserModel.findById(userId)
      .then((user) => {
           response.render('user/show', {
              user: user
          })
      })
      .catch((error) => {
        console.log(error)
      })

})

// DELETE ROUTE
// This Route will delete the user it is attached too
router.get('/:userId/delete', (request, response) => {
  // Set the variable to the userId to grab and delete
  const userId = request.params.userId

  // Use the Model to delete the ID
  UserModel.findByIdAndRemove(userId)
      .then(() => {
        // after the item is found and deleted redirect to the index
          response.redirect('/users')
      })
      .catch((error) => {
        console.log(error)
      })

})

module.exports = router;
