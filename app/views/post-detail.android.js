import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import {Card, Divider} from 'react-native-elements';

export default class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: props.navigation.state.params.post
        };
    }

    static navigationOptions = {
        title: 'Comments'
    };

    render() {
        return (
            <ScrollView style={styles.container}>
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
        return this.state.post.comments.map((comment, key) => {
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
    cardImage: {
        height: 350
    },
    commentText: {
        color: '#000'
    }
});

AppRegistry.registerComponent('PostDetail', () => PostDetail);