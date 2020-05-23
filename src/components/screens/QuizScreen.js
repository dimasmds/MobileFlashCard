import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Quiz from '../pures/Quiz';
import {clearNotification, setNotification} from '../../utils/notification';



class QuizScreen extends Component {

  state = {
    questionNumber: 1,
    correctAnswer: 0,
    wrongAnswer: 0,
  };

  onCorrectAnswer = () => {
    this.setState(prevState => ({
      questionNumber: ++prevState.questionNumber,
      correctAnswer: ++prevState.correctAnswer,
      wrongAnswer: prevState.wrongAnswer,
    }));
  };

  onWrongAnswer = () => {
    this.setState(prevState => ({
      questionNumber: ++prevState.questionNumber,
      correctAnswer: prevState.correctAnswer,
      wrongAnswer: ++prevState.wrongAnswer,
    }));
  };

  onResetQuestion = () => {
    this.setState({
      questionNumber: 1,
      correctAnswer: 0,
      wrongAnswer: 0,
    });
  };

  onGoBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  componentDidMount() {
    clearNotification().then(setNotification);
  }

  render() {
    const {route} = this.props;
    const {deck} = route.params;

    if (!deck.questions.length) {
      return (
        <View style={styles.notFoundContainer}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>Sorry, you cannot
            take a quiz because there no cards
            in the
            deck.</Text>
        </View>
      );
    }

    if (this.state.questionNumber > deck.questions.length) {
      return (
        <View style={styles.resultContainer}>
          <Text>Finish!</Text>
          <View>
            <Button title="Reset" onPress={this.onResetQuestion}/>
            <Button title="Back to Deck" onPress={this.onGoBack}/>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.quizContainer}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            padding: 16,
          }}>{`Question ${this.state.questionNumber} of ${deck.questions.length}`}</Text>
        <Quiz question={deck.questions[this.state.questionNumber - 1]}
              onCorrect={this.onCorrectAnswer}
              onWrong={this.onWrongAnswer}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'stretch',
  },
  resultContainer: {},
});

export default QuizScreen;
