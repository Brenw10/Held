import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    AsyncStorage,
    Text,
    View
} from 'react-native';
import {Card, Icon, Badge} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

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

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerTitleStyle: {alignSelf: 'center'},
            headerLeft: <Icon name='menu' style={{marginLeft: 15}}/>,
            headerRight:
                <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                    <Icon name='create' style={{marginRight: 15}}/>
                </TouchableOpacity>,
        }
    };

    _onRefresh = async () => {
        this.setState({refreshing: true});
        const token = await AsyncStorage.getItem('token');
        const posts = await this.getPosts(token);
        this.setState({posts: posts, refreshing: false});
    };

    getPosts = token => {
        return fetch('http://198.58.104.208:8080/api/posts', {
            headers: {
                'access-token': token,
            }
        }).then(response => response.json());
    };

    saveLike = (token, post, like) => {
        return fetch('http://198.58.104.208:8080/api/post/like', {
            method: like ? 'POST' : 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token,
            },
            body: JSON.stringify(post)
        }).then(response => response.json());
    };

    handleLike = async (post, key) => {
        this.setState({loading: true});
        const token = await AsyncStorage.getItem('token');
        const response = await this.saveLike(token, post, !post.liked);
        this.state.posts[key] = response;
        this.setState({loading: false});
    };

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                />
            }>
                {this.renderPosts()}
                <Spinner visible={this.state.loading}/>
            </ScrollView>
        );
    }

    renderPosts() {
        if (this.state.posts === null) return;
        return this.state.posts.map((post, key) => {
            return (
                <Card key={key}
                      title={post.text}
                      imageStyle={styles.cardImage}
                      image={this.renderCardImage(post)}>
                    <View style={styles.cardButton}>
                        <TouchableOpacity style={styles.fullSize}
                                          onPress={() => this.props.navigation.navigate('PostDetail', {post: post})}>
                            <Icon name='chat-bubble-outline'/>
                            <Badge containerStyle={styles.cardBadge}>
                                <Text style={styles.badgeText}>{post.comments.length} comments</Text>
                            </Badge>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fullSize} onPress={() => this.handleLike(post, key)}>
                            {post.liked ? <Icon name='favorite' color='#be1931'/> : <Icon name='favorite-border'/>}
                            <Badge containerStyle={styles.cardBadge}>
                                <Text style={styles.badgeText}>{post.likesLength} likes</Text>
                            </Badge>
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        });
    }

    renderCardImage = post => {
        if (post.url) {
            return {uri: post.url};
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e8ec'
    },
    fullSize: {
        flex: 1
    },
    cardImage: {
        height: 350
    },
    cardButton: {
        flexDirection: 'row'
    },
    cardBadge: {
        backgroundColor: '#FFF'
    },
    badgeText: {
        color: '#000',
        fontWeight: '400'
    }
});

AppRegistry.registerComponent('Home', () => Home);