import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TextInput, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Toast } from 'native-base';
const firebase = require("firebase");

var users = [];
var userId, email,username = 'Anonymous', contact = '+91XXXXXXXXXX';
export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            contact: '',
            location: '',
            email:'',
        }
    }

    componentWillMount() {
        userId = firebase.auth().currentUser;
        
        if (userId) {
            firebase.database().ref('/users/' + userId.uid).on('value', (snapshot) => {

                this.setState({ username: (snapshot.val() && snapshot.val().Name), contact: (snapshot.val() && snapshot.val().Contact), location: (snapshot.val() && snapshot.val().Location),email:(firebase.auth().currentUser.email)});
                //alert(username);
            });
            //alert(this.state.username +'l; ' ' + this.state.contact);
        }
        else {
            alert('You are not logged in!!!');
            this.props.navigation.navigate('Login');
        }
    }

    handleLogout = () => {
        firebase.auth().signOut().then(function () {
            Toast.show({
                text: "Signed Out!",
                buttonText: "Okay",
                duration: 3000
            })
        }, function (error) {
            alert('Sign Out Error', error);
        });
        this.props.navigation.navigate('UserDashboard');
    }

    updateprofile = (name, mobile, loc) => {
        firebase.database().ref('users/' + userId.uid).update({
            Name: name,
            //Contact: mobile,
            //Location:loc
        });
        firebase.database().ref('users/' + userId.uid).update({
            // Name:name,
            Contact: mobile,
            //Location:loc
        });
        firebase.database().ref('users/' + userId.uid).update({
            // Name:name,
            //Contact: mobile,
            Location: loc
        });

        alert('succussful');
        this.componentWillMount();
    }

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

                    <Right >
                    <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.handleLogout()}>
                            <Text style={styles.buttonText}>LOG OUT</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.user}>
                    {/* <Text>USERS</Text>
                    <Text>Name: {username}</Text>
                    <Text>Contact: {contact}</Text>
                    <TouchableOpacity onPress={() => this.handleLogout()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity> */}
                    <Image style={styles.userImage} source={require('./user.jpg')} />
                    <ActivityIndicator size="large" color="#203546" animating={this.state.username==''?true:false} />

                </View>
                <ScrollView>
                    <View>
                        <Text style={styles.text}>Full Name</Text>
                        <TextInput style={styles.textinput}
                            value={this.state.username}
                            onChangeText={(name) => { this.setState({ name: name }); }} />

                        <Text style={styles.text}>MOBILE NUMBER</Text>
                        <TextInput style={styles.textinput}
                            value={this.state.contact}
                            onChangeText={(mobile) => { this.setState({ mobile: mobile }); }}
                        />

                        <Text style={styles.text}>EMAIL</Text>
                        <TextInput style={styles.textinput}
                        caretHidden={true}
                        value={this.state.email}
                        />

                        <Text style={styles.text}>LOCATION</Text>
                        <TextInput style={styles.textinput}
                            value={this.state.location}
                            onChangeText={(loc) => { this.setState({ loc: loc }); }}
                        />
                    </View>
                    <TouchableOpacity style={styles.change_pass}
                        onPress={() => this.props.navigation.navigate('Change_Pass')} >
                        <Text style={{ padding: 5, color: 'orange' }}>CHANGE PASSWORD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.save_details}
                        onPress={() => this.updateprofile(this.state.name, this.state.mobile, this.state.loc)}>
                        <Text style={{ color: 'white'}}>SAVE DETAILS</Text>
                    </TouchableOpacity>
                </ScrollView>

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
    user: {
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        //flexDirection : 'column',
        height: 200,
    },

    userImage: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
    },

    text: {
        height: 30,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        //borderWidth: 1,
        paddingTop: 10,
    },

    textinput: {
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        // marginTop: 2,
        borderBottomWidth: 1,
        //borderWidth: 1,
    },
    header: {
        backgroundColor: 'orange',
        height: 60,
        width: window.width,
    },
    save_details: {
        backgroundColor: 'orange',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    change_pass: {
        borderColor: 'orange',
        marginTop: 30,
        borderWidth: 2,
        alignSelf: 'center',
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer:{
        //backgroundColor: 'orange',
        height: 30,
        width: 60,
        alignItems: 'center',
       justifyContent: 'center',

    },
    buttonText: {
        fontWeight:'bold'
    }

})