import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Dimensions, StyleSheet, Image, Alert, ScrollView, Animated } from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./styles";

import useEditingProgramme from "./useProgramme";
import LinearGradient from "react-native-linear-gradient";
import TabItem from "./TabItem";
import DayComponent from "./DayComponent";

import { windowWidth } from "./constants";

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

  const [indexSelected, setIndexSelected] = useState(0);
  const [move, setMove] = useState(false);

  const [deleting, setDeleting] = useState(null);

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
                <Image source={require('./assets/paramImg.png')} resizeMode="cover" />
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
                <Image style={styles.topTitleEditButton} source={require('./assets/pencilImg.png')} resizeMode="cover" />
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
                {/* console.log(index, ': ', (id !== null && id !== undefined) ? id : index) */ }
                return <TabItem
                  key={(id !== null && id !== undefined) ? id : index}
                  index={(id !== null && id !== undefined) ? index : id}
                  indexSelected={indexSelected}
                  setIndex={setIndex}
                  programme={programme}
                  addWeek={addWeek}
                  delWeek={delWeek}
                  deleting={deleting}
                  setDeleting={setDeleting}
                />
              })}
            </ScrollView>
          </View>
          <View style={styles.utilContainer} >
            <TouchableWithoutFeedback onPress={() => { if (data[indexSelected] !== null) setDeleting(indexSelected) }}>
              <Image source={require('./assets/copyImg.png')} resizeMode="cover" style={styles.utilImage} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { handleClick('paste') }}>
              <Image source={require('./assets/pasteImg.png')} resizeMode="cover" style={styles.utilImage} />
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

            {data.filter(item => item !== null && item !== undefined).map((id, index) => {
              return (
                <DayComponent key={id} deleting={deleting} index={index} />
              )
            })}

          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}