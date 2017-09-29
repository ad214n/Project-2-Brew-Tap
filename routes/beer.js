var express = require('express');
var router = express.Router({mergeParams: true});

// Need to require the necessary DB items
const Schema = require("../db/schema.js");
const BreweryModel = Schema.BreweryModel;

// This is an embedded route. Every route needs the Associated brewery ID!

// INDEX
router.get('/', (request, response) => {
    const breweryID = request.params.breweryId
    BreweryModel.findById(breweryID)
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

// CREATE

// EDIT

// UPDATE

// SHOW 

// DELETE




module.exports = router;