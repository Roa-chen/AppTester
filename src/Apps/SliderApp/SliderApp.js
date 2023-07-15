import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Alert, ScrollView, Animated } from 'react-native';
import { TouchableWithoutFeedback, FlatList } from "react-native-gesture-handler";
import useEditingProgramme from "./useProgramme";
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get('window').width;

const numberTabPerScreen = 4;

const dayslist = ['lundi', 'mercredi', 'vendredi']

const TabItem = ({ index, indexSelected, setIndex, programme, addWeek, delWeek }) => {

  const value = useRef(new Animated.Value(2)).current;
  const width = value.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, 0 , ((windowWidth - 64) / numberTabPerScreen)],
    extrapolate: 'clamp'
  })
  const opacity = value.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 1]
  })

  const deleteAnimation = () => {
    console.log('animate: ', index)
    Animated.timing(value, {
      toValue: 0,
      duration: 250,
      delay: 1000,
      useNativeDriver: false,
    }).start(() => delWeek(index, indexSelected))
  }

  const show = index !== undefined;
  const selected = index === indexSelected
  return (
    <Animated.View style={{ width: width, opacity: opacity }}>
      {show && (index !== null ? (
        <TouchableWithoutFeedback onPress={() => { setIndex(index) }} onLongPress={deleteAnimation}>
          <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
            <Animated.Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null, {opacity: opacity}]}>Semaine {index + 1}</Animated.Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => addWeek(programme)}>
          <View style={[styles.tabItem]}>
            {/* <Text style={[styles.tabItemText, {color: '#0005'}]}>Semaine {index + 1}</Text> */}
            <Image source={require('./plusImg.png')} resizeMode="cover" />
          </View>
        </TouchableWithoutFeedback>
      ))}
      {!show && (
        <View style={[styles.tabItem]}>
          <Text style={[styles.tabItemText, { color: '#0000' }]}>Semaine {index + 1}</Text>
        </View>
      )}
    </Animated.View>
  )
}

const DayContainer = ({ day }) => {
  return (
    <View style={styles.daysContainer}>
      {/* <ScrollView style={{ paddingHorizontal: 32 }} showsVerticalScrollIndicator={false} > */}
      {dayslist.map(((day, key) => {
        return (
          <DayDetail key={key} day={day} />
        )
      }))}
      {/* </ScrollView> */}
    </View>

  )
}

