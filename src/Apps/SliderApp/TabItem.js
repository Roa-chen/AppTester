import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Image, PanResponder } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ index, indexSelected, setIndex, programme, addWeek, delWeek, deleting, button, scrollTabTo }) => {

  const [drag, setDrag] = useState(false);
  let changingPage = false;
  let pageOffset = 0;
  let touchOffset = 0;
  const initialPage = Math.round((index-2)/4);

  const panResponder = useRef(PanResponder.create({
    // Ask to be the responder:
    // onStartShouldSetPanResponder: (evt, gestureState) => true,
    // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      animateDrag()
      pageOffset=0;
      setIndex(index)

      touchOffset = gestureState.moveX - left._value - 32 + initialPage*(windowWidth-64)
      console.log('touchoffset: ', touchOffset)


    },
    onPanResponderMove: (evt, gestureState) => {

      const {moveX, dx} = gestureState;

      // console.log('is on page: ', (pageOffset + Math.round((index-2)/4)))

      left.setValue(moveX-32 - touchOffset + (windowWidth-64)*(pageOffset + initialPage))
      
      if (!changingPage && moveX > (windowWidth - 64)) {
        if (!changingPage && scrollTabTo(index+4*(pageOffset+1))) {
          pageOffset += 1;
          changingPage = true;
        }
        setTimeout(() => changingPage = false, 1000)
      }
      if (!changingPage && moveX < (64)) {
        if (!changingPage && scrollTabTo(index+4*(pageOffset-1))) {
          pageOffset -= 1;
          changingPage = true;
        }
        setTimeout(() => changingPage = false, 1000)
      }
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
    true,
    onPanResponderRelease: (evt, gestureState) => {
      setDrag(false)
      animateDrop()
      Animated.timing(left, {
        toValue: ((windowWidth - 64) / numberTabPerScreen)*index,
        duration: animationDuration,
        useNativeDriver: false,
      }).start()
    },

    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  }),).current

  const left = useRef(new Animated.Value(((windowWidth - 64) / numberTabPerScreen)*index)).current; //pos
  const opacity = useRef(new Animated.Value(1)).current;
  const width = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: ((windowWidth - 64) / numberTabPerScreen),
      duration: animationDuration,
      useNativeDriver: false,
    }).start()
  }, [])

  useEffect(() => {
    Animated.timing(left, {
      toValue: ((windowWidth - 64) / numberTabPerScreen)*index, //pos
      duration: animationDuration,
      useNativeDriver: false,
    }).start()
  }, [index]) //pos

  useEffect(() => {
    if (deleting === index) {
      console.log('deleting: ', index)
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration*2,
        useNativeDriver: false,
      }).start(() => delWeek(index))
    }
  }, [deleting])

  const animateDrag = () => {
    Animated.timing(scale, {
      toValue: 1.2,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }
  const animateDrop = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }

  const selected = index === indexSelected

  return (
    <Animated.View 
      {...(drag ? (panResponder.panHandlers) : {})}
      style={{ 
        width: width, 
        opacity: opacity,
        position: 'absolute',
        left: left,
        transform: [{scale: scale}],
      }}>
      <TouchableWithoutFeedback 
        onPress={() => { !button ? setIndex(index) : addWeek(programme) }}
        onLongPress={() => {!button ? setDrag(true) : null}}
      >
        <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
          {!button && <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, { opacity: opacity }]}>Semaine {index + 1}</Animated.Text>}
          {button && <Image source={require('./assets/plusImg.png')} resizeMode="cover" />}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}