import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Links from '../api/links';

class Info extends Component {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
        <h2>Your Next Run</h2>
        <form>
          Duration
          <input type="text" name="duration" value="Hours: Minutes"></input>
          <br/>
          Start Time
          <input type="text" name="start_time" value="Hours: Minutes"></input>
          <br/>
          End Time
          <input type="text" name="end_time" value="Hours: Minutes"></input>
          <br/>
          Distance
          <input type="text" name="distance" value="km/m"></input>
          <br/>
          <button type="submit">Find a Run!</button>
        </form>
      </div>
    );
  }

  makeLink(link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

export default InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
  };
})(Info);
