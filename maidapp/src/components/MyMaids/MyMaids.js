import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Toast } from 'native-base';
const firebase = require("firebase");

var users = [];
var userId, username = 'Anonymous', contact = '+91XXXXXXXXXX';

export default class MyMaids extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard')}>
                            <Image source={require('./back_button.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Text>USERS</Text>
                    <Text>Name: {username}</Text>
                    <Text>Contact: {contact}</Text>
                    <TouchableOpacity>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor: '#ef7215',
        height: 60,
        width: window.width
        //borderBottomWidth: 3,
    },
})