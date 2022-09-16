require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./mongodb.js")
const port = 3000;
const app = express();

// Serves up all static and generated assets in ../client/dist.
// app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());

// app.get('/glossary', function(req, res) {

//   return db.get()
//   .then((glossary) => {
//     res.status(200).json(glossary)
//   })
//   .catch((err) => {
//     console.error(err)
//     res.status(500)
//   })

// })

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
