import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';

import { config } from '../config';

const MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let Db = require('mongodb').Db;
const uri = "mongodb+srv://"+config().mongoUser+":"+config().mongopw+"@sandbox-ifog1.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(err => {
  const collection = client.db("Runtime").collection("runs");
  assert.equal(null, err);
  // insertRun(collection);
  // perform actions on the collection object
  //client.close();
});

function insertRun(collection) {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "10km Run", start: new Date(Date.now()+(4*60*60000)), distance: 20, category: "run" };
  collection.insertOne(run);
  setTimeout(function() {
  // Fetch the document
  collection.find().toArray(function(err, items) {
     assert.equal(null, err);
     assert.notEqual(0, items.length);
     console.log(items);
     // db.close();
   });
 });
}

const Runs = new Mongo.Collection('runs');

Meteor.publish('user.runs', function() {
  // args publish needs goes in: function(args)
  if (!this.userId) {
    return this.ready();
  }

  return Runs.find({
    userId: this.userId
  });
})

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }
});

// Meteor.publish('user', function(){
//     var currentUsername = this.userId;
//     return PlayersList.find({userId: currentUsername});
// });
