import React, {Component} from 'react';
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

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // View information
            currentUser: null,

            // Post information
            image: null,
            hasUser: false,
            text: null,
        };

        this.getCurrentUser().then(user => this.setState({currentUser: user}));
    }

    static navigationOptions = {
        title: 'Share'
    };

    getCurrentUser = async () => {
        return fetch(`${Endpoint.BASE_URL}/api/user`, {
            method: 'GET',
            headers: {
                'access-token': await AsyncStorage.getItem('token')
            }
        }).then(response => response.json());
    };

    handleGallery = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.didCancel || response.error) return;
            this.setState({image: response});
        });
    };

    handleTakeImage = () => {
        ImagePicker.launchCamera({}, response => {
            if (response.didCancel || response.error) return;
            this.setState({image: response});
        });
    };

    canSubmit = () => {
        const hasText = this.state.text;
        const hasImage = this.state.image !== null;

        return hasText || hasImage;
    };

    render() {
        return (
            <View style={styles.cardContainer}>
                {this.renderTitle()}
                {this.renderImage()}
                <View style={styles.descriptionContainer}>
                    <TextInput
                        onChangeText={text => this.setState({text: text})}
                        value={this.state.text}
                    />
                </View>
                <View style={styles.cardButtonContainer}>
                    <TouchableOpacity style={styles.cardButton} onPress={() => this.handleTakeImage()}>
                        <Icon name="add-a-photo" size={23} color="#353536"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={() => this.handleGallery()}>
                        <Icon name="collections" size={23} color="#353536"/>
                    </TouchableOpacity>
                    {this.renderSubmit()}
                </View>
            </View>
        );
    }

    renderSubmit() {
        if (!this.canSubmit()) return;
        return (
            <TouchableOpacity style={styles.cardButton}>
                <Icon name="send" size={23} color="#353536"/>
            </TouchableOpacity>
        );
    }

    renderImage() {
        if (this.state.image === null) return;
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.cardImage} source={{uri: `file://${this.state.image.path}`}}/>
            </View>
        );
    }

    renderTitle() {
        if (this.state.currentUser === null) return;
        return (
            <View style={styles.titleContainer}>
                <Picker
                    selectedValue={this.state.hasUser}
                    onValueChange={value => this.setState({hasUser: value})}>
                    <Picker.Item label='Anonymous' value={false}/>
                    <Picker.Item label={this.state.currentUser.name} value={true}/>
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