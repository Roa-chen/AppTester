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

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChartApp from './Apps/ChartApp/ChartApp';

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
    </Stack.Navigator>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({

});



export default App;
