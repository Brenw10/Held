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
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import Endpoint from 'Held/app/core/endpoint';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null,
            refreshing: false,
            loading: false
        };

        this._onRefresh();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Held',
            headerTitleStyle: { alignSelf: 'center' },
            headerLeft:
            <TouchableOpacity>
                <Icon name="menu" size={23} style={{ marginLeft: 15 }} color="#000" />
            </TouchableOpacity>,
            headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Icon name="create" size={23} style={{ marginRight: 15 }} color="#000" />
            </TouchableOpacity>,
        }
    };

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const posts = await this.getPosts();
        this.setState({ posts: posts, refreshing: false });
    }

    getPosts = async () => {
        const data = JSON.parse(await AsyncStorage.getItem('access-token'));
        return fetch(`${Endpoint.BASE_URL}/api/posts`, {
            headers: {
                'access-token': data.accessToken,
            }
        }).then(response => response.json());
    };

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()} />
            }>
                <Spinner visible={this.state.loading} />
                {this.getCards()}
            </ScrollView>
        );
    }

    getCards() {
        if (!this.state.posts) return;
        return this.state.posts.map(function (post, key) {
            return (
                <View key={key} style={styles.cardContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.cardTitle}>{post.name ? post.name : 'Anonymous'}</Text>
                    </View>
                    <Image style={styles.cardImage} source={{ uri: post.url }} />
                    <View style={styles.descriptionContainer}>
                        <Text>{post.text}</Text>
                    </View>
                    <View style={styles.cardButtonContainer}>
                        <TouchableOpacity style={styles.cardButton}>
                            <Icon name="comment" size={23} color="#353536" />
                            <Text style={styles.cardButtonLabel}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardButton}>
                            {
                                post.liked
                                    ? <Icon name="favorite" size={23} color="#be1931" />
                                    : <Icon name="favorite-border" size={23} color="#353536" />
                            }
                            <Text style={styles.cardButtonLabel}>0</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e8ec'
    },
    cardContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    titleContainer: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#bbbcc0',
        alignItems: 'center'
    },
    cardTitle: {
        color: '#000',
        fontWeight: '400',
        fontSize: 13.5
    },
    cardImage: {
        height: 300,
        resizeMode: 'contain'
    },
    cardButtonContainer: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: 1,
        borderColor: '#bbbcc0'
    },
    cardButton: {
        flex: 1,
        alignItems: 'center'
    },
    cardButtonLabel: {
        fontSize: 12
    },
    descriptionContainer: {
        borderTopWidth: 1,
        borderColor: '#bbbcc0',
        padding: 12
    }
});

AppRegistry.registerComponent('Home', () => Home);