import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { Header, Left, Container, Right, Body } from 'native-base';
const firebase = require("firebase");
export default class Change_Pass extends Component {
    constructor(){
        super();
        this.state={
            current_pass:'',
            new_pass:'',
            confirm_pass:''
        }
    }

    reauthenticate = () => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, this.state.current_pass);
    return user.reauthenticateWithCredential(cred);
}

ChangePassword = (curr_pass, new_pass, confirm_pass) => {
    if(new_pass == confirm_pass)
    {
        this.reauthenticate().then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(new_pass).then(() => {
                alert('Password updated!');
            }).catch((error) => { alert(error); });
        }).catch((error) => { alert(error); });
        this.setState({current_pass:'', new_pass:'', confirm_pass:''});
        this.props.navigation.navigate('Profile');
    }
    else{
        alert('Passwod dont match!Try again.')
    }
    
}

render() {
    return (
        <View style={styles.view1}>
            <Header style={styles.header}>
                <Left>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                        <Image source={require('./back_button.png')} />
                    </TouchableOpacity>
                </Left>
                <Body>

                </Body>
                <Right />
            </Header>
            <View style={styles.view2}>
                <Text style={styles.text}>Old Password</Text>
                <TextInput style={styles.textinput}
                    placeholder="Enter current password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={(current_pass) => { this.setState({ current_pass: current_pass }); }} />

                <Text style={styles.text}>New Password</Text>
                <TextInput style={styles.textinput}
                    placeholder="Enter New password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={(new_pass) => { this.setState({ new_pass: new_pass }); }} />

                <Text style={styles.text}>Confirm New Password</Text>
                <TextInput style={styles.textinput}
                    placeholder="Retype New password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}

                    onChangeText={(confirm_pass) => { this.setState({ confirm_pass: confirm_pass }); }} />

                <TouchableOpacity style={styles.changepass}
                    onPress={() => this.ChangePassword(this.state.current_pass, this.state.new_pass, this.state.confirm_pass)}
                >
                    <Text style={{ color: 'white', backgroundColor: 'ornage' }}>CHANGE PASSWORD</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
}
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'orange',
        height: 60,
        width: window.width,
    },
    view1: {
        backgroundColor: '#E0E0E0',
        flex: 1,
    },
    view2: {
        backgroundColor: 'white',
        height: 360,
        marginTop: 13,
        marginLeft: 35,
        marginRight: 35,
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
        height: 37,
        marginLeft: 10,
        marginRight: 10,
        // marginTop: 2,
        borderWidth: 1,
        padding: 7,
    },
    changepass: {
        backgroundColor: 'orange',
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 7,
        alignSelf: 'center',
    },
})