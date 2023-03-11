
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email: {type:String,required: true},
    name:{type:String,required: true},
    password: {type:String,required: true}

    // getid: String,


});

const admin = mongoose.model('admin', adminSchema);

module.exports = admin;