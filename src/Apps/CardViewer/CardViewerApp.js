import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const Element = props => {
  const id = props.id;

  return (
    <TouchableHighlight
      style={[
        styles.elem,
        { backgroundColor: `rgb(${id * 20}, ${id * 20}, ${id * 20})` },
        props.extend ? styles.elemExtends : null,
      ]}
      onPress={props.onPress}
      underlayColor={`rgb(${id * 20}, ${id * 20}, ${id * 20})`}>
      <Text style={styles.elemText}>{id}</Text>
    </TouchableHighlight>
  );
};

export default class CardViewerApp extends Component {
  constructor() {
    super();
    this.state = { elems: [1, 2, 3, 4, 5, 6, 7, 8], selected: 0 };
  }

  changeSelected = newSelected => {
    this.setState({ selected: newSelected });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.elemContainer}
          contentContainerStyle={styles.elemContainerContentStyle}>
          {this.state.elems
            .filter(item => (item !== this.state.selected ? item : null))
            .map((item, index) => {
              return (
                <Element
                  key={index}
                  id={item}
                  onPress={this.changeSelected.bind(this, item)}
                />
              );
            })}
        </ScrollView>
        <View style={styles.elemViewer}>
          {this.state.elems
            .filter(item => (item === this.state.selected ? item : null))
            .map((item, index) => {
              return (
                <Element
                  key={index}
                  id={item}
                  extend={true}
                  onPress={this.changeSelected.bind(this, -1)}
                />
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  elemContainer: {
    backgroundColor: 'pink',
    flex: 1,
    paddingTop: 20,
  },
  elemContainerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  elemViewer: {
    flex: 2,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elem: {
    backgroundColor: 'yellow',
    height: 220,
    width: 125,
    marginBottom: 20,
    borderRadius: 8,
  },
  elemExtends: {
    height: 440,
    width: 250,
  },
  elemText: {
    fontSize: 20,
    color: 'black',
    margin: 10,
  },
});
