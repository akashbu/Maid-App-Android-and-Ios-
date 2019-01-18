import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert, KeyboardAvoidingView } from 'react-native';
import { Toast } from 'native-base';
const firebase = require("firebase");
var userId;

var pressView = [false, false, false, false, false, false, false];
var pressWork = [false, false, false, false, false, false, false];

export default class ReferMaid extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            workarea: '',
            mobno: '',
            age: '',
            worktype: []
        };
    }

    setWork = (work, index) => {
        var prevWork = this.state.worktype;
        prevWork.push(work);
        this.setState({ worktype: prevWork });
        pressWork[index] = !pressWork[index];
    }

    handleRefer = (name, age, mobno, workarea, worktype) => {

        firebase.database().ref('maids/').push({
            Name: name,
            Age: age,
            Contact: mobno,
            Workarea: workarea,
            Worktype: worktype,
            Currentjobs: []
        });
        Toast.show({ text: 'Maid Added Successfully', buttonText: 'Okay' });

        for (var i = 0; i < 7; i++) {
            pressView[i] = false;
            pressWork[i] = false;
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="grey"
                    //underlineColorAndroid="black"
                    onChangeText={(name) => { this.setState({ name: name }); }} />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="grey"
                    //underlineColorAndroid="black"
                    onChangeText={(age) => { this.setState({ age: age }); }} />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile No"
                    placeholderTextColor="grey"
                    //underlineColorAndroid="rgba(0,0,0,1)"
                    onChangeText={(mobno) => { this.setState({ mobno: mobno }); }} />
                <TextInput
                    style={styles.input}
                    placeholder="Work Area"
                    placeholderTextColor="grey"
                    //underlineColorAndroid="black"
                    onChangeText={(workarea) => { this.setState({ workarea: workarea }); }} />



                <View style={{ margin: 10 }}>
                    <Text>Type of Work</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Cooking', 0)}>
                            <View style={pressWork[0] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Cooking</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Cleaning', 1)}>
                            <View style={pressWork[1] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Cleaning</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Washing', 2)}>
                            <View style={pressWork[2] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Washing</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Housekeeping', 3)}>
                            <View style={pressWork[3] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>House Keeping</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Carwash', 4)}>
                            <View style={pressWork[4] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Car Wash</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Childcare', 5)}>
                            <View style={pressWork[5] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Child Care</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setWork('Eldercare', 5)}>
                            <View style={pressWork[6] ? styles.selectView : styles.unselectView}></View>
                        </TouchableOpacity>
                        <Text>Elder Care</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.handleRefer(this.state.name, this.state.age, this.state.mobno, this.state.workarea, this.state.worktype)}>
                    <Text style={styles.buttonText}>REFER</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50
    },
    bcontainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        //backgroundColor: 'steelblue',
        marginBottom: 20,
        color: 'grey',
        paddingHorizontal: 10,
        borderRadius: 30
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
    unselectView: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'steelblue',
        flexDirection: 'row'
    },
    selectView: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'steelblue',
        flexDirection: 'row',
        backgroundColor: 'steelblue'
    },

})
