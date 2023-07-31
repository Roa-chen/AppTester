import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { PanGestureHandler, TouchableWithoutFeedback, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing, event, runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ indexSelected, id, indexes, length, setIndex, programme, addWeek, delWeek, deleting, button, scrollTabTo, swapIndex }) => {
  // let index = indexes.value[Number(id)] ||Object.is(indexes.value[Number(id)], 0) ? indexes.value[Number(id)] : length;

  const [index, setOwnIndex] = useState(index ||index === 0 ? index : length);
  
  useAnimatedReaction(() => {
    return indexes.value[Number(id)];
  }, (index) => {
    // console.log(id, 'changing indexes: ', index)
    runOnJS(setOwnIndex)(index ||index === 0 ? index : length)
  })

  // console.log(id, index)

  const getPosFromIndex = (index) => {
    "worklet";
    return ((windowWidth - 64) / numberTabPerScreen) * (index)
  }
  const getPageFromPosition = (pos) => {
    "worklet";
    return Math.floor((pos / ((windowWidth - 64) / numberTabPerScreen)) / 4)
  }

  useEffect(() => {
    left.value = withTiming(getPosFromIndex(index), { duration: animationDuration, easing: Easing.out(Easing.exp) }, () => {
      currentPage.value = getPageFromPosition(left.value);
    });
  }, [index]);

  useEffect(() => {
    if (index === deleting) {
      width.value = withTiming(0, {duration: animationDuration, easing: Easing.out(Easing.exp) });
      opacity.value = withTiming(0, {duration: animationDuration, easing: Easing.out(Easing.exp) }, () => {
        runOnJS(delWeek)(index);
      });
    }
  }, [deleting]);


  const drag = useSharedValue(false);
  const left = useSharedValue(getPosFromIndex(index));
  const width = useSharedValue(((windowWidth - 64) / numberTabPerScreen));
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const currentPage = useSharedValue(getPageFromPosition(left.value));
  const changing = useSharedValue(false);

  const changePage = (page) => {
    "worklet";
    if (page < 0 || page*4>length) return;
    runOnJS(scrollTabTo)((page)*4);
    currentPage.value = page;
    changing.value = true;
    changing.value = withTiming(false, { duration: 500 })
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.defaultX = event.absoluteX - (index%4)*((windowWidth - 64) / numberTabPerScreen);
    },
    onActive: (event, ctx) => {
      left.value = event.absoluteX - ctx.defaultX + currentPage.value * (windowWidth-64); // update position

      if (!changing.value && event.absoluteX > (windowWidth-64)) { // change to next page
        changePage(currentPage.value + 1)
      } else if (!changing.value && event.absoluteX < 64) { // change to previous page
        changePage(currentPage.value - 1)
      }

      const indexOfPosition = Math.max(Math.floor((left.value + (ctx.defaultX - 32)) / ((windowWidth - 64) / numberTabPerScreen)), 0);

      if (indexOfPosition !== index && indexOfPosition < length) {
        // console.log("swapping", indexOfPosition, index)
        const item = Object.keys(indexes.value).find(key => indexes.value[Number(key)] === indexOfPosition);
        console.log("---------", item)
        // indexes.value = {...indexes.value, [Number(id)]: indexOfPosition, [item]: index };
        // runOnJS(setOwnIndex)(indexOfPosition);
        // runOnJS(swapIndex)(index, indexOfPosition);
      }

    },
    onFinish: (event, ctx) => {
      scale.value = 1;
      left.value = withTiming(getPosFromIndex(index), { duration: 100, easing: Easing.out(Easing.exp) })
      currentPage.value = getPageFromPosition(getPosFromIndex(index));
    },
  })


  const selected = index === indexSelected

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: left.value,
    width: width.value,
    opacity: opacity.value,
    transform: [{ scale: withTiming(scale.value, { duration: 200 }) }],
  }))


  return (
    <Animated.View
      style={style}>
      <LongPressGestureHandler 
        minDurationMs={500}
        shouldCancelWhenOutside={false}
        maxDist={100000}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            scale.value = 1.2;
          }
        // console.log("UNDETERMINED: ", State.UNDETERMINED) //0
        // console.log("FAILED: ", State.FAILED)             //1
        // console.log("BEGAN: ", State.BEGAN)               //2
        // console.log("CANCELLED: ", State.CANCELLED)       //3
        // console.log("ACTIVE: ", State.ACTIVE)             //4
        // console.log("END: ", State.END)                   //5
      }}
      onGestureEvent={onGestureEvent}>

            <Animated.View>
              <TouchableWithoutFeedback
                onPress={() => { !button ? setIndex(index) : addWeek(programme) }}
                // onLongPress={() => {
                //   scale.value = 1.2;
                //   drag.value = true;
                //   console.log('pressed')
                // }}
              >
                <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
                  {!button && <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, { opacity: 1 }]}>Semaine {index + 1}</Animated.Text>}
                  {button && <Image source={require('./assets/plusImg.png')} resizeMode="cover" />}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
      </LongPressGestureHandler>
    </Animated.View>


  )
}