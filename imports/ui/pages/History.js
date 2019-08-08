import React from 'react';
import { connect } from 'react-redux';

import HistoryChartContainer from '../containers/HistoryChartContainer';
import HistoryInfo from '../components/history/HistoryInfo';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader } from 'reactstrap';

class History extends React.Component {
    render() {
        return (
            <div className='body'>
            <Row>
              <Col sm={4}>
                <div id='sideMenu'>
                    <HistoryInfo/>
                </div>
              </Col>


              <Col sm={8}>
                <div id='mainContent'>
                  <HistoryChartContainer/>
                </div>
              </Col>
            </Row>
            </div>
        )
    }
}

export default History;
