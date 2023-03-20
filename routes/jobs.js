const { router, upload, auth } = require("../functions/required");
const jobscontroller = require("../controller/jobs");

router
  .get("/",auth, jobscontroller.getAllItems) // to get all items
  .get("/refresh", jobscontroller.refreshDataBase) // to delete item by id
  // .get("/tags", jobscontroller.getbytag) // to get specific items by tag
  .get("/:id", jobscontroller.getitem) // to get item by id
  .post("/", upload.single("file"), auth, jobscontroller.saveitem) // to upload item
  .put("/:id", upload.single("file"),auth,jobscontroller.updateitem) // to update item
  .delete("/:id",auth, jobscontroller.deleteitem) // to delete item by id
  

module.exports = router;
