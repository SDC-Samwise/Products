const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = require("./app.js")
// var Promise = require("bluebird");
// Promise.promisifyAll(mongoose);

// mongoose.connect('mongodb://localhost/products');
// 2. Set up any schema and models needed by the app
// const schema = mongoose.Schema({
//   word: {type: String, unique: true, dropdups: true},
//   definition: String
// })
// 3. Export the models
// const Repo = mongoose.model('Repo', schema)

// let get = function() {
//   return Repo.find()
//   .then((glossary) =>  {
//     return glossary
//   })
// }



// module.exports = Repo;
// module.exports.get = get;

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sdc-products:apple123@cluster0.660b8lm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});