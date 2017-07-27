import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import * as firebase from 'firebase';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        };
        this._onRefresh();
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

    _onRefresh = async () => {
        const feeds = await this.getFeed();
        const posts = this.getPostsByFeed(feeds);
        Promise.all(posts).then(snapshot => {
            this.setState({ posts: snapshot });
        });
    }

    getFeed = () => {
        const user = firebase.auth().currentUser;
        const ref = firebase.database().ref();
        return ref.child(`/feed/users/${user.uid}`).once('value').then(snapshot => snapshot.val());
    }

    getPostsByFeed = feeds => {
        return Object.values(feeds).map(feed => {
            return firebase.database().ref().child(`/feed/posts/${feed.uid}/${feed.postId}`)
                .once('value').then(snapshot => snapshot.val());
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={() => this._onRefresh()}
                />
            }>
                {this.renderPosts()}
            </ScrollView>
        );
    }

    renderPosts() {
        if (this.state.posts !== null) {
            return this.state.posts.reverse().map((post, key) => {
                return (
                    <Image key={key} source={{ uri: post.url }} style={styles.image} indicator={ProgressBar} />
                );
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 300,
    },
});

AppRegistry.registerComponent('Home', () => Home);