import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: props.navigation.state.params.post,
            loading: false,
            text: null
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
            text: null
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
            <View style={styles.container}>
                <Spinner visible={this.state.loading}/>
                {this.renderList()}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formInput}
                        onChangeText={(text) => this.setState({text: text})}
                        value={this.state.text}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => this.handleSaveComment(this.state.text)}>
                        <Icon name="send" size={23} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderList() {
        if (this.state.post === null) return;
        return (
            <FlatList
                data={this.state.post.comments}
                keyExtractor={(_, index) => index}
                renderItem={({item}) =>
                    <View style={styles.listContainer}>
                        <Text style={styles.listText}>{item.text}</Text>
                    </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    listContainer: {
        padding: 15,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e7e8ec'
    },
    listText: {
        color: '#000'
    },
    formContainer: {
        flexDirection: 'row'
    },
    formInput: {
        flex: 1,
        marginLeft: 10,
        marginBottom: 10
    },
    sendButton: {
        alignSelf: 'center',
        padding: 10
    }
});

AppRegistry.registerComponent('PostDetail', () => PostDetail);