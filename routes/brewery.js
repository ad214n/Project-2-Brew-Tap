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


module.exports = router;
