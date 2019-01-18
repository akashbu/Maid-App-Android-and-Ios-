import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { Header, Left, Container, Right, Body } from 'native-base';
const firebase = require("firebase");


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
        }
    }

    forgot_password = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            alert('paswword reset link has been sent to your email');
            this.setState({email:''});
            this.props.navigation.navigate('LoginForm');
        })
            .catch((error) => {
                alert(error);
            })
          
    }

    render() {
        return (
            <View>
              
                    <Header style={styles.header}>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard')}>
                                <Image source={require('./back_button.png')} />
                            </TouchableOpacity>
                        </Left>
                        <Body>

                        </Body>
                        <Right />
                    </Header>
              
                    <TextInput 
                    style={styles.textinput}
                    placeholder="Enter Email"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    onChangeText={(email) => { this.setState({ email: email }); }}/>

                    <TouchableOpacity style={styles.forgotpass}
                    onPress={() => this.forgot_password()}
                >
                    <Text style={{ color: 'white' }}>SEND LINK</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ef7215',
        height: 60,
        width: window.width,
    },
    textinput: {
        height: 37,
        marginLeft: 13,
        marginRight: 13,
        marginTop: 130,
        borderWidth: 1,
        padding: 7,
        justifyContent:'center',
        alignItems:'center'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    forgotpass: {
        backgroundColor: 'orange',
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 7,
        alignSelf: 'center',
    },
});
