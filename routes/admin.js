
const path = require('path');
const fs = require('fs');
const {router,mongoose,upload} = require('../functions/required');
const jobItem = require('../schema/job_item.js');



// __________ Ruter setup_________






// ______________________________GENERATING OTP__________________

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


    module.exports = router;

