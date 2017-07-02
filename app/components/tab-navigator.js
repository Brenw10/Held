import { TabNavigator } from 'react-navigation';
import HomePage from 'held/app/pages/home';
import GalleryPage from 'held/app/pages/gallery';
import ConfigurePage from 'held/app/pages/configure';

export default TabNavigator({
    Home: {
        screen: HomePage,
    },
    Gallery: {
        screen: GalleryPage,
    },
    Configure: {
        screen: ConfigurePage,
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