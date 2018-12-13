const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./controllers/index");
const bodyParser = require("body-parser");
// const indexRoute = require('./routes/index');
const app = express();
const port = 3000;

// set and use statements set view engine and use middleware
app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

// set and use statements. set view engine and use middleware.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);

app.use("/", indexRoute);

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// // close the database connection
// db.close(err => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Close the database connection.");
// });
