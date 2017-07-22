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

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            friends: [],
        };
        this.handleFriends();
        this.handlePosts();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerTitleStyle: { alignSelf: 'center' },
            headerLeft:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Image source={require('Held/app/assets/images/camera.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
            </TouchableOpacity>,
            headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Image source={require('Held/app/assets/images/camera.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
            </TouchableOpacity>
        }
    };

    handleFriends = () => {
        const user = firebase.auth().currentUser;
        firebase.database().ref(`/users/${user.uid}/friendList`).on('value', snapshop => {
            this.setState({ friends: snapshop.val() });
        });
    }

    handlePosts = () => {
        const ref = firebase.database().ref('posts');
        ref.orderByChild('negativeTimestamp').on('child_added', snapshop => {
            this.setPost(snapshop.val());
        });
    }

    setPost = post => {
        if (this.state.friends.indexOf(post.uid) >= 0)
            this.setState({
                posts: this.state.posts.concat([post]),
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderPosts()}
                </ScrollView>
            </View>
        );
    }

    renderPosts() {
        return this.state.posts.map((post, key) => {
            return (
                <Image key={key} source={{ uri: post.url }} style={styles.image} />
            );
        });
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