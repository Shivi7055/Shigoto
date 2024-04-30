const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    role : String,
    company : String,
    duration : String,
    salary : Number,
    location : String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;