import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Runs from '/imports/api/runs';

import { config } from '../config';
// import './runs.js'; // user.runs publication

function insertRun() {
  let newId = (Date.parse(new Date)).toString(16) + Math.floor(Math.random()*1000);
  let run = {_id: newId, title: "10km Run", start: new Date(Date.now()+(4*60*60000)), distance: 20, category: "run", owner: "2BcpLKrNy6PcHWn6w", username: "awz"};
  Runs.insert(run);
}

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

Meteor.publish('runs', function() {
 // args publish needs goes in: function(args)
  if (!this.userId) {
    console.log("No userId supplied");
    return this.ready();
  }
  console.log(this.userId);
  // console.log(Runs);
  // Runs.find({owner: this.userId}).toArray(function(err, items) {
  //   console.log("Returning any items found");
  //   console.log(items);
  //   console.log("End of items found");
  // });
  return Runs.find();
});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  console.log(process.env.MONGO_URL);
  if (Runs.find().count() < 15) {
    insertRun();
  }
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
    insertLink(
      'Do the Tutorial AGAIN',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );
  }

});

// Meteor.publish('user', function(){
//     var currentUsername = this.userId;
//     return PlayersList.find({userId: currentUsername});
// });
