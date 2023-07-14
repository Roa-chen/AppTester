import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Alert, Switch } from 'react-native';
import { ScrollView, TouchableWithoutFeedback, FlatList } from "react-native-gesture-handler";
import useEditingProgramme from "./useProgramme";

const windowWidth = Dimensions.get('window').width;

const numberTabPerScreen = 4;

const itemList = [[0, 1, 2, 3], [4, 5, 6]]
const dayslist = ['lundi', 'mercredi', 'vendredi']

const TabItem = ({ index, indexSelected, setIndex, type, programme, addWeek, delWeek }) => {

  const show = type === 'week' || type === 'button'

  const selected = index === indexSelected
  return (
    <View>
      {show && (type === 'week' ? (
        <TouchableWithoutFeedback onPress={() => { setIndex(index) }} onLongPress={() => { delWeek(index, indexSelected) }}>
          <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
            <Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null]}>Semaine {index + 1}</Text>
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
    </View>
  )
}

const DayDetail = ({ day }) => {

  const [open, setOpen] = useState(false);

  const getImage = () => {
    return (open ? require('./triangleDownImg.png') : require('./triangleRightImg.png'))
  }

  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayTitleContainer}>
        <Text style={styles.dayTitleText}>{day}</Text>
        <TouchableWithoutFeedback onPress={() => setOpen(open => !open)} style={{ padding: 5 }}>
          <Image source={getImage()} resizeMode="cover" />
        </TouchableWithoutFeedback>
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
  )
}

const getWeeksOfProgramme = (programme) => {

  const weeks = programme.data;
  const weeksLength = weeks.length + 1
  const needToComplete = weeksLength % numberTabPerScreen > 0 ? numberTabPerScreen - weeksLength % numberTabPerScreen : 0;

  computedWeeks = []
  let placedButton = false

  for (let i = 0; i < (weeksLength + needToComplete) / numberTabPerScreen; i++) {
    computedWeeks.push([])
    for (let j = 0; j < numberTabPerScreen; j++) {
      const week = weeks[numberTabPerScreen * i + j];
      if (week) {
        computedWeeks[i].push('week')
      } else {
        computedWeeks[i].push(!placedButton ? 'button' : 'null')
        if (!placedButton) placedButton = true
      }
    }
  }
  return computedWeeks
}

export default SliderApp = () => {

  const { programme, addWeek, delWeek } = useEditingProgramme(123456);

  const delWeekAndMove = (index, indexSelected) => {
    delWeek(index);
    if (indexSelected >= index) setIndexSelected(indexSelected - 1)
  }

  const [indexSelected, setIndexSelected] = useState(0);
  const [flatListDesiredIndex, setFlatListDesiredIndex] = useState(0);

  const data = useMemo(() => {
    return getWeeksOfProgramme(programme)
  }, [programme])

  useEffect(() => {
    dayDetailFlatListRef.current.scrollToIndex({ index: indexSelected })
  }, [indexSelected]);

  const dayDetailFlatListRef = useRef(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const handlePageChange = useRef(({ viewableItems }) => {
    setFlatListDesiredIndex(viewableItems[0].index)
  }).current
  const validatePageChange = () => {
    setIndexSelected(flatListDesiredIndex)
  }

  const handleClick = (name) => {
    Alert.alert('Hey, you clicked', `You clicked on ${name}`)
  }

  return (
    <View style={styles.container}>
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
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: (windowWidth - 64) }}>
                  {item.map((weekType, weekIndex) => {
                    return <TabItem
                      key={numberTabPerScreen * index + weekIndex}
                      index={numberTabPerScreen * index + weekIndex}
                      indexSelected={indexSelected}
                      setIndex={setIndexSelected}
                      type={weekType}
                      programme={programme}
                      addWeek={addWeek}
                      delWeek={delWeekAndMove}
                    />
                  })}
                </View>
              )
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
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
        <FlatList
          ref={dayDetailFlatListRef}
          data={Array(programme.data.length).fill('0')}
          renderItem={item => {
            return (
              <View style={styles.daysContainer}>
                <ScrollView style={{ paddingHorizontal: 32 }}>
                  {dayslist.map(((item, index) => {
                    return <DayDetail key={index} day={item} />
                  }))}
                </ScrollView>
              </View>
            )
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={true}
          onViewableItemsChanged={handlePageChange}
          viewabilityConfig={viewConfigRef}
          onScrollEndDrag={validatePageChange}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1821',
  },
  topContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  bottomContainer: {
    width: '100%',
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
    paddingVertical: 24,
    paddingHorizontal: 12,
    width: windowWidth,
  },
  dayContainer: {
    borderRadius: 5,
    backgroundColor: "#2f2b3a",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 24,
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