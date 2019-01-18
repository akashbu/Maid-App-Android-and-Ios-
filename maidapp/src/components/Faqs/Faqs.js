import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Accordion, Body } from 'native-base';
import { List, ListItem } from 'react-native-elements';


const regArray = [
    {
        title: "How do I register?",
        content:
            "You can register by clicking on Profile icon on the top right corner of the Home Page. Please provide the information in the form that appears."
    },
    {
        title: "Are there any charges for registration?",
        content:
            "No. Registration on MaidHive is absolutely free!"
    },
    {
        title: "Can I have multiple accounts with same email-id & mobile number?",
        content:
            "Each email-id and mobile number can be associated with only one MaidHive account only."
    },
];

const accArray = [
    {
        title: "What is My Account?",
        content:
            "My Account is a section you reach after you login at MaidHive. It allows you to view your shortlisted maids and their contact details."
    },
    {
        title: "How do I reset my password?",
        content:
            "You need to enter your email-id on the login page and click on \"Forgot Password\". An email with reset password will be sent to your email address."
    },
    {
        title: "How do I shortlist my maids?",
        content:
            "Select the category you want your maid to work for. Next, select the convenient time slots and get recommended maids. You can then shortlist the maids or apply filters for more precision."
    },
]

const regArray1 = [
    {
        title: "How do I register?",
        content:
            "You can register by clicking on Profile icon on the top right corner of the Home Page. Please provide the information in the form that appears."
    },
    {
        title: "Are there any charges for registration?",
        content:
            "No. Registration on MaidHive is absolutely free!"
    },
    {
        title: "Can I have multiple accounts with same email-id & mobile number?",
        content:
            "Each email-id and mobile number can be associated with only one MaidHive account only."
    },
];

const accArray1 = [
    {
        title: "What is My Account?",
        content:
            "My Account is a section you reach after you login at MaidHive. It allows you to view your shortlisted maids and their contact details."
    },
    {
        title: "How do I reset my password?",
        content:
            "You need to enter your email-id on the login page and click on \"Forgot Password\". An email with reset password will be sent to your email address."
    },
    {
        title: "How do I shortlist my maids?",
        content:
            "Select the category you want your maid to work for. Next, select the convenient time slots and get recommended maids. You can then shortlist the maids or apply filters for more precision."
    },
]


export default class Faqs extends Component {
    render() {
        return (
            <Container >
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDashboard')}>
                            <Image source={require('../Location/back_button.png')} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>FAQs</Text>
                    </Body>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Registration</Text>
                        <Accordion
                            dataArray={regArray}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "orange", margin: 3 }}
                            contentStyle={{ backgroundColor: "white", margin: 3 }}
                        />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Account Related</Text>
                        <Accordion
                            dataArray={accArray}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "orange", margin: 3 }}
                            contentStyle={{ backgroundColor: "white", margin: 3 }}
                        />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Registration</Text>
                        <Accordion
                            dataArray={regArray1}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "orange", margin: 3 }}
                            contentStyle={{ backgroundColor: "white", margin: 3 }}
                        />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Account Related</Text>
                        <Accordion
                            dataArray={accArray1}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "orange", margin: 3 }}
                            contentStyle={{ backgroundColor: "white", margin: 3 }}
                        />
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'orange',
        height: 60,
        width: window.width
        //borderBottomWidth: 3,
    },
})