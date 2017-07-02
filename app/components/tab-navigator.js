import { TabNavigator } from 'react-navigation';
import HomePage from 'held/app/pages/home';

export default TabNavigator({
    Home: {
        screen: HomePage,
    },
}, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: '#3b5998',
            },
            indicatorStyle: {
                backgroundColor: '#FFF',
            }
        },
    }
);