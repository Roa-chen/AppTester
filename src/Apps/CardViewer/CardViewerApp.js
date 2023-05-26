import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const numberOfElem = 10;
const elemWidth = 125;
const elemHeight = 100;
const margin = 20;
const duration = 200;

const Element = props => {
  const id = props.id;

  return (
    <Animated.View style={[
      styles.elem, props.animatedValue.getLayout(), 
      {backgroundColor: `rgb(${id / numberOfElem * 256}, ${id / numberOfElem * 256}, ${id / numberOfElem * 256})`}]}>
      <TouchableOpacity
      style={{width: '100%', height: '100%', borderRadius: 8}}
        onPress={props.onPress} >
          <Text style={styles.elemText}>{id}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default class CardViewerApp extends Component {
  constructor() {
    super();
    this.state = { elems: [], elemsValues: [], selected: 4, isAnimating: false };
    this.x_position = 0;
  }

  changeSelected = selected => {
    this.setState({selected})
  };

  UNSAFE_componentWillMount() {

    for (let i=0; i<numberOfElem; i++) {
      this.state.elems.push(i+1)
    }

    const width = Dimensions.get('screen').width / 3;
    this.x_position = width / 2 - elemWidth/2

    this.state.elems.forEach((elem, index) => {
      this.state.elemsValues.push(new Animated.ValueXY({x: this.x_position, y: (elemHeight + margin)*index}))
    })
  }

  moveElems = (newSelected) => {

    if (this.state.selected === newSelected) return

    const {elemsValues} = this.state;

    let animationList = []
    let y_position = 0;

    this.state.elems.forEach((elem, index) => {

      if (elem === newSelected) {
        animationList.push(Animated.timing(elemsValues[index], {
          toValue: {x: 100, y: 300},
          duration: duration,
          useNativeDriver: false
        }))
      } else {
        animationList.push(Animated.timing(elemsValues[index], {
          toValue: {x: this.x_position, y: y_position},
          duration: duration,
          useNativeDriver: false
        }))

        y_position += elemHeight + margin;
      }
    })

    Animated.parallel(animationList).start(() => {
      this.changeSelected(newSelected);
    })

  }

  render() {

    const {elems, elemsValues, isAnimating} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.elemContainer}
          contentContainerStyle={{paddingTop: elems.length*(elemHeight + margin)+20}}>
          {elems.map((item, index) => {
            return (
                <Element
                  key={index}
                  id={index}
                  onPress={() => this.moveElems(item)}
                  animatedValue={elemsValues[index]} />
            )
          })}
        </ScrollView>
        <View style={styles.elemViewer}>
         
        </View>
        {/* {
          isAnimating && <View />
        } */}
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
    height: elemHeight,
    width: elemWidth,
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

