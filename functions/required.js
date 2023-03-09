const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



// ____________Router___________
let router = express.Router();

router.use('/static', express.static('static'));
router.use(express.json());
router.use(express.urlencoded({
    extended: false
}));

// ___mongoose_______

mongoose.connect('mongodb://localhost/opportunity');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("We are connected")
});

// ______MULTER package for uploading setup_________
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

var upload = multer({ storage: storage });


module.exports = {router,mongoose,upload};