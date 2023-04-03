const admincontroller = require("../controller/admin");
const { upload, auth } = require("../functions/required");
const express = require("express")
let router = express.Router();
const cors=require("cors");


router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(cors());
router
  .post("/newadmin", auth, admincontroller.newAdmin)
  .post("/login", admincontroller.login);

module.exports = router;
