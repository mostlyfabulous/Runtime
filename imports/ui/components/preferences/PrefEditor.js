import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadPreferences, PREFERENCES_SUB, editPreferences } from '../../actions/index'
import {bindActionCreators} from 'redux';
import { withAccount } from '../accounts/connector.js'
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export class PrefEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <h2> Current Preferences </h2>
        <p> <b>Username: </b> {userName}</p>
        <p> <b>Clouds (%): </b> {this.props.preferences.preferencesEvents[0].clouds}</p>
        <p> <b>Min Temp (°C): </b> {this.props.preferences.preferencesEvents[0].min_temp}</p>
        <p> <b>Max Temp (°C): </b> {this.props.preferences.preferencesEvents[0].max_temp}</p>
        <p> <b>Precipitation (%): </b> {this.props.preferences.preferencesEvents[0].precipitation}</p>
        <p> <b>Preferred City: </b> {this.props.preferences.preferencesEvents[0].city}</p>
        <p> <b>Minimum time between runs (in hours): </b> {this.props.preferences.preferencesEvents[0].min_duration}</p>
      </div>
    }
    return (
      <div>
      <Container>
      <Row>
      <Col>
        {currentPrefs}
      </Col>
      <Col>
        <h2>Edit Preferences:</h2>
        <Form onSubmit={this.handleSubmit} ref='form'>
          <FormGroup row>

          <Label htmlFor="username" sm={4} >Username</Label>
          <Col sm={8}>
          <Input type="string" id="username" name="username" placeholder={userName}
            onChange={this.handleChange} />
          </Col>
          </FormGroup>



          <Row>
          <Col md={6}>
          <FormGroup>
          <Label htmlFor="minTemp">Min Temp (°C)</Label>
          <Input type="number" id="minTemp" name="minTemp" defaultValue={this.props.preferences.preferencesEvents[0].min_temp}
            onChange={this.handleChange}  step="1" placeholder="°C"/>
</FormGroup>
</Col>
          <Col md={6}>
          <FormGroup>
          <Label htmlFor="maxTemp">Max Temp (°C)</Label>
          <Input type="number" id="maxTemp" name="maxTemp" defaultValue={this.props.preferences.preferencesEvents[0].max_temp}
            onChange={this.handleChange}  step="1" placeholder="°C" />
</FormGroup>
</Col>
</Row>

<Row>
<Col md={6}>
<FormGroup>
<Label htmlFor="clouds">Clouds (%)</Label>
<Input type="number" id="clouds" name="clouds" defaultValue={this.props.preferences.preferencesEvents[0].clouds}
  onChange={this.handleChange} step="1" placeholder="%" />
  </FormGroup>
</Col>

<Col md={6}>
<FormGroup>
          <Label htmlFor="precipitation">Max Precip %</Label>
          <Input type="number" id="precipitation" name="precipitation" defaultValue={this.props.preferences.preferencesEvents[0].precipitation}
            onChange={this.handleChange} step="1" placeholder="%" />
            </FormGroup>
</Col>
</Row>

<FormGroup>
          <Label htmlFor="min_duration">Min Duration (between runs, hours)</Label>
          <Input type="number" id="min_duration" name="min duration" defaultValue={this.props.preferences.preferencesEvents[0].min_duration}
            onChange={this.handleChange} step="1" placeholder="e.g. 24" />
</FormGroup>


<FormGroup row>
          <Label htmlFor="city"  sm={4}>Preferred City</Label>
          <Col sm={8}>
            <Input type="select" name="city" id ="city">
              <option value="Vancouver"> Vancouver </option>
              <option value="Toronto"> Toronto </option>
              <option value="Calgary"> Calgary </option>
            </Input>
            </Col>
</FormGroup>

          <Button color="primary" type="submit">Update User Preferences</Button>
        </Form>
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
