import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import HomeView from 'held/app/views/home';
import PostView from 'held/app/views/post';

export default StackNavigator({
    Home: {
        screen: HomeView,
    },
    Post: {
        screen: PostView,
    },
});

AppRegistry.registerComponent('Menu', () => held);