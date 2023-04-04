const mongoose = require("mongoose");
const jobs = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  desc: { type: String, required: true },
  startdate: { type: Date, required: true },
  lastdate: { type: Date, required: true },
  stipend: { type: String, required: true },
  exclusive: { type: Boolean, default: false },
  live: { type: Boolean, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  createdAt:{type:Date, default: new Date()},
  url: { type: String, required: true },
  image: { type: String, required: true },
  skills: { type: [String] },
  requirements: { type: [String] },
  tags: { type: [String] },
  // getid: String,
});

const jobItem = mongoose.model("jobItem", jobs);

module.exports = jobItem;
