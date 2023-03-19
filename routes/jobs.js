const { router, upload, auth } = require("../functions/required");
const jobscontroller = require("../controller/jobs");

router
  .get("/", jobscontroller.getAllItems)
  .get("/tags", jobscontroller.getbytag)
  .get("/:id", jobscontroller.getitem)
  .post("/", upload.single("file"), auth, jobscontroller.saveitem)
  .patch("/:id", upload.single("file"),auth,jobscontroller.updateitem)
  .delete("/:id",auth, jobscontroller.deleteitem);

module.exports = router;
