const jobItem = require("../model/job.js");
const path = require("path");

const mongoose = require("mongoose");
exports.getAllItems = async (req, res) => {
  
  try {
    query = {};
  
  query.live = req.query.live||true
  // console.log(tags)
  if (req.query.exclusive) query.exclusive = req.query.exclusive;

  //   createing regex array of tags
  if(req.query.tags){
    
    let x = [];
    // console.log(x)
    for(let it of req.query.tags.toLowerCase().split(" ")){
      
      it = new RegExp('^'+it);
      // console.log(it)
      x.push(it);

    }
    // console.log(x);

   query.tags = { $elemMatch: { $in: x } };
  }


  if(req.query.skills){
    let x = []
    //  creating regex array of skills
    for(let it of req.query.skills.toLowerCase().split(" ")){
      it = new RegExp('^'+it);
      x.push(it);
    }
  query.skills = { $elemMatch: { $in: x } }

  }



  let items = await jobItem.find(query);
    if (items.length === 0) {
      res.json("No items present");
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

//not working
exports.getbytag = async (req, res) => {
  try {
    let tag = req.query.tag;

    let items = await jobItem.find({ tags: tag });

    if (items.length === 0) {
      res.status(500).json("No match Found");
      return;
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.saveitem = async (req, res) => {
  try {
    let obj = {
      title: req.body.title,
      company: req.body.company,
      desc: req.body.desc,
      image: path.join("/static/img/", `${req.file.filename}`),
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
    // let item = new jobItem();

    if(req.file)
   await jobItem.updateOne({ _id:id}, {...(req.body),image:path.join("/static/img/", `${req.file.filename}`)});
   else await jobItem.updateOne({ _id:id}, {...(req.body)})
    res.status(201).json("updated");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteitem = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await jobItem.deleteOne({ _id: id });
    res.status(201).json("deleted");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
