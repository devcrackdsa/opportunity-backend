const express = require('express');

const app = express();
const { mongoose, upload } = require('./functions/required');
const port = 3000;

var cookieParser = require('cookie-parser');




// ___________ADMIN_________
const admin = require('./routes/admin');

// app.use('/admin', admin);


// __________EXPRESS Setup______________
app.use(cookieParser("Rasengan1278uploaded"));
app.use('/static', express.static('static')); // serving static files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.listen(port, () => {
    console.log(`Server started at ${port}`)

});

app.use('/admin', admin);


// _________importing models__________
const jobItem = require('./schema/job_item.js');





// END POINT

app.get('/getitems', async (req, res) => {
    try {
        let items = await jobItem.find({});

        if (items.length === 0) {
            res.send("no items present");
            return;
        }
        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).send("server error");
    }

})

app.get('/getbytag', async (req, res) => {

    try {
        let tag = req.query.search.trim();
        console.log(req.query.search.trim());
        console.log(tag)

        let items = await jobItem.find({ "tags": { "$regex": tag, "$options": "i" } });


        if (items.length === 0) {
            res.status(500).send("No match Found");
            return;
        }
        // console.log(arr)

        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).send("Server error");
    }

})



