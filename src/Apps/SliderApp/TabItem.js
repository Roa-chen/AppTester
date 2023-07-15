import React, { userState, useRef } from 'react';
import { View, Text, Animated, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ index, indexSelected, setIndex, programme, addWeek, delWeek, deleting, setDeleting }) => {

  const value = useRef(new Animated.Value(2)).current;
  const width = value.interpolate({
    inputRange: [.2, .5],
    outputRange: [0, ((windowWidth - 64) / numberTabPerScreen)],
    extrapolate: 'clamp'
  })
  const padding = value.interpolate({
    inputRange: [.2, .5],
    outputRange: [0, 6],
    extrapolate: 'clamp'
  })
  const opacity = value.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 1]
  })

  const deleteAnimation = () => {
    Animated.timing(value, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(() => {
      setDeleting(null);
      delWeek(indexSelected);
    })
  }

  if ((index !== null) && deleting === index) deleteAnimation()


  const show = index !== undefined;
  const selected = index === indexSelected
  const displayIndex = (deleting !== null && index > indexSelected) ? index - 1 : index

  return (
    <Animated.View style={{ width: width, opacity: opacity, paddingRight: padding }}>
      {show && (index !== null ? (
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