const DayDetail = ({ day }) => {

  const [open, setOpen] = useState(false);

  const getImage = () => {
    return (open ? require('./triangleDownImg.png') : require('./triangleRightImg.png'))
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

const getWeeksOfProgramme = (programme) => {

  const l = programme.data.length + 1;
  const need = l % 4 > 0 ? 4 - l % 4 : 0

  computedWeeks = []

  programme.data.forEach((week, index) => computedWeeks.push(week.id))
  computedWeeks.push(null)
  computedWeeks = [...computedWeeks, ...Array(need).fill(undefined)]

  return computedWeeks
}



export default SliderApp = () => {

  const { programme, addWeek, delWeek } = useEditingProgramme(123456);

  const data = useMemo(() => {
    return getWeeksOfProgramme(programme)
  }, [programme])

  const delWeekAndMove = (index, indexSelected) => {

    console.log('deleting : ', index)

    delWeek(index);
    // if (indexSelected >= index) setIndex(indexSelected - 1)
  }


  const [indexSelected, setIndexSelected] = useState(0);
  const [move, setMove] = useState(false);

  const setIndex = (index) => {
    setIndexSelected(index);
    setMove(true);
  }

  useEffect(() => {
    scrollRef.current.scrollTo({ x: indexSelected * windowWidth })
    tabRef.current.scrollTo({ x: Math.round((indexSelected / 4) - 0.5) * (windowWidth - 64) })
  }, [indexSelected]);

  const scrollRef = useRef(null);
  const tabRef = useRef(null)

  const handleScroll = ({ nativeEvent }) => {
    const x = nativeEvent.contentOffset.x
    const index = Math.round(x / windowWidth)
    if (!move) {
      setIndexSelected(index)
    }
    if (x === indexSelected * windowWidth) {
      setMove(false);
    }
  }

  const handleScrollEnd = () => {
    if (move) {
      scrollRef.current.scrollTo({ x: indexSelected * windowWidth })
    }
  }

  const handleClick = (name) => {
    Alert.alert('Hey, you clicked', `You clicked on ${name}`)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.topContainer}>
          <View style={styles.buttonHeader}>
            <TouchableWithoutFeedback onPress={() => { handleClick('supprimer') }}>
              <View>
                <Text style={styles.buttonHeaderText}>Supprimer</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { handleClick('parameter') }}>
              <View style={styles.imageButtonHeader}>
                <Image source={require('./paramImg.png')} resizeMode="cover" />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { handleClick('sauvegarder') }}>
              <View>
                <Text style={styles.buttonHeaderText}>Sauvegarder</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.titleContainer} >
            <TouchableWithoutFeedback onPress={() => { handleClick('pencil') }}>
              <View style={styles.topTitleContainer} >
                <Text style={styles.topTitleText}>Bloc peak</Text>
                <Image style={styles.topTitleEditButton} source={require('./pencilImg.png')} resizeMode="cover" />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.subTitleText}>Créé ton bloc d'entrainement !</Text>
          </View>
          <View style={styles.tabContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              ref={tabRef}
            >
              {data.map((id, index) => {
                console.log(index, ': ', (id !== null && id !== undefined) ? id : index)
                return <TabItem
                  key={(id !== null && id !== undefined) ? id : index}
                  index={(id !== null && id !== undefined) ? index : id}
                  indexSelected={indexSelected}
                  setIndex={setIndex}
                  programme={programme}
                  addWeek={addWeek}
                  delWeek={delWeekAndMove}
                />
              })}
            </ScrollView>
          </View>
          <View style={styles.utilContainer} >
            <TouchableWithoutFeedback onPress={() => { handleClick('copy') }}>
              <Image source={require('./copyImg.png')} resizeMode="cover" style={styles.utilImage} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { handleClick('paste') }}>
              <Image source={require('./pasteImg.png')} resizeMode="cover" style={styles.utilImage} />
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback onPress={() => { handleClick('modify training day') }}>
            <View style={styles.modifyButtonContainer}>
              <Text style={styles.modifyText}>Modifier les jours d’entrainements</Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
        <View style={styles.bottomContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollEndDrag={handleScrollEnd}
            ref={scrollRef}
          >
            {/* <LinearGradient
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              zIndex: 10,
            }}
            // colors={['#fff', '#fff0']} 
            colors={['#1A1821', '#1A182100']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          /> */}

            {data.filter(item => item !== null && item !== undefined).map((index, key) => {
              return (
                <DayContainer key={key} day={index} />
              )
            })}

          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#1A1821',
  },
  topContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  bottomContainer: {
    flex: 1,
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 26,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonHeaderText: {
    color: '#8F6BFF',
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
  },
  imageButtonHeader: {
    width: 17,
    height: 17,
  },
  titleContainer: {
    marginBottom: 24
  },
  topTitleContainer: {
    flexDirection: "row",
  },
  topTitleText: {
    color: '#F6F3FD',
    fontSize: 24,
    lineHeight: 40,
    fontFamily: "Inter_bold",
    fontWeight: 700,
  },
  topTitleEditButton: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },
  subTitleText: {
    color: '#88858F',
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
  },
  tabContainer: {
    height: 26,
    marginBottom: 24,
  },
  tabItem: {
    height: 26,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#F6F3FD',
  },
  tabItemText: {
    fontSize: 14,
    lineHeight: 26,
    color: '#88858F',
    fontFamily: "Inter_regular",
  },
  tabItemTextSelected: {
    color: '#F6F3FD',
  },
  utilContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  utilImage: {
    marginHorizontal: 24,
    width: 17,
    height: 17,
  },
  modifyButtonContainer: {
    borderRadius: 5,
    backgroundColor: "#2f2b3a",
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 26,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  modifyText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#8f6bff",
    textAlign: "center"
  },
  daysContainer: {
    width: windowWidth,
    paddingHorizontal: 44,
  },
  dayContainer: {
    borderRadius: 5,
    backgroundColor: "#2f2b3a",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 24,
    alignItems: 'flex-start',
  },
  dayTitleContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  dayTitleText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#f6f3fd",
    marginRight: 4,
  },
  dayImage: {
    height: 9,
    width: 9,
  },
  dayText: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: "Inter_regular",
    color: "#f6f3fd",
    textAlign: "left"
  }
})