
const path = require('path');
const fs = require('fs');
const {router,mongoose,upload} = require('../functions/required');
require('dotenv').config();
const { hash,compare } = require('../functions/hash.js');




// importing models
const admin= require('../schema/adminSchema');
const jobItem = require('../schema/job_item.js');



// ______________________________posting a job_________________

router.post('/saveitem', upload.single('image'), async (req, res) => {

    try{
    let obj = {
        title: req.body.title,
        company: req.body.company,
        desc: req.body.desc,
        tags: req.body.tags.split(" "),
        image: path.join('/static/img/', `${req.file.filename}`),
    }
    let item = new jobItem(obj);

    await item.save();
    res.status(200).send("saved");
}
    catch(err){
    res.status(500).send("Server error")
    }

}


    )


router.post('/newadmin',async (req,res)=>{

    try{
    pass = await hash(req.body.password);
    let obj = {
        name:req.body.name,
        password: pass,
        email: req.body.email
    }

    let newAdmin = new admin(obj);
   
    await newAdmin.save();

    res.status(200).send("new admin created");
}
catch(err){
    res.status(500).send('server error')
}


})


router.post('/login', async(req,res)=>{
    try{
    // console.log(req.body);
    let email = req.body.email;
    let password = await hash(req.body.password);
    console.log('pass',password)
    
    let obj = await admin.findOne({email,password})
    // console.log(obj)

    if (obj){
        return res.status(200).json(obj);
    }
    res.status(404).send("user not found");
}
catch(err){
    res.status(500).send("server error")
}


     
})


    module.exports = router;

