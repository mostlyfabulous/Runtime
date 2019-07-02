import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Runs from '/imports/api/runs';

import { config } from '../config';
import './runs.js'; // user.runs publication

const MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let Db = require('mongodb').Db;
const uri = "mongodb+srv://"+config().mongoUser+":"+config().mongopw+"@sandbox-ifog1.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("Runtime").collection("runs");
//   assert.equal(null, err);
//   Runs = collection.find().toArray(function(err, items) {
//      assert.equal(null, err);
//      assert.notEqual(0, items.length);
//      console.log(items);
//    });
//   // insertRun(collection);
//   // perform actions on the collection object
//   //client.close();
// });



function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.publish('links', function() {
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
    return Links.find();
});

Meteor.publish('user.runs', function() {
  Runs.remove({});
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
    return Runs.find();
});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  // let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  // let run = {_id: newId, title: "10km Run", start: new Date(Date.now()+(4*60*60000)), distance: 20, category: "run", owner: "fHPjzSbmNmHXAB6yD", username: "awz"};

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
