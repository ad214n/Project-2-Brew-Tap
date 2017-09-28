//Requiring dotenv and mongoose
require('dotenv').config();
const mongoose = require('mongoose');

// Making sure mongoose is connected 
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});


// Pull in the models from the schema file
const Schema = require("./schema.js");

const BeerModel = Schema.BeerModel;
const BreweryModel = Schema.BreweryModel;
const UserModel = Schema.UserModel;

// Delete all Breweriers and Users from the database
BreweryModel.remove({}, (error) => {
    console.log(error);
});

UserModel.remove({}, (error) => {
    console.log(error)
});

// Making mock data to seed the DB now 

const light = new BeerModel({ name: 'Light Beer', abv: 6.8, ibus: 70, description: "This is water", tastingNotes: 'A low calorie option for the casual beer drinker'});
const ale = new BeerModel({ name: 'Ale', abv: 6.1, ibus: 40, description: "yummy!", tastingNotes: "a smooth drinking dry hopped ale"});
const dark = new BeerModel({ name: 'Dark', abv: 7, ibus: 50, description: "heavy but good!", tastingNotes:"A dark rich coffee stout"});

const busch = new BreweryModel({name:"Busch", yearBuilt: 2014, city: "Atlanta", state: "Georgia"});
const sweetwater = new BreweryModel({name:"SweetWater", yearBuilt: 2014, city: "Atlanta", state: "Georgia"});
const redbrick = new BreweryModel({name:"Redbrick", yearBuilt: 2014, city: "Atlanta", state: "Georgia"});

const fred = new UserModel({ name: "Fred", age: 36, city: "Orlando"});
const sally = new UserModel({ name: "Sally", age: 28, city: "Orlando"});
const max = new UserModel({ name: "Max", age: 34, city: "Orlando"});

const beers = [light, ale, dark]
const breweries = [busch, sweetwater, redbrick]
const users = [fred, sally, max]

users.forEach((user) => {
    user.save()
     .then((user) => {
         console.log(`${user.name} saved!`)
     })
     .catch((error) => {
         console.log(error)
     })
})

breweries.forEach((brewery) => {
    brewery.beers = beers
    
    brewery.save()
    .then((brewery) => {
        console.log(`${brewery.name} saved!`)
    })
    .catch((error) => {
        console.log(error)
    })
});
// disconnect from the DB
db.close();