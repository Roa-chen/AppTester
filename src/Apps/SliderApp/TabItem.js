import React, { userState, useRef, useEffect } from 'react';
import { View, Text, Animated, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ index, position, indexSelected, setIndex, programme, addWeek, delWeek, deleting, button }) => {

  const left = useRef(new Animated.Value(((windowWidth - 64) / numberTabPerScreen)*index)).current; //pos
  const opacity = useRef(new Animated.Value(1)).current;
  const width = useRef(new Animated.Value(0)).current;

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

  const selected = index === indexSelected

  return (
    <Animated.View style={{ 
      width: width, 
      opacity: opacity,
      position: 'absolute',
      left: left,
    }}>
      {!button && 
        <TouchableWithoutFeedback onPress={() => { setIndex(index) }}>
          <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
            <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, { opacity: opacity }]}>Semaine {index + 1}</Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      }
      {button && 
        <TouchableWithoutFeedback onPress={() => addWeek(programme)}>
          <View style={[styles.tabItem]}>
            <Image source={require('./assets/plusImg.png')} resizeMode="cover" />
          </View>
        </TouchableWithoutFeedback>
      }
    </Animated.View>
  )
}