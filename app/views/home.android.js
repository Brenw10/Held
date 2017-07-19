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
            posts: null,
        };
        this.handlePosts();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            //todo: remove style in-line
            headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Image source={require('Held/app/assets/images/camera.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
            </TouchableOpacity>
        }
    };

    handlePosts = () => {
        firebase
            .database().ref(`posts`)
            .limitToLast(10000).on('value', snapshot => {
                const posts = Object.entries(snapshot.val());
                posts.reverse();
                this.setState({ posts: posts });
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
        const posts = this.state.posts;
        if (posts !== null) {
            return posts.map(post => {
                return (
                    <Image key={post[0]} source={{ uri: post[1].url }} style={styles.image} />
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
        height: 250,
    },
});

AppRegistry.registerComponent('Home', () => Home);