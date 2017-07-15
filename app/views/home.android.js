import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handlePosts();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            //todo: remove style in-line
            headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Image source={require('Held/app/assets/images/camera.png')} style={{ width: 30, height: 30, marginRight: 20 }} />
            </TouchableOpacity>
        }
    };

    handlePosts = () => {
        const friends = new GraphRequest('/me/friends', null, (error, result) => {
            if (!error) this.setPosts(result.data);
        });
        new GraphRequestManager().addRequest(friends).start();
    }

    setPosts = friends => {
        console.log(friends);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Image source={{ uri: "http://fuzzco.com/wp-content/uploads/2015/02/081-800x800.png" }} style={styles.image} />
                    </View>
                    <View>
                        <Image source={{ uri: "http://www.trutower.com/wp-content/uploads/2013/11/Snapchat-logo-620x412.jpg" }} style={styles.image} />
                    </View>
                    <View>
                        <Image source={{ uri: "https://d1nept1345ks2.cloudfront.net/static/images/og_fatsecret.png" }} style={styles.image} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 250,
    },
});

AppRegistry.registerComponent('Home', () => Home);