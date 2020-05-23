import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {handleAddDeck} from '../../redux/actions/decks';

class AddDeckFragment extends Component {
  state = {
    name: '',
  };

  onDeckChange = text => {
    this.setState(() => ({
      name: text,
    }));
  };

  onSubmitDeck = () => {
    const {dispatch} = this.props;
    dispatch(handleAddDeck(this.state.name, this.toIndividualDeck));
  };

  toIndividualDeck = () => {
    const {navigation} = this.props;
    navigation.navigate('Deck', {itemID: this.state.name});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add New Deck</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput}
                     placeholder="Deck Name"
                     onChangeText={this.onDeckChange}
                     value={this.state.question}/>
          <Button disabled={this.state.name === ''} title="Add Deck"
                  onPress={this.onSubmitDeck}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    padding: 16,
    fontSize: 24,
  },
  inputContainer: {
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
});


export default connect()(AddDeckFragment);
