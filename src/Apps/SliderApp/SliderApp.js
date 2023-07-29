import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, Text, Image, Alert, ScrollView } from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./styles";

import useEditingProgramme from "./useProgramme";
import TabItem from "./TabItem";
import DayComponent from "./DayComponent";

import { numberTabPerScreen, windowWidth } from "./constants";


const getWeeksOfProgramme = (programme, indexes) => {
  const computedWeeks = []

  for (let i=0; i<programme.data.length; i++) {
    computedWeeks.push(programme.data[i].id);
    indexes.value.push({id: programme.data[i].id, index: i});
  }

  return computedWeeks
}

export default SliderApp = () => {




  const { programme, addWeek, delWeek, swapWeek } = useEditingProgramme(123456);

  const delWeekInProgramme = (index) => {
    setDeleting(null);
    delWeek(index);
    if (index + 1 === programme.data.length) setIndex(index - 1)
  }

  const indexes = useSharedValue([]);
  let data = useMemo(() => {
    const data = getWeeksOfProgramme(programme, indexes);
    return data;
  }, [programme])

  console.log(data)

  const swapIndex = (index1, index2) => {

    const l = data.length
    if (index1 >= l || index2 >= l || index1 === index2) return false

    swapWeek(index1, index2)
    setIndex(indexSelected === index1 ? index2 : index1)

    return true;
  }

  const [indexSelected, setIndexSelected] = useState(0);
  const [move, setMove] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const setIndex = (index) => {
    setIndexSelected(index);
    setMove(true);
  }

  useEffect(() => {
    scrollRef.current.scrollTo({ x: indexSelected * windowWidth })
    scrollTabTo(indexSelected);
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

  const scrollTabTo = (index) => {

    const length = data.length-1;
    const indexMax = length + (4-length%4 !== 0 ? 4-length%4 : 0)
    const isValide = (index >= 0 && index <= indexMax)
    if (isValide) tabRef.current.scrollTo({ x: Math.round((index / 4) - 0.5) * (windowWidth - 64) })
    return isValide
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

              <View style={{
                width: ((windowWidth - 64) / numberTabPerScreen * (data.length+1+((data.length+1)%4 !== 0 ? 4-(data.length+1)%4 : 0)))
              }} />

              {data.map((id, index) => {

                return <TabItem
                  key={id}
                  id={id}
                  index={index}
                  indexes={indexes}
                  indexSelected={indexSelected}
                  setIndex={setIndex}
                  programme={programme}
                  delWeek={delWeekInProgramme}
                  deleting={deleting}
                  scrollTabTo={scrollTabTo}
                  swapIndex={swapIndex}
                  length={data.length}
                />
              })}

              <TabItem index={data.length} button addWeek={addWeek} indexes={indexes} />
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
              <Text style={styles.modifyText}>Modifier les jours d'entrainements</Text>
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

            {data.map((id, index) => {
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