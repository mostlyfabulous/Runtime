import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';

import { config } from '../config';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+config().mongoUser+":"+config().mongopw+"@sandbox-ifog1.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(err => {
  const collection = client.db("Runtime").collection("runs");
  console.log(err);
  // perform actions on the collection object
  //client.close();
});

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
