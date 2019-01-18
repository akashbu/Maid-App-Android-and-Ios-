import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    KeyboardAvoidingView,
    Dimensions,
    Image
} from 'react-native';
import { Header, Left, Right, Body, Container } from 'native-base';
const firebase = require("firebase");
import { Toast } from 'native-base';
import {TextInput, ToggleButton} from 'react-native-paper';

var username = 'Anonymous', contact = '+91XXXXXXXXXX'
export default class LoginForm extends Component {

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.unsubscriber = null;
        this.state = {
            pressLogin: true,
            pressSignup: false,
            email: '',
            password: '',
            errorMessage: null,
            userName: '',
            userContact: '',
            user: null,
            flag: 0,
            status: 'checked'
        };
    }
    /*
    componentDidMount(){
        this.unsubscriber=firebase.auth().onAuthStateChanged((changeUser) => {
            this.setState({user:changeUser});
        });
        GoogleSignin.configure({
            iosClientId:'',
        })
        .then(()=>{

        })
    }
    */

    componentDidMount() {
        alert('Login')
        this.setState({pressLogin:true, pressSignup:false})
    }

    handleLogin() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                Toast.show({
                    text: 'Login Success',
                    buttonText: 'Okay',
                    duration: 1500
                }),
                this.setState({ flag: 1 })
            )
            .catch((error) => {
                alert(error.message);
                this.setState({ flag: 0 })
            })
        
    }

    loginPress() {
        this.setState({ pressLogin: true, pressSignup: false });
    }

    signupPress() {
        this.setState({ pressLogin: false, pressSignup: true });
        this.props.navigation.navigate('SignupForm');
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard')}>
                            <Image source={require('./back_button.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
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
                    {/* <ToggleButton
                        icon="login.png"
                        value="login"
                        status={this.state.pressLogin}
                        onPress={() => this.loginPress()}
                    /> */}
                    <TextInput
                        style={styles.input}
                        mode="flat"
                        label="Email"
                        // placeholderTextColor="grey"
                        keyboardType="email-address"
                        underlineColor="grey"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email: email })}
                    />
                    <TextInput
                        style={styles.input}
                        mode="flat"
                        label="Password"
                        // placeholderTextColor="grey"
                        underlineColor="grey"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password: password })}
                    />

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={{color:'orange'}}>Forgot Password?</Text>
                    </TouchableOpacity>


                </View>
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
        // height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        // color: 'black',
        // paddingHorizontal: 10,
        // borderRadius: 30
    },
    buttonContainer: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 50,
        height: 50,
        margin: 10
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