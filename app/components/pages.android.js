import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import HomeView from 'Held/app/views/home';
import PostView from 'Held/app/views/post';
import LoginView from 'Held/app/views/login';

export default StackNavigator({
    Login: {
        screen: LoginView,
    },
    Home: {
        screen: HomeView,
    },
    Post: {
        screen: PostView,
    },
});

AppRegistry.registerComponent('Pages', () => Pages);