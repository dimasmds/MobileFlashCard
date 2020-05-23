import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleInitialData} from '../../redux/actions/decks';
import Deck from '../pures/Deck';

class DecksFragment extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  renderDeck = ({item}) => {
    const {navigation} = this.props;
    return (
      <Deck deck={item} navigation={navigation}/>
    );
  };

  render() {
    const {decks} = this.props;
    return (
      <View style={styles.container}>
        <FlatList data={decks} renderItem={this.renderDeck}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const mapStateToProps = ({decks}) => {
  return {
    decks: Object.values(decks).map(deck => ({key: deck.title, ...deck})).reverse(),
  };
};

export default connect(mapStateToProps)(DecksFragment);
