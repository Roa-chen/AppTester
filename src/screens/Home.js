import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { List } from 'react-native-paper';

import ProfileCardApp from '../Apps/ProfileCard/ProfileCard';
import ThemeChangerApp from '../Apps/ThemeChanger/ThemeChangerApp';
import CardViewerApp from '../Apps/CardViewer/CardViewerApp';

const Home = ({ navigation }) => {

  const navigate = (route) => (navigation.navigate(route))

  return (
    <List.Accordion title="Applications" left={props => <List.Icon {...props} icon="folder" />} >
      <List.Item title="ProfileCardApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(ProfileCardApp))} />
      <List.Item title="ThemeChangerApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(ThemeChangerApp))} />
      <List.Item title="CardViewerApp" left={props => <List.Icon {...props} icon="folder" />} style={{ paddingLeft: 20 }} onPress={() => (navigate(CardViewerApp))} />
    </List.Accordion>
  )
}

export default Home;