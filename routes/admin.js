
const path = require('path');
const fs = require('fs');
const {router,mongoose,upload} = require('../functions/required');
require('dotenv').config();
const { hash,compare } = require('../functions/hash.js');
// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwt_secret;





// importing models
const admin= require('../schema/adminSchema');
const jobItem = require('../schema/job_item.js');



// ______________________________posting a job_________________

router.post('/saveitem', upload.single('image'), async (req, res) => {

    try{
        let token = req.body.token;
        const verified = jwt.verify(token, jwtSecret);
    let obj = {
        title: req.body.title,
        company: req.body.company,
        desc: req.body.desc,
        tags: req.body.tags.split(" "),
        image: path.join('/static/img/', `${req.file.filename}`),
    }
    let item = new jobItem(obj);

    await item.save();
    res.status(200).json("saved");
}
    catch(err){
    res.status(500).json("could not post")
    }

}


    )


// ___________Creat new Admin_________________

router.post('/newadmin',async (req,res)=>{

    try{
        let token = req.body.token;
        const verified = jwt.verify(token, jwtSecret);
        // console.log(verified);
    pass = await hash(req.body.password);
    exists = await  admin.findOne({email:req.body.email})
    if (exists){
        return res.status(500).json('Admin with this email already exists');
    }

    let obj = {
        name:req.body.name,
        password: pass,
        email: req.body.email
    }

    let newAdmin = new admin(obj);
   
    await newAdmin.save();

    res.status(200).json("new admin created");
}
catch(err){
    res.status(500).json('could not create');
}
}

)


// _____________Admin Login____________________

router.post('/login', async(req,res)=>{
    try{
    // console.log(req.body);
    let email = req.body.email;
    let password = await hash(req.body.password);
    // console.log('pass',password)
    
    let obj = await admin.findOne({email,password})
    // console.log(obj,obj._id)
    
    if (obj){
        let token = jwt.sign({id:obj._id}, jwtSecret);
        // console.log(token)
        return res.status(200).json({name:obj.name,email:obj.email,token});
    }
    res.status(500).json("email or password is wrong");
}
catch(err){
    res.status(500).json("could not login")
}


     
})


    module.exports = router;

