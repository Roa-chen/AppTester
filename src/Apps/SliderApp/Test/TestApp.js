import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, useAnimatedValue } from "react-native";
import { animationDuration, numberTabPerScreen, windowWidth } from "../constants";
import { LongPressGestureHandler, State, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { ReText } from "react-native-redash";

export default TestApp = () => {

  const [realData, setRealData] = React.useState([0, 1]);
  const [data, setData] = React.useState(realData)

  const itemName = React.useRef(realData.length);

  const scrollRef = React.useRef(null);
  const scrollPosition = useSharedValue(0);
  const currentPage = useSharedValue(0);
  
  
  const indexes = useSharedValue(realData);
  const itemSelected = useSharedValue(0);
  const [toDelete, setToDelete] = React.useState(null);

  useEffect(() => {
    setData(realData)
    indexes.value = realData;
  }, [realData])

  const scrollTo = (page) => {
    scrollRef.current.scrollTo({ x: page * windowWidth, animated: true });
  }

  const updateData = () => {
    setRealData(indexes.value);
  }

  const addWeek = () => {
    const newData = [...realData, itemName.current];
    setRealData(newData)
    setData(newData)
    indexes.value = newData;
    itemName.current += 1;
  }

  const delWeek = (index) => {
    const newData = [...realData.slice(0, index), ...realData.slice(index+1)]
    setRealData(newData)
    setData(newData)
    indexes.value = newData;

    if (itemSelected.value > newData.length - 1) itemSelected.value = Math.max(newData.length - 1, 0);

    setToDelete(-1);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabScrollContainer}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={[styles.tabContainer, { width: windowWidth * (Math.floor((data.length + 1) / 4 - 0.25) + 1) }]}
          onScroll={useAnimatedScrollHandler((event) => {
            scrollPosition.value = event.contentOffset.x;
            currentPage.value = Math.floor(event.contentOffset.x / windowWidth)
          })}
        >
          {data.map((item, index) => {

            return (
              <Item
                key={item}
                id={item}
                currentPage={currentPage}
                scrollTo={scrollTo}
                scrollPosition={scrollPosition}
                indexes={indexes}
                updateData={updateData}
                delWeek={delWeek}
                defaultIndex={index}
                itemSelected={itemSelected}
                toDelete={toDelete}
              />
            )
          })}
          <Item button indexes={indexes} addWeek={addWeek} />
        </Animated.ScrollView>
      </View>
      <View style={{
        marginTop: 50,
        backgroundColor: '#F5F',
        borderRadius: 5,
        padding: 20,
      }}>
        <TouchableWithoutFeedback onPress={() => {setToDelete(itemSelected.value)}}>
          <Text style={{
              color: 'black'
            }}
          >Del Week
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const Item = ({ currentPage, scrollTo, scrollPosition, indexes, id, updateData, button, addWeek, defaultIndex, itemSelected, toDelete, delWeek }) => {

  const itemWidth = windowWidth / numberTabPerScreen;

  const getIndexFromIndexes = (indexes) => {
    "worklet";
    const index = indexes.findIndex((index) => index === id)
    return index !== -1 ? index : defaultIndex;
  }

  useEffect(() => {
    width.value = withTiming(itemWidth, { duration: animationDuration })
    opacity.value = withTiming(1, { duration: animationDuration })
  }, [])


  const index = useSharedValue(!button ? getIndexFromIndexes(indexes.value) : indexes.value.length)
  const width = useSharedValue(0);
  const left = useSharedValue(itemWidth * index.value);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const changingPage = useSharedValue(false);
  const selected = !button ? itemSelected.value === index.value : false;

  useAnimatedReaction(
    () => indexes.value,
    (indexes) => {
      const newIndex = !button ? getIndexFromIndexes(indexes) : indexes.length;
      if (index.value !== newIndex) {
        index.value = newIndex;
        left.value = withTiming(itemWidth * index.value, { duration: animationDuration })
      }
    }
  )

  useEffect(() => {
    if (toDelete === index.value) {
      width.value = withTiming(0, { duration:animationDuration}, () => {runOnJS(delWeek)(index.value); toDelete.value = -1})
    }
  }, [toDelete]);

  const offsetToChange = 32;
  const changePage = (page) => {
    "worklet";
    runOnJS(scrollTo)(page);
    changingPage.value = true;
    changingPage.value = withTiming(false, { duration: 500 });
  }

  const swapIndexes = (firstIndex, secondIndex) => {
    "worklet";

    const newIndexes = [...indexes.value.slice(0, firstIndex), ...indexes.value.slice(firstIndex + 1)]
    newIndexes.splice(secondIndex, 0, indexes.value[firstIndex]);
    indexes.value = newIndexes;

  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      itemSelected.value = index.value;
      ctx.defaultX = event.absoluteX - (index.value % 4) * itemWidth;
    },
    onActive: (event, ctx) => {
      left.value = event.absoluteX - ctx.defaultX + scrollPosition.value;

      if (!changingPage.value) {
        if (event.absoluteX > windowWidth - offsetToChange) {
          changePage(currentPage.value + 1);
        } else if (event.absoluteX < offsetToChange) {
          changePage(currentPage.value - 1);
        }
      }

      const indexOfPosition = Math.max(Math.floor((left.value + ctx.defaultX) / itemWidth), 0);

      if (indexOfPosition !== index.value) {
        swapIndexes(index.value, indexOfPosition);
      }

    },
    onFinish: () => {
      scale.value = 1;
      left.value = withTiming(itemWidth * index.value, { duration: animationDuration });
      runOnJS(updateData)();
    }
  })

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [{ scale: withTiming(scale.value, { duration: animationDuration }) }],
    left: left.value,
    width: width.value
  }))

  return (
    <Animated.View style={[styles.item, animatedStyle, selected ? {backgroundColor: '#5559'} : null]}>
        <LongPressGestureHandler
          onGestureEvent={!button ? onGestureEvent : null}
          shouldCancelWhenOutside={false}
          maxDist={windowWidth}
          onHandlerStateChange={({ nativeEvent }) => {
            if (button && nativeEvent.state === State.BEGAN) addWeek()
            if (nativeEvent.state === State.ACTIVE) {
              scale.value = 1.2;
            }
          }}
        >
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!button && <Animated.Text style={{color: 'white'}}>Item {index.value}</Animated.Text>}
            {/* {!button && <ReText text={formattedIndex} style={{color: 'white'}} />} */}
            {button && <Text style={{color: 'white'}}>New</Text>}
          </Animated.View>
        </LongPressGestureHandler>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabScrollContainer: {
    backgroundColor: '#F5F',
    width: '100%',
    height: 50,
  },
  tabContainer: {
    alignItems: 'center',
  },
  item: {
    width: windowWidth / numberTabPerScreen,
    height: 40,
    backgroundColor: '#5555',
    alignItems: 'center',
    justifyContent: 'center',
  },
})