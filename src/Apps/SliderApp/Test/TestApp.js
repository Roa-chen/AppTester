import React, {useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { animationDuration, numberTabPerScreen, windowWidth } from "../constants";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default TestApp = () => {

  const [data, setData] = React.useState([0, 1, 2])

  const scrollRef = React.useRef(null);
  const scrollPosition = useSharedValue(0);
  const currentPage = useSharedValue(0);

  const indexes = useSharedValue(data);

  useEffect(() => {
    indexes.value = data;
  }, [data])

  const scrollTo = (page) => {
    scrollRef.current.scrollTo({ x: page * windowWidth, animated: true });
  }

  const updateData = () => {
    setData(indexes.value);
  }

  return (
    <View style={styles.container}>
      <Button title={"addItem"} onPress={() => setData(data => {
        console.log('data: ', data)
        return [...data, data.length]
      })} style={{margin: 50}} />
      <View style={styles.tabScrollContainer}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={[styles.tabContainer, { width: windowWidth * (Math.floor(data.length / 4 - 0.25) + 1) }]}
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
                index={index}
                currentPage={currentPage}
                scrollTo={scrollTo}
                scrollPosition={scrollPosition}
                indexes={indexes}
                updateData={updateData}
              />
            )
          })}
        </Animated.ScrollView>
      </View>
    </View>
  )
}

const Item = ({ currentPage, scrollTo, scrollPosition, indexes, id, updateData }) => {

  const itemWidth = windowWidth / numberTabPerScreen;
  
  
  const index = useSharedValue(indexes.value.findIndex((index) => index === id))
  const width = useSharedValue(itemWidth);
  const left = useSharedValue(itemWidth * index.value);
  const scale = useSharedValue(1);
  const changingPage = useSharedValue(false);
  
  useAnimatedReaction(
    () => indexes.value,
    (indexes) => {
      index.value = indexes.findIndex((index) => index === id);
      left.value = withTiming(itemWidth * index.value, {duration: animationDuration})
    }
  )

  const offsetToChange = 32;
  const changePage = (page) => {
    "worklet";
    runOnJS(scrollTo)(page);
    changingPage.value = true;
    changingPage.value = withTiming(false, { duration: 500 });
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
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
      // console.log(indexOfPosition)

      if (indexOfPosition!== index.value) {
        const newIndexes = [...indexes.value.slice(0, index.value), ...indexes.value.slice(index.value + 1)]
        newIndexes.splice(indexOfPosition, 0, indexes.value[index.value]);
        indexes.value = newIndexes;
      }


    },
    onFinish: (event) => {
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
    <Animated.View style={[styles.item, animatedStyle]}>
      <LongPressGestureHandler
        onGestureEvent={onGestureEvent}
        shouldCancelWhenOutside={false}
        maxDist={windowWidth}
        onHandlerStateChange={({ nativeEvent }) => {
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
          <Text>Item {id}</Text>
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