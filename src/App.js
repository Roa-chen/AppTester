import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Provider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from './screens/Home';
import ProfileCardApp from './Apps/ProfileCard/ProfileCard';
import ThemeChangerApp from './Apps/ThemeChanger/ThemeChangerApp';
import CardViewerApp from './Apps/CardViewer/CardViewerApp';

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
      <Stack.Screen name="CardViewerApp" component={CardViewerApp} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileCardApp" component={ProfileCardApp} />
      <Stack.Screen name="ThemeChangerApp" component={ThemeChangerApp} />
    </Stack.Navigator>
  );

  return (
    <Provider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );

}

const styles = StyleSheet.create({

});



export default App;
