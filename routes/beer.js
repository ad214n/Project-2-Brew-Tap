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
router.post('/', (request, response) => {
    const breweryId = request.params.breweryId
    const newBeer = request.body
    BreweryModel.findById(breweryId)
        .then((brewery) => {
            brewery.beers.push(newBeer)
            return brewery.save()
        })
        .then(() => {
            response.redirect(`/breweries/${breweryId}/beers`)
        })
        .catch((error) => {
            console.log(error)
        })
})

// EDIT
    router.get('/:beerId/edit', (request, response) => {
        const breweryId = request.params.breweryId
        const beerId = request.params.beerId

        BreweryModel.findById(breweryId)
            .then((brewery) => {
                const beer = brewery.beers.id(beerId)
                response.render('beer/edit', {
                    beer: beer,
                    breweryId: breweryId
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })
// UPDATE

router.put('/:beerId', (request, response) => {
    const breweryId = request.params.breweryId
    const beerId = request.params.beerId
    const updatedBeer = request.body

    BreweryModel.findByIdAndUpdate(breweryId)
        .then((brewery) => {
            const beer = brewery.beers.id(beerId)

            beer.name = updatedBeer.name
            beer.abv = updatedBeer.abv
            beer.ibus = updatedBeer.ibus
            beer.description = updatedBeer.description
            beer.tastingNotes = updatedBeer.tastingNotes

            return brewery.save()
        })
        
        .then(() => {
            response.redirect(`/breweries/${breweryId}/beers/${beerId}`)
        })
        .catch((error) => {
            console.log(error)
        })
    

})

// SHOW 

    router.get('/:beerId', (request, response) => {
        const breweryId = request.params.breweryId
        const beerId = request.params.beerId

        BreweryModel.findById(breweryId)
            .then((brewery) => {
                const beer = brewery.beers.id(beerId)
                response.render('beer/show', {
                    beer: beer,
                    breweryId: breweryId,
                    brewery: brewery
                })
            })
            .catch((error) => {
                console.log(error)
            })

    })

// DELETE

router.get('/:beerId/delete', (request, response) => {
    const breweryId = request.params.breweryId
    const beerId = request.params.beerId

    BreweryModel.findById(breweryId)
     .then((brewery) => {
         const beer = brewery.beers.id(beerId).remove()
         return brewery.save()
     })
     .then(() => {
         response.redirect(`/breweries/${breweryId}/beers`)
     })
     .catch((error) => {
         console.log(error)
     })
})



module.exports = router;