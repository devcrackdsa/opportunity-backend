const jobItem = require("../model/job.js");
const path = require("path");
const mongoose = require("mongoose");
exports.getAllItems = async (req, res) => {
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

//not working
exports.getbytag = async (req, res) => {
  try {
    let tag = req.query.tag.trim();
    console.log(req.query.tag.trim());

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
      image: path.join("/static/img/", `${req.file?.filename}`),
      lastdate: req.body.lastdate,
      stipend: req.body.stipend,
      exclusive: req.body.exclusive,
      live: req.body.live,
      location: req.body.location,
      duration: req.body.duration,
      url: req.body.url,
      tags: req.body.tags.split(" "),
      skills: req.body.skills.split(" "),
      requirements: req.body.requirements.split(" "),
    };

    let item = new jobItem(obj);
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getitem = async (req, res) => {
  const id = req.params.id;
  console.log({ id });
  const job = await jobItem.findById(id);
  res.json(job);
};

exports.updateitem = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await jobItem.findOne({ _id: id });

    doc.title = req.body.title ? req.body.title : doc.title;
    doc.company = req.body.company ? req.body.company : doc.company;
    doc.desc = req.body.desc ? req.body.desc : doc.desc;
    if (req.file) {
      doc.image = path.join("/static/img/", `${req.file?.filename}`);
    }
    doc.lastdate = req.body.lastdate ? req.body.lastdate : doc.lastdate;
    doc.stipend = req.body.stipend ? req.body.stipend : doc.stipend;
    doc.exclusive = req.body.exclusive ? req.body.exclusive : doc.exclusive;
    doc.live = req.body.live ? req.body.v : doc.live;
    doc.location = req.body.location ? req.body.location : doc.location;
    doc.duration = req.body.duration ? req.body.duration : doc.duration;
    doc.url = req.body.url ? req.body.url : doc.url;
    doc.tags = req.body.tags ? req.body.tags?.split(" ") : doc.tags;
    doc.skills = req.body.skills ? req.body.skills?.split(" ") : doc.skills;
    doc.requirements = req.body.requirements ? req.body.requirements?.split(" ") : doc.requirements;
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteitem = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await jobItem.findByIdAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
