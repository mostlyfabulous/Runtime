import { Meteor } from 'meteor/meteor';
import Preferences from '/imports/api/preferences';

Meteor.publish('preferences', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
  // console.log(Runs);
  //Runs.find({owner: this.userId}).toArray(function(err, items) {
  //   console.log("Returning any items found");
  //   console.log(items);
  //   console.log("End of items found");
  // });
  return Preferences.find({_id: this.userId});
});


// import { Meteor } from 'meteor/meteor';
//
// import { config } from '../config';
//
//
// const MongoClient = require('mongodb').MongoClient;
// let assert = require('assert');
// let Db = require('mongodb').Db;
// const uri = "mongodb+srv://"+config().mongoUser+":"+config().mongopw+"@sandbox-ifog1.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
//
//
// client.connect(err => {
//   const collection = client.db("Runtime").collection("runs");
//   assert.equal(null, err);
//   insertUser(collection);
//   // perform actions on the collection object
//   //client.close();
// });
//
// function insertUser(collection) {
//   let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
//   let user = {_id: newId, user: 'user', password: 'password' };
//   collection.insertOne(user);
//   setTimeout(function() {
//   // Fetch the document
//   collection.find().toArray(function(err, items) {
//      assert.equal(null, err);
//      assert.notEqual(0, items.length);
//      console.log(items);
//      // db.close();
//    });
//  });
// }
//
//
// Meteor.startup(() => {
// });
//
// // Meteor.publish("user", function () {
// //   return Meteor.user();
// // });
