import React, { userState, useRef, useEffect } from 'react';
import { View, Text, Animated, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ index, position, indexSelected, setIndex, programme, addWeek, delWeek, deleting, setDeleting }) => {

  const left = useRef(new Animated.Value(((windowWidth - 64) / numberTabPerScreen)*position)).current;
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
      toValue: ((windowWidth - 64) / numberTabPerScreen)*position,
      duration: animationDuration,
      useNativeDriver: false,
    }).start()
  }, [position])

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

  const show = index > -2;
  const selected = index === indexSelected
  const displayIndex = index
  // const displayIndex = (deleting !== null && index > indexSelected) ? index - 1 : index

  return (
    <Animated.View style={{ 
      width: width, 
      opacity: opacity,
      position: 'absolute',
      left: left,
    }}>
      {show && (index !== -1 ? (
        <TouchableWithoutFeedback onPress={() => { setIndex(index) }}>
          <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
            <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, { opacity: opacity }]}>Semaine {displayIndex + 1}</Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => addWeek(programme)}>
          <View style={[styles.tabItem]}>
            {/* <Text style={[styles.tabItemText, {color: '#0005'}]}>Semaine {index + 1}</Text> */}
            <Image source={require('./assets/plusImg.png')} resizeMode="cover" />
          </View>
        </TouchableWithoutFeedback>
      ))}
      {!show && (
        <View style={[styles.tabItem]}>
          <Text style={[styles.tabItemText, { color: '#0000' }]}>Semaine {displayIndex + 1}</Text>
        </View>
      )}
    </Animated.View>
  )
}