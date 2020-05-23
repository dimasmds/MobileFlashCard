import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/redux/reducers';
import middlewares from './src/redux/middlewares';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/components/screens/HomeScreen';
import DeckScreen from './src/components/screens/DeckScreen';
import QuizScreen from './src/components/screens/QuizScreen';
import AddCardScreen from './src/components/screens/AddCardScreen';
import {setLocalNotification} from './src/utils/notification';

const store = createStore(reducer, middlewares);
const {Navigator, Screen} = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Navigator>
            <Screen name={'Home'} component={HomeScreen}
                    options={{title: 'Mobile Flashcards'}}/>
            <Screen name={'Deck'} component={DeckScreen}
                    options={({route}) => ({title: route.params.itemID})}/>
            <Screen name={'AddCard'} component={AddCardScreen}
                    options={({route}) => ({title: `Add Card to ${route.params.deck.title}`})}/>
            <Screen name={'Quiz'} component={QuizScreen}
                    options={({route}) => ({title: `${route.params.deck.title} Quiz`})}/>
          </Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
