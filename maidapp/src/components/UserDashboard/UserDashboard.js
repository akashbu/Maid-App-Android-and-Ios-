import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, List, TextInput, TouchableOpacity, StatusBar, Alert, Image, Picker, ScrollView, Drawer, YellowBox, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon, Button, Container, Header, Content, Left, Right, Body } from 'native-base';
import Geocoder from 'react-native-geocoder';
import Swiper from 'react-native-swiper';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import RadioButton from 'radio-button-react-native';
import CheckboxFormX from 'react-native-checkbox-form';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const firebase = require("firebase");
var workArr = [false, false, false, false, false, false, false, false];
var timeArr = [false, false, false, false, false, false];
var timeSlots = ['Earlymorning', 'Morning', 'Afternoon', 'Evening', 'Halfday', 'Fullday'];
var address = '';
var work;
var pressWork = [0, 0, 0, 0, 0, 0, 0, 0];
var pressTime = [0, 0, 0, 0, 0, 0];

export default class UserDashboard extends Component {

    constructor() {
        super()
        this.timeType = this.timeType.bind(this);
        this.getType = this.getType.bind(this);
        this.state = {
            city: '',
            work: [],
            value: 0,
            time: '',
            //worktype: ''
        }
    }

    _onSelect = (item) => {
        console.log(item);
    }

    handleOnPress(value) {
        this.setState({ value: value })
    }

    updateCity = (city) => {
        this.setState({ city: city })
    }

    getType = (work, index) => {

        if (pressWork[index] % 2 == 0)
        {
            var prevWork = this.state.work;
            prevWork.push(work);
            this.setState({ work: prevWork });
        }
        else {
            var tempWork = [];
            this.setState({ work: tempWork });
        }

        workArr[index] = !workArr[index]
        pressWork[index] += 1;
        //alert(this.state.work);
        //Alert.alert(work)
    }

    timeType = (time, index) => {

        if (pressTime[index] % 2 == 0)
            this.setState({ time: time + ' ' + this.state.time });
        else {
            var tempTime = this.state.time.replace(time, "");
            this.setState({ time: tempTime });
        }

        timeArr[index] = !timeArr[index]
        pressTime[index] += 1;
        //alert(this.state.time);
        //alert(this.state.time)
    }

    nextClick = () => {
        if (this.state.work.length == 0)
        {
            alert('Please Select Type of Work');
        }
        else {
            for (var i = 0; i < 6; i++) {
                workArr[i] = false;
                timeArr[i] = false;
            }

            this.props.navigation.navigate('GetMaids', { work: this.state.work });
        }

    }

    render() {

        return (

            <ScrollView style={styles.container}>
                <StatusBar hidden={true} />
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('./menu.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Dashboard</Text>
                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')}>
                            <Text>Get Location: {JSON.stringify(this.props.navigation.getParam('address', 'no-ad'))}</Text>
                        </TouchableOpacity> */}
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image source={require('./profile.png')} />
                        </TouchableOpacity>
                    </Right>
                </Header>

                <View style={styles.subarea1}>
                    <Swiper ref='swiper1' showsButtons={false} loop={true} autoplay={true} autoplayTimeout={2.5}>
                        <View style={styles.navarea}>
                            <Image source={require('./maid_ad1.jpg')} style={styles.navimg} />
                        </View>
                        <View style={styles.navarea}>
                            <Image source={require('./maid_ad1.jpg')} style={styles.navimg} />
                        </View>
                        <View style={styles.navarea}>
                            <Image source={require('./maid_ad1.jpg')} style={styles.navimg} />
                        </View>
                    </Swiper>
                </View>

                <View style={styles.subarea2}>
                    <View style={styles.navarea2}>

                        <View>
                            <Text style={styles.text}>What do you want your maid to do?</Text>
                        </View>
                        <View style={styles.gridstyle}>
                            <Grid>
                                <Row>
                                    <Col style={workArr[0] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Cleaning', 0)} >
                                            <Image source={require('./maid.png')} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Cleaning</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={workArr[1] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Washing', 1)}>
                                            <Image source={require('./washing-machine.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Washing</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={workArr[2] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Childcare', 2)}>
                                            <Image source={require('./ampoule.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Child Care</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={workArr[3] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Housekeeping', 3)}>
                                            <Image source={require('./iron.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>House Keeping</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={workArr[4] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Cooking', 4)}>
                                            <Image source={require('./chef-hat.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Cooking</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={workArr[5] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Carwash', 5)}>
                                            <Image source={require('./car.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Car Wash</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={workArr[6] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Utensilwash', 6)}>
                                            <Image source={require('./pan.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Utensils Washing</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={workArr[7] ? styles.workselect : styles.workunselect}>
                                        <TouchableOpacity onPress={() => this.getType('Eldercare', 7)}>
                                            <Image source={require('./couple.png')} style={{ margin: 5 }} />
                                            <Text style={{ fontSize: 15, color: 'black' }}>Elder Care</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                    </View>

                </View>

                <View style={styles.subarea3}>
                    <TouchableOpacity onPress={() => this.nextClick()} style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', width: 100, height: 40, borderRadius: 20 }}>
                        <Text style={{ fontSize: 15 }}>FIND MAIDS</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        )
    }
}



const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'orange',
        height: 60,
        borderColor: 'orange',
        //borderBottomWidth: 3,
    },
    citypicker: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        height: 50,
        width: 390,
    },

    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'black'
    },

    navarea: {
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.height / 3.7,
        width: window.width
    },

    navimg: {
        height: window.height / 3.7,
        width: window.width
    },

    navarea2: {
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: window.height / 1.5,
        width: window.width / 1.05,
        borderColor: 'orange',
        borderWidth: 2,
    },

    gridstyle: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        height: 200,
        width: 380,
        justifyContent: 'center',
    },

    timestyle: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        height: 200,
        width: 380,
        justifyContent: 'flex-start',
    },

    subarea1: {
        marginBottom: 0,
        alignItems: 'center',
        height: 220,
    },

    subarea2: {
        //backgroundColor: 'orange',
        //justifyContent: 'center',
        alignItems: 'center',
        height: 480,
        //width: 400,
        borderColor: 'black',
        borderBottomWidth: 2,
        borderTopWidth: 2,
    },

    subarea3: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },

    grid: {
        flex: 1,
        margin: 10,
        marginTop: 0
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    workselect: {
        margin: 5,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        width: window.width / 2.3,
        height: window.height / 7.3
    },

    workunselect: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 2,
        width: window.width / 2.3,
        height: window.height / 7.3
    },

    timeselect: {
        margin: 8,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        height: window.height / 14
    },

    timeunselect: {
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'orange',
        borderWidth: 2,
        height: window.height / 14
    },

})