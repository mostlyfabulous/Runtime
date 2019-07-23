import React from 'react';
import Info from '../components/runPlan/Info.js';
import Calendar from '../components/runPlan/Calendar.js';
// import CalendarContainer from '../containers/CalendarContainer.js';
import {connect} from 'react-redux';

// import AccountsUIWrapper from '../components/AccountsUIWrapper.js';
// import { Meteor } from 'meteor/meteor';

class RunPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextRun: {}
    };
  }
    render() {
      // return (
      //   <div className='body'>
      //             <div id='sideMenu'>
      //                 <Info/>
      //             </div>
      //             <div id='mainContent'>
      //                 <AccountsUIWrapper />
      //                 { this.props.currentUser ?
      //                    <Calendar/>: ''
      //                  }
      //                 <Calendar />
      //             </div>
      //   </div>
      // );

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


      // set logged in to true for now

      // if (/*this.props.loggedIn*/ true === false) {
      //   return (
      //       <div className='body'>
      //           <div id='sideMenu'>
      //               <Info/>
      //           </div>
      //           <div id='mainContent'>
      //               <Calendar/>
      //           </div>
      //       </div>
      //   )
      // } else {
      //   return (
      //       <div className='body'>
      //           <div id='sideMenu'>
      //               <Info/>
      //           </div>
      //           <div id='mainContent'>
      //               <Login/>
      //           </div>
      //       </div>
      //   )
      // }

    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoggedIn
    };
}

export default connect(mapStateToProps)(RunPlan);
//
// export default connect(mapStateToProps)(Main);
//
// class RunPlan extends React.Component {
//
//     render() {
//       if ()
//         return (
//             <div className='body'>
//                 <div id='sideMenu'>
//                     <Info/>
//                 </div>
//                 <div id='mainContent'>
//                     <Calendar/>
//                 </div>
//             </div>
//         )
//     }
// }
//
//
// export default RunPlan;
