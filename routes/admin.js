const admincontroller = require("../controller/admin");
const { router, upload, auth } = require("../functions/required");
router
  .post("/newadmin",auth, admincontroller.newAdmin)
  .post("/login", admincontroller.login);

module.exports = router;
