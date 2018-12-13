const express = require("express");
const indexRoute = express.Router();
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./practiceDB.db");

indexRoute.get("/", (req, res) => {
  res.render("index");
});

indexRoute.get("/play", (req, res) => {
  res.render("game", { data: "this is data being sent from router" });
});

indexRoute.post("/winner", (req, res) => {
  const result = req.body.result;

  db.get(
    `
    SELECT record FROM user
    WHERE name = 'Lucas'
    `,
    [],
    (err, currentRecord) => {
      let newRecord;
      let toArr = currentRecord.record.split("");
      if (result === "win") {
        toArr[0] = parseInt(toArr[0]) + 1;
      } else {
        toArr[2] = parseInt(toArr[2]) + 1;
      }
      newRecord = toArr.reduce((acc,next) => acc += next, '');
      db.run(
        `
       UPDATE user
       SET record = ${newRecord}
       WHERE name = 'Lucas';
       `,
        [],
        err => {
          if (err) return "ERROR";
          else {
            console.log("it worked!");
          }
        }
      );
    }
  );
});

function updateRecord() {
  //  Query DB
  console.log(db);
  db.serialize(() => {
    db.each(`SELECT * FROM user`, (err, row) => {
      console.log("*query*");
      if (err) {
        console.log("eror", err.message);
      }
      console.log("row", row);
    });
  });
}
module.exports = indexRoute;
