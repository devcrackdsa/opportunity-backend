const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwt_secret;



// ____________Router___________
let router = express.Router();

router.use('/static', express.static('static'));
router.use(express.json());
router.use(express.urlencoded({
    extended: false
}));
// router.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));

// ___mongoose_______
// require('dotenv').config();

mongoose.connect(process.env.connection_string||'mongodb://localhost/opportunity');

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