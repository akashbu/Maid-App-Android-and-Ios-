import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, Image, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Toast } from 'native-base';

export default class SplashScreen extends Component {

    componentWillMount() {
        setTimeout(() => {this.props.navigation.navigate('UserDashboard')}, 1000);
    }

    render() {
        return(
            <View style={{backgroundColor:'white', flex:1, alignItems:'center', justifyContent:'center'}}>
                <Image source={require('./maid_logo2.jpeg')}/>
            </View>
        )
    }
}