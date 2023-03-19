const mongoose = require("mongoose");
const jobs = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  desc: { type: String, required: true },
  lastdate: { type: Date, required: true },
  stipend: { type: String, required: true },
  exclusive: { type: Boolean, required: true },
  live: { type: Boolean, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  skills: { type: [String] },
  requirements: { type: [String] },
  tags: { type: [String] },
  // getid: String,
});

const jobItem = mongoose.model("jobItem", jobs);

module.exports = jobItem;
