import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class Quiz extends Component {

  state = {
    showAnswer: false,
  };

  toggleAnswer = () => {
    this.setState(prevState => ({showAnswer: !prevState.showAnswer}))
  };

  render() {
    const {question, onCorrect, onWrong} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{this.state.showAnswer ? question.answer : question.question}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.toggleAnswer}>
            <Text style={{padding: 16, textAlign: 'center', fontSize: 16}}>{this.state.showAnswer ? "Show Question" : "Show Answer"}</Text>
          </TouchableOpacity>
          <Button title="Correct" onPress={onCorrect} color="green"/>
          <Button title="Wrong" onPress={onWrong} color="red"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default Quiz;
