import { Meteor } from 'meteor/meteor';
import Runs from '/imports/api/runs';

import { config } from '../config';


const MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let Db = require('mongodb').Db;
const uri = "mongodb+srv://"+config().mongoUser+":"+config().mongopw+"@sandbox-ifog1.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  Runs = client.db("Runtime").collection("runs");
  assert.equal(null, err);
  Runs.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     // console.log(items);
   });
   
function insertRun(collection) {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "10km Run", start: new Date(Date.now()+(4*60*60000)), distance: 20, category: "run", owner: "fHPjzSbmNmHXAB6yD", username: "awz"};
  collection.insertOne(run);
  setTimeout(function() {
  // Fetch the document
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     // console.log(items);
     // db.close();
   });
 });
}

Meteor.publish('user.runs', function() {
  // args publish needs goes in: function(args)
  // client.connect(err => {
  //   Runs = client.db("Runtime").collection("runs");
  //   assert.equal(null, err);
  //   Runs.find().toArray(function(err, items) {
  //      assert.equal(null, err);
  //      assert.notEqual(0, items.length);
  //      // console.log(items);
  //    });

     // perform actions on the collection object
     // insertRun(Runs);

    if (!this.userId) {
      console.log("No userId supplied");
      return this.ready();
    }
    console.log(this.userId);
    Runs.find({owner: this.userId}).toArray(function(err, items) {
      console.log("Returning any items found");
      console.log(items);
      console.log("End of items found");
    });
    return Runs.find(
      //{
      //owner: this.userId
      // client.close(); ???
  //  }
    );
  });

})

// const handle = Meteor.subscribe('user.runs', args);
// when passing args is optional and used
// to pass a parameter to publish
// https://guide.meteor.com/data-loading.html#fetching
