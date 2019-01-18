import React, { Component, Fragment } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import Geocoder from 'react-native-geocoder';
import { Button, Header, Left, Container, Body, Right } from 'native-base';
import LocationItem from './LocationItem';

var apiKey = 'AIzaSyAaRmtDLJj7JKBuiE7lm4trZWnrc4ApjDs';
var apiKey2 = 'AIzaSyAKWunnT0XSN6AMa9vRPB-Phy4XSP5C53c';
var lat, lng, address;

export default class Location extends Component {

  constructor() {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      address: '',
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        }); 
      },
      (error) => {this.setState({ error: error.message })},
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 },
    );
  }

  getloc = () => {
    alert(lat + ' ' + lng);
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + apiKey2)
      .then((response) => response.json())
      .then((responseJson) => {
        address = responseJson.results[0].formatted_address;
        //alert('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
        alert(address);
      })
      .catch(function (error) {
        alert('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
             <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard', {address: address})}>
              <Image source={require('./back_button.png')}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Set Location</Text>
          </Body>
          <Right/>
        </Header>
        <GoogleAutoComplete apiKey={apiKey2} debounce={500} minLength={2}>
          {({ handleTextChange, locationResults, fetchDetails, inputValue }) => (
            <Fragment>
              <View style={styles.inputwrapper}>
                <TextInput
                  placeholder="Search a place"
                  style={styles.textinput}
                  onChangeText={handleTextChange}
                  value={inputValue} />
                <Button block style={styles.currlocbutton} onPress={() => this.getloc()}>
                  <Image source={require('./curr_location.png')} style={{margin:10}}/>
                  <Text style={{fontSize:18, color:'black'}}>Get Current Location</Text>
                </Button>

              </View>

              <ScrollView>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                  />
                ))}
              </ScrollView>

            </Fragment>
          )}
        </GoogleAutoComplete>

      </Container>

    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textinput: {
    height: 50,
    width: 350,
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  inputwrapper: {
    margin: 50
  },
  currlocbutton: {
    backgroundColor: 'powderblue',
    margin: 10,
    width: 350,
    height: 50,
    padding: 10,
  },
  header: {
    backgroundColor: '#ef7215',
    height: 60,
    width: window.width
    //borderBottomWidth: 3,
  },

});
