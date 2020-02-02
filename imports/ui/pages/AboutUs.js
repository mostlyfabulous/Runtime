import React from 'react';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.js'
import {connect} from 'react-redux';
import {
  Jumbotron, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,  Row, Col
} from 'reactstrap';


class AboutUs extends React.Component {

  render() {
    return (
      <div className='body'>
          <div id='fullContent'>
          <div>
            <Jumbotron>
              <h1 className="display-3">About Us!</h1>
            <Row>
              <Col sm="4">
              < CardImg width="100%" src="/Runtime_logo/logo_clear.png" alt="Card image cap" />
                <Card body>
                  <CardTitle>Andrew Wong</CardTitle>
                  <CardText>
                    CS new grad with experience in Full Stack Development and interests in Machine Learning, AI and Computer Vision.
                  </CardText>
                  <Button href="https://github.com/mostlyfabulous">GitHub</Button>
              </Card>
            </Col>
            <Col sm="4">
              <CardImg width="100%" src="/Runtime_logo/logo_clear.png" alt="Card image cap" />
              <Card body>
                <CardTitle>Napat Karnsakultorn</CardTitle>
                <CardText></CardText>
                <Button href="">GitHub</Button>
              </Card>
            </Col>
            <Col sm="4">
              <CardImg width="100%" src="/Runtime_logo/logo_clear.png" alt="Card image cap" />
              <Card body>
                <CardTitle>Andrew Choi</CardTitle>
                <CardText></CardText>
                <Button href="">GitHub</Button>
              </Card>
            </Col>
          </Row>
          </Jumbotron>
          </div>

          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(AboutUs);
