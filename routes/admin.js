const admincontroller = require("../controller/admin");
const { upload, auth } = require("../functions/required");
const express = require("express")
let router = express.Router();
const cors=require("cors");


router.use(express.json({limit: '50mb'}));
router.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
router.use(cors({
  credentials: true
}));
router
  .post("/newadmin", auth, admincontroller.newAdmin)
  .post("/login", admincontroller.login);

module.exports = router;
