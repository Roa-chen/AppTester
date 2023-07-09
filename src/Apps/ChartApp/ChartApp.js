import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

function ChartApp() {
  const isDarkMode = useColorScheme() === 'dark';

  const [width, setWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        setWidth(window.width);
      }
    )
    return () => {
      subscription?.remove();
    };
  }, []);


  const [multipleLines, setMultipleLines] = useState(false);
  const [ShowArea, setShowArea] = useState(false);

  const dataSet = [
    [
      { x: -2, y: 15 },
      { x: -1, y: 10 },
      { x: 0, y: 12 },
      { x: 1, y: 7 },
      { x: 2, y: 6 },
      { x: 3, y: 8 },
      { x: 4, y: 10 },
      { x: 5, y: 8 },
      { x: 6, y: 12 },
      { x: 7, y: 14 },
      { x: 8, y: 12 },
      { x: 9, y: 13.5 },
      { x: 10, y: 18 },
    ],
    [
      { x: -2, y: 15 - 10 },
      { x: -1, y: 1 },
      { x: 0, y: 12 - 10 },
      { x: 1, y: 7 },
      { x: 2, y: 9 },
      { x: 3, y: 11 },
      { x: 4, y: 15 },
      { x: 5, y: 8 },
      { x: 6, y: 7 },
      { x: 7, y: 14 - 10 },
      { x: 8, y: 12 - 10 },
      { x: 9, y: 13.5 - 10 },
      { x: 10, y: 18 - 10 },
    ],
    [
      { x: -2, y: 13 },
      { x: 3, y: 4 },
      { x: 7, y: 19 },
      { x: 8.5, y: 16 },
      { x: 10, y: 13 },
    ]
  ]

  const CustomSwitch = ({label, value, onValueChange}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Switch value={value} onValueChange={onValueChange} />
      <Text style={{marginLeft: 5}}>{label}</Text>
    </View>
  )

  return (
    <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <StatusBar hidden={true} />
      <SafeAreaView style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1A1821',
      }}>

        <View>
          <Chart
            style={{
              width: width - 80,
              height: (width - 80) / 2.5,
              backgroundColor: '#1A1821',
              // elevation: 20,
              borderRadius: 20,
            }}
            data={dataSet[0]}
            padding={{ left: 50, bottom: 40, right: 20, top: 20 }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: 0, max: 20 }}
          >
            <VerticalAxis
              tickCount={4}
              theme={{
                labels: {
                  formatter: (v) => v.toFixed(2),
                  label: {
                    color: '#88858F',
                    fontSize: 14,
                    dx: -10,
                  }
                },
                axis: {
                  visible: false
                },
                ticks: {
                  visible: false
                },
                grid: {
                  stroke: {
                    color: '#2F2B3A',
                    width: 2,
                  }
                }
              }}
            />
            <HorizontalAxis
              tickCount={4}
              includeOriginTick={false}
              theme={{
                labels: {
                  formatter: (v) => v.toFixed(2),
                  label: {
                    color: '#88858F',
                    fontSize: 14,
                    dy: -20
                  },

                },
                axis: {
                  visible: false
                },
                ticks: {
                  visible: false
                },
                grid: {
                  visible: false
                }
              }}
            />

            { ShowArea && <Area 
                theme={{ gradient: { from: { color: '#8D69FF', opacity: 1 }, to: { color: '#1A1821', opacity: 0.4 } }}}
                smoothing='bezier'
              />}
            <Line
              theme={{
                stroke: { color: '#8F6BFF', width: 2 },
                // scatter: { 
                //   default: { width: 4, height: 4, rx: 2 }
                // } 
              }}
              smoothing='bezier'
            // tension={.3}
            />

            {(multipleLines && ShowArea) && <Area 
              theme={{ gradient: { from: { color: '#88858F', opacity: 1 }, to: { color: '#1A1821', opacity: 0.4 } }}}
              smoothing='bezier'
              data={dataSet[1]}
            />}
            {multipleLines && <Line
              data={dataSet[1]}
              theme={{
                stroke: { color: '#88858F', width: 2 },
              }}
              smoothing='bezier'
            />}

            {(multipleLines && ShowArea) && <Area 
              theme={{ gradient: { from: { color: '#88858F', opacity: 1 }, to: { color: '#1A1821', opacity: 0.4 } }}}
              smoothing='bezier'
              data={dataSet[2]}
            />}
            {multipleLines && <Line
              data={dataSet[2]}
              theme={{
                stroke: { color: '#88858F', width: 2 },
              }}
              smoothing='bezier'
            />}
          </Chart>
        </View>

        <View style={width > 600 ? {flexDirection: 'row', width: width/2, justifyContent: 'space-between'} : {flexDirection: 'column'}}>
          <CustomSwitch label="Multiple Lines" value={multipleLines} onValueChange={(value) => {setMultipleLines(value)}} />
          <CustomSwitch label="Display Area" value={ShowArea} onValueChange={(value) => {setShowArea(value)}} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

});

export default ChartApp;
