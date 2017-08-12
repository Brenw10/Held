import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from 'firebase';
import {Card, Icon} from 'react-native-elements';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            text: null,
            loading: false,
        };
    }

    static navigationOptions = {
        title: 'Upload'
    };

    getFirebaseImage = folderPath => {
        return firebase.storage().ref(folderPath).getDownloadURL();
    };

    uploadImage = file => {
        const user = firebase.auth().currentUser;

        const polyfill = RNFetchBlob.polyfill
        window.XMLHttpRequest = polyfill.XMLHttpRequest;
        window.Blob = polyfill.Blob;

        const folder = `/users/${user.uid}`;
        const time = new Date().getTime();
        const filename = `${time}.png`;

        return Blob.build(RNFetchBlob.wrap(this.state.file.path), {type: 'image/jpeg'}).then((blob) =>
            firebase
                .storage()
                .ref(folder)
                .child(filename)
                .put(blob, {contentType: 'image/png'})
        ).then(() => `${folder}/${filename}`);
    };

    handleSendPost = async () => {
        let post = {};
        this.setState({loading: true});

        if (this.state.file !== null) {
            const folderPath = await this.uploadImage(this.state.file);
            const url = await this.getFirebaseImage(folderPath);
            post.url = url;
        }

        // todo: fix it
        if ([null, ''].indexOf(this.state.text) === -1) {
            post.text = this.state.text;
        }

        await this.savePost(await AsyncStorage.getItem('token'), post);

        this.setState({loading: false});
        this.props.navigation.goBack();
    };

    savePost = (token, post) => {
        return fetch('http://198.58.104.208:8080/api/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token,
            },
            body: JSON.stringify(post)
        });
    };

    handleImageGallery = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (!response.didCancel && !response.error) {
                this.setState({file: response});
            }
        });
    };

    handleTakeImage = () => {
        ImagePicker.launchCamera({}, response => {
            if (!response.didCancel && !response.error) {
                this.setState({file: response});
            }
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='position' style={styles.fullsize}>
                <Card imageStyle={styles.cardImage}
                      image={{uri: `file://${this.state.file === null ? null : this.state.file.path}`}}>
                    <TextInput style={styles.cardText} maxLength={300} placeholder='Text here...'
                               onChangeText={text => this.setState({text})}/>
                    <View style={styles.cardButton}>
                        <TouchableOpacity style={styles.fullsize} onPress={() => this.handleTakeImage()}>
                            <Icon name='add-a-photo'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fullsize} onPress={() => this.handleImageGallery()}>
                            <Icon name='collections'/>
                        </TouchableOpacity>
                        {this.renderSendButton()}
                    </View>
                </Card>
                <Spinner visible={this.state.loading}/>
            </KeyboardAvoidingView>
        );
    }

    renderSendButton() {
        if (this.state.file !== null || [null, ''].indexOf(this.state.text) === -1) {
            return (
                <TouchableOpacity style={styles.fullsize} onPress={() => this.handleSendPost()}>
                    <Icon name='check'/>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('Post', () => Post);