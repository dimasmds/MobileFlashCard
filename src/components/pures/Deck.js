import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
  onPress = () => {
    const {deck, navigation} = this.props;
    navigation.navigate('Deck', {
      itemID: deck.title,
    });
  };

  render() {
    const {deck} = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text
            style={styles.deckQuestions}>{`${deck.questions.length} cards`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  deckTitle: {
    fontSize: 24,
  },
  deckQuestions: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default Deck;
