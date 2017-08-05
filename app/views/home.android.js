import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    AsyncStorage,
    Text,
    View,
} from 'react-native';
import { Card, ListItem, Icon, SideMenu } from 'react-native-elements';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null,
            refreshing: false
        };

        this._onRefresh();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home',
            headerTitleStyle: { alignSelf: 'center' },
            headerLeft: <Icon name='menu' style={{ marginLeft: 15 }} />,
            headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Icon name='create' style={{ marginRight: 15 }} />
            </TouchableOpacity>,
        }
    };

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const token = await AsyncStorage.getItem('token');
        const posts = await this.getPosts(token);
        this.setState({ posts: posts, refreshing: false });
    }

    getPosts = token => {
        return fetch('http://198.58.104.208:8080/api/posts', {
            headers: {
                'access-token': token,
            }
        }).then(response => response.json());
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                />
            }>
                {this.renderPosts()}
            </ScrollView>
        );
    }

    renderPosts() {
        if (this.state.posts === null) return;
        return this.state.posts.map((post, key) => {
            return (
                <Card key={key}
                    imageStyle={styles.cardImage}
                    image={this.renderCardImage(post)}>
                    <Text style={styles.cardText}>{post.text}</Text>
                    <View style={styles.cardButton}>
                        <TouchableOpacity style={styles.fullsize}>
                            <Icon name='chat-bubble-outline' />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fullsize}>
                            <Icon name='favorite-border' />
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        });
    }

    renderCardImage = post => {
        if (post.url) {
            return { uri: post.url };
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e8ec',
    },
    fullsize: {
        flex: 1,
    },
    cardImage: {
        height: 350,
    },
    cardText: {
        marginBottom: 20,
    },
    cardButton: {
        flexDirection: 'row',
    },
});

AppRegistry.registerComponent('Home', () => Home);