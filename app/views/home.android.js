import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View>
                <Text>Welcome to Home !</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('Home', () => Held);