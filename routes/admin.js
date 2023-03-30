const admincontroller = require("../controller/admin");
const { upload, auth } = require("../functions/required");
const express = require("express")
let router = express.Router();


router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);
router
  .post("/newadmin", auth, admincontroller.newAdmin)
  .post("/login", admincontroller.login);

module.exports = router;
