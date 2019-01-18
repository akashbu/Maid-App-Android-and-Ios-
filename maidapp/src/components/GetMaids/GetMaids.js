import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, ScrollView, TextInput, ListView, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Body, List, ListItem, Thumbnail, Text, Accordion } from 'native-base';
import {Button, Card, Title, Paragraph } from 'react-native-paper';
const firebase = require('firebase');

var worktype = [];

var dataArray = [];
export default class GetMaids extends Component {

    constructor(props) {
        super(props);
        this.tasksRef = firebase.database().ref('/maids/');
        this.state = {
            username: '',
            userid: '',
            contact: '',
            animating: true,
            workTypes: [],
            maidsData: [],
            userLoc: ''
        };
    }

    setMaids = () => {

        firebase.database().ref('/maids').once('value', (snapshot) => {
            // alert(snapshot.val());
            var maids = [];
            var locToMatch = this.state.userLoc;
            var workToMatch = this.state.workTypes;
            var works = [];
            snapshot.forEach(function (element) {

                // works = element.val().Worktype;
                // var maidsWorks = {};
                // works.forEach(function(work) {
                //     maidsWorks[work] = true;
                // });
                // alert(maidsWorks['Cooking']);

                if (element.val().Workarea.toString() == locToMatch.toString()) {

                    var temp = {
                        uid: element.key,
                        name: element.val().Name,
                        age: element.val().Age,
                        contact: element.val().Contact,
                        workarea: element.val().Workarea,
                        worktype: element.val().Worktype
                    }
                    maids.push(temp);
                }
            });

            this.setState({ maidsData: maids });

            this.state.maidsData.forEach(function (item) {
                var temp = {
                    title:  {
                                Id: item.uid, 
                                Name: item.name
                            },
                    content: {
                                Contact: item.contact,
                                Age: item.age,
                                Workarea: item.workarea,
                                Worktype: item.worktype
                            }
                }

                dataArray.push(temp);

            });
            if (dataArray.length == 1) {
                dataArray.push({
                    title: '',
                    content: ''
                });
            }

        });
    }

    componentWillMount() {
        worktype = this.props.navigation.getParam('work', 'none');
        this.setState({ workTypes: worktype });

        var userId = firebase.auth().currentUser;
        if (userId) {
            firebase.database().ref('/users/' + userId.uid).on('value', (snapshot) => {
                this.setState({ userid: userId.uid, username: snapshot.val().Name, userLoc: snapshot.val().Location });
            });
        }
        else {
            alert('You are not logged in!!!');
            this.props.navigation.navigate('Login');
        }
        this.setMaids();
    }

    handleRequest = (maidname, maidno, maidid) => {

        fetch('http://192.168.43.9:4000/', {
            method: 'POST',
            body: JSON.stringify({
                user: this.state.username,
                maid: maidname,
                maidno: maidno,
                userid: this.state.userid,
                maidid: maidid
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                return response.json()
            })
            .catch(error => console.log(error));
    }

    _renderHeader = (dataArray, expanded) => {
        return (
            <View style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "lightgrey" }} >
                <Text style={{ fontWeight: "500" }}>
                    {" "}{dataArray.title.Name}
                </Text>

                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
        )
    }

    _renderContent = (dataArray) => {
        var id = dataArray.title.Id;
        var name = dataArray.title.Name;
        var cont = dataArray.content.Contact;
        return (
            <View>
                <Text style={{ padding: 10 }} >
                    Contact: {dataArray.content.Contact}
                </Text>
                <Text style={{ padding: 10 }}>
                    Age: {dataArray.content.Age}
                </Text>
                <Text style={{ padding: 10 }}>
                    Work Area: {dataArray.content.Workarea}
                </Text>
                <Text style={{ padding: 10 }}>
                    Worktype: {dataArray.content.Worktype}
                </Text>
                <TouchableOpacity style={{justifyContent:'center', alignSelf:'center'}} onPress={() => this.handleRequest(name,cont,id)} >
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>

        );
    }

    render() {

        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'orange' }}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard')}>
                            <Image source={require('./back_button.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Maids</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ActivityIndicator size="large" color="#203546" animating={this.state.maidsData.length == 0 ? true : false} />

                    <Accordion
                        dataArray={dataArray}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                    />

                    {/* <Card>
                        <Card.Content>
                            <Title>Maid Name</Title>
                            <Paragraph>Maid Details</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{uri: 'user.jpg'}}/>
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Confirm</Button>
                        </Card.Actions>
                    </Card> */}
                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    listView: {
        margin: 5,
    },
})