import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    Picker,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import Endpoint from 'Held/app/core/endpoint';
import RNFetchBlob from 'react-native-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from 'firebase';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            image: null,
            hasUser: false,
            loading: false,
            text: null
        };

        this._init();
    }

    static navigationOptions = {
        title: 'Share'
    };

    _init = async () => {
        this.setState({ loading: true });
        const currentUser = await this.getCurrentUser()
        this.setState({ currentUser: currentUser, loading: false });
    }

    getCurrentUser = async () => {
        const data = JSON.parse(await AsyncStorage.getItem('access-token'));
        return fetch(`${Endpoint.BASE_URL}/api/user`, {
            method: 'GET',
            headers: {
                'access-token': data.accessToken
            }
        }).then(response => response.json());
    };

    handleGallery = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.didCancel || response.error) return;
            this.setState({ image: response });
        });
    };

    handleTakeImage = () => {
        ImagePicker.launchCamera({}, response => {
            if (response.didCancel || response.error) return;
            this.setState({ image: response });
        });
    };

    canCreate = () => this.state.text || this.state.image;

    getImageBlob = image => {
        const polyfill = RNFetchBlob.polyfill
        window.XMLHttpRequest = polyfill.XMLHttpRequest;
        window.Blob = polyfill.Blob;

        return Blob.build(RNFetchBlob.wrap(image.path), { type: 'image/jpeg' });
    }

    getUploadedImage = () => {
        const user = firebase.auth().currentUser;

        const folder = `/users/${user.uid}`;
        const filename = `${new Date().getTime()}.png`;

        return this.getImageBlob(this.state.image)
            .then(blob => firebase.storage().ref(folder).child(filename).put(blob, { contentType: 'image/png' }))
            .then(() => firebase.storage().ref(`${folder}/${filename}`).getDownloadURL());
    }

    create = async () => {
        this.setState({ loading: true });

        const post = {
            url: this.state.image ? await this.getUploadedImage() : null,
            text: this.state.text,
            name: this.state.hasUser ? this.state.currentUser.name : null
        };

        const data = JSON.parse(await AsyncStorage.getItem('access-token'));
        await fetch(`http://198.58.104.208:8080/api/user/${this.state.currentUser.id}/post`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': data.accessToken,
            },
            body: JSON.stringify(post)
        });

        this.props.navigation.navigate('Home');
        this.setState({ loading: false });
    }

    render() {
        return (
            <View style={styles.cardContainer}>
                <Spinner visible={this.state.loading} />
                {this.getTitle()}
                {this.getImage()}
                <View style={styles.descriptionContainer}>
                    <TextInput
                        onChangeText={text => this.setState({ text: text })}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.cardButtonContainer}>
                    <TouchableOpacity style={styles.cardButton} onPress={() => this.handleTakeImage()}>
                        <Icon name="add-a-photo" size={23} color="#353536" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={() => this.handleGallery()}>
                        <Icon name="collections" size={23} color="#353536" />
                    </TouchableOpacity>
                    {this.getSubmit()}
                </View>
            </View>
        );
    }

    getSubmit() {
        if (!this.canCreate()) return;
        return (
            <TouchableOpacity style={styles.cardButton} onPress={() => this.create()}>
                <Icon name="send" size={23} color="#353536" />
            </TouchableOpacity>
        );
    }

    getImage() {
        if (!this.state.image) return;
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={{ uri: `file://${this.state.image.path}` }} />
            </View>
        );
    }

    getTitle() {
        if (!this.state.currentUser) return;
        return (
            <View style={styles.titleContainer}>
                <Picker
                    selectedValue={this.state.hasUser}
                    onValueChange={value => this.setState({ hasUser: value })}>
                    <Picker.Item label='Anonymous' value={false} />
                    <Picker.Item label={this.state.currentUser.name} value={true} />
                </Picker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#bbbcc0'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#bbbcc0'
    },
    imageContainer: {
        borderBottomWidth: 1,
        borderColor: '#bbbcc0'
    },
    cardImage: {
        height: 300,
        resizeMode: 'contain'
    },
    descriptionContainer: {
        borderBottomWidth: 1,
        borderColor: '#bbbcc0'
    },
    cardButtonContainer: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#bbbcc0'
    },
    cardButton: {
        flex: 1,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('Post', () => Post);