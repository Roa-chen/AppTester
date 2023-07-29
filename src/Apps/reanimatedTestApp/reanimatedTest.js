import React from "react";
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
  withSpring,
  } from 'react-native-reanimated';
import { Svg, Circle } from "react-native-svg";
import {PanGestureHandler} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width

export default ReanimatedApp = () => {

  const startingPosition = windowWidth/2-50
  const x = useSharedValue(startingPosition)
  const y = useSharedValue(startingPosition)

  const pressed = useSharedValue(false);
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log('start: ', event)
      pressed.value = true;
    },
    onActive: (event) => {
      x.value = startingPosition + event.translationX
      y.value = startingPosition + event.translationY
    },
    onEnd: (event, ctx) => {
      console.log('end: ', event)
      pressed.value = false;
      x.value = withSpring(startingPosition)
      y.value = withSpring(startingPosition)
    } 
  })

  // const eventHandler = (test) => console.log(test)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? 'yellow' : 'blue',
      transform: [{scale: withSpring(pressed.value ? 1 : 1)}, {translateX: x.value}, {translateY: y.value}]
    }
  })

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 50,
    // marginVertical: 50,
    // alignSelf: 'center',
  }
}) 

