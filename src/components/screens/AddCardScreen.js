import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {handleAddCard} from '../../redux/actions/decks';

class AddCardScreen extends Component {

  state = {
    answer: '',
    question: '',
  };

  onAddCard = () => {
    const {dispatch, navigation, route} = this.props;
    const {deck} = route.params;
    const {answer, question} = this.state;

    dispatch(handleAddCard(deck.title, answer, question));
    navigation.navigate('Deck');
  };

  onAnswerChange = text => {
    this.setState(prevState => ({
      question: prevState.question,
      answer: text,
    }));
  };

  onQuestionChange = text => {
    this.setState(prevState => ({
      answer: prevState.answer,
      question: text,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Question"
          style={styles.textInput}
          value={this.state.question}
          onChangeText={this.onQuestionChange}/>
        <TextInput
          placeholder="Answer"
          value={this.state.answer}
          style={styles.textInput}
          onChangeText={this.onAnswerChange}/>
        <Button
          disabled={(this.state.answer === '' || this.state.question === '')}
          title="Add Card"
          onPress={this.onAddCard}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 32,
  },

  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 16,
    marginBottom: 16,
  },
};

export default connect()(AddCardScreen);
