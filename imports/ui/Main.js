import React from 'react';
import Info from './Info.js';
import Calendar from './Calendar.js';
import Login from './Login.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleLoad();
  }
    render() {
      if (this.state.logged_in === false) {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <Info/>
                </div>
                <div id='loginForm'>
                    <Login/>
                </div>
            </div>
        )
      } else {
        return (
            <div className='body'>
                <div id='sideMenu'>
                    <Info/>
                </div>
                <div id='mainContent'>
                    <Calendar/>
                </div>
            </div>
        )
      }
    }
}

export default Main;
