// import './polyfills.js';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import Drawer from './src/Navigation/DrawerNav';
import { Root } from 'native-base';
const firebase = require("firebase");


export default class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAm_QR6rUWIAnvj_-Blca4RsceHra-jIJQ",
      authDomain: "maidhive.firebaseapp.com",
      databaseURL: "https://maidhive.firebaseio.com",
      projectId: "maidhive",
      storageBucket: "",
      messagingSenderId: "708491559802"
    });
  }

  render() {
    return (
      <Root>
        <Drawer />
      </Root>
    );
  }
}


