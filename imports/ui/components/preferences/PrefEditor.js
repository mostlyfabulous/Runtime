import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadPreferences, PREFERENCES_SUB, editPreferences } from '../../actions/index'
import {bindActionCreators} from 'redux';
import { withAccount } from '../accounts/connector.js'
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { CompactPicker } from 'react-color';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader } from 'reactstrap';


export class PrefEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: this.props.preferences.preferencesEvents[0].min_duration || 'fff',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static propTypes = {
    preferencesReady: PropTypes.bool.isRequired,
    preferencesEvents: PropTypes.array.isRequired,
    preferencesSubscriptionStopped: PropTypes.bool.isRequired,
  }

  componentDidMount() {
     console.log('get preferences data in pref editor')
     console.log(this.props.preferences.preferencesEvents);
 }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
  }

  handleChangeComplete = (color, event) => {
    this.setState({ background: color.hex });
  };

  handleSubmit(e) {
    e.preventDefault();
    let editedPref = {};
    editedPref.clouds = parseInt(e.target.clouds.value);
    editedPref.min_temp = parseInt(e.target.minTemp.value);
    editedPref.max_temp = parseInt(e.target.maxTemp.value);
    editedPref.precipitation = parseInt(e.target.precipitation.value);
    editedPref.min_duration = parseInt(e.target.min_duration.value)
    editedPref.city = e.target.city.value;
    let newUsername = e.target.username.value;
    if (newUsername) Meteor.call('updateUsername', newUsername, (err, res) => {
      if(err) console.log(err);
      if(res && res.error === 403) {
        confirm(res.reason + " Please choose another."); // Username already exists
        // console.log(res);
      }
    });
    editedPref.background = this.state.background;

    let inputType = (typeof editedPref.clouds === "number") && (typeof editedPref.min_temp === "number") && (typeof editedPref.max_temp === "number") && (typeof editedPref.precipitation === "number") /*&& (typeof editedPref.city === "string")*/;
    let inputRange = (editedPref.clouds <= 100) && (editedPref.clouds >= 0) && (editedPref.precipitation <= 100) && (editedPref.precipitation >= 0) && (editedPref.city.length > 0);
    if (inputType && inputRange) {
      // console.log("Submitted event:");
      // console.log(e.target.minTemp.value);
      // console.log(editedPref)
      this.props.editPreferences(editedPref);
    } else {
      alert('invalid input(s)');
    }

  }
  render() {
    let userName = "No username chosen";
    if (this.props.account.user) {
      userName = this.props.account.user.username;
    }
    let currentPrefs = "";
    if (this.props.preferences.preferencesEvents[0] !== undefined) {
      currentPrefs = <div>
        <Card>
        <CardHeader tag="h1">
        <h2> Current Preferences </h2>
        </CardHeader>
        <CardBody>

        <p> <b>Username: </b> {userName}</p>
        <p> <b>Min Temp (°C): </b> {this.props.preferences.preferencesEvents[0].min_temp}</p>
        <p> <b>Max Temp (°C): </b> {this.props.preferences.preferencesEvents[0].max_temp}</p>
        <p> <b>Clouds (%): </b> {this.props.preferences.preferencesEvents[0].clouds}</p>
        <p> <b>Precipitation (%): </b> {this.props.preferences.preferencesEvents[0].precipitation}</p>
        <p> <b>Minimum time between runs (in hours): </b> {this.props.preferences.preferencesEvents[0].min_duration}</p>
        <p> <b>Preferred City: </b> {this.props.preferences.preferencesEvents[0].city}</p>
        <img id="prefIcon" width="90%" height="90%" src={'https://robohash.org/' + this.props.account.user._id} alt="Profile Icon" />
        </CardBody>
        </Card>
      </div>
    }
    return (
      <div>
      <Container>
      <Row>
      <Col sm={4}>
        {currentPrefs}
      </Col>
      <Col sm={8}>
        <Card>
        <CardHeader tag="h1">
        <h2>Edit Preferences: <i class="edit outline icon"></i></h2>
        </CardHeader>

        <CardBody>
        <Form onSubmit={this.handleSubmit} ref='form'>
          <FormGroup row>

            <Col sm={2}>
              <Label htmlFor="username">Username</Label>
            </Col>
            <Col sm={3}>
              <Input type="string" id="username" name="username" placeholder={userName}
                onChange={this.handleChange} />
            </Col>
            <Col sm={3}>
              <Label htmlFor="city">Preferred City</Label>
            </Col>
            <Col sm={4}>
              <Input type="select" name="city" id ="city">
                <option value="Vancouver"> Vancouver </option>
                <option value="Toronto"> Toronto </option>
                <option value="Calgary"> Calgary </option>
              </Input>
              </Col>
          </FormGroup>


          <FormGroup row>

            <Col md={2}>
                <Label htmlFor="clouds">Clouds (%)</Label>
            </Col>

            <Col md={3}>
              <Input type="number" id="clouds" name="clouds" defaultValue={this.props.preferences.preferencesEvents[0].clouds}
                onChange={this.handleChange} step="1" placeholder="%" />
            </Col>

            <Col md={3}>
              <Label htmlFor="minMaxTemp">Min/Max Temp (°C)</Label>
            </Col>

            <Col md={2}>
              <Input type="number" id="minTemp" name="minTemp" defaultValue={this.props.preferences.preferencesEvents[0].min_temp}
                onChange={this.handleChange}  step="1" placeholder="°C"/>
            </Col>

            <Col md={2}>
              <Input type="number" id="maxTemp" name="maxTemp" defaultValue={this.props.preferences.preferencesEvents[0].max_temp}
                onChange={this.handleChange}  step="1" placeholder="°C" />
            </Col>


            </FormGroup>

<Row>
  <Col md={2}>
    <Label htmlFor="precipitation">Max Precip %</Label>
  </Col>

  <Col md={3}>
    <Input type="number" id="precipitation" name="precipitation" defaultValue={this.props.preferences.preferencesEvents[0].precipitation}
          onChange={this.handleChange} step="1" placeholder="%" />
  </Col>
  <Col md={5}>
    <Label htmlFor="min_duration">Min duration between runs (hours)</Label>
  </Col>

  <Col md={2}>
    <Input type="number" id="min_duration" name="min duration" defaultValue={this.props.preferences.preferencesEvents[0].min_duration}
      onChange={this.handleChange} step="1" placeholder="e.g. 24" />
  </Col>

</Row>

<Row>
</Row>

<FormGroup row>


  <Col sm={2}>
    <Label htmlFor="city" >Color Theme</Label>
  </Col>

  <Col sm={6}>
    <CompactPicker
      color={ this.state.background }
      onChangeComplete={ this.handleChangeComplete }/>
  </Col>

  <Col sm={4}>
    <Button color="info" type="submit">Update User Preferences</Button>
  </Col>

</FormGroup>


        </Form>

        </CardBody>
        </Card>
        </Col>
        </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    preferences: state.preferences,
    preferencesReady: state.preferences.preferencesReady,
    preferencesEvents: state.preferences.preferencesEvents,
    preferencesSubscriptionStopped: state.preferences.preferencesSubscriptionStopped,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadPreferences,
      editPreferences
    },
    dispatch
  );
};

const PrefEditorContainer = withAccount(PrefEditor);

export default connect(mapStateToProps, mapDispatchToProps)(PrefEditorContainer);
