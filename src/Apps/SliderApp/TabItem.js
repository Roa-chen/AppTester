import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { PanGestureHandler, TouchableWithoutFeedback, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing, event, runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedReaction, withTiming } from 'react-native-reanimated';
import { windowWidth, animationDuration } from "./constants";
import { numberTabPerScreen } from './constants';
import styles from "./styles";

export default TabItem = ({ indexSelected, id, indexes, setIndex, programme, addWeek, delWeek, deleting, button, scrollTabTo, updateData, currentPage, tabScrollPosition }) => {

  const itemWidth = (windowWidth - 64) / numberTabPerScreen;

  const getPosFromIndex = (index) => {
    "worklet";
    return itemWidth * index
  }

  const index = useSharedValue(indexes.value.findIndex((index) => index === id))
  const left = useSharedValue(getPosFromIndex(!button ? index.value : indexes.value.length));
  const width = useSharedValue(itemWidth);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const changingPage = useSharedValue(false);

  useAnimatedReaction(
    () => indexes.value,
    (indexes) => {
      if (!button) {
        index.value = indexes.findIndex((index) => index === id);
      } else {
        index.value = indexes.length;
      }
      left.value = withTiming(getPosFromIndex(index.value), {duration: animationDuration})

      console.log(left.value, button, index.value, getPosFromIndex(index.value))
    }
  )

  useEffect(() => {
    if (index.value === deleting) {
      width.value = withTiming(0, {duration: animationDuration, easing: Easing.out(Easing.exp) });
      opacity.value = withTiming(0, {duration: animationDuration, easing: Easing.out(Easing.exp) }, () => {
        runOnJS(delWeek)(index.value);
      });
    }
  }, [deleting]);

  const offsetToChange = 32;
  const changePage = (page) => {
    "worklet";
    runOnJS(scrollTabTo)(page);
    changingPage.value = true;
    changingPage.value = withTiming(false, { duration: 500 });
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.defaultX = event.absoluteX - (index.value%4)*(itemWidth);
    },
    onActive: (event, ctx) => {
      left.value = event.absoluteX - ctx.defaultX + currentPage.value * (windowWidth-64); // update position

      if (!changingPage.value) {
        if (event.absoluteX > windowWidth - offsetToChange) {
          changePage(currentPage.value + 1);
        } else if (event.absoluteX < offsetToChange) {
          changePage(currentPage.value - 1);
        }
      }

      const indexOfPosition = Math.max(Math.floor((left.value + (ctx.defaultX - 32)) / ((windowWidth - 64) / numberTabPerScreen)), 0);

      if (indexOfPosition!== index.value) {
        const newIndexes = [...indexes.value.slice(0, index.value), ...indexes.value.slice(index.value + 1)]
        newIndexes.splice(indexOfPosition, 0, indexes.value[index.value]);
        indexes.value = newIndexes;
      }

    },
    onFinish: (event, ctx) => {
      scale.value = 1;
      left.value = withTiming(getPosFromIndex(index.value), { duration: 100, easing: Easing.out(Easing.exp) })
      runOnJS(updateData)();
    },
  })

  const selected = index.value === indexSelected

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
        maxDist={windowWidth}
        onHandlerStateChange={({nativeEvent}) => {
          if (!button && nativeEvent.state === State.ACTIVE) {
            scale.value = 1.2;
          }
      }}
      onGestureEvent={!button ? onGestureEvent : null}>

        <Animated.View>
          <TouchableWithoutFeedback
            onPress={() => { !button ? setIndex(index.value) : addWeek(programme) }}
          >
            <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
              {!button && <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, { opacity: 1 }]}>Semaine {index.value + 1}</Animated.Text>}
              {button && <Image source={require('./assets/plusImg.png')} resizeMode="cover" />}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </LongPressGestureHandler>
    </Animated.View>


  )
}