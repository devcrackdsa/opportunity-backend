
const mongoose = require('mongoose');
const jobs = new mongoose.Schema({
    title: {type:String,required: true},
    company:{type:String,required: true},
    image: {type:String},
    desc: {type:String,required: true},
    url :{type:String,required: true},
    tags :{type:[String]}
    // getid: String,
});

const jobItem = mongoose.model('jobItem', jobs);

module.exports = jobItem;