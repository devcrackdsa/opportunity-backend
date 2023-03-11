const express = require('express');

const app = express();
require('dotenv').config();
const { mongoose, upload } = require('./functions/required');


const port = process.env.port||3000;



var cookieParser = require('cookie-parser');

// console.log(process.env.connection_string);




// ___________ADMIN_________
const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

// app.use('/admin', admin);


// __________EXPRESS Setup______________

app.use('/static', express.static('static')); // serving static files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.listen(port, () => {
    console.log(`Server started at ${port}`)

});




// _________importing models__________
const jobItem = require('./schema/job_item.js');









// END POINT

app.get('/getitems', async (req, res) => {
    try {
        let items = await jobItem.find({});

        if (items.length === 0) {
            res.json("no items present");
            return;
        }
        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).json("server error");
    }

})

app.get('/getbytag', async (req, res) => {

    try {
        let tag = req.query.search.trim();
        console.log(req.query.search.trim());
        console.log(tag)

        let items = await jobItem.find({ "tags": { "$regex": tag, "$options": "i" } });


        if (items.length === 0) {
            res.status(500).json("No match Found");
            return;
        }
        // console.log(arr)

        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).json("Server error");
    }

})



