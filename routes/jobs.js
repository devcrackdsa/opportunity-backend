const {  upload, auth } = require("../functions/required");
const jobscontroller = require("../controller/jobs");
const express = require("express")
let router = express.Router();
const cors=require("cors");


router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);
router.use(cors({
  origin:"*"
}));


router
  .get("/", jobscontroller.getAllItems) // to get all items
  .get("/:id", jobscontroller.getitem) // to get item by id
  .post("/", auth, upload.single("file"), jobscontroller.saveitem) // to upload item
  .put("/:id", auth, upload.single("file"), jobscontroller.updateitem) // to update item
  .delete("/refresh",auth, jobscontroller.refreshDataBase) // to delete items that are not live
  .delete("/:id", auth, jobscontroller.deleteitem); // to delete item by id

module.exports = router;
