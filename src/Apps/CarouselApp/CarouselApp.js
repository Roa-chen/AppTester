import React, {useRef} from "react";
import { Animated } from "react-native";
import { View, Text, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('window')

const data = [
  {
    id: 0,
    title: 'First Item',
    text: 'I am the first Item,\nand I\'m proud of it',
    color: 'red'
  },
  {
    id: 1,
    title: 'Second Item',
    text: 'I am the second Item,\nand I\'m proud of it',
    color: 'green'
  },
  {
    id: 2,
    title: 'Third Item',
    text: 'I am the third Item,\nand I\'m proud of it',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Fourth Item',
    text: 'I am the fourth Item,\nand I\'m proud of it',
    color: 'yellow'
  },
]

const CarouslItem = ({item}) => {
  return(
    <View style={{
      backgroundColor: item.color,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        color: 'black',
        fontSize: 40,
        
      }}>{item.title}</Text>
      <Text style={{
        color: 'black',
        fontSize: 20,
        marginTop: 30,
        
      }}>{item.text}</Text>
    </View>
  )
}

const Pagination = ({data, scrollX}) => {
  return(
    <View style={{
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      bottom: 100,
      width: '100%',
    }}>
      {data.map((item, index) => {

        const dotWidth = scrollX.interpolate({
          inputRange: [width*(index-1), width*index, width*(index+1)],
          outputRange: [12, 30, 12],
          extrapolate: 'clamp'
        })
        const dotcolor = scrollX.interpolate({
          inputRange: [width*(index-1), width*index, width*(index+1)],
          outputRange: ['#fff', '#000', '#fff'],
          extrapolate: 'clamp'
        })

        return (<Animated.View 
          key={index.toString()} 
          style={{
            width: dotWidth,
            height: 12,
            borderRadius: 6,
            backgroundColor: dotcolor,
            marginHorizontal: 3
          }} 
        />)
      })}
    </View>
  )
}

export default CarouselApp = () => {

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = event => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          }
        }
      }
    ], {
      useNativeDriver: false
    })(event);
  }


  return(
    <View>
      <FlatList
        style={{backgroundColor: 'pink'}}
        data={data}
        renderItem={({item}) => <CarouslItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <Pagination data={data} scrollX={scrollX} />
    </View>
  )
}

