var express = require('express');
var router = express.Router({mergeParams: true});

// Need to require the necessary DB items
const Schema = require("../db/schema.js");
const BreweryModel = Schema.BreweryModel;

// This is an embedded route. Every route needs the Associated brewery ID!

// INDEX
router.get('/', (request, response) => {
    const breweryId = request.params.breweryId
    BreweryModel.findById(breweryId)
        .then((brewery) => {
            response.render('beer/index', {
                brewery: brewery
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW
router.get('/new', (request, response) => {
    const breweryId = request.params.breweryId
     response.render('beer/new', {
         breweryId: breweryId
     })
})


// CREATE

// EDIT

// UPDATE

// SHOW 

// DELETE




module.exports = router;