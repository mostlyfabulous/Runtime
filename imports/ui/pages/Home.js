import React from 'react';
import NextRunInfoContainer from '../containers/nextRunInfoContainer'
import HomeStatsContainer from '../containers/HomeStatsContainer'
import { Container, Row, Col } from 'reactstrap';
import { Media } from 'reactstrap';

class Home extends React.Component {
    render() {
        return (
            <div className='body'>

              <Row>
                <Col sm={6}>
                <div id='sideMenuHome'>
                    <HomeStatsContainer/>
                </div>
                </Col>

                <Col sm={6}>
                <div id='mainContentHome'>
                    <NextRunInfoContainer/>
                </div>
                </Col>
              </Row>

        

            </div>
        )
    }
}

export default Home;
