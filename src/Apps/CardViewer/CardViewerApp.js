import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from 'react-native';

const Element = props => {
  const id = props.id;

  return (
    <Animated.View style={[styles.elem, props.animatedValue.getLayout(), {backgroundColor: `rgb(${id * 20}, ${id * 20}, ${id * 20})`}]}>
      <TouchableHighlight
        // style={[
        //   props.extend ? styles.elemExtends : null,
        // ]}
        onPress={props.onPress}
        underlayColor={`rgb(${id * 20}, ${id * 20}, ${id * 20})`}>
        <Text style={styles.elemText}>{id}</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default class CardViewerApp extends Component {
  constructor() {
    super();
    this.state = { elems: [1, 2, 3, 4, 5, 6, 7, 8], elemsValues: [], selected: 0, lastSelected: 0 };
  }

  changeSelected = newSelected => {
    this.setState({ lastSelected: this.state.selected, selected: newSelected });
  };

  UNSAFE_componentWillMount() {
    this.state.elems.forEach((elem, index) => {
      this.state.elemsValues.push(new Animated.ValueXY({x: 0, y: 240*index}))
    })
  }

  render() {

      const {elems, elemsValues} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.elemContainer}
          contentContainerStyle={{paddingTop: elems.length*240+20}}>
          {elems.map((item, index) => {
            return (
                <Element
                  id={index}
                  onPress={() => {}}
                  animatedValue={elemsValues[index]} />
            )
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
    height: 220,
    width: 125,
    borderRadius: 8,
    position: 'absolute',
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

