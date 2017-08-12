import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.navigation.state.params.post,
            loading: false,
            text: ''
        };
    }

    static navigationOptions = {
        title: 'Comments'
    };

    handleSaveComment = async text => {
        this.setState({loading: true});
        const token = await AsyncStorage.getItem('token');
        const post = {
            _id: this.state.post._id,
            text: text
        };
        const response = await this.saveComment(token, post);
        this.setState({
            post: response,
            loading: false,
            text: ''
        });
    };

    saveComment = (token, post) => {
        return fetch('http://198.58.104.208:8080/api/post/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token,
            },
            body: JSON.stringify(post)
        }).then(response => response.json());
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Spinner visible={this.state.loading}/>
                <Card>
                    <View style={styles.cardForm}>
                        <View style={styles.fullSize}>
                            <TextInput maxLength={300} placeholder='Send your comment here...'
                                       onChangeText={text => this.setState({text})}
                                       value={this.state.text}/>
                        </View>
                        <TouchableOpacity style={styles.sendContainer}
                                          onPress={() => this.handleSaveComment(this.state.text)}>
                            <Icon name='send'/>
                        </TouchableOpacity>
                    </View>
                </Card>
                <Card title={this.state.post.text}
                      imageStyle={styles.cardImage}
                      image={this.renderCardImage(this.state.post)}>
                </Card>
                {this.renderComments()}
            </ScrollView>
        );
    }

    renderComments() {
        if (this.state.post === null) return;
        return this.state.post.comments.reverse().map((comment, key) => {
            return (
                <Card key={key}>
                    <Text style={styles.commentText}>{comment.text}</Text>
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
    cardForm: {
        flexDirection: 'row'
    },
    cardImage: {
        height: 350
    },
    commentText: {
        color: '#000'
    },
    fullSize: {
        flex: 1
    },
    sendContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('PostDetail', () => PostDetail);