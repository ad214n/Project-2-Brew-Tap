var express = require('express');
var router = express.Router();

// Need to require the necessary DB items
const Schema = require("../db/schema.js");
const BreweryModel = Schema.BreweryModel;


// INDEX ROUTE
// This shows you all the breweries!!!

router.get('/', (request, response) => {
        BreweryModel.find({})
            .then((breweries) => {
                response.render('brewery/index', {
                    breweries: breweries
                })
            })
            .catch((error) => {
                console.log(error)
            })

})

// NEW ROUTE 
// This page takes you to the new brewery form
router.get('/new', (request, response) => {
    response.render('brewery/new')
});

// CREATE ROUTE
router.post('/', (request, response) => {
    const newBrewery = request.body;

    BreweryModel.create(newBrewery)
        .then(() => {
            response.redirect('/breweries')
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT ROUTE
router.get('/:breweryId/edit', (request, response) => {
    const breweryId = request.params.breweryId

    BreweryModel.findById(breweryId)
        .then((brewery) => {
            response.render('brewery/edit', {
                brewery: brewery
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// UPDATE ROUTE

router.put('/:breweryId', (request, response) => {
    const breweryId = request.params.breweryId
    const updatedBrewery = request.body

    BreweryModel.findByIdAndUpdate(breweryId, updatedBrewery, {new: true})
        .then(() => {
            response.redirect(`/breweries/${breweryId}`)
        })
        .catch((error) => {
            console.log(error)
        })

})

// SHOW ROUTE

router.get('/:breweryId', (request, response) => {
    const breweryId = request.params.breweryId;

    BreweryModel.findById(breweryId)
        .then((brewery) => {
            response.render('brewery/show', {
                brewery: brewery
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// DELETE ROUTE

router.get('/:breweryId/delete', (request, response) => {
    const breweryId = request.params.breweryId;

    BreweryModel.findByIdAndRemove(breweryId)
        .then(() => {
            response.redirect('/breweries')
        })
        .catch((error) => {
            console.log(error)
        })
})



module.exports = router;
