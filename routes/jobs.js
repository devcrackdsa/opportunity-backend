const { router, upload, auth } = require("../functions/required");
const jobscontroller = require("../controller/jobs");

router
  .get("/", jobscontroller.getAllItems)
  .get("/:id", jobscontroller.getitem)
  .get("/tags", jobscontroller.getbytag)
  .post("/", upload.single("file"), auth, jobscontroller.saveitem)
  .patch("/:id", upload.single("file"),auth,jobscontroller.updateitem)
  .delete("/:id",auth, jobscontroller.deleteitem);

module.exports = router;
