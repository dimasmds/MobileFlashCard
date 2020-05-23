import React, {Component} from 'react';
import Decks from '../fragments/DecksFragment';
import AddDeckFragment from '../fragments/AddDeckFragment';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const {Navigator, Screen} = createBottomTabNavigator();

class HomeScreen extends Component {
  render() {
    return (
      <Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Decks') {
              iconName = focused ? 'cards' : 'cards-outline';
            } else if (route.name === 'Create Deck') {
              iconName = 'plus';
            }

            return <MaterialCommunityIcons name={iconName} size={size}
                                           color={color}/>;
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
