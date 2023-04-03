const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
const PORT = process.env.port || 3000;
var cookieParser = require("cookie-parser");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const jwt = require("jsonwebtoken");

// _______________GETJOBS_________
const jobsRoute = require("./routes/jobs");
app.use("/jobs", jobsRoute);

// ___________ADMIN_________
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

// __________EXPRESS Setup______________

app.use("/static", express.static("static")); // serving static files
app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
  })
);
app.use(cors(
  {
    credentials: true
  }
));
app.get("/", (req, res) => {
  res.send("Welcome to opportunity backend");
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
