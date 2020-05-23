import React, {Component} from 'react';
import Decks from '../fragments/DecksFragment';
import AddDeckFragment from '../fragments/AddDeckFragment';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';


const {Navigator, Screen} = createBottomTabNavigator();

class HomeScreen extends Component {
  render() {
    return (
      <Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Decks') {
              iconName = focused ? 'ios-information-circle' : 'ios-information';
            } else if (route.name === 'Create Deck') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Screen name={'Decks'} component={Decks}/>
        <Screen name={'Create Deck'} component={AddDeckFragment}/>
      </Navigator>
    );
  }
}

export default HomeScreen;
