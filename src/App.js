import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Provider, PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from './screens/Home';
import ProfileCardApp from './Apps/ProfileCard/ProfileCard';
import ThemeChangerApp from './Apps/ThemeChanger/ThemeChangerApp';
import CardViewerApp from './Apps/CardViewer/CardViewerApp';
import ChartApp from './Apps/ChartApp/ChartApp';
import MaskedViewApp from './Apps/MaskedView/MaskedViewApp'

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CarouselApp from './Apps/CarouselApp/CarouselApp';

function App() {

  const Stack = createStackNavigator();

  const options = {
    gestureEnabled: true,
    gestureDirection: 'vertical',
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    headerShown: true,
    // header: CardViewerApp,
  }

  const RootStack = () => (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="CardViewerApp" component={CardViewerApp} />
      <Stack.Screen name="ProfileCardApp" component={ProfileCardApp} />
      <Stack.Screen name="ThemeChangerApp" component={ThemeChangerApp} />
      <Stack.Screen name="ChartApp" component={ChartApp} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="MaskedViewApp" component={MaskedViewApp} />
      <Stack.Screen name="CarouselApp" component={CarouselApp} />
    </Stack.Navigator>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({

});



export default App;
