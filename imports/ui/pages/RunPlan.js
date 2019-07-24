import React from 'react';
import Info from '../components/runPlan/Info.js';
import Calendar from '../components/runPlan/Calendar.js';
import {connect} from 'react-redux';

class RunPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextRun: {}
    };
  }
    render() {

      return (
        <div className='body'>
                  <div id='sideMenu'>
                      <Info/>
                  </div>
                  <div id='mainContent'>
                      <Calendar />
                  </div>
        </div>
      );


    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoggedIn
    };
}

export default connect(mapStateToProps)(RunPlan);
