const mongoose = require('mongoose');

// Define the Schema constructor
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


// Create Beer Schema
const BeerSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
        required: true
    },
    ibus: Number,
    description: String,
    tastingNotes: String
})

// Create Brewery Schema
const BrewerySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    yearBuilt: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    beers: [BeerSchema]
})

// Create User Schema
const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
    }
})

// Create all the models for the Schemas

const BeerModel = mongoose.model('Beer', BeerSchema);
const BreweryModel = mongoose.model('Brewery', BrewerySchema);
const UserModel = mongoose.model('User', userSchema)


// Any models from this page need to be add to the export list!
module.exports = {
    BeerModel: BeerModel,
    BreweryModel: BreweryModel,
    UserModel: UserModel

}