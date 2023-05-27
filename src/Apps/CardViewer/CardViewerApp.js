import React, { Component, createRef, useRef } from 'react';
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
const duration = 2000;
const scale = 2;

export default class CardViewerApp extends Component {
  constructor() {
    super();
    this.state = { elems: [], elemsValues: [], transitionAnimatedValue: [], isAnimating: false };
    
    this.x_position = 0
    this.x_destination = 0
    this.y_destination = 0


    this.selected = createRef();
    this.selected.current = 100000;


  }

  changeSelected = newSelected => {
    this.selected.current = newSelected;
  };

  UNSAFE_componentWillMount() {

    for (let i=0; i<numberOfElem; i++) {
      this.state.elems.push(i+1)
    }

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height
    this.x_position = width / 6 - elemWidth/2

    this.x_destination = 2*width/3 - elemWidth/2
    this.y_destination = height/2 - elemHeight/2



    this.state.elems.forEach((elem, index) => {
      this.state.elemsValues.push(new Animated.ValueXY({x: this.x_position, y: (elemHeight + margin)*index}))
    })

    this.state.transitionAnimatedValue.push(new Animated.ValueXY({x: 200, y: 200}))
    this.state.transitionAnimatedValue.push(new Animated.ValueXY({x: this.x_destination, y: this.y_destination}))
    this.state.transitionAnimatedValue.push(new Animated.Value(1))
    this.state.transitionAnimatedValue.push(new Animated.Value(scale))

  }

  moveElems = (newSelected) => {

    if (this.selected.current === newSelected) return

    const {elemsValues} = this.state;

    let animationList = []
    let y_position = 0;

    this.state.elems.forEach((elem, index) => {

      if (elem === newSelected) {

        this.state.transitionAnimatedValue[0] = new Animated.ValueXY({x: this.x_position, y:y_position+20-(elem >= this.selected.current ? elemHeight + margin : 0)})
        this.state.transitionAnimatedValue[2] = new Animated.Value(1)

        animationList.push(Animated.timing(this.state.transitionAnimatedValue[0], {
          toValue: {x: this.x_destination, y: this.y_destination},
          duration: duration,
          useNativeDriver: false
        }))
        animationList.push(Animated.timing(this.state.transitionAnimatedValue[2], {
          toValue: scale,
          duration: duration,
          useNativeDriver: false
        }))

        animationList.push(Animated.timing(elemsValues[index], {
          toValue: {x: this.x_destination, y: this.y_destination},
          duration: duration,
          useNativeDriver: false
        }))
      } 
      else if (elem === this.selected.current) {

        // this.state.transitionAnimatedValue[1] = new Animated.ValueXY({x: this.x_destination, y:this.y_destination})
        // this.state.transitionAnimatedValue[3] = new Animated.Value(scale)

        // animationList.push(Animated.timing(this.state.transitionAnimatedValue[1], {
        //   toValue: {x: this.x_position, y: this.y_position},
        //   duration: duration,
        //   useNativeDriver: false
        // }))
        // animationList.push(Animated.timing(this.state.transitionAnimatedValue[3], {
        //   toValue: 1,
        //   duration: duration,
        //   useNativeDriver: false
        // }))

        animationList.push(Animated.timing(elemsValues[index], {
          toValue: {x: this.x_position, y: y_position},
          duration: duration,
          useNativeDriver: false
        }))

        y_position += elemHeight + margin;

      } 
      else {
        animationList.push(Animated.timing(elemsValues[index], {
          toValue: {x: this.x_position, y: y_position},
          duration: duration,
          useNativeDriver: false
        }))

        y_position += elemHeight + margin;
      }
    })
    
    this.changeSelected(newSelected);
    this.setState({isAnimating: true})
    Animated.parallel(animationList).start(() => {
      this.setState({isAnimating: false})
    })
  }

  Element = props => {
    const id = props.id;
  
    return (
      <Animated.View style={[
        styles.elem,
        props.animatedValue.getLayout(), 
        {transform: [{scale: props.scaleValue ? props.scaleValue : 1}]},
        {backgroundColor: `rgb(${id / numberOfElem * 256}, ${id / numberOfElem * 256}, ${id / numberOfElem * 256})`}]}>

        <TouchableOpacity
        style={{width: '100%', height: '100%', borderRadius: 8}}
          onPress={props.onPress} >
            <Text style={styles.elemText}>{id}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {

    const {elems, elemsValues, isAnimating, transitionAnimatedValue} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.elemContainer}
          contentContainerStyle={{paddingTop: elems.length*(elemHeight + margin)+20}}>
          {elems.map((item, index) => {
            return (
                <this.Element
                  key={index}
                  id={item}
                  onPress={() => this.moveElems(item)}
                  animatedValue={elemsValues[index]} />
            )
          })}
        </ScrollView>

        <View style={styles.elemViewer}>
         
        </View>
        {
          isAnimating && <View style={styles.transitionContainer}>
            <this.Element animatedValue={transitionAnimatedValue[0]} onPress={() => {}} id={this.selected.current} scaleValue={transitionAnimatedValue[2]} />
            <this.Element animatedValue={transitionAnimatedValue[1]} onPress={() => {}} id={this.selected.current} scaleValue={transitionAnimatedValue[3]} />
          </View>
        }

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
  transitionContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'black',
  }
});

