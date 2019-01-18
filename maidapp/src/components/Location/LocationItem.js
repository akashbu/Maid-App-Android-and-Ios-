import React, { Component, PureComponent } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default class LocationItem extends Component {
    
    _handlePress = async () => {
        const res = await this.props.fetchDetails(this.props.place_id)
        Alert.alert(JSON.stringify(res.formatted_address))
    }
    
    render() {
        return (
            <TouchableOpacity style={styles.root} onPress={this._handlePress}>
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    root: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    }
})