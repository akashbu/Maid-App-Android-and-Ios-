import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    KeyboardAvoidingView,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { Header, Left, Right, Body, Container } from 'native-base';
import { Toast } from 'native-base';
import {TextInput} from 'react-native-paper';
const firebase = require("firebase");
var userId;

export default class SignupForm extends Component {

    constructor() {
        super();
        this.state = {
            pressLogin: false,
            pressSignup: true,
            name: '',
            email: '',
            mobile: '',
            location: '',
            spass: '',
            cpass: ''
        };
    }

    componentDidMount() {
        alert('Signup')
        this.setState({pressLogin:false, pressSignup:true})
    }

    handleSignup(email, spass, mobile, name) {

        if (this.state.spass.length < 6) {
            alert("please enter at least 6 characters")
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, spass)
            .then(() => {
                userId = firebase.auth().currentUser;
                if (userId) {
                    firebase.database().ref('/users/' + userId.uid).set({
                        Name: this.state.name,
                        Contact: this.state.mobile,
                        Location: this.state.location,
                        Currentmaids: []
                    })
                }
                Toast.show({ text: 'Signup Success', buttonText: 'Okay' });
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    loginPress() {
        //this.setState({ pressLogin: true, pressSignup: false });
        this.props.navigation.navigate('LoginForm');
    }

    signupPress() {
        this.setState({ pressLogin: false, pressSignup: true });
    }

    regSuccess() {
        var err = false;
        if (this.state.name.length == 0 || this.state.email.length == 0 || this.state.mobile.length != 10) {
            alert('Please fill all details properly!');
            err = true;
        }
        if (this.state.spass.length == 0 || this.state.spass != this.state.cpass) {
            alert('Passwords do not match!');
            err = true;
        }
        if (!err) {
            ToastAndroid.show('You are registered successfully!', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginForm')}>
                            <Image source={require('./back_button.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Signup</Text>
                    </Body>
                    <Right />
                </Header>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.bcontainer}>
                        <TouchableOpacity
                            onPress={() => this.loginPress()}
                            style={this.state.pressLogin ? styles.selectContainer : styles.unselectContainer} >
                            <Text style={this.state.pressLogin ? styles.btext2 : styles.btext1}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.signupPress()}
                            style={this.state.pressSignup ? styles.selectContainer : styles.unselectContainer} >
                            <Text style={this.state.pressSignup ? styles.btext2 : styles.btext1}>SIGNUP</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        label="Name"
                        //underlineColorAndroid="black"
                        onChangeText={(name) => { this.setState({ name: name }); }} />
                    <TextInput
                        style={styles.input}
                        label="Email"
                        keyboardType="email-address"
                        //underlineColorAndroid="rgba(0,0,0,1)"
                        onChangeText={(email) => { this.setState({ email: email }); }} />
                    <TextInput
                        style={styles.input}
                        label="Mobile No."
                        //underlineColorAndroid="black"
                        onChangeText={(mobile) => { this.setState({ mobile: mobile }); }} />
                    <TextInput
                        style={styles.input}
                        label="Location"
                        //underlineColorAndroid="black"
                        onChangeText={(location) => { this.setState({ location: location }); }} />
                    <TextInput
                        style={styles.input}
                        label="Set Password"
                        secureTextEntry={true}
                        //underlineColorAndroid="black"
                        onChangeText={(spass) => { this.setState({ spass: spass }); }} />
                    <TextInput
                        style={styles.input}
                        label="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={(cpass) => { this.setState({ cpass: cpass }); }} />
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.handleSignup(this.state.email, this.state.spass, this.state.mobile, this.state.name)}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 15
    },
    bcontainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectContainer: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange'
    },
    unselectContainer: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'orange',
        borderWidth: 2,
    },
    btext1: {
        color: '#ef7215',
        fontSize: 20
    },
    btext2: {
        color: 'white',
        fontSize: 20
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 20,
        color: 'grey',
        // paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 50,
        height: 50
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    subtext: {
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        margin: 20
    },
    header: {
        backgroundColor: 'orange',
        height: 60,
        width: window.width
        //borderBottomWidth: 3,
    },
})