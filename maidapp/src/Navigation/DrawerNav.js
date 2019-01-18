import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Body } from 'native-base';
import { createDrawerNavigator, createStackNavigator, DrawerItems, createAppContainer } from 'react-navigation';
import UserDashboard from '../components/UserDashboard/UserDashboard';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Signup/SignupForm';
import Faqs from '../components/Faqs/Faqs';
import MyMaids from '../components/MyMaids/MyMaids';
import Location from '../components/Location/LocationScreen';
import Profile from '../components/Profile/Profile';
import ReferMaid from '../components/ReferMaid/ReferMaid';
import GetMaids from '../components/GetMaids/GetMaids';
import Change_Pass from '../components/Profile/Change_Pass';
import ForgotPassword from '../components/Login/ForgotPassword';
import SplashScreen from '../components/UserDashboard/SplashScreen';

const StackDashboard = createStackNavigator({

    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    UserDashboard: {
        screen: UserDashboard,
        navigationOptions: () => ({
            header: null
        })
    },
    Location: {
        screen: Location,
        navigationOptions: () => ({
            header: null
        })
    },
    GetMaids: {
        screen: GetMaids,
        navigationOptions: () => ({
            header: null
        })
    },
    
        initialRouteName: UserDashboard
    
});

// const StackLocation = createStackNavigator({
//     Location: {
//         screen: Location,
//         navigationOptions: () => ({
//             header: null
//         })
//     }
// });

const StackLogin = createStackNavigator({
    LoginForm: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            header: null,
        })
    },
    SignupForm: {
        screen: SignupForm,
        navigationOptions: ({ navigation }) => ({
            header: null,
        })
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: ({ navigation }) => ({
            header: null,
        })
    },
    initialRouteName: LoginForm
    
});


const StackFaqs = createStackNavigator({
    Faqs: {
        screen: Faqs,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
});

// const StackSignup = createStackNavigator({
//     SignupForm: {
//         screen: SignupForm,
//         navigationOptions: ({ navigation }) => ({
//             title: 'Login/Signup',
//         })
//     }
// });

const StackMyMaids = createStackNavigator({
    MyMaids: {
        screen: MyMaids,
        navigationOptions: () => ({
            header: null
        })
    }
});

const StackReferMaid = createStackNavigator({
    ReferMaid: {
        screen: ReferMaid,
        navigationOptions: () => ({
            header: null
        })
    }
});

const StackProfile = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            header: null
        })
    },
    Change_Pass: {
        screen: Change_Pass,
        navigationOptions: () => ({
            header: null
        })
    }
});

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{ backgroundColor: '#ef7215', height: 150 }}>
            <Body>
                <Image
                    source={require('./user.png')}
                    style={{ alignSelf:'center', height:80, width:80 }} />
            </Body>
        </Header>

        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
)

const MyDrawer = createDrawerNavigator({
    'Dashboard': {
        screen: StackDashboard
    },
    'Login': {
        screen: StackLogin
    },
    // 'Signup': {
    //     screen: StackSignup
    // },
    // 'My Maids': {
    //     screen: StackMyMaids
    // },
    // 'Location': {
    //     screen: StackLocation
    // },
    'FAQs': {
        screen: StackFaqs
    },
    'Profile': {
        screen: StackProfile
    },
    'Refer Maid': {
        screen: StackReferMaid
    }
}, {
        contentOptions: {
            activeTintColor: '#ef7215',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'grey',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
            },
        },
        contentComponent: CustomDrawerContentComponent,
        initialRouteName: 'Dashboard',
    });

export default Drawer = createAppContainer(MyDrawer);