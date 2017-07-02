import { TabNavigator } from 'react-navigation';
import HomePage from 'held/app/pages/home';
import GalleryPage from 'held/app/pages/gallery';

export default TabNavigator({
    Home: {
        screen: HomePage,
    },
    Gallery: {
        screen: GalleryPage,
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