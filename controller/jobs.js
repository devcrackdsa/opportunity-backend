const jobItem = require("../model/job.js");
const path = require("path");
exports.getitems = async (req, res) => {
  try {
    let items = await jobItem.find({});

    if (items.length === 0) {
      res.json("No items present");
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

exports.getbytag = async (req, res) => {
  try {
    let tag = req.query.tag.trim();
    console.log(req.query.tag.trim());
    console.log(tag);

    let items = await jobItem.find({ tags: { $regex: tag, $options: "i" } });

    if (items.length === 0) {
      res.status(500).json("No match Found");
      return;
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

exports.saveitem = async (req, res) => {
  try {
    let obj = {
      title: req.body.title,
      company: req.body.company,
      desc: req.body.desc,
      tags: req.body.tags.split(" "),
      url:req.body.url,
     
    };

    let item = new jobItem(obj);
    await item.save();
    res.status(200).json("Saved");
  } catch (err) {
    console.log(err)
    res.status(500).json("hello");
  }
};
