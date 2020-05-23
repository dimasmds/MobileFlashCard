import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {handleRemoveDeck} from '../../redux/actions/decks';

class DeckScreen extends Component {

  onStartQuiz = () => {
    const {navigation, deck} = this.props;
    navigation.navigate('Quiz', {deck});
  };

  onAddCard = () => {
    const {navigation, deck} = this.props;
    navigation.navigate('AddCard', {
      itemId: Math.floor(Math.random() * 100),
      deck: {...deck},
    });
  };

  onRemoveDeck = () => {
    const {navigation, dispatch, deck} = this.props;
    dispatch(handleRemoveDeck(deck.title));
    navigation.navigate('Decks');
  };

  render() {
    const {deck} = this.props;
    if (!deck) return (<View/>);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text
            style={styles.card}>{deck.questions.length} Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={{marginBottom: 16}} title="Start Quiz"
                  onPress={this.onStartQuiz}/>
          <Button style={styles.button} title="Add Card"
                  onPress={this.onAddCard}/>
          <Button title="Remove Deck" onPress={this.onRemoveDeck} color="red"/>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexGrow: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  card: {
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 64,
    paddingBottom: 64,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },

};

const mapStateToProps = ({decks}, props) => {
  return {
    deck: decks[props.route.params.itemID],
    ...props,
  };
};

export default connect(mapStateToProps)(DeckScreen);
