///import { createStackNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

const NavStack = createStackNavigator(
  {
    Main,
    Product,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#6F8CA6',
      },
      headerTintColor: '#fff',
    },
  },
);

const App = createAppContainer(NavStack);
export default App;