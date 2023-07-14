import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Alert, Switch } from 'react-native';
import { ScrollView, TouchableWithoutFeedback, FlatList } from "react-native-gesture-handler";
import { programme } from "./programme";

const windowWidth = Dimensions.get('window').width;

const itemList = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]]
const dayslist = ['lundi', 'mercredi', 'vendredi']

const TabItem = ({ index, indexSelected, setIndex, show }) => {

  const selected = index === indexSelected
  return (
    <View>
      {show && (<TouchableWithoutFeedback onPress={() => setIndex(index)}>
        <View style={[styles.tabItem, selected ? styles.tabItemSelected : null]}>
          <Text style={[styles.tabItemText, selected ? styles.tabItemTextSelected : null]}>Semaine {index + 1}</Text>
        </View>
      </TouchableWithoutFeedback>)}
      {!show && (
        <View style={[styles.tabItem]}>
          <Text style={[styles.tabItemText, {color: '#0000'}]}>Semaine {index + 1}</Text>
        </View>
      )}
    </View>
  )
}

const DayDetail = ({day}) => {

  const [open, setOpen] = useState(false);

  const getImage = () => {
    return (open ? require('./triangleDownImg.png') : require('./triangleRightImg.png'))
  }

  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayTitleContainer}>
        <Text style={styles.dayTitleText}>{day}</Text>
        <TouchableWithoutFeedback onPress={() => setOpen(open => !open)} style={{padding: 5}}>
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

  console.log('calculation of getWeeksOfProgramme')

  const weeks = programme.data;
  const weeksLength = weeks.length
  const needToComplete = weeksLength%4>0 ? 4-weeksLength%4 : 0;

  computedWeeks = []

  for (let i=0; i<(weeksLength + needToComplete)/4; i++) {
    computedWeeks.push([])
    for (let j=0; j<4; j++) {
      computedWeeks[i].push(weeks[4*i+j])
    }
  }

  return computedWeeks
}

export default SliderApp = () => {

  const [indexSelected, setIndexSelected] = useState(0);
  const [gestureAllowed, setGestureAllowed] = useState(true);

  const data = useMemo(() => (getWeeksOfProgramme(programme)), [programme])

  useEffect(() => {
    dayDetailFlatListRef.current.scrollToIndex({index: indexSelected})
  }, [indexSelected]);

  const dayDetailFlatListRef = useRef(null);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
  const handlePageChange = useRef(({viewableItems}) => setIndexSelected(viewableItems[0].index))


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
          <View style={styles.topTitleContainer} >
            <Text style={styles.topTitleText}>Bloc peak</Text>
            <TouchableWithoutFeedback onPress={() => { handleClick('pencil') }}>
              <Image style={styles.topTitleEditButton} source={require('./pencilImg.png')} resizeMode="cover" />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.subTitleText}>Créé ton bloc d'entrainement !</Text>
        </View>
        <View style={styles.tabContainer}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return(
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (windowWidth-64)}}>
                  {item.map((week, weekIndex) => {
                    return <TabItem key={4*index+weekIndex} data={week} index={4*index+weekIndex} indexSelected={indexSelected} setIndex={setIndexSelected} show={week!==undefined} />
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
          data={itemList.flat()}
          renderItem={item => {
            return (
              <View style={styles.daysContainer}>
                <ScrollView style={{paddingHorizontal: 32}}>
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
          scrollEnabled={gestureAllowed}
          onViewableItemsChanged={handlePageChange}
          viewabilityConfig={viewConfigRef}
        />
        
      </View>

      <View style={{position: "absolute", bottom: 10, width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: "center"}}>
        <Switch onValueChange={setGestureAllowed} value={gestureAllowed} />
        <Text style={styles.subTitleText}>Allow horizontal gesture</Text>
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
    flexDirection: "row"
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