import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    Picker,
    TextInput,
    TouchableOpacity,
    Text,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // View information
            currentUser: null,
            isModalVisible: false,

            // Post information
            image: null,
            hasUser: false,
            text: null,
            music: null,
        };

        this.getCurrentUser().then(user => this.setState({currentUser: user}));
    }

    static navigationOptions = {
        title: 'Share'
    };

    getCurrentUser = async () => {
        return fetch('http://198.58.104.208:8080/api/user', {
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

    render() {
        return (
            <View style={styles.cardContainer}>
                {this.renderLinkModal()}
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
                    <TouchableOpacity style={styles.cardButton}>
                        <Icon name="queue-music" size={23} color="#353536"
                              onPress={() => this.setState({isModalVisible: true})}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton}>
                        <Icon name="send" size={23} color="#353536"/>
                    </TouchableOpacity>
                </View>
            </View>
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

    renderLinkModal() {
        return (
            <Modal visible={this.state.isModalVisible} onRequestClose={() => this.setState({isModalVisible: false})}>
                <View style={{flex: 1, margin: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={() => this.setState({isModalVisible: false})}>
                            <Icon name="close" size={23} color="#000"/>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        onChangeText={music => this.setState({music: music})}
                        value={this.state.music} placeholder="Copy music link here"/>
                </View>
            </Modal>
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