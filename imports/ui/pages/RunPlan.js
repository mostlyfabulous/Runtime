import React from 'react';
import Info from '../components/runPlan/Info.js';
import Calendar from '../components/runPlan/Calendar.js';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

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
          <Row>
            <Col sm={5}>
                  <div id='sideMenu'>
                      <Info/>
                  </div>
            </Col>

            <Col sm={7}>
                  <div id='mainContent'>
                      <Calendar />
                  </div>
            </Col>
          </Row>
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
