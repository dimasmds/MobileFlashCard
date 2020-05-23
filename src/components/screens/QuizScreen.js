import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Quiz from '../pures/Quiz';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../../utils/notification';


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
    clearLocalNotification().then(setLocalNotification);
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
          <View style={styles.resultStatistic}>
            <Text style={{fontSize: 24, padding: 8}}>Quiz Finished</Text>
            <Text style={{fontSize: 14, padding: 8, marginBottom: 16}}>This is
              the result:</Text>
            <Text
              style={styles.scoreText}>{`Correct Answer: ${this.state.correctAnswer}`}</Text>
            <Text
              style={styles.scoreText}>{`Wrong Answer: ${this.state.wrongAnswer}`}</Text>
            <Text
              style={styles.scoreText}>{`Total Score: ${Math.floor((this.state.correctAnswer / deck.questions.length) * 100)}%`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Do it again" onPress={this.onResetQuestion}/>
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
  resultContainer: {
    flex: 1,
  },
  resultStatistic: {
    flex: 1,
    flexGrow: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 18,
    padding: 8,
  },
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 32,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
});

export default QuizScreen;
