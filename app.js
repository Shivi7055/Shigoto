const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/WorkInJapan";
const bodyParser = require('body-parser');


main().then(() =>{
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/listings", (req, res) =>{
    res.render("listings/index.ejs");
});

app.get("/listings/jobs", async (req, res) =>{
    let allListings = await Listing.find({});
    res.render("listings/jobs.ejs", {allListings});
});

app.post("/listings/search", async (req, res) =>{
    const searchQuery = req.body.search;
    let searchResults = await Listing.find({
        "$or" : [
            {"role":{$regex: searchQuery}},
            {"company":{$regex: searchQuery}},
            {"location":{$regex: searchQuery}}
        ]
    })
    console.log(searchResults);
    res.render("listings/search.ejs", {searchResults});
});

app.get("/listings/about", (req, res) =>{
    res.render("listings/about.ejs");   
});

app.listen(8080, () =>{
    console.log("server is listening");
});