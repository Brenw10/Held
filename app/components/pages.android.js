import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeView from 'Held/app/views/home';
import PostView from 'Held/app/views/post';
import LoginView from 'Held/app/views/login';
import CommentView from 'Held/app/views/comment';

export default StackNavigator({
    Login: {
        screen: LoginView
    },
    Home: {
        screen: HomeView
    },
    Post: {
        screen: PostView
    },
    Comment: {
        screen: CommentView
    }
});

AppRegistry.registerComponent('Pages', () => Pages);