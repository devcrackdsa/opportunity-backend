const path = require("path");
const fs = require("fs");
const { router, upload,auth } = require("../functions/required");
require("dotenv").config();
const { hash, compare } = require("../functions/hash.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.jwt_secret;
const admin = require("../model/admin.js");

// ___________Create new Admin_________________

exports.newAdmin = async (req, res) => {
    try {
      exists = await admin.findOne({ email: req.body.email });
      if (exists) {
        return res.status(400).json("Admin with this email already exists");
      }
      var token = jwt.sign({ email: req.body.email }, jwtSecret);
      pass = await hash(req.body.password);
      
      let obj = {
        name: req.body.name,
        password: pass,
        email: req.body.email,
        token: token,
      };
  
      let newAdmin = new admin(obj);
      await newAdmin.save();
      res.status(201).json(obj);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  // _____________Admin Login____________________

  exports.login =async (req, res) => {
    try {
      let email = req.body.email;
      let obj = await admin.findOne({ email });
      if (obj) {
        let validatepass = await bcrypt.compare(req.body.password, obj.password);
        if (validatepass) {
          let token = jwt.sign({ email }, jwtSecret);
          // console.log(token)
          return res
            .status(200)
            .json({ name: obj.name, email: obj.email, token });
        }
      }
      res.status(500).json("email or password is wrong");
    } catch (err) {
      res.status(500).json(err);
    }
  };