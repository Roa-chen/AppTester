import React, { useRef, useState } from 'react';
import { View, Text, Animated, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { windowWidth, dayslist, animationDuration } from "./constants";
import styles from "./styles";



export default DayContainer = ({ deleting, index }) => {

  // const value = useRef(new Animated.Value(2)).current;
  // const width = value.interpolate({
  //   inputRange: [.2, 1],
  //   outputRange: [0, windowWidth],
  //   extrapolate: 'clamp'
  // })
  // const opacity = value.interpolate({
  //   inputRange: [1, 2],
  //   outputRange: [0, 1]
  // })
  // const padding = value.interpolate({
  //   inputRange: [0.2, 1],
  //   outputRange: [0, 44],
  //   extrapolate: 'clamp'
  // })

  // const deleteAnimation = () => {
  //   Animated.timing(value, {
  //     toValue: 0,
  //     duration: animationDuration,
  //     useNativeDriver: false,
  //   }).start()
  // }

  // if (deleting === index) {
  //   deleteAnimation()
  // }

  return (
    // <Animated.View style={[styles.daysContainer, { width: width, opacity: opacity, paddingHorizontal: padding }]}>
    <Animated.View style={[styles.daysContainer, { width: windowWidth, opacity: 1, paddingHorizontal: 44 }]}>
      {dayslist.map(((day, key) => {
        return (
          <DayDetail key={key} day={day} />
        )
      }))}
    </Animated.View>

  )
}

const DayDetail = ({ day }) => {

  const [open, setOpen] = useState(false);

  const getImage = () => {
    return (open ? require('./assets/triangleDownImg.png') : require('./assets/triangleRightImg.png'))
  }

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(open => !open)} style={{ padding: 5 }}>
      <View style={styles.dayContainer}>
        <View style={styles.dayTitleContainer}>
          <Text style={styles.dayTitleText}>{day}</Text>
          <Image source={getImage()} resizeMode="cover" />
        </View>
        <View>
          {open && <Text style={styles.dayText}>
            {
              `- Squat 1x3 @9
  - Squat 3x5 @80%
  - Bench 1*AMRAP @70kg
  - Bench 4*6 @80%
  - 5cm deficit Deadlift... 4*4 @7
  `
            }
          </Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}