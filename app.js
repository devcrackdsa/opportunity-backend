const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.port || 3000;
var cookieParser = require("cookie-parser");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const jwt = require('jsonwebtoken');

// ___________AUTHORIZATION_________
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    var decoded = jwt.verify(token, process.env.jwt_secret);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(401);
  }
  console.log(decoded);
};

// ___________GETJOBS_________
const jobsRoute = require("./routes/jobs");
app.use("/jobs", jobsRoute);

// ___________ADMIN_________
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);



// __________EXPRESS Setup______________

app.use("/static", express.static("static")); // serving static files
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
